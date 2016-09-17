angular.module('starter.services', [])

  .factory('Config', [
    '$log',
    '$q',
    '$cordovaPreferences',
    function($log, $q, $cordovaPreferences) {
      var methods;

      methods = {
        store: function store(key, value) {
          var defer = $q.defer();
          $cordovaPreferences.store(key, value)
            .success(function(value) {
              $log.debug("store success: ", value);
              defer.resolve(value);
            })
            .error(function(error) {
              $log.debug("store error: ", error);
              defer.reject(error);
            });
          return defer.promise;
        },
        fetch: function fetch(key) {

        },
        show: function show() {
          var defer = $q.defer();
          $cordovaPreferences.show()
            .success(function(value) {
              $log.debug("show success: ", value);
              defer.resolve(value);
            })
            .error(function(error) {
              $log.debug("show error: ", error);
              defer.reject(error);
            });
          return defer.promise;
        }
      };

      return methods;
    }])

  .factory('Chats', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
      id: 0,
      name: 'Ben Sparrow',
      lastText: 'You on your way?',
      face: 'img/ben.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      lastText: 'Hey, it\'s me',
      face: 'img/max.png'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      lastText: 'I should buy a boat',
      face: 'img/adam.jpg'
    }, {
      id: 3,
      name: 'Perry Governor',
      lastText: 'Look at my mukluks!',
      face: 'img/perry.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      lastText: 'This is wicked good ice cream.',
      face: 'img/mike.png'
    }];

    return {
      all: function() {
        return chats;
      },
      remove: function(chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function(chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      }
    };
  });
