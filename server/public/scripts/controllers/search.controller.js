app.controller('SearchController', ['BookTrackerService', '$mdDialog', function(BookTrackerService, $mdDialog){
    console.log('search controller loaded');
    const self = this;

    // Pass through the search results object so the array can be accessed on the view
    self.searchResults = BookTrackerService.searchResults;

    // Pass through the search function
    self.searchBooks = BookTrackerService.searchBooks;

    self.open = function(event){
        console.log('show');
        console.log(event);
        $mdDialog.show({
            templateUrl: 'views/dialog.html',
            controller: 'SearchController as vm',
            preserveScope: true,
            targetEvent: event
          });
    }

    self.close = function(){
        console.log('close');
        $mdDialog.hide();
    }

}])