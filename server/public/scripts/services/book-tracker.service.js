app.service('BookTrackerService', ['$http', function($http){
    console.log('Book Tracker Service is running');
    const self = this;

    let books = {
        list: [];
    }

    this.getBooks = function(){
        $http.get('/book').then(function(res){
            console.log(res.data);
            books.list = res.data;
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
}])