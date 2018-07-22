app.service('BookTrackerService', ['$http', function($http){
    console.log('Book Tracker Service is running');
    const self = this;

    self.books = { list: [] };
    self.categories = { list: [] };
    self.searchResults = { list: [] };

    this.getBooks = function(){
        $http.get('/book').then(function(res){
            self.books.list = res.data;
        }).catch(function(err){
            console.log('error during books GET', err);
        })
    }

    this.addBook = function(book){
        console.log('adding book', book);
        $http.post('/book', book).then(function(res){
            self.getBooks();
            // you need to call getCat here so that the totals are updated once you switch to cat view
            self.getCategories();
        }).catch(function(err){
            console.log('error during books POST', err);
        })
    }

    this.deleteBook = function(bookID){
        console.log('deleting book', bookID);
        $http.delete(`/book/${bookID}`).then(function(res){
            self.getBooks();
        }).catch(function(err){
            console.log('error during books DELETE', err);
        })
    }

    this.editBook = function(book){
        console.log('editing book', book);
        $http.put(`/book/${book.id}/edit`, book).then(function(res){
            console.log(res);
            self.getBooks();
        }).catch(function(err){
            console.log('error during books PUT', err);
        })
    }

    this.getCategories = function(){
        $http.get('/category').then(function(res){
            self.categories.list = res.data;
        })
        .catch(function(err){
            console.log('error during categories GET', err);
        })
    }

    this.addCategory = function(category){
        $http.post('/category', {data: category}).then(function(res){
            self.getCategories();
        })
        .catch(function(err){
            console.log('error during category POST', err);
        })
    }

    this.deleteCategory = function(category){
        if (category.count > 0){
            alert('Categories with books in them cannot be removed!');
            return;
        }
        $http.delete(`/category/${category.id}`).then(function(res){
            self.getCategories();
        })
        .catch(function(err){
            console.log('error during category DELETE', err);
        })
    }

    this.searchBooks = function(searchTerm){
        $http.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
        .then(function(res){
            self.searchResults.list = res.data.items;
        })
        .catch(function(err){
            console.log('error during books API request', err);
        })
    }

    this.markRead = function(bookID, toggle){
        $http.put(`/book/${bookID}/${toggle}`)
        .then(function(res){
            self.getBooks();
        })
        .catch(function(err){
            console.log('error during complete PUT', err);
        })
    }
    // Initialize the storage arrays with all books and all categories when the app is loaded
    this.getBooks();
    this.getCategories();
}])