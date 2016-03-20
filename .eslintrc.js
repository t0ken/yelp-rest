module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parser: 'babel-eslint',
  plugins: [
    'eslint-plugin-babel'
    //"eslint-plugin-react" // for React support
  ],
  // enable ECMAScript features
  ecmaFeatures: {
    arrowFunctions: true,
    binaryLiterals: true,
    blockBindings: true,
    classes: true,
    forOf: true,
    generators: true,
    objectLiteralShorthandMethods: true,
    objectLiteralShorthandProperties: true,
    octalLiterals: true,
    templateStrings: true,
    modules: true
    //jsx: true, // for React support
  },
  'keyword-spacing': {
    // require spaces return, throw, case
    'space-return-throw-case': 2,
    // require space after keywords, eg 'for (..)'
    'space-after-keywords': 2
  },
  rules: {
    // Possible Errors
    // list: https://github.com/eslint/eslint/tree/master/docs/rules#possible-errors
    // check debugger sentence
    'no-debugger': 2,
    // check duplicate arguments
    'no-dupe-args': 2,
    // check duplicate object keys
    'no-dupe-keys': 2,
    // check duplicate switch-case
    'no-duplicate-case': 2,
    // disallow assignment of exceptional params
    'no-ex-assign': 2,
    // disallow unreachable code
    'no-unreachable': 2,
    // require valid typeof compared string like typeof foo === 'strnig'
    'valid-typeof': 2,

    // Best Practices
    // list: https://github.com/eslint/eslint/tree/master/docs/rules#best-practices
    // require falls through comment on switch-case
    'no-fallthrough': 2,

    // Stylistic Issues
    // list: https://github.com/eslint/eslint/tree/master/docs/rules#stylistic-issues
    // use single quote, we can use double quote when escape chars
    quotes: [2, 'single', 'avoid-escape'],
    // 2 space indentation
    // comment out due to Webstorm reformatting https://youtrack.jetbrains.com/issue/WEB-19601
    // indent: [2, 2, {"SwitchCase": 1}]
    // add space after comma
    'comma-spacing': 2,
    // put semi-colon
    semi: 2,
    // require spaces operator like var sum = 1 + 1;
    'space-infix-ops': 2,
    // no space before function, eg. 'function()'
    'space-before-function-paren': [2, {"anonymous": "always", "named": "never"}],
    // require space before blocks, eg "function() {"
    'space-before-blocks': [2, "always"],
    // require parens for Constructor
    'new-parens': 2,
    // max 120 length
    'max-len': [2, 120, 2],
    // max 2 consecutive empty lines
    'no-multiple-empty-lines': [2, {max: 2}],
    // require newline at end of files
    'eol-last': 2,
    // no trailing spaces
    'no-trailing-spaces': 2,

    // Strict Mode
    // list: https://github.com/eslint/eslint/tree/master/docs/rules#strict-mode
    // 'use strict' on top
    strict: [2, 'global'],

    // Variables
    // list: https://github.com/eslint/eslint/tree/master/docs/rules#variables
    // disallow use of undefined variables (globals)
    'no-undef': 2
  },

  // Global scoped method and vars
  globals: {
    DTRACE_HTTP_CLIENT_REQUEST: false,
    LTTNG_HTTP_CLIENT_REQUEST: false,
    COUNTER_HTTP_CLIENT_REQUEST: false,
    DTRACE_HTTP_CLIENT_RESPONSE: false,
    LTTNG_HTTP_CLIENT_RESPONSE: false,
    COUNTER_HTTP_CLIENT_RESPONSE: false,
    DTRACE_HTTP_SERVER_REQUEST: false,
    LTTNG_HTTP_SERVER_REQUEST: false,
    COUNTER_HTTP_SERVER_REQUEST: false,
    DTRACE_HTTP_SERVER_RESPONSE: false,
    LTTNG_HTTP_SERVER_RESPONSE: false,
    COUNTER_HTTP_SERVER_RESPONSE: false,
    DTRACE_NET_STREAM_END: false,
    LTTNG_NET_STREAM_END: false,
    COUNTER_NET_SERVER_CONNECTION_CLOSE: false,
    DTRACE_NET_SERVER_CONNECTION: false,
    LTTNG_NET_SERVER_CONNECTION: false,
    COUNTER_NET_SERVER_CONNECTION: false,
    escape: false,
    unescape: false,
    jest: false,
    it: false,
    describe: false,
    xdescribe: false,
    xit: false,
    pit: false,
    expect: false,
    before: false,
    beforeEach: false,
    after: false,
    afterEach: false,
    jasmine: false,
    Iterable: false,
    Class: false
  }
};
