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

    // jsx-a11y
    'jsx-a11y/accessible-emoji': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'off',
    'jsx-a11y/aria-props': 'off',
    'jsx-a11y/aria-proptypes': 'off',
    'jsx-a11y/aria-role': 'off',
    'jsx-a11y/aria-unsupported-elements': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/html-has-lang': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/lang': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-access-key': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/no-distracting-elements': 'off',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/no-onchange': 'off',
    'jsx-a11y/no-redundant-roles': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/role-has-required-aria-props': 'off',
    'jsx-a11y/role-supports-aria-props': 'off',
    'jsx-a11y/scope': 'off',
    'jsx-a11y/tabindex-no-positive': 'off',
  },
  settings: {
    'import/resolver': {
      'webpack': {},
      'babel-module': {}
    }
  }
}
