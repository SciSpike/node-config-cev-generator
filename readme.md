# Node.js Custom Environment Variable Generator for `config`-Based Projects

This is a handy little utility that will generate JSON suitable for use as a [`config`](https://www.npmjs.com/package/config)-based project's `config/custom-environment-variables.json`.  (Note that throughout this project "cev" stands for "custom environment variables".)

> DEPRECATION NOTE:
> Since the time this package was created, SciSpike has been acquired by [Northscaler](https://www.northscaler.com).
> There will be no further development on this module.
> Instead, development will continue at [@northscaler/config-custom-environment-variables-generator](https://www.npmjs.com/package/@northscaler/config-custom-environment-variables-generator).
> You can see all of Northscaler's public Node.js modules at https://www.npmjs.com/search?q=%40northscaler.

See blog post at http://www.scispike.com/blog/get-rid-of-node-js-config-grunt-work

It really comes in handy when your configuration starts to get big and you forget to keep
your `config/custom-environment-variables.json` file in sync with the rest of your configuration.

## Example
```
$ npm install -g config-cev-generator
# change into a config-based node.js project...
$ cev
```
If your project's configuration is
```
{
  "foo": {
    "bar": "snafu",
    "goo": "juju"
  }
}
```
then the preceding command will generate JSON to stdout suitable for use as your project's `config/custom-environment-variables.json`:
```
{
  "foo": {
    "bar": "NODE_APP_FOO_BAR",
    "goo": "NODE_APP_FOO_GOO"
  }
}
```

To save the output, just direct it to a file:

`$ cev > config/custom-environment-variables.json`

## Prerequisites

The generator requires that your project have a valid `config`-based configuration in order to work properly.

## Tips
 - The default environment variable prefix is `NODE_APP`.  Customize with `-p` or `--prefix`.
 - The default word separator is `_`.  Customize with `-s` or `--separator`.
 - Run `cev --help` for more information.
