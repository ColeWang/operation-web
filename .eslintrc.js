module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'indent': ['error', 2],
    'vue/script-indent': ['error', 2, { 'baseIndent': 1 }], // script标签缩进
    'no-tabs': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/member-delimiter-style': 'off', // 分号
    '@typescript-eslint/ban-types': 'off', // 允许 Function定义
    '@typescript-eslint/no-explicit-any': 'off', // 关闭any类型的警告
    '@typescript-eslint/interface-name-prefix': 'off', // interface前缀
    '@typescript-eslint/camelcase': 'off', // 后台接口 非驼峰
    '@typescript-eslint/no-use-before-define': 'off', // 声明调用
    '@typescript-eslint/no-inferrable-types': 'off', // 不推断
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'indent': 'off'
      }
    }
  ]
}
