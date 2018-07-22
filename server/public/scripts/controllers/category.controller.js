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

    self.confirmDelete = function(category){
        if (category.count > 0){
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Error')
                    .textContent('You can\'t delete a category with books in it.')
                    .ariaLabel('Delete Category Alert')
                    .ok('OK')
            )
        } else {
            const confirm = $mdDialog.confirm()
                .title('Are you sure you want to delete this category?')
                .ariaLabel('Delete category confirmation')
                .cancel('Cancel')
                .ok('Delete');

                $mdDialog.show(confirm).then(function(){
                    console.log('delete case');
                    BookTrackerService.deleteCategory(category);
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(category.category + ' has been deleted.')
                        .position('top right')
                        .hideDelay(3000)
                    );
                }, function(){
                    console.log('cancel case');
                })
            }
    }

    BookTrackerService.getCategories();
    BookTrackerService.getBooks();
}]);