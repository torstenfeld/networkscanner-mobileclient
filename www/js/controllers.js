angular.module('starter.controllers', [])

  .controller('DashCtrl', function($scope) {})

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

  .controller('BarcodeconfigCtrl', [
    '$scope',
    '$cordovaBarcodeScanner',
    '$cordovaDialogs',
    '$cordovaPreferences',
    'Myraven',
    'Config',
    '$log',
    function($scope, $cordovaBarcodeScanner, $cordovaDialogs, $cordovaPreferences, Myraven, Config, $log) {
      $scope.scan = function scan() {
        $cordovaBarcodeScanner
          .scan()
          .then(function(barcodeData) {
            // Success! Barcode data is here
            $log.debug(barcodeData);
            //Config.store('barcodedata', barcodeData);
            $cordovaDialogs.alert('Success', 'scan: ' + barcodeData.toString(), 'OK')
              .then(function() {
                Raven.setExtraContext(barcodeData);
                Myraven.info('scan success');
                Raven.clearContext();
                $cordovaPreferences.store('barcodedata', 1231412)
                //$cordovaPreferences.store('barcodedata', barcodeData.text)
                  .success(function(value) {
                    $log.debug("store success: ", value);
                    $cordovaDialogs.alert('Success', 'store: ' + value.toString(), 'OK');
                    Myraven.info('store success: ' + value.toString());
                  })
                  .error(function(error) {
                    $log.debug("store error: ", error);
                    Myraven.info('store error: ' + error.toString());
                    $cordovaDialogs.alert('Error', 'store: ' + error.toString(), 'OK');
                  });
              });
          }, function(error) {
            // An error occurred
            $cordovaDialogs.alert('Error', 'scan: ' + error.toString(), 'OK');
            $log.error(error);
          });
      };

      $scope.test = function test() {
        Myraven.info('test');
      };

      $scope.showPref = function showPref() {
        $cordovaPreferences.show()
          .success(function(value) {
            $cordovaDialogs.alert("Success: " + value);
          })
          .error(function(error) {
            $cordovaDialogs.alert("Error: " + error);
          })
      };
    }]);
