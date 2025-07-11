import { testRule } from 'stylelint-test-rule-node'
import plugins from '../../index.js'
import { messages, ruleName } from './index.js'

testRule({
  plugins,
  ruleName,
  config: [true],

  accept: [
    {
      code: '.foo { color: pink; }'
    }
  ],

  reject: [
    {
      code: 'blink { color: pink; }',
      message: messages.expected('blink'),
      line: 1,
      column: 3
    },
    {
      code: 'applet, a { color: pink; }',
      message: messages.expected('applet, a'),
      line: 1,
      column: 3
    },
    {
      code: 'applet, blink { color: pink; }',
      message: messages.expected('applet, blink'),
      line: 1,
      column: 3
    }
  ]
})
