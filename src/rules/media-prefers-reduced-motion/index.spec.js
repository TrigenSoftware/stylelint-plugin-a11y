import { testRule } from 'stylelint-test-rule-node'
import plugins from '../../index.js'
import { messages, ruleName } from './index.js'

testRule({
  plugins,
  ruleName,
  config: [true],
  fix: true,

  accept: [
    {
      code: 'a { }'
    },
    {
      code: 'div { transition: none; }'
    },
    {
      code: '.foo { transition: none } @media screen and (prefers-reduced-motion: reduce) { .foo { transition: none } }'
    },
    {
      code: '.bar { animation: none } @media screen and (prefers-reduced-motion) { .bar { animation: none } }'
    },
    {
      code: 'a { animation-name: skew; } @media screen and (prefers-reduced-motion) { a { animation: none } }'
    },
    {
      code: '.foo { transition: all; @media (prefers-reduced-motion: reduce) { transition: none; } }'
    },
    {
      code: '.foo { transition: all 5s; color: red; } @media screen and (prefers-reduced-motion: reduce) { .foo { transition: none } }'
    }
  ],

  reject: [
    {
      code: 'a { animation-name: skew; }',
      fixed:
        'a { animation-name: skew; }\n@media screen and (prefers-reduced-motion: reduce) {\na { animation: none;\n}\n}',
      message: messages.expected('a'),
      line: 1,
      column: 3
    },
    {
      code: 'a { animation-name: skew; } @media screen and (prefers-reduced-motion) { a { transition: none; } }',
      fixed:
        'a { animation-name: skew; }\n@media screen and (prefers-reduced-motion: reduce) {\na { animation: none;\n}\n} @media screen and (prefers-reduced-motion) { a { transition: none; } }',
      message: messages.expected('a'),
      line: 1,
      column: 3
    },
    {
      code: '.foo { animation: 1s ease-in; } @media screen and (prefers-reduced-motion) { .foo { animation: 1s ease-in; } }',
      fixed:
        '.foo { animation: 1s ease-in; }\n@media screen and (prefers-reduced-motion: reduce) {\n.foo { animation: none;\n}\n} @media screen and (prefers-reduced-motion) { .foo { animation: 1s ease-in; } }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3
    },
    {
      code: '.foo { transition: all 5s; color: red; }',
      fixed: '.foo { transition: all 5s; color: red; }\n@media screen and (prefers-reduced-motion: reduce) {\n.foo { transition: none;\n}\n}',
      message: messages.expected('.foo'),
      line: 1,
      column: 3
    }
  ]
})
