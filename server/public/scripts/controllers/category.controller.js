app.controller('CategoryController', ['BookTrackerService', '$mdDialog', '$mdToast', function(BookTrackerService, $mdDialog, $mdToast){
    console.log('category controller loaded');
    const self = this;

    // Pass the category functions to the category view
    self.addCategory = BookTrackerService.addCategory;
    self.getCategories = BookTrackerService.getCategories;
    self.deleteCategory = BookTrackerService.deleteCategory;

    // Pass through the categories object so we can access the list
    self.books = BookTrackerService.books;
    self.categories = BookTrackerService.categories;

    BookTrackerService.getCategories();
    BookTrackerService.getBooks();
}]);