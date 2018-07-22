app.controller('BookController', ['BookTrackerService', '$mdToast', '$mdDialog', '$scope', function(BookTrackerService, $mdToast, $mdDialog, $scope){
    console.log('book controller loaded');
    const self = this;

    self.activeBook = {};

    // Pass through the books object with the crucial books list
    self.books = BookTrackerService.books;
    self.categories = BookTrackerService.categories;

    // Pass through the relevant functions from the service
    self.getBooks = BookTrackerService.getBooks;
    self.deleteBook = BookTrackerService.deleteBook;
    self.markRead = BookTrackerService.markRead;

    self.open = function(book){
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