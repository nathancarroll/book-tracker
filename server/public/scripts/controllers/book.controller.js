app.controller('BookController', ['BookTrackerService', function(BookTrackerService){
    console.log('book controller loaded');
    const self = this;

    // Pass through the books object with the crucial books list
    self.books = BookTrackerService.books;
    self.categories = BookTrackerService.categories;

    // Pass through the relevant functions from the service
    self.getBooks = BookTrackerService.getBooks;
    self.addBook = BookTrackerService.addBook;
    self.deleteBook = BookTrackerService.deleteBook;

}]);