import { testRule } from 'stylelint-test-rule-node'
import plugins from '../../index.js'
import { messages, ruleName } from './index.js'

testRule({
  plugins,
  ruleName,
  config: [true],

  accept: [
    {
      code: '.foo { }'
    },
    {
      code: '.foo { font-size: 15px; }'
    },
    {
      code: '.foo { font-size: 12pt; }'
    },
    {
      code: '.bar { FONT-SIZE: 15PX; }'
    },
    {
      code: '.baz { font-size: 1em; }'
    }
  ],

  reject: [
    {
      code: '.foo { font-size: 10px; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3
    },
    {
      code: '.foo { font-size: 3pt; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3
    },
    {
      code: '.bar { FONT-SIZE: 8PX; }',
      message: messages.expected('.bar'),
      line: 1,
      column: 3
    }
  ]
})

testRule({
  plugins,
  ruleName,
  config: [
    true,
    {
      thresholdInPixels: 16
    }
  ],

  accept: [
    {
      code: '.foo { }'
    },
    {
      code: '.foo { font-size: 16px; }'
    },
    {
      code: '.foo { font-size: 12pt; }'
    },
    {
      code: '.bar { FONT-SIZE: 16PX; }'
    },
    {
      code: '.baz { font-size: 1em; }'
    }
  ],

  reject: [
    {
      code: '.foo { font-size: 15px; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3
    },
    {
      code: '.foo { font-size: 3pt; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3
    },
    {
      code: '.bar { FONT-SIZE: 8PX; }',
      message: messages.expected('.bar'),
      line: 1,
      column: 3
    }
  ]
})
