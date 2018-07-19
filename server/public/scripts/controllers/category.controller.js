app.controller('CategoryController', ['BookTrackerService', function(BookTrackerService){
    console.log('category controller loaded');
    const self = this;

    // Pass through the categories object so we can access the list
    self.categories = BookTrackerService.categories;
}]);