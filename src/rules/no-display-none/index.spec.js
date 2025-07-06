import { testRule } from 'stylelint-test-rule-node'
import plugins from '../../index.js'
import { messages, ruleName } from './index.js'

testRule({
  plugins,
  ruleName,
  config: [true],

  accept: [
    {
      code: '.foo { display: flex; }'
    }
  ],

  reject: [
    {
      code: '.foo { display: none; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3
    }
  ]
})
