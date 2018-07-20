app.controller('BookController', ['BookTrackerService', '$mdToast', '$mdDialog', '$scope', function(BookTrackerService, $mdToast, $mdDialog, $scope){
    console.log('book controller loaded');
    const self = this;

    self.editMode = false;
    
    // This object is implied by the inputs on the view, but also declared here explicitly
    self.book  = {
        id: 0,
        title: '',
        author: '',
        category: '',
        image_path: '',
        category_id: 0
    }

    self.activeBook = {};

    // Pass through the books object with the crucial books list
    self.books = BookTrackerService.books;
    self.categories = BookTrackerService.categories;

    // Pass through the relevant functions from the service
    self.getBooks = BookTrackerService.getBooks;
    self.deleteBook = BookTrackerService.deleteBook;

    self.addBook = function(){
        if (self.editMode){
            BookTrackerService.editBook(self.book);
            clearInputs();
            self.editMode = false;
            return;
        }
        BookTrackerService.addBook(self.book);
        clearInputs();
    }


    self.startEdit = function(book){
        console.log('entering edit mode', book);
        self.editMode = true;
        self.book.id = book.id;
        self.book.title = book.title;
        self.book.author = book.author;
        self.book.category = book.category;
        self.book.category_id = '' + book.category_id;
        self.book.image_path = book.image_path;
    }

    clearInputs = function(){
        self.book = {
            id: 0,
            title: '',
            author: '',
            category: '',
            image_path: '',
            category_id: 0
        }
    }

    self.open = function(book){
        // self.activeBook = wrangleBook(book);
        console.log(book);
        self.activeBook = book;
        self.activeBook.category_id = '' + book.category_id;
        $mdDialog.show({
            templateUrl: 'views/dialog.html',
            scope: $scope,
            preserveScope: true,
            targetEvent: event,
            clickOutsideToClose: true
          });
    }

    self.close = function(){
        console.log(self.activeBook);
        BookTrackerService.editBook(self.activeBook);
        $mdDialog.hide();
        $mdToast.show(
            $mdToast.simple()
              .textContent(self.activeBook.title + ' has been edited.')
              .position('top right')
              .hideDelay(3000)
          );
    }

}]);