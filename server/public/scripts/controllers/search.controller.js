app.controller('SearchController', ['BookTrackerService', '$mdDialog', '$scope', function(BookTrackerService, $mdDialog, $scope){
    console.log('search controller loaded');
    const self = this;

    self.activeBook = {};
    // Pass through the search results object so the array can be accessed on the view
    self.searchResults = BookTrackerService.searchResults;
    // We also need the categories object to display as options in the fav dialog
    self.categories = BookTrackerService.categories;

    // Pass through the search function
    self.searchBooks = BookTrackerService.searchBooks;

    self.open = function(book){
        self.activeBook = book;
        $mdDialog.show({
            templateUrl: 'views/dialog.html',
            scope: $scope,
            // controller: 'SearchController as vm',
            preserveScope: true,
            targetEvent: event
          });
    }

    self.close = function(){
        console.log('close');
        console.log(self.activeBook);
        $mdDialog.hide();
    }

}])