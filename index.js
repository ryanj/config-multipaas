var cc            = require('config-chain'),
    cloud_env     = require('cloud-env')

var filterundefs = function(params){
  response = {}
  if( params && typeof params == 'object'){
    for(setting in params){
      if( params[setting] !== undefined ){
        response[setting] = params[setting];
      }
    }
  }
  return response
}

var get = function (key, where) {
  if (where) {
    where = this.sources[where]
    if (where) where = where.data
    if (where && Object.hasOwnProperty.call(where, key)) return where[key]
    return undefined
  }
  if (this.list[0][key] !== undefined) return this.list[0][key]
  if (Object.hasOwnProperty.call(cloud_env.defaults.dev, key)) return cloud_env.defaults.dev[key] 
  return undefined;
}

//return config-chain, with cloud config defaults included
var exports = module.exports = function () {
  var args = [].slice.call(arguments)
    , conf = new cc.ConfigChain()

  // app-components should be easy to find
  conf.components = cloud_env.components
  conf.component = cloud_env.component

  conf.get = get
  while(args.length) {
    var a = args.shift()
    if(a) conf.push
          ( 'string' === typeof a
            ? cc.json(a)
            : a )
  }

  return conf
    .addEnv('COMPONENT_', 'app-components')
    .add(cc.env('OPENSHIFT_NODEJS_'), 'openshift-nodejs')
    .add(cc.env('OPENSHIFT_'), 'openshift-env')
    .add(filterundefs(cloud_env.defaults.openshift), 'v2-defaults')
    .add(filterundefs(cloud_env.defaults.cloud), 'cloud-defaults')
    .add(filterundefs(cloud_env.defaults.v3), 'openshift-v3-defaults')
}

// Expose config-chain's interfaces via this module scope:
var cc_interfaces = ['find','parse','json','env','ConfigChain','on']
cc_interfaces.forEach(function(func){ exports[func] = cc[func]})
cc_interfaces.forEach(function(func){ module.exports[func] = cc[func]})
exports['components'] = cloud_env.components;
exports['component'] = cloud_env.component;
module.exports['components'] = cloud_env.components;
module.exports['component'] = cloud_env.component;
