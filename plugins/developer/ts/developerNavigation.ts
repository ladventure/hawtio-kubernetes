/// <reference path="../../includes.ts"/>
module Developer {

/*
  function homeBreadcrumb() {
    return {
      href: "/home",
      label: "Home",
      title: "Go to the home page"
    }
  }
*/
  function developBreadcrumb() {
    return {
      href: UrlHelpers.join(HawtioCore.documentBase(), "/workspaces"),
      label: "Develop",
      title: "View all the apps for a project"
    };
  }
  function operateBreadcrumb() {
    return {
      href: UrlHelpers.join(HawtioCore.documentBase(), "/namespaces"),
      label: "Manage",
      title: "Manage the projects and resources inside them"
    };
  }

  export function workspaceLink() {
    return UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", Kubernetes.currentKubernetesNamespace());
  }

  export function projectLink(projectId) {
    var link = workspaceLink();
    if (projectId) {
      return UrlHelpers.join(link, "/projects", projectId);
    } else {
      return link;
    }
  }

  export function createWorkspacesBreadcrumbs(developPerspective) {
/*
    if (developPerspective) {
      return [
        //homeBreadcrumb(),
        developBreadcrumb()
      ];
    } else {
      return [
        //homeBreadcrumb(),
        operateBreadcrumb()
      ];
    }
*/
    return [];
  }


  export function createWorkspacesSubNavBars(developPerspective) {
      return activateCurrent([
        developBreadcrumb(),
        operateBreadcrumb()
      ]);
  }

  export function createWorkspaceBreadcrumbs(children = null, workspaceName = null) {
    var answer = [
      //homeBreadcrumb(),
      developBreadcrumb()
    ];
    if (!workspaceName) {
      workspaceName = Kubernetes.currentKubernetesNamespace();
    }
    if (workspaceName) {
      answer.push(
        {
          href: UrlHelpers.join(HawtioCore.documentBase(), "/workspaces/", workspaceName),
          label: workspaceName,
          title: "View the project: " + workspaceName
        }
      );
      return processChildren(answer, children);
    }
    return answer;
  }


  export function createEnvironmentBreadcrumbs($scope, $location, $routeParams) {
    var ns = Kubernetes.currentKubernetesNamespace();
    var namespacesLink = UrlHelpers.join(HawtioCore.documentBase(), "/kubernetes/namespace");
    var workspaceName = $routeParams.workspace;
    var project = $routeParams.project;
    if (workspaceName && project) {
      var projectLink = UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "projects", project);
      $scope.$projectLink = projectLink;
      $scope.$projectNamespaceLink = UrlHelpers.join(projectLink, "namespace", ns);
      namespacesLink = UrlHelpers.join(projectLink, "namespace");
      // TODO use the logical name?
      var envName = ns;
      var buildConfig = null;
      if ($scope.model) {
        buildConfig = $scope.model.getProject(project, workspaceName);
        if (buildConfig) {
          // lets find the label for the namespace
          var env = _.find(buildConfig.environments, { namespace: ns});
          if (env) {
            envName = env['label'] || envName;
          }
          log.info("env found: " + env + " for nameppace " + ns + " on buildConfig: " + buildConfig);
        }
      }
      var children = [
          {
            href: UrlHelpers.join(projectLink, "environments"),
            label: "Environments",
            title: "View the environments for this project"
          },
          {
            href: UrlHelpers.join(namespacesLink, ns, "apps"),
            label: envName,
            title: "View the runtime of the workspace: " + ns
          }
          ];
      return createProjectBreadcrumbs(project, children, workspaceName);
    } else {
      if (!workspaceName) {
        workspaceName = Kubernetes.currentKubernetesNamespace();
      }
      return activateCurrent([
        //homeBreadcrumb(),
        operateBreadcrumb(),
        {
          href: UrlHelpers.join(namespacesLink, ns, "apps"),
          label: workspaceName,
          title: "View the runtime of the workspace: " + ns
        }
      ]);
    }
  }

  export function createProjectBreadcrumbs(projectName = null, children = null, workspaceName = null) {
    if (!workspaceName) {
      workspaceName = Kubernetes.currentKubernetesNamespace();
    }
    var answer = createWorkspaceBreadcrumbs(null, workspaceName);
    if (workspaceName) {
      if (projectName) {
        answer.push(
          {
            href: UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "projects"),
            label: "Apps",
            title: "View all the apps in this project"
          }
        );

        answer.push(
          {
            href: UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "projects", projectName),
            label: projectName,
            title: "View the project: " + projectName
          }
        );
      }
      return processChildren(answer, children);
    }
    return answer;
  }


  export function createProjectSettingsBreadcrumbs(projectName, workspaceName = null) {
    var children = [{
      label: "Settings",
      title: "View the settings of this app"
    }];
    if (!projectName) {
      var children = [{
        label: "New App",
        title: "Lets make a new app"
      }];
    }
    return createProjectBreadcrumbs(projectName, children, workspaceName);
  }

  export function createWorkspaceSubNavBars() {
    var workspaceName = Kubernetes.currentKubernetesNamespace();
    return activateCurrent([
      {
        href: UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName),
        label: "Apps",
        class: "fa fa-rocket",
        title: "View the apps in this project"
      },
      {
        isValid: () => jenkinsLink(),
        href: UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "jenkinsJob"),
        label: "Builds",
        class: "fa fa-code",
        title: "View the builds in this project"
      },
      {
        href: UrlHelpers.join(HawtioCore.documentBase(), "/kubernetes/namespace", workspaceName, "apps"),
        label: "Runtime",
        class: "fa fa-gears",
        title: "View the runtime resources in this project"
      },
      {
        href: UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "detail"),
        label: "Details",
        class: "fa fa-gear",
        title: "View the project details"
      }
    ]);
  }

  function createBuildsLink(workspaceName, projectName, jenkinsJobId) {
    workspaceName = workspaceName || Kubernetes.currentKubernetesNamespace();
    return UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "projects", projectName, "jenkinsJob", jenkinsJobId);
  }

  export function createProjectSubNavBars(projectName, jenkinsJobId = null, $scope = null) {
    var workspaceName = Kubernetes.currentKubernetesNamespace();
    var projectLink = UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "projects", projectName);
    var buildsLink = UrlHelpers.join(projectLink, "builds");
    if (!jenkinsJobId) {
      jenkinsJobId = projectName;
    }
    var jenkinsBuildLink = null;
    var pipelinesLink = null;
    if (projectName && jenkinsJobId) {
      jenkinsBuildLink = createBuildsLink(workspaceName, projectName, jenkinsJobId);
      pipelinesLink = UrlHelpers.join(jenkinsBuildLink, "pipelines");
    }

    function isJenkinsBuild() {
      var answer = jenkinsLink() && jenkinsBuildLink;
      if (answer && $scope) {
        var entity = Developer.projectForScope($scope);
        if (entity) {
          return answer && entity.$jenkinsJob;
        }
      }
      return answer;
    }

    var answer = [
      {
        href: UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName),
        label: "All Apps",
        class: 'fa fa-angle-double-left',
        title: "View the apps in this project"
      },
      {
        template: `<div ng-include="'plugins/developer/html/projectSelector.html'"></div>`
      },
      {
        href: UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "projects", projectName, "environments"),
        isActive: (subTab, path) => {
          //console.log("subTab: ", subTab, " path: ", path);
          if (path === subTab.href) {
            return true;
          }
          var rootPath = subTab.href.replace(/\/environments/, '');
          if (path === rootPath) {
            return true;
          }
          return false;
        },
        //href: UrlHelpers.join("/workspaces", workspaceName, "projects", projectName),
        label: "Dashboard",
        class: "fa fa-tachometer",
        title: "View the app dashboard for the activity, environments and pipelines"
      },
      {
        isValid: () => isJenkinsBuild() && pipelinesLink,
        id: "pipelines",
        href: pipelinesLink,
        label: "Pipelines",
        class: "fa fa-ellipsis-h",
        title: "View the pipeline builds for this app"
      },
      {
        isValid: () => !isJenkinsBuild(),
        href: buildsLink,
        label: "Builds",
        class: "fa fa-bars",
        title: "View the builds for this app"
      },
      {
        isValid: () => isJenkinsBuild(),
        id: "builds",
        href: jenkinsBuildLink,
        label: "Builds",
        class: "fa fa-bars",
        title: "View the Jenkins builds for this app"
      },
      {
        isValid: () => isJenkinsBuild(),
        href: UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "projects", projectName, "jenkinsJob", jenkinsJobId, "metrics"),
        label: "Metrics",
        class: "fa fa-bar-chart",
        title: "View the metrics for this project"
      },
/*
      {
        href: UrlHelpers.join("/workspaces", workspaceName, "projects", projectName, "tools"),
        label: "Tools",
        title: "View the tools for this project"
      },
*/
      {
        href: UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "projects", projectName, "buildConfigEdit"),
        label: "Settings",
        class: "fa fa-cog",
        title: "View the app configuration",
        isActive: (subTab, path) => {
          if (_.endsWith(path, '/buildConfigEdit')) {
            return true;
          }
          if (_.endsWith(path, '/forge/secrets')) {
            return true;
          }
          if (_.endsWith(path, '/forge/command/devops-edit')) {
            return true;
          }
          return false;
        }
      }
    ];

    var context = {
      workspaceName: workspaceName,
      projectName: projectName,
      projectLink: projectLink,
      jenkinsJobId: jenkinsJobId,
      $scope: $scope
    };
    angular.forEach(customProjectSubTabFactories, (fn) => {
      if (angular.isFunction(fn)) {
        var subtab = fn(context);
        if (subtab) {
          if (angular.isArray(subtab)) {
            angular.forEach(subtab, (t) => {
              answer.push(t);
            });
          } else {
            answer.push(subtab);
          }
        }
      }
    });

    return activateCurrent(answer);
  }

  export function createProjectSettingsSubNavBars(projectName, jenkinsJobId = null) {
    if (!projectName) {
      return [];
    }
    var workspaceName = Kubernetes.currentKubernetesNamespace();
    var projectLink = UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "projects", projectName);
    if (!jenkinsJobId) {
      jenkinsJobId = projectName;
    }
    var answer = [
      {
        href: UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "projects", projectName, "buildConfigEdit"),
        label: "Core",
        title: "View the core build configuration"
      },
      {
        href: projectSecretsLink(workspaceName, projectName),
        label: "Secrets",
        title: "View or change the secrets used to edit source code in the source control system"
      },
      {
        href: editPipelineLink(workspaceName, projectName),
        label: "Pipeline",
        title: "View the DevOps and pipeline configuration"
      },
      {
        isValid: () => forgeProjectHasBuilder("maven"),
        href: editMavenBuildLink(workspaceName, projectName),
        label: "Maven",
        title: "View the Maven build configuration"
      }
    ];
    return activateCurrent(answer);
  }

  export function forgeProjectHasBuilder(name) {
    var forgeProject = Kubernetes.inject<any>("ForgeProject");
    if (forgeProject) {
      return forgeProject.hasBuilder(name);
    }
    return false;
  }

  export function forgeProjectHasPerspective(name) {
    var forgeProject = Kubernetes.inject<any>("ForgeProject");
    if (forgeProject) {
      return forgeProject.hasPerspective(name);
    }
    return false;
  }

  export function editPipelineLinkScope($scope) {
    return editPipelineLink($scope.namespace, $scope.projectId || $scope.projectName || $scope.project);
  }

  export function createProjectLink(workspaceName = null) {
    if (!workspaceName) {
      workspaceName = Kubernetes.currentKubernetesNamespace();
    }
    return UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "/forge/createProject");
  }

  export function editPipelineLink(workspaceName, projectName) {
    return projectWorkspaceLink(workspaceName, projectName, "forge/command/devops-edit");
  }

  export function editMavenBuildLink(workspaceName, projectName) {
    return projectWorkspaceLink(workspaceName, projectName, "forge/command/fabric8-setup");
  }

  export function projectSecretsLink(workspaceName, projectName) {
    return projectWorkspaceLink(workspaceName, projectName, "forge/secrets", false);
  }

  export function secretsNamespaceLink(workspaceName, projectName, secretsNamespace) {
    var prefix = projectWorkspaceLink(workspaceName, projectName, "") || "kubernetes";
    return UrlHelpers.join(prefix, "namespace", secretsNamespace, "secrets");
  }

  export function projectWorkspaceLink(workspaceName, projectName, path, ignoreBlankProject = true) {
    if (ignoreBlankProject && !projectName) {
      return "";
    }
    if (!workspaceName) {
      workspaceName = Kubernetes.currentKubernetesNamespace();
    }
    return UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "projects", projectName, path);
  }

  export var customProjectSubTabFactories = [];

  export function createJenkinsBreadcrumbs(projectName, jobId, buildId) {
    var workspaceName = Kubernetes.currentKubernetesNamespace();
    var children = [
      {
        id: "builds",
        href: createBuildsLink(workspaceName, projectName, jobId),
        label: "Builds",
        title: "View the builds for this app"
      }
    ];
    if (buildId) {
      children.push({
        id: "",
        href: "",
        label: "#" + buildId,
        title: "Build #" + buildId
      });
    }
    return createProjectBreadcrumbs(projectName, children);
  }

  export function createJenkinsSubNavBars(projectName, jenkinsJobId, buildId, extraOption: any = null) {
    var answer = createProjectSubNavBars(projectName, jenkinsJobId);
    if (extraOption) {
      extraOption.active = true;
      answer.push(extraOption);
    }
    return answer;
  }


  export function createEnvironmentSubNavBars($scope, $location, $routeParams) {
    var ns = Kubernetes.currentKubernetesNamespace();
    var workspaceName = $routeParams.workspace;
    var project = $routeParams.project;
    var projectLink = UrlHelpers.join(HawtioCore.documentBase(), "/kubernetes");
    if (workspaceName && project) {
      projectLink = UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "projects", project);
    }
    var namespacesLink = UrlHelpers.join(projectLink, "namespace");
    return activateCurrent([
      {
        href: UrlHelpers.join(projectLink, "environments"),
        label: "<< Back To App",
        title: "Go back to the Dashboard for this App",
        isValid: () => project
      },
      {
        href: UrlHelpers.join(namespacesLink, ns, "apps"),
        label: "Overview",
        class: "fa fa-list",
        title: "Overview of all the apps for this project"
      },
      {
        href: UrlHelpers.join(namespacesLink, ns, "services"),
        label: "Services",
        class: "fa fa-plug",
        title: "View the apps for this project"
      },
      {
        href: UrlHelpers.join(namespacesLink, ns, "replicationControllers"),
        label: "Controllers",
        class: "fa fa-clone",
        title: "View the Replication Controllers for this project"
      },
      {
        href: UrlHelpers.join(namespacesLink, ns, "pods"),
        label: "Pods",
        class: "fa fa-puzzle-piece",
        title: "View the pods for this project"
      },
      {
        href: UrlHelpers.join(namespacesLink, ns, "events"),
        label: "Events",
        class: "fa fa-newspaper-o",
        title: "View the events for this project"
      },
      {
        href: UrlHelpers.join(namespacesLink, ns, "secrets"),
        label: "Secrets",
        class: "fa fa-key",
        title: "View the secrets for this project"
      },
      {
        href: UrlHelpers.join(HawtioCore.documentBase(), "/kubernetes/hosts"),
        label: "Nodes",
        class: "fa fa-server",
        title: "View the nodes for this project"
      },
      {
        href: UrlHelpers.join(namespacesLink, ns, "overview"),
        label: "Diagram",
        class: "fa fa-sitemap",
        title: "View all the objects in this project and their relationship"
      },
      {
        href: UrlHelpers.join(namespacesLink, ns, "angryPods"),
        label: "Angry Pods",
        class: "fa fa-gamepad",
        title: "Try the Angry Pods game!"
      },
    ]);
  }


  export function namespaceLink($scope, $routeParams, path = null) {
    var ns = Kubernetes.currentKubernetesNamespace();
    var workspaceName = $routeParams.workspace;
    var project = $routeParams.project;
    var projectLink = UrlHelpers.join(HawtioCore.documentBase(), "/kubernetes");
    if (workspaceName && project) {
      projectLink = UrlHelpers.join(HawtioCore.documentBase(), "/workspaces", workspaceName, "projects", project);
    }
    return UrlHelpers.join(projectLink, "namespace", ns, path);
  }

  /**
   * Removes the URL query string if its inside the given text
   */
  function trimQuery(text) {
    if (text) {
      var idx = text.indexOf("?");
      if (idx >= 0) {
        return text.substring(0, idx);
      }
    }
    return text;
  }

  function activateCurrent(navBarItems) {
    navBarItems = _.compact(navBarItems);
    var injector = HawtioCore.injector;
    var $location = injector ? injector.get<ng.ILocationService>("$location") : null;
    if ($location) {
      var path = trimQuery($location.path());
      var found = false;
      function makeActive(item) {
        item.active = true;
        found = true;
      }
      angular.forEach(navBarItems, (item) => {
        if (item) {
          if (angular.isFunction(item.isActive)) {
            if (!found && item.isActive(item, path)) {
              makeActive(item);
            }
          } else {
            var href = item.href;
            var trimHref = trimQuery(href);
            if (!found && trimHref && trimHref === path) {
              makeActive(item);
            }
          }
        }
      });
    }
    return navBarItems;
  }

  function processChildren(answer, children) {
    if (children) {
      if (angular.isArray(children)) {
        answer = answer.concat(children);
      } else {
        answer.push(children);
      }
    }
    activateCurrent(answer);
    return answer;
  }
}
