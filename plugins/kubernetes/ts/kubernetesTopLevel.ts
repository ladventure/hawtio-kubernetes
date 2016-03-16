/// <reference path="../../includes.ts"/>
/// <reference path="kubernetesHelpers.ts"/>
/// <reference path="kubernetesPlugin.ts"/>
/// <reference path="kubernetesModel.ts"/>

declare var jsyaml:any;

module Kubernetes {

  export var FileDropController = controller("FileDropController", ["$scope", "KubernetesModel", "FileUploader", '$http', ($scope, model:KubernetesModelService, FileUploader, $http:ng.IHttpService) => {

      var log = Logger.get('kubernetes-file-uploader');

      var uploader = $scope.uploader = <FileUpload.FileUploader> new FileUploader(<FileUpload.IOptions>{
        autoUpload: false,
        removeAfterUpload: true,
        url: kubernetesApiUrl()
      });

      $scope.uploader.onAfterAddingFile = (file) => {
        var reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            log.debug("File added: ", file);        
            var data = reader.result;
            var obj = null;
            if (_.endsWith(file._file.name, '.json')) {
              log.debug("Parsing JSON file");
              try {
                obj = angular.fromJson(data);
              } catch (err) {
                log.debug("Failed to read dropped file ", file._file.name, ": ", err);
                return;
              }
            } else if (_.endsWith(file._file.name, '.yaml')) {
              log.debug("Parsing YAML file");
              try {
                obj = jsyaml.load(data);
              } catch (err) {
                log.debug("Failed to read dropped file ", file._file.name, ": ", err);
                return;
              }
            } else {
              log.debug("Unknown file type for file: ", file._file.name);
              return;
            }
            log.debug("Dropped object: ", obj);
            if (!KubernetesAPI.getNamespace(obj)) {
              obj.metadata.namespace = model.currentNamespace();
            }
            KubernetesAPI.put({
              object: obj,
              success: (data) => {
                Core.notification("success", "Applied " + file._file.name);
              },
              error: (err) => {
                log.info("Got error applying", file._file.name, ": ", err);
                Core.notification("warning", "Failed to apply " + file._file.name + ", error: " + err.message);
              }
            });
          }
        }
        reader.readAsText(file._file);
      };

      $scope.uploader.onBeforeUploadItem = (item) => {
        log.debug("Uploading: ", item);
        //Core.notification('info', 'Uploading ' + item);
      };

      $scope.uploader.onSuccessItem = (item:FileUpload.IFileItem) => {
        log.debug("onSuccessItem: ", item);
      };

      $scope.uploader.onErrorItem = (item, response, status) => {
        log.debug("Failed to apply, response: ", response, " status: ", status);
      }

  }]);
	
	export var NamespaceController = controller('NamespaceController', ['$scope', 'WatcherService', ($scope, watcher:WatcherService) => {
		$scope.namespaces = watcher.getObjects('namespaces');
		$scope.$watchCollection('namespaces', (newValue, oldValue) => {
			if (newValue !== oldValue) {
				$scope.namespace = watcher.getNamespace();
			}
		});
		$scope.$watch('namespace', (newValue, oldValue) => {
			if (newValue !== oldValue) {
				if (newValue !== oldValue) {
					watcher.setNamespace(newValue);
				}
			}
		});
	}]);

  export var TopLevel = controller("TopLevel", ["$scope", "KubernetesVersion", "KubernetesState", ($scope, KubernetesVersion:ng.resource.IResourceClass<any>, KubernetesState) => {

    $scope.version = undefined;

    $scope.showAppView = isAppView();

    $scope.isActive = (href) => {
      return isLinkActive(href);
    };

    $scope.kubernetes = KubernetesState;

    KubernetesVersion.query((response) => {
      $scope.version = response;
    });

  }]);

}
