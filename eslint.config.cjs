// eslint.config.cjs

// 1️⃣ Подключаем плагины и парсеры (CommonJS)
const rawVue   = require('eslint-plugin-vue')
const rawTs    = require('@typescript-eslint/eslint-plugin')
const rawPrettier = require('eslint-plugin-prettier')

// «распаковываем» default, если он есть
const vuePlugin     = rawVue.default      || rawVue
const tsPlugin      = rawTs.default       || rawTs
const prettierPlugin = rawPrettier.default || rawPrettier

// Парсеры
const vueParser = require('vue-eslint-parser')
const tsParser  = require('@typescript-eslint/parser')

// 2️⃣ Достаём рекомендованные configs (с падением на пустой объект)
const vueConfigs = vuePlugin.configs ?? {}
const vueRec     = vueConfigs['vue3-recommended'] ?? vueConfigs.recommended ?? {}
const vueRules   = vueRec.rules              ?? {}

const tsConfigs  = tsPlugin.configs ?? {}
const tsRec      = tsConfigs.recommended     ?? {}
const tsRules    = tsRec.rules               ?? {}

const prConfigs  = prettierPlugin.configs ?? {}
const prRec      = prConfigs.recommended     ?? {}
const prRules    = prRec.rules               ?? {}

module.exports = [
  // — 0. Игнорируем node_modules, сборки, декларации
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'vite.config.*',
      '**/*.d.ts'
    ]
  },

  // — 1. Основной flat-конфиг для .js/.ts/.vue
  {
    files: ['**/*.{js,ts,vue}'],

    // 1.1. Парсинг Vue+TS
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser:              tsParser,
        project:             './tsconfig.json',
        extraFileExtensions: ['.vue'],
        ecmaVersion:         'latest',
        sourceType:          'module'
      }
    },

    // 1.2. Плагины
    plugins: {
      vue:                vuePlugin,
      '@typescript-eslint': tsPlugin,
      prettier:           prettierPlugin
    },

    // 1.3. Правила: сперва всё рекомендованное, потом свои оверрайды
    rules: {
      // — Vue3 recommended
      ...vueRules,

      // — TS recommended
      ...tsRules,

      // — Prettier recommended (отключает конфликтные правила)
      ...prRules,

      // — Делаем Prettier-ошибки фатальными
      'prettier/prettier': ['error'],

      // — Ваши кастомные «стилистические» правила
      'quotes':                     ['error', 'single', { avoidEscape: true }],
      'semi':                       ['error', 'always'],
      'no-console':                 ['warn',  { allow: ['warn', 'error'] }],

      // — Пример Vue-override
      'vue/multi-word-component-names': 'off'
    },

    // 1.4. Чтобы VSCode/Vite резолвили алиас `@/…` из tsconfig.json
    settings: {
      'import/resolver': {
        typescript: {}
      }
    }
  }
]
