import stylelint from 'stylelint'
import rules from './rules/index.js'

const { createPlugin } = stylelint
const rulesPlugins = Object.keys(rules).map(
  ruleName => createPlugin(`a11y/${ruleName}`, rules[ruleName])
)

/** @type {import('stylelint').Plugin[]} */
export default rulesPlugins
