var FormData = require('form-data'),
    url = require('url'),
    util = require('util');

require('sugar');


 /**
  * kubernetes client.
  *
  * Parameters
  * @protocol http or https
  * @host k8s API server host
  * @version k8s API server version
  * @token k8s API server token
  */

var VcapClient = module.exports = function (info) {

    // ~~~~~ PRIVATE
    var self = this;

    if (! info.host) {
        return new TypeError('host must be provided');
    }

    if (! info.version) {
        return new TypeError('version must be provided');
    }

    if (info.protocol == 'https' && !info.token) {
        return new TypeError('token must be provided as the protocol is https');
    }

    var request = require('./request')(info);

    // ~~~~~ PUBLIC

    var Collections = require('./collections');
    var collections = new Collections(request);

    // ~ minions
    this.minions = collections.create('minions');

    // ~ events
    this.events = collections.create('events');

    // ~ namespaces
    this.namespaces = collections.create('namespaces');

    // ~ pods
    this.pods = collections.create('pods', null, [{ method: 'log', nested: false }], null);

    // ~ services
    this.services = collections.create('services');

    // ~ replicationControllers
    this.replicationControllers = collections.create('replicationControllers');

    // ~ deployments
    this.deployments = collections.create('deployments', null, null, {apiPrefix: "apis/extensions", apiVersion: "v1beta1"});

    // ~ replicasets
    this.replicasets = collections.create('replicasets', null, null, {apiPrefix: "apis/extensions", apiVersion: "v1beta1"});

     // ~ ingresses
     this.ingresses = collections.create('ingresses', null, null, {apiPrefix: "apis/extensions", apiVersion: "v1beta1"});

    // ~ nodes
    this.nodes = collections.create('nodes');

    // ~ endpoints
    this.endpoints = collections.create('endpoints');

    // ~ proxy minions
    this.proxyMinions = collections.create('proxy/minions');

    // ~ proxy nodes
    this.proxyNodes = collections.create('proxy/nodes');

    // ~ proxy pods
    this.proxyPods = collections.create('proxy/pods');

    // ~ proxy services
    this.proxyServices = collections.create('proxy/services');

    // ~ watch pods
    this.watchPods = collections.create('watch/pods');
    
    // Allow users to create custom collections also
    this.createCollection = collections.create;
};
