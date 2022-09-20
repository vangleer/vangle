// 创建组件
const path = require('path')
const fs = require('fs')
const args = require('minimist')(process.argv.slice(2))
const { prompt } = require('enquirer')

const choices = [
  ['component', createComponent],
  ['doc', createDoc]
]

main()

async function main() {
  const { type } = await prompt({
    type: 'select',
    name: 'type',
    message: 'Please select create type',
    choices: choices.map(([v]) => v)
  })

  const [, fn] = choices.find(([v]) => v === type)

  fn()
}

function createComponent() {
  console.log('创建组件')
}

function createDoc() {
  console.log('创建文档')
}
console.log(args, 'argsargsargsargs')
