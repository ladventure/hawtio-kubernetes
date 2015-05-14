/// <reference path="../../includes.ts"/>

module Kubernetes {
 
  export var schema = {
    "id": "http://fabric8.io/fabric8/v2/Schema#",
    "$schema": "http://json-schema.org/schema#",
    "definitions": {
      "kubernetes_Capabilities": {
        "type": "object",
        "description": "",
        "properties": {
          "add": {
            "type": "array",
            "description": "added capabilities",
            "items": {
              "type": "string",
              "description": "added capabilities"
            }
          },
          "drop": {
            "type": "array",
            "description": "droped capabilities",
            "items": {
              "type": "string",
              "description": "droped capabilities"
            }
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.Capabilities"
      },
      "kubernetes_Container": {
        "type": "object",
        "description": "",
        "properties": {
          "args": {
            "type": "array",
            "description": "command array; the docker image's cmd is used if this is not provided; arguments to the entrypoint; cannot be updated",
            "items": {
              "type": "string",
              "description": "command array; the docker image's cmd is used if this is not provided; arguments to the entrypoint; cannot be updated"
            }
          },
          "capabilities": {
            "$ref": "#/definitions/kubernetes_Capabilities",
            "javaType": "io.fabric8.kubernetes.api.model.Capabilities"
          },
          "command": {
            "type": "array",
            "description": "entrypoint array; not executed within a shell; the docker image's entrypoint is used if this is not provided; cannot be updated",
            "items": {
              "type": "string",
              "description": "entrypoint array; not executed within a shell; the docker image's entrypoint is used if this is not provided; cannot be updated"
            }
          },
          "env": {
            "type": "array",
            "description": "list of environment variables to set in the container; cannot be updated",
            "items": {
              "$ref": "#/definitions/kubernetes_EnvVar",
              "javaType": "io.fabric8.kubernetes.api.model.EnvVar"
            }
          },
          "image": {
            "type": "string",
            "description": "Docker image name"
          },
          "imagePullPolicy": {
            "type": "string",
            "description": "image pull policy; one of PullAlways"
          },
          "lifecycle": {
            "$ref": "#/definitions/kubernetes_Lifecycle",
            "javaType": "io.fabric8.kubernetes.api.model.Lifecycle"
          },
          "livenessProbe": {
            "$ref": "#/definitions/kubernetes_Probe",
            "javaType": "io.fabric8.kubernetes.api.model.Probe"
          },
          "name": {
            "type": "string",
            "description": "name of the container; must be a DNS_LABEL and unique within the pod; cannot be updated",
            "maxLength": 63,
            "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
          },
          "ports": {
            "type": "array",
            "description": "list of ports to expose from the container; cannot be updated",
            "items": {
              "$ref": "#/definitions/kubernetes_ContainerPort",
              "javaType": "io.fabric8.kubernetes.api.model.ContainerPort"
            }
          },
          "privileged": {
            "type": "boolean",
            "description": "whether or not the container is granted privileged status; defaults to false; cannot be updated"
          },
          "readinessProbe": {
            "$ref": "#/definitions/kubernetes_Probe",
            "javaType": "io.fabric8.kubernetes.api.model.Probe"
          },
          "resources": {
            "$ref": "#/definitions/kubernetes_ResourceRequirements",
            "javaType": "io.fabric8.kubernetes.api.model.ResourceRequirements"
          },
          "terminationMessagePath": {
            "type": "string",
            "description": "path at which the file to which the container's termination message will be written is mounted into the container's filesystem; message written is intended to be brief final status"
          },
          "volumeMounts": {
            "type": "array",
            "description": "pod volumes to mount into the container's filesyste; cannot be updated",
            "items": {
              "$ref": "#/definitions/kubernetes_VolumeMount",
              "javaType": "io.fabric8.kubernetes.api.model.VolumeMount"
            }
          },
          "workingDir": {
            "type": "string",
            "description": "container's working directory; defaults to image's default; cannot be updated"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.Container"
      },
      "kubernetes_ContainerPort": {
        "type": "object",
        "description": "",
        "properties": {
          "containerPort": {
            "type": "integer",
            "description": "number of port to expose on the pod's IP address"
          },
          "hostIP": {
            "type": "string",
            "description": "host IP to bind the port to"
          },
          "hostPort": {
            "type": "integer",
            "description": "number of port to expose on the host; most containers do not need this"
          },
          "name": {
            "type": "string",
            "description": "name for the port that can be referred to by services; must be a DNS_LABEL and unique without the pod"
          },
          "protocol": {
            "type": "string",
            "description": "protocol for port; must be UDP or TCP; TCP if unspecified"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ContainerPort"
      },
      "kubernetes_ContainerState": {
        "type": "object",
        "description": "",
        "properties": {
          "running": {
            "$ref": "#/definitions/kubernetes_ContainerStateRunning",
            "javaType": "io.fabric8.kubernetes.api.model.ContainerStateRunning"
          },
          "termination": {
            "$ref": "#/definitions/kubernetes_ContainerStateTerminated",
            "javaType": "io.fabric8.kubernetes.api.model.ContainerStateTerminated"
          },
          "waiting": {
            "$ref": "#/definitions/kubernetes_ContainerStateWaiting",
            "javaType": "io.fabric8.kubernetes.api.model.ContainerStateWaiting"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ContainerState"
      },
      "kubernetes_ContainerStateRunning": {
        "type": "object",
        "description": "",
        "properties": {
          "startedAt": {
            "type": "string",
            "description": "time at which the container was last (re-)started"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ContainerStateRunning"
      },
      "kubernetes_ContainerStateTerminated": {
        "type": "object",
        "description": "",
        "properties": {
          "containerID": {
            "type": "string",
            "description": "container's ID in the format 'docker://<container_id>'"
          },
          "exitCode": {
            "type": "integer",
            "description": "exit status from the last termination of the container"
          },
          "finishedAt": {
            "type": "string",
            "description": "time at which the container last terminated"
          },
          "message": {
            "type": "string",
            "description": "message regarding the last termination of the container"
          },
          "reason": {
            "type": "string",
            "description": "(brief) reason from the last termination of the container"
          },
          "signal": {
            "type": "integer",
            "description": "signal from the last termination of the container"
          },
          "startedAt": {
            "type": "string",
            "description": "time at which previous execution of the container started"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ContainerStateTerminated"
      },
      "kubernetes_ContainerStateWaiting": {
        "type": "object",
        "description": "",
        "properties": {
          "reason": {
            "type": "string",
            "description": "(brief) reason the container is not yet running"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ContainerStateWaiting"
      },
      "kubernetes_ContainerStatus": {
        "type": "object",
        "description": "",
        "properties": {
          "containerID": {
            "type": "string",
            "description": "container's ID in the format 'docker://<container_id>'"
          },
          "image": {
            "type": "string",
            "description": "image of the container"
          },
          "imageID": {
            "type": "string",
            "description": "ID of the container's image"
          },
          "lastState": {
            "$ref": "#/definitions/kubernetes_ContainerState",
            "javaType": "io.fabric8.kubernetes.api.model.ContainerState"
          },
          "name": {
            "type": "string",
            "description": "name of the container; must be a DNS_LABEL and unique within the pod; cannot be updated",
            "maxLength": 63,
            "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
          },
          "ready": {
            "type": "boolean",
            "description": "specifies whether the container has passed its readiness probe"
          },
          "restartCount": {
            "type": "integer",
            "description": "the number of times the container has been restarted"
          },
          "state": {
            "$ref": "#/definitions/kubernetes_ContainerState",
            "javaType": "io.fabric8.kubernetes.api.model.ContainerState"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ContainerStatus"
      },
      "kubernetes_EmptyDirVolumeSource": {
        "type": "object",
        "description": "",
        "properties": {
          "medium": {
            "type": "string",
            "description": "type of storage used to back the volume; must be an empty string (default) or Memory"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.EmptyDirVolumeSource"
      },
      "kubernetes_EndpointAddress": {
        "type": "object",
        "description": "",
        "properties": {
          "IP": {
            "type": "string",
            "description": "IP address of the endpoint"
          },
          "targetRef": {
            "$ref": "#/definitions/kubernetes_ObjectReference",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectReference"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.EndpointAddress"
      },
      "kubernetes_EndpointPort": {
        "type": "object",
        "description": "",
        "properties": {
          "name": {
            "type": "string",
            "description": "name of this port",
            "maxLength": 63,
            "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
          },
          "port": {
            "type": "integer",
            "description": "port number of the endpoint"
          },
          "protocol": {
            "type": "string",
            "description": "protocol for this port; must be UDP or TCP; TCP if unspecified"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.EndpointPort"
      },
      "kubernetes_EndpointSubset": {
        "type": "object",
        "description": "",
        "properties": {
          "addresses": {
            "type": "array",
            "description": "IP addresses which offer the related ports",
            "items": {
              "$ref": "#/definitions/kubernetes_EndpointAddress",
              "javaType": "io.fabric8.kubernetes.api.model.EndpointAddress"
            }
          },
          "ports": {
            "type": "array",
            "description": "port numbers available on the related IP addresses",
            "items": {
              "$ref": "#/definitions/kubernetes_EndpointPort",
              "javaType": "io.fabric8.kubernetes.api.model.EndpointPort"
            }
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.EndpointSubset"
      },
      "kubernetes_Endpoints": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "Endpoints",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "subsets": {
            "type": "array",
            "description": "sets of addresses and ports that comprise a service",
            "items": {
              "$ref": "#/definitions/kubernetes_EndpointSubset",
              "javaType": "io.fabric8.kubernetes.api.model.EndpointSubset"
            }
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.Endpoints"
      },
      "kubernetes_EndpointsList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "list of endpoints",
            "items": {
              "$ref": "#/definitions/kubernetes_Endpoints",
              "javaType": "io.fabric8.kubernetes.api.model.Endpoints"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "EndpointsList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.EndpointsList"
      },
      "kubernetes_EnvVar": {
        "type": "object",
        "description": "",
        "properties": {
          "name": {
            "type": "string",
            "description": "name of the environment variable; must be a C_IDENTIFIER",
            "pattern": "^[A-Za-z_][A-Za-z0-9_]*$"
          },
          "value": {
            "type": "string",
            "description": "value of the environment variable; defaults to empty string"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.EnvVar"
      },
      "kubernetes_ExecAction": {
        "type": "object",
        "description": "",
        "properties": {
          "command": {
            "type": "array",
            "description": "command line to execute inside the container; working directory for the command is root ('/') in the container's file system; the command is exec'd",
            "items": {
              "type": "string",
              "description": "command line to execute inside the container; working directory for the command is root ('/') in the container's file system; the command is exec'd"
            }
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ExecAction"
      },
      "kubernetes_GCEPersistentDiskVolumeSource": {
        "type": "object",
        "description": "",
        "properties": {
          "fsType": {
            "type": "string",
            "description": "file system type to mount"
          },
          "partition": {
            "type": "integer",
            "description": "partition on the disk to mount (e.g."
          },
          "pdName": {
            "type": "string",
            "description": "unique name of the PD resource in GCE"
          },
          "readOnly": {
            "type": "boolean",
            "description": "read-only if true"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.GCEPersistentDiskVolumeSource"
      },
      "kubernetes_GitRepoVolumeSource": {
        "type": "object",
        "description": "",
        "properties": {
          "repository": {
            "type": "string",
            "description": "repository URL"
          },
          "revision": {
            "type": "string",
            "description": "commit hash for the specified revision"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.GitRepoVolumeSource"
      },
      "kubernetes_GlusterfsVolumeSource": {
        "type": "object",
        "description": "",
        "properties": {
          "endpoints": {
            "type": "string",
            "description": "gluster hosts endpoints name"
          },
          "path": {
            "type": "string",
            "description": "path to gluster volume"
          },
          "readOnly": {
            "type": "boolean",
            "description": "glusterfs volume to be mounted with read-only permissions"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.GlusterfsVolumeSource"
      },
      "kubernetes_HTTPGetAction": {
        "type": "object",
        "description": "",
        "properties": {
          "host": {
            "type": "string",
            "description": "hostname to connect to; defaults to pod IP"
          },
          "path": {
            "type": "string",
            "description": "path to access on the HTTP server"
          },
          "port": {
            "$ref": "#/definitions/kubernetes_util_IntOrString",
            "javaType": "io.fabric8.kubernetes.api.model.util.IntOrString"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.HTTPGetAction"
      },
      "kubernetes_Handler": {
        "type": "object",
        "description": "",
        "properties": {
          "exec": {
            "$ref": "#/definitions/kubernetes_ExecAction",
            "javaType": "io.fabric8.kubernetes.api.model.ExecAction"
          },
          "httpGet": {
            "$ref": "#/definitions/kubernetes_HTTPGetAction",
            "javaType": "io.fabric8.kubernetes.api.model.HTTPGetAction"
          },
          "tcpSocket": {
            "$ref": "#/definitions/kubernetes_TCPSocketAction",
            "javaType": "io.fabric8.kubernetes.api.model.TCPSocketAction"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.Handler"
      },
      "kubernetes_HostPathVolumeSource": {
        "type": "object",
        "description": "",
        "properties": {
          "path": {
            "type": "string",
            "description": "path of the directory on the host"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.HostPathVolumeSource"
      },
      "kubernetes_ISCSIVolumeSource": {
        "type": "object",
        "description": "",
        "properties": {
          "fsType": {
            "type": "string",
            "description": "file system type to mount"
          },
          "iqn": {
            "type": "string",
            "description": "iSCSI Qualified Name"
          },
          "lun": {
            "type": "integer",
            "description": "iscsi target lun number"
          },
          "readOnly": {
            "type": "boolean",
            "description": "read-only if true"
          },
          "targetPortal": {
            "type": "string",
            "description": "iSCSI target portal"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ISCSIVolumeSource"
      },
      "kubernetes_Lifecycle": {
        "type": "object",
        "description": "",
        "properties": {
          "postStart": {
            "$ref": "#/definitions/kubernetes_Handler",
            "javaType": "io.fabric8.kubernetes.api.model.Handler"
          },
          "preStop": {
            "$ref": "#/definitions/kubernetes_Handler",
            "javaType": "io.fabric8.kubernetes.api.model.Handler"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.Lifecycle"
      },
      "kubernetes_List": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "list of objects",
            "items": {
              "$ref": "#/definitions/kubernetes_runtime_RawExtension",
              "javaType": "Object"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "List",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.BaseKubernetesList"
      },
      "kubernetes_ListMeta": {
        "type": "object",
        "description": "",
        "properties": {
          "resourceVersion": {
            "type": "string",
            "description": "string that identifies the internal version of this object that can be used by clients to determine when objects have changed; populated by the system"
          },
          "selfLink": {
            "type": "string",
            "description": "URL for the object; populated by the system"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
      },
      "kubernetes_NFSVolumeSource": {
        "type": "object",
        "description": "",
        "properties": {
          "path": {
            "type": "string",
            "description": "the path that is exported by the NFS server"
          },
          "readOnly": {
            "type": "boolean",
            "description": "forces the NFS export to be mounted with read-only permissions"
          },
          "server": {
            "type": "string",
            "description": "the hostname or IP address of the NFS server"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.NFSVolumeSource"
      },
      "kubernetes_Node": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "Node",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "spec": {
            "$ref": "#/definitions/kubernetes_NodeSpec",
            "javaType": "io.fabric8.kubernetes.api.model.NodeSpec"
          },
          "status": {
            "$ref": "#/definitions/kubernetes_NodeStatus",
            "javaType": "io.fabric8.kubernetes.api.model.NodeStatus"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.Node"
      },
      "kubernetes_NodeAddress": {
        "type": "object",
        "description": "",
        "properties": {
          "address": {
            "type": "string",
            "description": ""
          },
          "type": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.NodeAddress"
      },
      "kubernetes_NodeCondition": {
        "type": "object",
        "description": "",
        "properties": {
          "lastHeartbeatTime": {
            "type": "string",
            "description": "last time we got an update on a given condition"
          },
          "lastTransitionTime": {
            "type": "string",
            "description": "last time the condition transit from one status to another"
          },
          "message": {
            "type": "string",
            "description": "human readable message indicating details about last transition"
          },
          "reason": {
            "type": "string",
            "description": "(brief) reason for the condition's last transition"
          },
          "status": {
            "type": "string",
            "description": "status of the condition"
          },
          "type": {
            "type": "string",
            "description": "type of node condition"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.NodeCondition"
      },
      "kubernetes_NodeList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "list of nodes",
            "items": {
              "$ref": "#/definitions/kubernetes_Node",
              "javaType": "io.fabric8.kubernetes.api.model.Node"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "NodeList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.NodeList"
      },
      "kubernetes_NodeSpec": {
        "type": "object",
        "description": "",
        "properties": {
          "externalID": {
            "type": "string",
            "description": "external ID assigned to the node by some machine database (e.g. a cloud provider). Defaults to node name when empty."
          },
          "podCIDR": {
            "type": "string",
            "description": "pod IP range assigned to the node"
          },
          "unschedulable": {
            "type": "boolean",
            "description": "disable pod scheduling on the node"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.NodeSpec"
      },
      "kubernetes_NodeStatus": {
        "type": "object",
        "description": "",
        "properties": {
          "addresses": {
            "type": "array",
            "description": "list of addresses reachable to the node",
            "items": {
              "$ref": "#/definitions/kubernetes_NodeAddress",
              "javaType": "io.fabric8.kubernetes.api.model.NodeAddress"
            }
          },
          "capacity": {
            "type": "object",
            "description": "compute resource capacity of the node; https://github.com/GoogleCloudPlatform/kubernetes/blob/master/docs/resources.md",
            "additionalProperties": {
              "$ref": "#/definitions/kubernetes_resource_Quantity",
              "javaType": "io.fabric8.kubernetes.api.model.resource.Quantity"
            },
            "javaType": "java.util.Map<String,io.fabric8.kubernetes.api.model.resource.Quantity>"
          },
          "conditions": {
            "type": "array",
            "description": "list of node conditions observed",
            "items": {
              "$ref": "#/definitions/kubernetes_NodeCondition",
              "javaType": "io.fabric8.kubernetes.api.model.NodeCondition"
            }
          },
          "nodeInfo": {
            "$ref": "#/definitions/kubernetes_NodeSystemInfo",
            "javaType": "io.fabric8.kubernetes.api.model.NodeSystemInfo"
          },
          "phase": {
            "type": "string",
            "description": "most recently observed lifecycle phase of the node"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.NodeStatus"
      },
      "kubernetes_NodeSystemInfo": {
        "type": "object",
        "description": "",
        "properties": {
          "KubeProxyVersion": {
            "type": "string",
            "description": "Kube-proxy version reported by the node"
          },
          "bootID": {
            "type": "string",
            "description": "boot id is the boot-id reported by the node"
          },
          "containerRuntimeVersion": {
            "type": "string",
            "description": "Container runtime version reported by the node through runtime remote API (e.g. docker://1.5.0)"
          },
          "kernelVersion": {
            "type": "string",
            "description": "Kernel version reported by the node from 'uname -r' (e.g. 3.16.0-0.bpo.4-amd64)"
          },
          "kubeletVersion": {
            "type": "string",
            "description": "Kubelet version reported by the node"
          },
          "machineID": {
            "type": "string",
            "description": ""
          },
          "osImage": {
            "type": "string",
            "description": "OS image used reported by the node from /etc/os-release (e.g. Debian GNU/Linux 7 (wheezy))"
          },
          "systemUUID": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.NodeSystemInfo"
      },
      "kubernetes_ObjectMeta": {
        "type": "object",
        "description": "",
        "properties": {
          "annotations": {
            "type": "object",
            "description": "map of string keys and values that can be used by external tooling to store and retrieve arbitrary metadata about objects",
            "additionalProperties": {
              "type": "string",
              "description": "map of string keys and values that can be used by external tooling to store and retrieve arbitrary metadata about objects"
            },
            "javaType": "java.util.Map<String,String>"
          },
          "creationTimestamp": {
            "type": "string",
            "description": "RFC 3339 date and time at which the object was created; populated by the system"
          },
          "deletionTimestamp": {
            "type": "string",
            "description": "RFC 3339 date and time at which the object will be deleted; populated by the system when a graceful deletion is requested"
          },
          "generateName": {
            "type": "string",
            "description": "an optional prefix to use to generate a unique name; has the same validation rules as name; optional"
          },
          "labels": {
            "type": "object",
            "description": "map of string keys and values that can be used to organize and categorize objects; may match selectors of replication controllers and services",
            "additionalProperties": {
              "type": "string",
              "description": "map of string keys and values that can be used to organize and categorize objects; may match selectors of replication controllers and services"
            },
            "javaType": "java.util.Map<String,String>"
          },
          "name": {
            "type": "string",
            "description": "string that identifies an object. Must be unique within a namespace; cannot be updated",
            "maxLength": 63,
            "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
          },
          "namespace": {
            "type": "string",
            "description": "namespace of the object; cannot be updated",
            "maxLength": 253,
            "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$"
          },
          "resourceVersion": {
            "type": "string",
            "description": "string that identifies the internal version of this object that can be used by clients to determine when objects have changed; populated by the system"
          },
          "selfLink": {
            "type": "string",
            "description": "URL for the object; populated by the system"
          },
          "uid": {
            "type": "string",
            "description": "unique UUID across space and time; populated by the system; read-only"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
      },
      "kubernetes_ObjectReference": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "API version of the referent"
          },
          "fieldPath": {
            "type": "string",
            "description": "if referring to a piece of an object instead of an entire object"
          },
          "kind": {
            "type": "string",
            "description": "kind of the referent"
          },
          "name": {
            "type": "string",
            "description": "name of the referent"
          },
          "namespace": {
            "type": "string",
            "description": "namespace of the referent"
          },
          "resourceVersion": {
            "type": "string",
            "description": "specific resourceVersion to which this reference is made"
          },
          "uid": {
            "type": "string",
            "description": "uid of the referent"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ObjectReference"
      },
      "kubernetes_Pod": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "Pod",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "spec": {
            "$ref": "#/definitions/kubernetes_PodSpec",
            "javaType": "io.fabric8.kubernetes.api.model.PodSpec"
          },
          "status": {
            "$ref": "#/definitions/kubernetes_PodStatus",
            "javaType": "io.fabric8.kubernetes.api.model.PodStatus"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.Pod"
      },
      "kubernetes_PodCondition": {
        "type": "object",
        "description": "",
        "properties": {
          "status": {
            "type": "string",
            "description": "status of the condition"
          },
          "type": {
            "type": "string",
            "description": "kind of the condition"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.PodCondition"
      },
      "kubernetes_PodList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "list of pods",
            "items": {
              "$ref": "#/definitions/kubernetes_Pod",
              "javaType": "io.fabric8.kubernetes.api.model.Pod"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "PodList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.PodList"
      },
      "kubernetes_PodSpec": {
        "type": "object",
        "description": "",
        "properties": {
          "containers": {
            "type": "array",
            "description": "list of containers belonging to the pod; cannot be updated; containers cannot currently be added or removed; there must be at least one container in a Pod",
            "items": {
              "$ref": "#/definitions/kubernetes_Container",
              "javaType": "io.fabric8.kubernetes.api.model.Container"
            }
          },
          "dnsPolicy": {
            "type": "string",
            "description": "DNS policy for containers within the pod; one of 'ClusterFirst' or 'Default'"
          },
          "host": {
            "type": "string",
            "description": "host requested for this pod"
          },
          "hostNetwork": {
            "type": "boolean",
            "description": "host networking requested for this pod"
          },
          "nodeSelector": {
            "type": "object",
            "description": "selector which must match a node's labels for the pod to be scheduled on that node",
            "additionalProperties": {
              "type": "string",
              "description": "selector which must match a node's labels for the pod to be scheduled on that node"
            },
            "javaType": "java.util.Map<String,String>"
          },
          "restartPolicy": {
            "type": "string",
            "description": "restart policy for all containers within the pod; one of RestartPolicyAlways"
          },
          "volumes": {
            "type": "array",
            "description": "list of volumes that can be mounted by containers belonging to the pod",
            "items": {
              "$ref": "#/definitions/kubernetes_Volume",
              "javaType": "io.fabric8.kubernetes.api.model.Volume"
            }
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.PodSpec"
      },
      "kubernetes_PodStatus": {
        "type": "object",
        "description": "",
        "properties": {
          "Condition": {
            "type": "array",
            "description": "current service state of pod",
            "items": {
              "$ref": "#/definitions/kubernetes_PodCondition",
              "javaType": "io.fabric8.kubernetes.api.model.PodCondition"
            }
          },
          "containerStatuses": {
            "type": "array",
            "description": "list of container statuses",
            "items": {
              "$ref": "#/definitions/kubernetes_ContainerStatus",
              "javaType": "io.fabric8.kubernetes.api.model.ContainerStatus"
            }
          },
          "hostIP": {
            "type": "string",
            "description": "IP address of the host to which the pod is assigned; empty if not yet scheduled"
          },
          "message": {
            "type": "string",
            "description": "human readable message indicating details about why the pod is in this condition"
          },
          "phase": {
            "type": "string",
            "description": "current condition of the pod."
          },
          "podIP": {
            "type": "string",
            "description": "IP address allocated to the pod; routable at least within the cluster; empty if not yet allocated"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.PodStatus"
      },
      "kubernetes_PodTemplateSpec": {
        "type": "object",
        "description": "",
        "properties": {
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "spec": {
            "$ref": "#/definitions/kubernetes_PodSpec",
            "javaType": "io.fabric8.kubernetes.api.model.PodSpec"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.PodTemplateSpec"
      },
      "kubernetes_Probe": {
        "type": "object",
        "description": "",
        "properties": {
          "exec": {
            "$ref": "#/definitions/kubernetes_ExecAction",
            "javaType": "io.fabric8.kubernetes.api.model.ExecAction"
          },
          "httpGet": {
            "$ref": "#/definitions/kubernetes_HTTPGetAction",
            "javaType": "io.fabric8.kubernetes.api.model.HTTPGetAction"
          },
          "initialDelaySeconds": {
            "type": "integer",
            "description": "number of seconds after the container has started before liveness probes are initiated",
            "javaType": "Long"
          },
          "tcpSocket": {
            "$ref": "#/definitions/kubernetes_TCPSocketAction",
            "javaType": "io.fabric8.kubernetes.api.model.TCPSocketAction"
          },
          "timeoutSeconds": {
            "type": "integer",
            "description": "number of seconds after which liveness probes timeout; defaults to 1 second",
            "javaType": "Long"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.Probe"
      },
      "kubernetes_ReplicationController": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "ReplicationController",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "spec": {
            "$ref": "#/definitions/kubernetes_ReplicationControllerSpec",
            "javaType": "io.fabric8.kubernetes.api.model.ReplicationControllerSpec"
          },
          "status": {
            "$ref": "#/definitions/kubernetes_ReplicationControllerStatus",
            "javaType": "io.fabric8.kubernetes.api.model.ReplicationControllerStatus"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ReplicationController"
      },
      "kubernetes_ReplicationControllerList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "list of replication controllers",
            "items": {
              "$ref": "#/definitions/kubernetes_ReplicationController",
              "javaType": "io.fabric8.kubernetes.api.model.ReplicationController"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "ReplicationControllerList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ReplicationControllerList"
      },
      "kubernetes_ReplicationControllerSpec": {
        "type": "object",
        "description": "",
        "properties": {
          "replicas": {
            "type": "integer",
            "description": "number of replicas desired"
          },
          "selector": {
            "type": "object",
            "description": "label keys and values that must match in order to be controlled by this replication controller",
            "additionalProperties": {
              "type": "string",
              "description": "label keys and values that must match in order to be controlled by this replication controller"
            },
            "javaType": "java.util.Map<String,String>"
          },
          "template": {
            "$ref": "#/definitions/kubernetes_PodTemplateSpec",
            "javaType": "io.fabric8.kubernetes.api.model.PodTemplateSpec"
          },
          "templateRef": {
            "$ref": "#/definitions/kubernetes_ObjectReference",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectReference"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ReplicationControllerSpec"
      },
      "kubernetes_ReplicationControllerStatus": {
        "type": "object",
        "description": "",
        "properties": {
          "replicas": {
            "type": "integer",
            "description": "most recently oberved number of replicas"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ReplicationControllerStatus"
      },
      "kubernetes_ResourceRequirements": {
        "type": "object",
        "description": "",
        "properties": {
          "limits": {
            "type": "object",
            "description": "Maximum amount of compute resources allowed",
            "additionalProperties": {
              "$ref": "#/definitions/kubernetes_resource_Quantity",
              "javaType": "io.fabric8.kubernetes.api.model.resource.Quantity"
            },
            "javaType": "java.util.Map<String,io.fabric8.kubernetes.api.model.resource.Quantity>"
          },
          "requests": {
            "type": "object",
            "description": "Minimum amount of resources requested",
            "additionalProperties": {
              "$ref": "#/definitions/kubernetes_resource_Quantity",
              "javaType": "io.fabric8.kubernetes.api.model.resource.Quantity"
            },
            "javaType": "java.util.Map<String,io.fabric8.kubernetes.api.model.resource.Quantity>"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ResourceRequirements"
      },
      "kubernetes_SecretVolumeSource": {
        "type": "object",
        "description": "",
        "properties": {
          "secretName": {
            "type": "string",
            "description": "secretName is the name of a secret in the pod's namespace"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.SecretVolumeSource"
      },
      "kubernetes_Service": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "Service",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "spec": {
            "$ref": "#/definitions/kubernetes_ServiceSpec",
            "javaType": "io.fabric8.kubernetes.api.model.ServiceSpec"
          },
          "status": {
            "$ref": "#/definitions/kubernetes_ServiceStatus",
            "javaType": "io.fabric8.kubernetes.api.model.ServiceStatus"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.Service"
      },
      "kubernetes_ServiceList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "list of services",
            "items": {
              "$ref": "#/definitions/kubernetes_Service",
              "javaType": "io.fabric8.kubernetes.api.model.Service"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "ServiceList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ServiceList"
      },
      "kubernetes_ServicePort": {
        "type": "object",
        "description": "",
        "properties": {
          "name": {
            "type": "string",
            "description": "the name of this port; optional if only one port is defined",
            "maxLength": 63,
            "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
          },
          "port": {
            "type": "integer",
            "description": "the port number that is exposed"
          },
          "protocol": {
            "type": "string",
            "description": "the protocol used by this port; must be UDP or TCP; TCP if unspecified"
          },
          "targetPort": {
            "$ref": "#/definitions/kubernetes_util_IntOrString",
            "javaType": "io.fabric8.kubernetes.api.model.util.IntOrString"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ServicePort"
      },
      "kubernetes_ServiceSpec": {
        "type": "object",
        "description": "",
        "properties": {
          "createExternalLoadBalancer": {
            "type": "boolean",
            "description": "set up a cloud-provider-specific load balancer on an external IP"
          },
          "portalIP": {
            "type": "string",
            "description": ""
          },
          "ports": {
            "type": "array",
            "description": "ports exposed by the service",
            "items": {
              "$ref": "#/definitions/kubernetes_ServicePort",
              "javaType": "io.fabric8.kubernetes.api.model.ServicePort"
            }
          },
          "publicIPs": {
            "type": "array",
            "description": "externally visible IPs (e.g. load balancers) that should be proxied to this service",
            "items": {
              "type": "string",
              "description": "externally visible IPs (e.g. load balancers) that should be proxied to this service"
            }
          },
          "selector": {
            "type": "object",
            "description": "label keys and values that must match in order to receive traffic for this service; if empty",
            "additionalProperties": {
              "type": "string",
              "description": "label keys and values that must match in order to receive traffic for this service; if empty"
            },
            "javaType": "java.util.Map<String,String>"
          },
          "sessionAffinity": {
            "type": "string",
            "description": "enable client IP based session affinity; must be ClientIP or None; defaults to None"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ServiceSpec"
      },
      "kubernetes_ServiceStatus": {
        "type": "object",
        "description": "",
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.ServiceStatus"
      },
      "kubernetes_TCPSocketAction": {
        "type": "object",
        "description": "",
        "properties": {
          "port": {
            "$ref": "#/definitions/kubernetes_util_IntOrString",
            "javaType": "io.fabric8.kubernetes.api.model.util.IntOrString"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.TCPSocketAction"
      },
      "kubernetes_TypeMeta": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "version of the schema the object should have"
          },
          "kind": {
            "type": "string",
            "description": "kind of object"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.TypeMeta"
      },
      "kubernetes_Volume": {
        "type": "object",
        "description": "",
        "properties": {
          "emptyDir": {
            "$ref": "#/definitions/kubernetes_EmptyDirVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.EmptyDirVolumeSource"
          },
          "gcePersistentDisk": {
            "$ref": "#/definitions/kubernetes_GCEPersistentDiskVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.GCEPersistentDiskVolumeSource"
          },
          "gitRepo": {
            "$ref": "#/definitions/kubernetes_GitRepoVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.GitRepoVolumeSource"
          },
          "glusterfs": {
            "$ref": "#/definitions/kubernetes_GlusterfsVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.GlusterfsVolumeSource"
          },
          "hostPath": {
            "$ref": "#/definitions/kubernetes_HostPathVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.HostPathVolumeSource"
          },
          "iscsi": {
            "$ref": "#/definitions/kubernetes_ISCSIVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.ISCSIVolumeSource"
          },
          "name": {
            "type": "string",
            "description": "volume name; must be a DNS_LABEL and unique within the pod",
            "maxLength": 63,
            "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
          },
          "nfs": {
            "$ref": "#/definitions/kubernetes_NFSVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.NFSVolumeSource"
          },
          "secret": {
            "$ref": "#/definitions/kubernetes_SecretVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.SecretVolumeSource"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.Volume"
      },
      "kubernetes_VolumeMount": {
        "type": "object",
        "description": "",
        "properties": {
          "mountPath": {
            "type": "string",
            "description": "path within the container at which the volume should be mounted"
          },
          "name": {
            "type": "string",
            "description": "name of the volume to mount"
          },
          "readOnly": {
            "type": "boolean",
            "description": "mounted read-only if true"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.VolumeMount"
      },
      "kubernetes_VolumeSource": {
        "type": "object",
        "description": "",
        "properties": {
          "emptyDir": {
            "$ref": "#/definitions/kubernetes_EmptyDirVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.EmptyDirVolumeSource"
          },
          "gcePersistentDisk": {
            "$ref": "#/definitions/kubernetes_GCEPersistentDiskVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.GCEPersistentDiskVolumeSource"
          },
          "gitRepo": {
            "$ref": "#/definitions/kubernetes_GitRepoVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.GitRepoVolumeSource"
          },
          "glusterfs": {
            "$ref": "#/definitions/kubernetes_GlusterfsVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.GlusterfsVolumeSource"
          },
          "hostPath": {
            "$ref": "#/definitions/kubernetes_HostPathVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.HostPathVolumeSource"
          },
          "iscsi": {
            "$ref": "#/definitions/kubernetes_ISCSIVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.ISCSIVolumeSource"
          },
          "nfs": {
            "$ref": "#/definitions/kubernetes_NFSVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.NFSVolumeSource"
          },
          "secret": {
            "$ref": "#/definitions/kubernetes_SecretVolumeSource",
            "javaType": "io.fabric8.kubernetes.api.model.SecretVolumeSource"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.VolumeSource"
      },
      "kubernetes_base_ListMeta": {
        "type": "object",
        "description": "",
        "properties": {
          "resourceVersion": {
            "type": "string",
            "description": ""
          },
          "selfLink": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.base.ListMeta"
      },
      "kubernetes_base_ObjectMeta": {
        "type": "object",
        "description": "",
        "properties": {
          "annotations": {
            "type": "object",
            "description": "",
            "additionalProperties": {
              "type": "string",
              "description": ""
            },
            "javaType": "java.util.Map<String,String>"
          },
          "creationTimestamp": {
            "type": "string",
            "description": ""
          },
          "deletionTimestamp": {
            "type": "string",
            "description": ""
          },
          "generateName": {
            "type": "string",
            "description": ""
          },
          "labels": {
            "type": "object",
            "description": "",
            "additionalProperties": {
              "type": "string",
              "description": ""
            },
            "javaType": "java.util.Map<String,String>"
          },
          "name": {
            "type": "string",
            "description": "",
            "maxLength": 63,
            "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?$"
          },
          "namespace": {
            "type": "string",
            "description": "",
            "maxLength": 253,
            "pattern": "^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$"
          },
          "resourceVersion": {
            "type": "string",
            "description": ""
          },
          "selfLink": {
            "type": "string",
            "description": ""
          },
          "uid": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.base.ObjectMeta"
      },
      "kubernetes_base_ObjectReference": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": ""
          },
          "fieldPath": {
            "type": "string",
            "description": ""
          },
          "kind": {
            "type": "string",
            "description": ""
          },
          "name": {
            "type": "string",
            "description": ""
          },
          "namespace": {
            "type": "string",
            "description": ""
          },
          "resourceVersion": {
            "type": "string",
            "description": ""
          },
          "uid": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.base.ObjectReference"
      },
      "kubernetes_base_Status": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "code": {
            "type": "integer",
            "description": ""
          },
          "details": {
            "$ref": "#/definitions/kubernetes_base_StatusDetails",
            "javaType": "io.fabric8.kubernetes.api.model.base.StatusDetails"
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "Status",
            "required": true
          },
          "message": {
            "type": "string",
            "description": ""
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_base_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.base.ListMeta"
          },
          "reason": {
            "type": "string",
            "description": ""
          },
          "status": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.base.Status"
      },
      "kubernetes_base_StatusCause": {
        "type": "object",
        "description": "",
        "properties": {
          "field": {
            "type": "string",
            "description": ""
          },
          "message": {
            "type": "string",
            "description": ""
          },
          "reason": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.base.StatusCause"
      },
      "kubernetes_base_StatusDetails": {
        "type": "object",
        "description": "",
        "properties": {
          "causes": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/kubernetes_base_StatusCause",
              "javaType": "io.fabric8.kubernetes.api.model.base.StatusCause"
            }
          },
          "id": {
            "type": "string",
            "description": ""
          },
          "kind": {
            "type": "string",
            "description": ""
          },
          "retryAfterSeconds": {
            "type": "integer",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.base.StatusDetails"
      },
      "kubernetes_base_TypeMeta": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": ""
          },
          "kind": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.base.TypeMeta"
      },
      "kubernetes_errors_StatusError": {
        "type": "object",
        "description": "",
        "properties": {
          "ErrStatus": {
            "$ref": "#/definitions/kubernetes_base_Status",
            "javaType": "io.fabric8.kubernetes.api.model.base.Status"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.errors.StatusError"
      },
      "kubernetes_resource_Quantity": {
        "type": "object",
        "description": "",
        "properties": {
          "Amount": {
            "$ref": "#/definitions/speter_inf_Dec",
            "javaType": "io.fabric8.openshift.client.util.Dec"
          },
          "Format": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.resource.Quantity"
      },
      "kubernetes_runtime_RawExtension": {
        "type": "object",
        "description": "",
        "properties": {
          "RawJSON": {
            "type": "array",
            "description": "",
            "items": {
              "type": "integer",
              "description": ""
            }
          }
        },
        "additionalProperties": true,
        "javaType": "Object"
      },
      "kubernetes_util_IntOrString": {
        "type": "object",
        "description": "",
        "properties": {
          "IntVal": {
            "type": "integer",
            "description": ""
          },
          "Kind": {
            "type": "integer",
            "description": ""
          },
          "StrVal": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.kubernetes.api.model.util.IntOrString"
      },
      "os_build_Build": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "Build",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "spec": {
            "$ref": "#/definitions/os_build_BuildSpec",
            "javaType": "io.fabric8.openshift.api.model.BuildSpec"
          },
          "status": {
            "$ref": "#/definitions/os_build_BuildStatus",
            "javaType": "io.fabric8.openshift.api.model.BuildStatus"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.Build"
      },
      "os_build_BuildConfig": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "BuildConfig",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "spec": {
            "$ref": "#/definitions/os_build_BuildConfigSpec",
            "javaType": "io.fabric8.openshift.api.model.BuildConfigSpec"
          },
          "status": {
            "$ref": "#/definitions/os_build_BuildConfigStatus",
            "javaType": "io.fabric8.openshift.api.model.BuildConfigStatus"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.BuildConfig"
      },
      "os_build_BuildConfigList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_build_BuildConfig",
              "javaType": "io.fabric8.openshift.api.model.BuildConfig"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "BuildConfigList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.BuildConfigList"
      },
      "os_build_BuildConfigSpec": {
        "type": "object",
        "description": "",
        "properties": {
          "output": {
            "$ref": "#/definitions/os_build_BuildOutput",
            "javaType": "io.fabric8.openshift.api.model.BuildOutput"
          },
          "resources": {
            "$ref": "#/definitions/kubernetes_ResourceRequirements",
            "javaType": "io.fabric8.kubernetes.api.model.ResourceRequirements"
          },
          "revision": {
            "$ref": "#/definitions/os_build_SourceRevision",
            "javaType": "io.fabric8.openshift.api.model.SourceRevision"
          },
          "source": {
            "$ref": "#/definitions/os_build_BuildSource",
            "javaType": "io.fabric8.openshift.api.model.BuildSource"
          },
          "strategy": {
            "$ref": "#/definitions/os_build_BuildStrategy",
            "javaType": "io.fabric8.openshift.api.model.BuildStrategy"
          },
          "triggers": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_build_BuildTriggerPolicy",
              "javaType": "io.fabric8.openshift.api.model.BuildTriggerPolicy"
            }
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.BuildConfigSpec"
      },
      "os_build_BuildConfigStatus": {
        "type": "object",
        "description": "",
        "properties": {
          "lastVersion": {
            "type": "integer",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.BuildConfigStatus"
      },
      "os_build_BuildList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_build_Build",
              "javaType": "io.fabric8.openshift.api.model.Build"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "BuildList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.BuildList"
      },
      "os_build_BuildOutput": {
        "type": "object",
        "description": "",
        "properties": {
          "pushSecretName": {
            "type": "string",
            "description": ""
          },
          "to": {
            "$ref": "#/definitions/kubernetes_ObjectReference",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectReference"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.BuildOutput"
      },
      "os_build_BuildSource": {
        "type": "object",
        "description": "",
        "properties": {
          "contextDir": {
            "type": "string",
            "description": ""
          },
          "git": {
            "$ref": "#/definitions/os_build_GitBuildSource",
            "javaType": "io.fabric8.openshift.api.model.GitBuildSource"
          },
          "type": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.BuildSource"
      },
      "os_build_BuildSpec": {
        "type": "object",
        "description": "",
        "properties": {
          "output": {
            "$ref": "#/definitions/os_build_BuildOutput",
            "javaType": "io.fabric8.openshift.api.model.BuildOutput"
          },
          "resources": {
            "$ref": "#/definitions/kubernetes_ResourceRequirements",
            "javaType": "io.fabric8.kubernetes.api.model.ResourceRequirements"
          },
          "revision": {
            "$ref": "#/definitions/os_build_SourceRevision",
            "javaType": "io.fabric8.openshift.api.model.SourceRevision"
          },
          "source": {
            "$ref": "#/definitions/os_build_BuildSource",
            "javaType": "io.fabric8.openshift.api.model.BuildSource"
          },
          "strategy": {
            "$ref": "#/definitions/os_build_BuildStrategy",
            "javaType": "io.fabric8.openshift.api.model.BuildStrategy"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.BuildSpec"
      },
      "os_build_BuildStatus": {
        "type": "object",
        "description": "",
        "properties": {
          "cancelled": {
            "type": "boolean",
            "description": ""
          },
          "completionTimestamp": {
            "type": "string",
            "description": ""
          },
          "config": {
            "$ref": "#/definitions/kubernetes_ObjectReference",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectReference"
          },
          "duration": {
            "type": "integer",
            "description": "",
            "javaType": "Long"
          },
          "message": {
            "type": "string",
            "description": ""
          },
          "phase": {
            "type": "string",
            "description": ""
          },
          "startTimestamp": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.BuildStatus"
      },
      "os_build_BuildStrategy": {
        "type": "object",
        "description": "",
        "properties": {
          "customStrategy": {
            "$ref": "#/definitions/os_build_CustomBuildStrategy",
            "javaType": "io.fabric8.openshift.api.model.CustomBuildStrategy"
          },
          "dockerStrategy": {
            "$ref": "#/definitions/os_build_DockerBuildStrategy",
            "javaType": "io.fabric8.openshift.api.model.DockerBuildStrategy"
          },
          "stiStrategy": {
            "$ref": "#/definitions/os_build_STIBuildStrategy",
            "javaType": "io.fabric8.openshift.api.model.STIBuildStrategy"
          },
          "type": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.BuildStrategy"
      },
      "os_build_BuildTriggerPolicy": {
        "type": "object",
        "description": "",
        "properties": {
          "generic": {
            "$ref": "#/definitions/os_build_WebHookTrigger",
            "javaType": "io.fabric8.openshift.api.model.WebHookTrigger"
          },
          "github": {
            "$ref": "#/definitions/os_build_WebHookTrigger",
            "javaType": "io.fabric8.openshift.api.model.WebHookTrigger"
          },
          "imageChange": {
            "$ref": "#/definitions/os_build_ImageChangeTrigger",
            "javaType": "io.fabric8.openshift.api.model.ImageChangeTrigger"
          },
          "type": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.BuildTriggerPolicy"
      },
      "os_build_CustomBuildStrategy": {
        "type": "object",
        "description": "",
        "properties": {
          "env": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/kubernetes_EnvVar",
              "javaType": "io.fabric8.kubernetes.api.model.EnvVar"
            }
          },
          "exposeDockerSocket": {
            "type": "boolean",
            "description": ""
          },
          "from": {
            "$ref": "#/definitions/kubernetes_ObjectReference",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectReference"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.CustomBuildStrategy"
      },
      "os_build_DockerBuildStrategy": {
        "type": "object",
        "description": "",
        "properties": {
          "from": {
            "$ref": "#/definitions/kubernetes_ObjectReference",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectReference"
          },
          "noCache": {
            "type": "boolean",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.DockerBuildStrategy"
      },
      "os_build_GitBuildSource": {
        "type": "object",
        "description": "",
        "properties": {
          "ref": {
            "type": "string",
            "description": ""
          },
          "uri": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.GitBuildSource"
      },
      "os_build_GitSourceRevision": {
        "type": "object",
        "description": "",
        "properties": {
          "author": {
            "$ref": "#/definitions/os_build_SourceControlUser",
            "javaType": "io.fabric8.openshift.api.model.SourceControlUser"
          },
          "commit": {
            "type": "string",
            "description": ""
          },
          "committer": {
            "$ref": "#/definitions/os_build_SourceControlUser",
            "javaType": "io.fabric8.openshift.api.model.SourceControlUser"
          },
          "message": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.GitSourceRevision"
      },
      "os_build_ImageChangeTrigger": {
        "type": "object",
        "description": "",
        "properties": {
          "lastTriggeredImageID": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.ImageChangeTrigger"
      },
      "os_build_STIBuildStrategy": {
        "type": "object",
        "description": "",
        "properties": {
          "env": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/kubernetes_EnvVar",
              "javaType": "io.fabric8.kubernetes.api.model.EnvVar"
            }
          },
          "from": {
            "$ref": "#/definitions/kubernetes_ObjectReference",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectReference"
          },
          "incremental": {
            "type": "boolean",
            "description": ""
          },
          "scripts": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.STIBuildStrategy"
      },
      "os_build_SourceControlUser": {
        "type": "object",
        "description": "",
        "properties": {
          "email": {
            "type": "string",
            "description": ""
          },
          "name": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.SourceControlUser"
      },
      "os_build_SourceRevision": {
        "type": "object",
        "description": "",
        "properties": {
          "git": {
            "$ref": "#/definitions/os_build_GitSourceRevision",
            "javaType": "io.fabric8.openshift.api.model.GitSourceRevision"
          },
          "type": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.SourceRevision"
      },
      "os_build_WebHookTrigger": {
        "type": "object",
        "description": "",
        "properties": {
          "secret": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.WebHookTrigger"
      },
      "os_deploy_CustomDeploymentStrategyParams": {
        "type": "object",
        "description": "",
        "properties": {
          "command": {
            "type": "array",
            "description": "",
            "items": {
              "type": "string",
              "description": ""
            }
          },
          "environment": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/kubernetes_EnvVar",
              "javaType": "io.fabric8.kubernetes.api.model.EnvVar"
            }
          },
          "image": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.CustomDeploymentStrategyParams"
      },
      "os_deploy_DeploymentCause": {
        "type": "object",
        "description": "",
        "properties": {
          "imageTrigger": {
            "$ref": "#/definitions/os_deploy_DeploymentCauseImageTrigger",
            "javaType": "io.fabric8.openshift.api.model.DeploymentCauseImageTrigger"
          },
          "type": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.DeploymentCause"
      },
      "os_deploy_DeploymentCauseImageTrigger": {
        "type": "object",
        "description": "",
        "properties": {
          "from": {
            "$ref": "#/definitions/kubernetes_ObjectReference",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectReference"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.DeploymentCauseImageTrigger"
      },
      "os_deploy_DeploymentConfig": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "DeploymentConfig",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "spec": {
            "$ref": "#/definitions/os_deploy_DeploymentConfigSpec",
            "javaType": "io.fabric8.openshift.api.model.DeploymentConfigSpec"
          },
          "status": {
            "$ref": "#/definitions/os_deploy_DeploymentConfigStatus",
            "javaType": "io.fabric8.openshift.api.model.DeploymentConfigStatus"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.DeploymentConfig"
      },
      "os_deploy_DeploymentConfigList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_deploy_DeploymentConfig",
              "javaType": "io.fabric8.openshift.api.model.DeploymentConfig"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "DeploymentConfigList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.DeploymentConfigList"
      },
      "os_deploy_DeploymentConfigSpec": {
        "type": "object",
        "description": "",
        "properties": {
          "replicas": {
            "type": "integer",
            "description": ""
          },
          "selector": {
            "type": "object",
            "description": "",
            "additionalProperties": {
              "type": "string",
              "description": ""
            },
            "javaType": "java.util.Map<String,String>"
          },
          "strategy": {
            "$ref": "#/definitions/os_deploy_DeploymentStrategy",
            "javaType": "io.fabric8.openshift.api.model.DeploymentStrategy"
          },
          "template": {
            "$ref": "#/definitions/kubernetes_PodTemplateSpec",
            "javaType": "io.fabric8.kubernetes.api.model.PodTemplateSpec"
          },
          "templateRef": {
            "$ref": "#/definitions/kubernetes_ObjectReference",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectReference"
          },
          "triggers": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_deploy_DeploymentTriggerPolicy",
              "javaType": "io.fabric8.openshift.api.model.DeploymentTriggerPolicy"
            }
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.DeploymentConfigSpec"
      },
      "os_deploy_DeploymentConfigStatus": {
        "type": "object",
        "description": "",
        "properties": {
          "details": {
            "$ref": "#/definitions/os_deploy_DeploymentDetails",
            "javaType": "io.fabric8.openshift.api.model.DeploymentDetails"
          },
          "latestVersion": {
            "type": "integer",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.DeploymentConfigStatus"
      },
      "os_deploy_DeploymentDetails": {
        "type": "object",
        "description": "",
        "properties": {
          "causes": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_deploy_DeploymentCause",
              "javaType": "io.fabric8.openshift.api.model.DeploymentCause"
            }
          },
          "message": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.DeploymentDetails"
      },
      "os_deploy_DeploymentStrategy": {
        "type": "object",
        "description": "",
        "properties": {
          "customParams": {
            "$ref": "#/definitions/os_deploy_CustomDeploymentStrategyParams",
            "javaType": "io.fabric8.openshift.api.model.CustomDeploymentStrategyParams"
          },
          "recreateParams": {
            "$ref": "#/definitions/os_deploy_RecreateDeploymentStrategyParams",
            "javaType": "io.fabric8.openshift.api.model.RecreateDeploymentStrategyParams"
          },
          "resources": {
            "$ref": "#/definitions/kubernetes_ResourceRequirements",
            "javaType": "io.fabric8.kubernetes.api.model.ResourceRequirements"
          },
          "type": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.DeploymentStrategy"
      },
      "os_deploy_DeploymentTriggerImageChangeParams": {
        "type": "object",
        "description": "",
        "properties": {
          "automatic": {
            "type": "boolean",
            "description": ""
          },
          "containerNames": {
            "type": "array",
            "description": "",
            "items": {
              "type": "string",
              "description": ""
            }
          },
          "from": {
            "$ref": "#/definitions/kubernetes_ObjectReference",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectReference"
          },
          "lastTriggeredImage": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.DeploymentTriggerImageChangeParams"
      },
      "os_deploy_DeploymentTriggerPolicy": {
        "type": "object",
        "description": "",
        "properties": {
          "imageChangeParams": {
            "$ref": "#/definitions/os_deploy_DeploymentTriggerImageChangeParams",
            "javaType": "io.fabric8.openshift.api.model.DeploymentTriggerImageChangeParams"
          },
          "type": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.DeploymentTriggerPolicy"
      },
      "os_deploy_ExecNewPodHook": {
        "type": "object",
        "description": "",
        "properties": {
          "command": {
            "type": "array",
            "description": "",
            "items": {
              "type": "string",
              "description": ""
            }
          },
          "containerName": {
            "type": "string",
            "description": ""
          },
          "env": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/kubernetes_EnvVar",
              "javaType": "io.fabric8.kubernetes.api.model.EnvVar"
            }
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.ExecNewPodHook"
      },
      "os_deploy_LifecycleHook": {
        "type": "object",
        "description": "",
        "properties": {
          "execNewPod": {
            "$ref": "#/definitions/os_deploy_ExecNewPodHook",
            "javaType": "io.fabric8.openshift.api.model.ExecNewPodHook"
          },
          "failurePolicy": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.LifecycleHook"
      },
      "os_deploy_RecreateDeploymentStrategyParams": {
        "type": "object",
        "description": "",
        "properties": {
          "post": {
            "$ref": "#/definitions/os_deploy_LifecycleHook",
            "javaType": "io.fabric8.openshift.api.model.LifecycleHook"
          },
          "pre": {
            "$ref": "#/definitions/os_deploy_LifecycleHook",
            "javaType": "io.fabric8.openshift.api.model.LifecycleHook"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.RecreateDeploymentStrategyParams"
      },
      "os_image_Image": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "dockerImageManifest": {
            "type": "string",
            "description": ""
          },
          "dockerImageMetadata": {
            "$ref": "#/definitions/kubernetes_runtime_RawExtension",
            "javaType": "Object"
          },
          "dockerImageMetadataVersion": {
            "type": "string",
            "description": ""
          },
          "dockerImageReference": {
            "type": "string",
            "description": ""
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "Image",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.Image"
      },
      "os_image_ImageList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_image_Image",
              "javaType": "io.fabric8.openshift.api.model.Image"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "ImageList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.ImageList"
      },
      "os_image_ImageStream": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "ImageStream",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "spec": {
            "$ref": "#/definitions/os_image_ImageStreamSpec",
            "javaType": "io.fabric8.openshift.api.model.ImageStreamSpec"
          },
          "status": {
            "$ref": "#/definitions/os_image_ImageStreamStatus",
            "javaType": "io.fabric8.openshift.api.model.ImageStreamStatus"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.ImageStream"
      },
      "os_image_ImageStreamList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_image_ImageStream",
              "javaType": "io.fabric8.openshift.api.model.ImageStream"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "ImageStreamList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.ImageStreamList"
      },
      "os_image_ImageStreamSpec": {
        "type": "object",
        "description": "",
        "properties": {
          "dockerImageRepository": {
            "type": "string",
            "description": ""
          },
          "tags": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_image_NamedTagReference",
              "javaType": "io.fabric8.openshift.api.model.NamedTagReference"
            }
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.ImageStreamSpec"
      },
      "os_image_ImageStreamStatus": {
        "type": "object",
        "description": "",
        "properties": {
          "dockerImageRepository": {
            "type": "string",
            "description": ""
          },
          "tags": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_image_NamedTagEventList",
              "javaType": "io.fabric8.openshift.api.model.NamedTagEventList"
            }
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.ImageStreamStatus"
      },
      "os_image_NamedTagEventList": {
        "type": "object",
        "description": "",
        "properties": {
          "items": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_image_TagEvent",
              "javaType": "io.fabric8.openshift.api.model.TagEvent"
            }
          },
          "tag": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.NamedTagEventList"
      },
      "os_image_NamedTagReference": {
        "type": "object",
        "description": "",
        "properties": {
          "annotations": {
            "type": "object",
            "description": "",
            "additionalProperties": {
              "type": "string",
              "description": ""
            },
            "javaType": "java.util.Map<String,String>"
          },
          "from": {
            "$ref": "#/definitions/kubernetes_ObjectReference",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectReference"
          },
          "name": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.NamedTagReference"
      },
      "os_image_TagEvent": {
        "type": "object",
        "description": "",
        "properties": {
          "created": {
            "type": "string",
            "description": ""
          },
          "dockerImageReference": {
            "type": "string",
            "description": ""
          },
          "image": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.TagEvent"
      },
      "os_oauth_OAuthAccessToken": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "authorizeToken": {
            "type": "string",
            "description": ""
          },
          "clientName": {
            "type": "string",
            "description": ""
          },
          "expiresIn": {
            "type": "integer",
            "description": "",
            "javaType": "Long"
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "OAuthAccessToken",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "redirectURI": {
            "type": "string",
            "description": ""
          },
          "refreshToken": {
            "type": "string",
            "description": ""
          },
          "scopes": {
            "type": "array",
            "description": "",
            "items": {
              "type": "string",
              "description": ""
            }
          },
          "userName": {
            "type": "string",
            "description": ""
          },
          "userUID": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.OAuthAccessToken"
      },
      "os_oauth_OAuthAccessTokenList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_oauth_OAuthAccessToken",
              "javaType": "io.fabric8.openshift.api.model.OAuthAccessToken"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "OAuthAccessTokenList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.OAuthAccessTokenList"
      },
      "os_oauth_OAuthAuthorizeToken": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "clientName": {
            "type": "string",
            "description": ""
          },
          "expiresIn": {
            "type": "integer",
            "description": "",
            "javaType": "Long"
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "OAuthAuthorizeToken",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "redirectURI": {
            "type": "string",
            "description": ""
          },
          "scopes": {
            "type": "array",
            "description": "",
            "items": {
              "type": "string",
              "description": ""
            }
          },
          "state": {
            "type": "string",
            "description": ""
          },
          "userName": {
            "type": "string",
            "description": ""
          },
          "userUID": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.OAuthAuthorizeToken"
      },
      "os_oauth_OAuthAuthorizeTokenList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_oauth_OAuthAuthorizeToken",
              "javaType": "io.fabric8.openshift.api.model.OAuthAuthorizeToken"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "OAuthAuthorizeTokenList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.OAuthAuthorizeTokenList"
      },
      "os_oauth_OAuthClient": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "OAuthClient",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "redirectURIs": {
            "type": "array",
            "description": "",
            "items": {
              "type": "string",
              "description": ""
            }
          },
          "respondWithChallenges": {
            "type": "boolean",
            "description": ""
          },
          "secret": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.OAuthClient"
      },
      "os_oauth_OAuthClientAuthorization": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "clientName": {
            "type": "string",
            "description": ""
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "OAuthClientAuthorization",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "scopes": {
            "type": "array",
            "description": "",
            "items": {
              "type": "string",
              "description": ""
            }
          },
          "userName": {
            "type": "string",
            "description": ""
          },
          "userUID": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.OAuthClientAuthorization"
      },
      "os_oauth_OAuthClientAuthorizationList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_oauth_OAuthClientAuthorization",
              "javaType": "io.fabric8.openshift.api.model.OAuthClientAuthorization"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "OAuthClientAuthorizationList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.OAuthClientAuthorizationList"
      },
      "os_oauth_OAuthClientList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_oauth_OAuthClient",
              "javaType": "io.fabric8.openshift.api.model.OAuthClient"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "OAuthClientList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.OAuthClientList"
      },
      "os_route_Route": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "Route",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_base_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.base.ObjectMeta"
          },
          "spec": {
            "$ref": "#/definitions/os_route_RouteSpec",
            "javaType": "io.fabric8.openshift.api.model.RouteSpec"
          },
          "status": {
            "$ref": "#/definitions/os_route_RouteStatus",
            "javaType": "io.fabric8.openshift.api.model.RouteStatus"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.Route"
      },
      "os_route_RouteList": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "items": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_route_Route",
              "javaType": "io.fabric8.openshift.api.model.Route"
            }
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "RouteList",
            "required": true
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_base_ListMeta",
            "javaType": "io.fabric8.kubernetes.api.model.base.ListMeta"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.RouteList"
      },
      "os_route_RouteSpec": {
        "type": "object",
        "description": "",
        "properties": {
          "host": {
            "type": "string",
            "description": ""
          },
          "path": {
            "type": "string",
            "description": ""
          },
          "tls": {
            "$ref": "#/definitions/os_route_TLSConfig",
            "javaType": "io.fabric8.openshift.api.model.TLSConfig"
          },
          "to": {
            "$ref": "#/definitions/kubernetes_base_ObjectReference",
            "javaType": "io.fabric8.kubernetes.api.model.base.ObjectReference"
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.RouteSpec"
      },
      "os_route_RouteStatus": {
        "type": "object",
        "description": "",
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.RouteStatus"
      },
      "os_route_TLSConfig": {
        "type": "object",
        "description": "",
        "properties": {
          "caCertificate": {
            "type": "string",
            "description": ""
          },
          "certificate": {
            "type": "string",
            "description": ""
          },
          "destinationCACertificate": {
            "type": "string",
            "description": ""
          },
          "key": {
            "type": "string",
            "description": ""
          },
          "termination": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.TLSConfig"
      },
      "os_template_Parameter": {
        "type": "object",
        "description": "",
        "properties": {
          "description": {
            "type": "string",
            "description": ""
          },
          "from": {
            "type": "string",
            "description": ""
          },
          "generate": {
            "type": "string",
            "description": ""
          },
          "name": {
            "type": "string",
            "description": ""
          },
          "value": {
            "type": "string",
            "description": ""
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.template.Parameter"
      },
      "os_template_Template": {
        "type": "object",
        "description": "",
        "properties": {
          "apiVersion": {
            "type": "string",
            "description": "",
            "default": "v1beta3",
            "required": true,
            "enum": [
              "v1beta1",
              "v1beta2",
              "v1beta3"
            ]
          },
          "kind": {
            "type": "string",
            "description": "",
            "default": "Template",
            "required": true
          },
          "labels": {
            "type": "object",
            "description": "",
            "additionalProperties": {
              "type": "string",
              "description": ""
            },
            "javaType": "java.util.Map<String,String>"
          },
          "metadata": {
            "$ref": "#/definitions/kubernetes_ObjectMeta",
            "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
          },
          "objects": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/kubernetes_runtime_RawExtension",
              "javaType": "Object"
            }
          },
          "parameters": {
            "type": "array",
            "description": "",
            "items": {
              "$ref": "#/definitions/os_template_Parameter",
              "javaType": "io.fabric8.openshift.api.model.template.Parameter"
            }
          }
        },
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.api.model.template.Template"
      },
      "speter_inf_Dec": {
        "type": "object",
        "description": "",
        "additionalProperties": true,
        "javaType": "io.fabric8.openshift.client.util.Dec"
      }
    },
    "type": "object",
    "properties": {
      "BaseKubernetesList": {
        "$ref": "#/definitions/kubernetes_List",
        "javaType": "io.fabric8.kubernetes.api.model.BaseKubernetesList"
      },
      "BuildConfigList": {
        "$ref": "#/definitions/os_build_BuildConfigList",
        "javaType": "io.fabric8.openshift.api.model.BuildConfigList"
      },
      "BuildList": {
        "$ref": "#/definitions/os_build_BuildList",
        "javaType": "io.fabric8.openshift.api.model.BuildList"
      },
      "ContainerStatus": {
        "$ref": "#/definitions/kubernetes_ContainerStatus",
        "javaType": "io.fabric8.kubernetes.api.model.ContainerStatus"
      },
      "DeploymentConfigList": {
        "$ref": "#/definitions/os_deploy_DeploymentConfigList",
        "javaType": "io.fabric8.openshift.api.model.DeploymentConfigList"
      },
      "Endpoints": {
        "$ref": "#/definitions/kubernetes_Endpoints",
        "javaType": "io.fabric8.kubernetes.api.model.Endpoints"
      },
      "EndpointsList": {
        "$ref": "#/definitions/kubernetes_EndpointsList",
        "javaType": "io.fabric8.kubernetes.api.model.EndpointsList"
      },
      "EnvVar": {
        "$ref": "#/definitions/kubernetes_EnvVar",
        "javaType": "io.fabric8.kubernetes.api.model.EnvVar"
      },
      "ImageList": {
        "$ref": "#/definitions/os_image_ImageList",
        "javaType": "io.fabric8.openshift.api.model.ImageList"
      },
      "ImageStreamList": {
        "$ref": "#/definitions/os_image_ImageStreamList",
        "javaType": "io.fabric8.openshift.api.model.ImageStreamList"
      },
      "Node": {
        "$ref": "#/definitions/kubernetes_Node",
        "javaType": "io.fabric8.kubernetes.api.model.Node"
      },
      "NodeList": {
        "$ref": "#/definitions/kubernetes_NodeList",
        "javaType": "io.fabric8.kubernetes.api.model.NodeList"
      },
      "OAuthAccessToken": {
        "$ref": "#/definitions/os_oauth_OAuthAccessToken",
        "javaType": "io.fabric8.openshift.api.model.OAuthAccessToken"
      },
      "OAuthAccessTokenList": {
        "$ref": "#/definitions/os_oauth_OAuthAccessTokenList",
        "javaType": "io.fabric8.openshift.api.model.OAuthAccessTokenList"
      },
      "OAuthAuthorizeToken": {
        "$ref": "#/definitions/os_oauth_OAuthAuthorizeToken",
        "javaType": "io.fabric8.openshift.api.model.OAuthAuthorizeToken"
      },
      "OAuthAuthorizeTokenList": {
        "$ref": "#/definitions/os_oauth_OAuthAuthorizeTokenList",
        "javaType": "io.fabric8.openshift.api.model.OAuthAuthorizeTokenList"
      },
      "OAuthClient": {
        "$ref": "#/definitions/os_oauth_OAuthClient",
        "javaType": "io.fabric8.openshift.api.model.OAuthClient"
      },
      "OAuthClientAuthorization": {
        "$ref": "#/definitions/os_oauth_OAuthClientAuthorization",
        "javaType": "io.fabric8.openshift.api.model.OAuthClientAuthorization"
      },
      "OAuthClientAuthorizationList": {
        "$ref": "#/definitions/os_oauth_OAuthClientAuthorizationList",
        "javaType": "io.fabric8.openshift.api.model.OAuthClientAuthorizationList"
      },
      "OAuthClientList": {
        "$ref": "#/definitions/os_oauth_OAuthClientList",
        "javaType": "io.fabric8.openshift.api.model.OAuthClientList"
      },
      "ObjectMeta": {
        "$ref": "#/definitions/kubernetes_ObjectMeta",
        "javaType": "io.fabric8.kubernetes.api.model.ObjectMeta"
      },
      "PodList": {
        "$ref": "#/definitions/kubernetes_PodList",
        "javaType": "io.fabric8.kubernetes.api.model.PodList"
      },
      "Quantity": {
        "$ref": "#/definitions/kubernetes_resource_Quantity",
        "javaType": "io.fabric8.kubernetes.api.model.resource.Quantity"
      },
      "ReplicationControllerList": {
        "$ref": "#/definitions/kubernetes_ReplicationControllerList",
        "javaType": "io.fabric8.kubernetes.api.model.ReplicationControllerList"
      },
      "RouteList": {
        "$ref": "#/definitions/os_route_RouteList",
        "javaType": "io.fabric8.openshift.api.model.RouteList"
      },
      "ServiceList": {
        "$ref": "#/definitions/kubernetes_ServiceList",
        "javaType": "io.fabric8.kubernetes.api.model.ServiceList"
      },
      "StatusError": {
        "$ref": "#/definitions/kubernetes_errors_StatusError",
        "javaType": "io.fabric8.kubernetes.api.model.errors.StatusError"
      },
      "TagEvent": {
        "$ref": "#/definitions/os_image_TagEvent",
        "javaType": "io.fabric8.openshift.api.model.TagEvent"
      },
      "Template": {
        "$ref": "#/definitions/os_template_Template",
        "javaType": "io.fabric8.openshift.api.model.template.Template"
      }
    },
    "additionalProperties": true
  }
}