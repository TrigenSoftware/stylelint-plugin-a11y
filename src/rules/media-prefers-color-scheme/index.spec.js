import { testRule } from 'stylelint-test-rule-node'
import plugins from '../../index.js'
import { messages, ruleName } from './index.js'

testRule({
  plugins,
  ruleName,
  config: [true],

  accept: [
    {
      code: 'a { }'
    },
    {
      code: '.foo { color: red } @media screen and (prefers-color-scheme: dark) { .foo { color: blue } }'
    },
    {
      code: '.bar { background-color: red } @media screen and (prefers-color-scheme: dark) { .bar { background-color: blue } }'
    }
  ],

  reject: [
    {
      code: 'a { color: red; }',
      message: messages.expected('a'),
      line: 1,
      column: 3
    },
    {
      code: 'a { color: red; } @media screen and (prefers-color-scheme: dark) { a { background-color: red; } }',
      message: messages.expected('a'),
      line: 1,
      column: 3
    },
    {
      code: '.foo { background-color: red;}',
      message: messages.expected('.foo'),
      line: 1,
      column: 3
    },
    {
      code: '.bar { color: red; } .baz { background-color: red; } @media screen and (prefers-color-scheme: dark) { .baz { color: blue; } }',
      warnings: [
        {
          message: messages.expected('.bar'),
          line: 1,
          column: 3
        },
        {
          message: messages.expected('.baz'),
          line: 1,
          column: 24
        }
      ]
    },
    {
      code: '.foo { background-color: red; } @media screen and (prefers-color-scheme) { .foo { color: red; } }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3
    }
  ]
})
