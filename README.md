# NPM Package Publisher

This action tries to publish a new version of your npm package.

## Inputs

### `packageName`

The name of the NPM package to be distributed.


### `access`

The access level for the package. `restricted` or `public`.

## Outputs

### `version`

The version that was published

## Example usage

uses: actions/npm-publisher
with:
  access: 'public'