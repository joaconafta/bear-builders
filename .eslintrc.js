module.exports = {
  env: {
    node: true,
    commonjs: true,
    browser: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: { 
  
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    'no-unused-vars': ['off']
  }
}
