#config-multipaas

CONFIG-CHAIN WITH CLOUD DEFAULTS INCLUDED!

[Config-multiPaaS](https://github.com/ryanj/config-multipaas) is a [`config-chain`](https://github.com/dominictarr/config-chain) wrapper that automatically sniffs the system environment (`process.env`) for configuration strings that are published by various cloud hosting providers.

MultiPaaS provides the same module interface as [`config-chain`](https://www.npmjs.org/package/config-chain), making it an easy drop-in replacement for most configuration solutions.

See the [`config-chain README`](https://github.com/dominictarr/config-chain) for detailed usage notes:

``` js
  //npm install config-multipaas

  var cc = require('config-multipaas')

  // the default config will now include support for both
  // OpenShift and Heroku server env vars:
  var config = cc()
```

Your server's `PORT` number and bind `IP` configuration should now be automatically resolved in most cloud hosting environments.  When these config strings are missing, local development defaults are provided.

## Default Config

[`Config-chain`](https://github.com/dominictarr/config-chain/#configchai    n-lives-to-serve-only-you) is easy to extend, making it easy to provide your own configuration layers on top of these cloud platform defaults:

config.get(VARNAME) | DEFAULT_VALUE
--------------------|--------------
IP                  | 0.0.0.0
PORT                | 8080
HOSTNAME            | localhost
APP_NAME            | APP_NAME

## Listen up

Make sure to pass `config.get('PORT')` and `config.get('IP')` to your app's `listen` function:

```js
app.listen(config.get('PORT'), config.get('IP'), function () {
  console.log("Listening on "+config.get('IP')+", port "+config.get('PORT'))
});
```

That's it! 

See [`config-chain`](https://github.com/dominictarr/config-chain/#configchain-lives-to-serve-only-you) and the related [API docs](https://github.com/dominictarr/config-chain/#boring-api-docs) for advanced uses of the `cc`, and `config` objects returned by `config-multipaas`.
