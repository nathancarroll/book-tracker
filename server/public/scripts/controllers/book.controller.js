app.controller('BookController', ['BookTrackerService', '$mdToast', '$mdDialog', '$scope', function(BookTrackerService, $mdToast, $mdDialog, $scope){
    console.log('book controller loaded');
    const self = this;

    self.activeBook = {};

    // Pass through the books object with the crucial books list
    self.books = BookTrackerService.books;
    self.categories = BookTrackerService.categories;

    // Pass through the relevant functions from the service
    self.getBooks = BookTrackerService.getBooks;
    self.markRead = BookTrackerService.markRead;

    self.open = function(book){
        self.activeBook = book;
        self.activeBook.category_id = '' + book.category_id;
        $mdDialog.show({
            templateUrl: 'views/dialog.html',
            scope: $scope,
            preserveScope: true,
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

    self.confirmDelete = function(book){
        console.log(book.id);
        const confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this book?')
            .ariaLabel('Delete book confirmation')
            .cancel('Cancel')
            .ok('Delete');

        $mdDialog.show(confirm).then(function(){
            console.log('delete case');
            BookTrackerService.deleteBook(book.id);
            $mdToast.show(
                $mdToast.simple()
                .textContent(book.title + ' has been deleted.')
                .position('top right')
                .hideDelay(3000)
            );
        }, function(){
            console.log('cancel case');
        })
    }
}]);