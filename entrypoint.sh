#!/bin/sh -l

$PACKAGE_NAME = $1
$ACCESS_LEVEL = $2

$LAST_VERSION = `git describe --abbrev=0 --tags`

if `npm publish --access ${ACCESS_LEVEL}` ; then
  echo 'Succesfully published version.'
  ::set-output name=version::$LAST_VERSION
else
  echo 'NPM Version already exists.'
  ::set-output name=version::$LAST_VERSION
fi