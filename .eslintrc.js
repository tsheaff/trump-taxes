module.exports = {
  'env': {
    'browser': true,
    'node': true,
  },
  'plugins': ['react'],
  'parser': 'babel-eslint',
  'extends': 'airbnb', /* see https://github.com/airbnb/javascript */
  'rules': {
    // eslint
    'strict': 0,
    'space-before-function-paren': ['error', 'never'],
    'func-names': 'off',
    'no-console': 'error',
    'max-len': 'off',
    'no-mixed-operators': 'off',
    'global-require': 'error',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'object-shorthand': ['error', 'never'],
    'no-return-assign': ['error', 'except-parens'],
    'no-param-reassign': ['error', {
      'props': false
    }],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'arrow-parens': ['error', 'always'],
    'arrow-body-style': 'off',
    'no-else-return': 'off',
    'no-multi-spaces': 'off',
    'no-lonely-if': 'off',

    // import
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'import/extensions': ['error', {
      'js': 'never',
      'json': 'always'
    }],

    // react
    'react/prefer-stateless-function': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/sort-comp': 'off',
    'react/require-default-props': 'off',
    'react/forbid-prop-types': ['error', { 'forbid': ['array', 'any'] }],
  },
  settings: {
    'import/resolver': {
      'webpack': {},
      'babel-module': {}
    }
  }
}
