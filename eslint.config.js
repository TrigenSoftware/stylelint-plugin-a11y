import { globalIgnores } from 'eslint/config'
import baseConfig from '@trigen/eslint-config'
import moduleConfig from '@trigen/eslint-config/module'
import testConfig from '@trigen/eslint-config/test'
import env from '@trigen/eslint-config/env'

export default [
  globalIgnores(['**/package/']),
  ...baseConfig,
  ...moduleConfig,
  ...testConfig,
  env.node,
  {
    rules: {
      'no-magic-numbers': 'off',
      'radix': 'off',
      'import/no-default-export': 'off'
    }
  }
]
