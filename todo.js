angular.module('taskpapp',['firebase','ngTagsInput','ui.bootstrap']);

function TodoCtrl($scope, $firebase,$firebaseSimpleLogin){

  todos = $firebase(new Firebase('https://taskk-angular-rahman.firebaseio.com/'));

  todos.$bind($scope, 'todos').then(function() {
    $scope.show = $scope.getAll();
  });
   $scope.getPercentage = function() {
          var total = $scope.getAll().length;
          var done = $scope.getCompleted().length;
          return done / total * 100;
        };
  $scope.status = 'all';
  $scope.shouldShow= function(todo) {
   
    if($scope.status == 'all') {return true;}
    if($scope.status == 'completed') {return todo.done;}
    if($scope.status == 'pending') {return !todo.done;}
  }

  $scope.addTodo=function(){



    var newTodo={
      done: false,
      priority: 'Left',
      text: $scope.todoText,
      duedate:'',


    };

      
    todos.$add(newTodo);
    $scope.todoText='';
  };
  //remove todo function
  $scope.removeTodo=function(key){
    todos.$remove($scope.ids[key]);

  };


 

  $scope.getAll = function() {
    var all = [];

  $scope.ids=[];
    for(t in todos) {
      if(typeof todos[t] != 'function' && t !== '$id') {$scope.ids.push(t); all.push(todos[t]);}
    }
    return all;
  }

  $scope.getAllUsers = function() {
    var all = [];

    for(t in $scope.users) {
      if(typeof $scope.users[t] != 'function' && t !== '$id') {all.push($scope.users[t]);}
    }
    return all;
  }

  $scope.getCompleted = function() {
    return $scope.getAll().filter(function(t) { return t.done; });
  };

  $scope.getPending = function() {
    return $scope.getAll().filter(function(t) { return !t.done; });
  };

  //move a todo funtion
  $scope.move=function(todo,direction){ };
  $scope.isCollapsed = true;
  $scope.isaCollapsed = true;

  $scope.search = {scope: 'all'};

/////date picker

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.showWeeks = true;
  $scope.toggleWeeks = function () {
    $scope.showWeeks = ! $scope.showWeeks;
  };

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = ( $scope.minDate ) ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];


  ///////////lllllllllllllllllll



  var userRef = new Firebase("https://taskk-angular-rahman.firebaseio.com/users/");
  $scope.users = $firebase(userRef);
  $scope.loginObj = $firebaseSimpleLogin(userRef);
  $scope.login = function() {
    $scope.loginObj.$login('google').then(function(user) {
      $scope.users.$add({name: user.displayName, uid: user.uid, email: user.email});
    })
  }
}


var ModalDemoCtrl = function ($scope, $modal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};


