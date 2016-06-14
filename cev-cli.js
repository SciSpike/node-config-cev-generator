#!/usr/bin/env node
'use strict';

var path = require('path');
var fs = require('fs');
var stdio = require('stdio');
var eol = require('os').EOL;
var cev = require('./lib/cev');

var DEFAULT_PRETTY = 2;
var DEFAULT_VERBOSE = false;

var outln = function (text) {
  process.stdout.write(text + eol);
};
var errln = function (text) {
  process.stderr.write(text + eol);
};

var opts = stdio.getopt({
  'separator': {
    key: 's',
    description: "Separator.",
    args: 1,
    mandatory: false,
    default: cev.DEFAULT_SEPARATOR
  },
  'prefix': {
    key: 'p',
    description: "Prefix; use an at-sign ('@') for your application's name.",
    args: 1,
    mandatory: false,
    default: cev.DEFAULT_PREFIX
  },
  'noprefix': {
    key: 'n',
    description: "Do not use a prefix; supercedes --prefix.",
    args: 0,
    mandatory: false,
    default: cev.DEFAULT_NO_PREFIX
  },
  'casing': {
    key: 'c',
    args: 1,
    description: 'Casing: "' + cev.CASING_UPPER + '", "' + cev.CASING_LOWER + '", or "' + cev.CASING_UNCHANGED + '".',
    mandatory: false,
    default: cev.DEFAULT_CASING
  },
  'pretty': {
    key: 'f',
    args: 1,
    description: 'Format prettily with given number of spaces for indentation.',
    mandatory: false,
    default: DEFAULT_PRETTY
  },
  'empties': {
    key: 'e',
    args: 0,
    description: "If present, preserves sections that wouldn't have any environment variables.  Functions are always skipped.",
    mandatory: false,
    default: cev.DEFAULT_EMPTIES
  },
  'verbose': {
    key: 'v',
    args: 0,
    description: "Be verbose.",
    mandatory: false,
    default: DEFAULT_VERBOSE
  }
});

if (opts.verbose) {
  outln('Options: ' + JSON.stringify(opts, 0, 2));
}

var vars = cev.generate(require('config'), {
  noPrefix: opts.noprefix,
  prefix: opts.prefix,
  separator: opts.separator,
  casing: opts.casing,
  empties: opts.empties
});

process.stdout.write(JSON.stringify(vars, 0, opts.pretty));
