import { testRule } from 'stylelint-test-rule-node'
import plugins from '../../index.js'
import { messages, ruleName } from './index.js'

testRule({
  plugins,
  ruleName,
  config: [true],

  accept: [
    {
      code: 'a { color: pink; }'
    }
  ],

  reject: [
    {
      code: 'body[link] { color: pink; }',
      message: messages.expected('body[link]'),
      line: 1,
      column: 3
    },
    {
      code: 'a, img[datasrc] { color: pink; }',
      message: messages.expected('a, img[datasrc]'),
      line: 1,
      column: 3
    },
    {
      code: 'img[align], a[name] { color: pink; }',
      message: messages.expected('img[align], a[name]'),
      line: 1,
      column: 3
    }
  ]
})
