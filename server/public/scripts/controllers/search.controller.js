app.controller('SearchController', ['BookTrackerService', function(BookTrackerService){
    console.log('search controller loaded');
    const self = this;

    // Pass through the search results object so the array can be accessed on the view
    self.searchResults = BookTrackerService.searchResults;

    // Pass through the search function
    self.searchBooks = BookTrackerService.searchBooks;

}])