app.controller('SearchController', ['BookTrackerService', '$mdDialog', '$scope', function(BookTrackerService, $mdDialog, $scope){
    console.log('search controller loaded');
    const self = this;

    self.activeBook = {};
    // Pass through the search results object so the array can be accessed on the view
    self.searchResults = BookTrackerService.searchResults;
    // We also need the categories object to display as options in the fav dialog
    self.categories = BookTrackerService.categories;

    // Pass through the search and addBook functions;
    self.searchBooks = BookTrackerService.searchBooks;
    self.addBook = BookTrackerService.addBook;

    self.open = function(book){
        self.activeBook = wrangleBook(book);
        $mdDialog.show({
            templateUrl: 'views/dialog.html',
            scope: $scope,
            // controller: 'SearchController as vm',
            preserveScope: true,
            targetEvent: event
          });
    }

    self.close = function(){
        // console.log('close, category id:');
        // console.log(self.activeBook.category_id);
        console.log(self.activeBook);
        self.addBook(self.activeBook);
        $mdDialog.hide();
    }

    wrangleBook = function(volumeInfoAPI){
        let book = {};
        book.title = volumeInfoAPI.title;
        book.author = volumeInfoAPI.authors.join(' & ');
        book.category_id = '';
        book.image_path = volumeInfoAPI.imageLinks.thumbnail;
        return book;
    }
}])