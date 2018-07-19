app.service('BookTrackerService', ['$http', function($http){
    console.log('Book Tracker Service is running');
    const self = this;

    self.books = { list: [] };
    self.categories = { list: [] };

    this.getBooks = function(){
        $http.get('/book').then(function(res){
            console.log(res.data);
            self.books.list = res.data;
        }).catch(function(err){
            console.log('error during books GET', err);
        })
    }

    this.addBook = function(book){
        console.log('adding book', book);
        $http.post('/book', book).then(function(res){
            console.log(res);
            self.getBooks();
        }).catch(function(err){
            console.log('error during books POST', err);
        })
    }

    this.deleteBook = function(bookID){
        console.log('deleting book', bookID);
        $http.delete(`/book/${bookID}`).then(function(res){
            console.log(res);
            self.getBooks();
        }).catch(function(err){
            console.log('error during books DELETE', err);
        })
    }

    this.getCategories = function(){
        $http.get('/category').then(function(res){
            console.log(res.data);
            self.categories.list = res.data;
        })
        .catch(function(err){
            console.log('error during categories GET', err);
        })
    }

    this.addCategory = function(category){
        console.log('adding category', category);
        $http.post('/category', category).then(function(res){
            console.log(res);
            self.getCategories();
        })
        .catch(function(err){
            console.log('error during category POST', err);
        })
    }

    this.deleteCategory = function(category){
        console.log('deleting category', category);
        $http.delete(`/category/${category.id}`).then(function(res){
            console.log(res);
            self.getCategories();
        })
        .catch(function(err){
            console.log('error during category DELETE', err);
        })
    }
    // Initialize the storage arrays with all books and all categories when the app is loaded
    this.getBooks();
    this.getCategories();
}])