// 创建组件
const path = require('path')
const fse = require('fs-extra')
const glob = require('glob')
// ejs模板渲染
const ejs = require('ejs')
const args = require('minimist')(process.argv.slice(2))
const chalk = require('chalk')
const { prompt } = require('enquirer')

const resolve = (dir) => path.resolve(__dirname, dir)
const componentSrcDir = resolve('./template/component')
const componentDestDir = resolve('../packages/components')
const docSrcDir = resolve('./template/doc')
const docDescDir = resolve('../packages/docs')
const step = msg => console.log(chalk.cyan(msg))

let currentName = args._[0]

main()

async function main() {
  remove()
}

async function remove() {
  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Are you sure remove component ${currentName}. Confirm?`
  })

  if (!yes) {
    return
  }

  step('\nRemove Component...')
  removeComponent()

  step('\nRemove Doc...')
  removeDoc()
}

function removeComponent() {
  
  const fileName = convertName(currentName)
  const desc = path.resolve(componentDestDir, fileName)

  if (!fse.pathExistsSync(desc)) return console.warn(`${currentName} does not exists...`)

  fse.removeSync(desc)

  const n1 = path.resolve(componentDestDir, 'index.ts')
  let res = fse.readFileSync(n1, { encoding: 'utf-8' })

  const line = `export * from './${fileName}'`
  res = res.split('\n')
  const index = res.findIndex(v => v === line)

  res.splice(index, 1)

  fse.writeFileSync(n1, res.join('\n'))
}

async function removeDoc() {
  const fileName = convertName(currentName)

  const link = `/${fileName}`

  const linkFileName = path.resolve(docDescDir, '.vitepress/i18n/pages/component.json')
  const linkConfig = await fse.readJson(linkFileName)
  const index = linkConfig.zh.basic.children.findIndex(v => v.link === link)

  if (index === -1) {
    console.warn(`The sidbar of ${currentName} does not exists...`)
  } else {
    linkConfig.zh.basic.children.splice(index, 1)
    fse.writeFileSync(linkFileName, JSON.stringify(linkConfig, null, 2))
  }

  const examplesPath = path.resolve(docDescDir, 'examples', fileName)

  if (fse.pathExistsSync(examplesPath)) {
    fse.removeSync(examplesPath)
  }

  const mdPath = path.resolve(docDescDir, 'zh/component', `${fileName}.md`)

  if (fse.pathExistsSync(mdPath)) {
    fse.removeSync(mdPath)
  }
}

function convertName(name, type) {
  if (!name) return ''
  return name.replace(/[A-Z]/g, (char, index) => {
    return index ? '-' + char : char
  }).toLowerCase()
}