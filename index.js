var cc            = require('config-chain'),
    cloud_env     = require('cloud-env')

//return config-chain, with cloud config defaults included
var exports = module.exports = function () {
  var args = [].slice.call(arguments)
    , conf = new cc.ConfigChain()

  args.push(cc.env('OPENSHIFT_NODEJS_'))
  args.push(cc.env('OPENSHIFT_'))
  args.push(cloud_env)

  while(args.length) {
    var a = args.shift()
    if(a) conf.push
          ( 'string' === typeof a
            ? cc.json(a)
            : a )
  }

  return conf
}

// Expose config-chain's interfaces via this module scope:
var cc_interfaces = ['find','parse','json','env','ConfigChain']
cc_interfaces.forEach(function(func){ exports[func] = cc[func]})
