angular.module('app.controllers', ['ngCordova'])

.controller('loginCtrl', function ($scope, $state, $rootScope, $http) {
  $rootScope.url = 'https://calm-castle-40631.herokuapp.com/api/';
  $scope.signIn = function (email) {
    $http({
    	method: 'POST',
    	url: $rootScope.url + 'parents/login/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: { email: email }
    }).then (function successCallback (response) {
        if (!response.data.message) {
          $rootScope.parent = response.data;
          $state.go('listkid');
        }
        else {
          alert (response.data.message);
        }
    }), function errorCallback (response) {
        alert("Error");
    };
  }

  $scope.signUp = function () {
    $state.go('signup');
  }

})

.controller('signupCtrl', function ($scope, $state, $ionicHistory, $rootScope, $http) {
  $scope.goBack = function () {
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    
    $state.go('login');
  }

  $scope.signUp = function (email, name) {
  
  $http({
	method: 'POST',
	url: $rootScope.url + 'parents' ,
  headers: {
          'Content-Type': 'application/json'
        },
  data: { 
          email: email,
          name: name
        }
    })
    .then (function successCallback (response) {
      alert(response.data.message);
      $state.go('login');
    }).then (function errorCallback (response){

    });
  }

})

.controller('listKidCtrl', function ($scope, $state, $ionicHistory, $rootScope, $http) {
  $scope.addKid = function () {
    $state.go('addkid');
  }
  $scope.listKidByParent = function () {
    $http({
      method: 'GET',
      url: $rootScope.url + 'parents/kids/' + $rootScope.parent._id
    }).then (function successCallback (response) {
      $scope.kids = response.data;
    }), function errorCallback (response) {
      alert("Error");
    };
  }
  $scope.listKidByParent();
  $scope.showKid = function (kidId) {
    $rootScope.kid = kidId;
    $state.go('home');
  }


  $scope.logout = function (kidId) {
    delete $rootScope;
    $state.go('login');
  }
})

.controller('addKidCtrl', function ($scope, $state, $ionicHistory, $rootScope, $http) {
  $scope.goBack = function () {
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    delete $rootScope.kid;
    $state.go('listkid');
  }
  $scope.addKid = function (kid) {
    $http({
        method: 'POST',
        url: $rootScope.url + 'parents/kids/' + $rootScope.parent._id,
        headers: {
          'Content-Type': 'application/json'
        },
        data: { 
          name: kid.name
        }
    }).then (function successCallback (response) {
      alert(response.data.message);
      $state.go('listkid');
    }), function errorCallback (response) {
        alert("Error");
    };
  }
})

.controller('homeCtrl', function ($scope, $state, $ionicHistory, $rootScope, $http) {
  $scope.goBack = function () {
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    delete $rootScope.kid;
    $state.go('listkid');
  }
  $scope.addTask = function (task) {
    $http({
        method: 'POST',
        url: $rootScope.url + 'parents/tasks/' + $rootScope.parent._id + '/' + $rootScope.kid,
        headers: {
          'Content-Type': 'application/json'
        },
        data: { 
          description: task.desc,
          time: task.time
        }
    }).then (function successCallback (response) {
      alert(response.data.message);
      $state.reload();
    }), function errorCallback (response) {
        alert("Error");
    };
  }

  $scope.logout = function (kidId) {
    delete $rootScope;
    $state.go('login');
  }
})

.controller('taskCtrl', function ($scope, $state, $ionicHistory, $rootScope, $http) {
  $scope.goBack = function () {
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    delete $rootScope.kid;
    $state.go('listkid');
  }
  $scope.listAllTaskByKid = function () {
    $http({
      method: 'GET',
      url: $rootScope.url + 'parents/tasks/' + $rootScope.parent._id + '/' + $rootScope.kid
    }).then (function successCallback (response) {
      $scope.tasks = response.data;
    }), function errorCallback (response) {
      alert("Error");
    };
  }
  $scope.listAllTaskByKid();

  $scope.approveTask = function (taskId) {
    $http({
        method: 'PUT',
        url: $rootScope.url + 'parents/tasks/approve/' + taskId,
        headers: {
          'Content-Type': 'application/json'
        }
    }).then (function successCallback (response) {
      alert(response.data.earningtime + "mins");
      $state.reload();
    }), function errorCallback (response) {
        alert("Error");
    };
  }

})

// .controller('registeredCtrl', function ($scope, $state, $ionicHistory, $rootScope, $http) {
//   $scope.goBack = function () {
//     $ionicHistory.nextViewOptions({
//     disableBack: true
//     });
//     $state.go('listkid');
//   }
//   $scope.listRegisteredTaskByKid = function () {
//     $http({
//       method: 'GET',
//       url: $rootScope.url + 'kids/tasks/registed/' + $rootScope.kid
//     }).then (function successCallback (response) {
//       $scope.registeredTasks = response.data;
//     }), function errorCallback (response) {
//       alert("Error");
//     };
//   }
//   $scope.listRegisteredTaskByKid();
// })

.controller('profileCtrl', function ($scope, $state, $ionicHistory, $rootScope, $http) {
  $scope.goBack = function () {
    $ionicHistory.nextViewOptions({
    disableBack: true
    });
    delete $rootScope.kid;
    $state.go('listkid');
  }
  $scope.getKidProfile = function () {
    $http({
      method: 'GET',
      url: $rootScope.url + 'parents/kids/' + $rootScope.parent._id + '/' + $rootScope.kid
    }).then (function successCallback (response) {
      $scope.kid = response.data;
    }), function errorCallback (response) {
      alert("Error");
    };
  }
  $scope.getKidProfile();
  $scope.deleteKid = function () {
    $http({
      method: 'DELETE',
      url: $rootScope.url + 'parents/kids/' + $rootScope.parent._id + '/' + $rootScope.kid
    }).then (function successCallback (response) {
      alert("Delete successfully");
      delete $rootScope.kid;
      $state.go("listkid");
    }), function errorCallback (response) {
      alert("Error");
    };

  }
})
