angular.module('portainer.app')
  .controller('RegistryImagesController', ['$q', '$transition$', '$scope', '$state', 'RegistryService', 'LocalRegistryService', 'ModalService', 'Notifications',
    function ($q, $transition$, $scope, $state, RegistryService, LocalRegistryService, ModalService, Notifications) {

      $scope.state = {
        actionInProgress: false
      };
      $scope.images = [];
      $scope.registry = {};

      function initView() {
        var registryID = $transition$.params().id;
        $q.all({
          registry: RegistryService.registry(registryID),
          images: LocalRegistryService.images()
        }).then(function success(data) {
          $scope.registry = data.registry;
          $scope.images = data.images;
        }).catch(function error(err) {
          Notifications.error('Failure', err, 'Unable to retrieve registry details');
        });
      }
      initView();
    }
  ]);