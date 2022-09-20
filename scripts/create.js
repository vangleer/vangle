// 创建组件
const path = require('path')
const fse = require('fs-extra')
const glob = require('glob')
// ejs模板渲染
const ejs = require('ejs')
const args = require('minimist')(process.argv.slice(2))
const chalk = require('chalk')
const { prompt } = require('enquirer')

const componentSrcDir = resolve('./template/component')
const componentDestDir = resolve('../packages/components')
const docSrcDir = resolve('./template/doc')
const docDescDir = resolve('../packages/docs')
const step = msg => console.log(chalk.cyan(msg))

let currentName = args._[0]
const choices = [
  ['component', createAll],
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

  if (!currentName) {
    const { name } = await prompt({
      type: 'input',
      name: 'name',
      message: `${type} name`
    })
    currentName = name
  }

  await fn()

  if (type === 'doc') {
    fse.removeSync(path.resolve(docDescDir, 'temp'))
  }
}

async function createAll() {

  step('\nCreate Component...')
  await createComponent()

  step('\nCreate Doc...')
  await createDoc()
}

/**
 * 准备模板，模板里包含一个组件的所有文件，将公共部分使用 ejs 模板占位
 * 根据创建的组件名称将模板拷贝到组件目录下
 * 遍历所有 .ejs 结尾的文件，将占位替换位真实的内容
 * 修改输出文件名称，也就是把 .ejs 去掉
 * 最后删除 .ejs 结尾的文件
 */
function createComponent() {
  const fileName = convertName(currentName)
  const desc = path.resolve(componentDestDir, fileName)
  fse.copySync(componentSrcDir, desc)


  return new Promise((resolve, reject) => {
    glob('**', {
      cwd: desc,
      nodir: true
    }, (err, files) => {
      if (err) {
        return reject(err)
      }
      
      const renderData = {
        fileName,
        name: currentName
      }
      Promise.all(files.map(file => {
        const tempPath = path.resolve(desc, file)
        const filePath = path.resolve(desc, file.replace('component', fileName).replace('.ejs', ''))
        return new Promise((resolve2, reject2) => {
          ejs.renderFile(tempPath, renderData, {}, (err, result) => {
            if (err) {
              reject2(err)
            } else {
              fse.writeFileSync(filePath, result)
              fse.removeSync(tempPath)
              resolve2(result)
            }
          })
        })
      })).then(resolve, reject)
    })
  })
  
}

/**
 * 创建 md 文件 packages/docs/zh/component/*.md
 * 创建 examples 
 */
function createDoc() {
  const fileName = convertName(currentName)
  const desc = path.resolve(docDescDir, 'temp')
  fse.copySync(docSrcDir, desc)

  addSidbar(fileName)

  const renderData = {
    fileName,
    name: currentName
  }
  
  return new Promise((resolve, reject) => {
    glob('**', {
      cwd: desc,
      nodir: true
      }, (err, files) => {
        if (err) {
          reject(err)
        }
  
        Promise.all(files.map(file => {
          const realName = file.replace('.ejs', '').replace('component', fileName)
          const tempPath = path.resolve(desc, file)
          let filePath = tempPath
          if (file.indexOf('.vue') !== -1) {
            filePath = path.resolve(docDescDir, 'examples', fileName, realName)
            fse.ensureDirSync(filePath.replace(realName, ''))
          } else if (file.indexOf('.md') !== -1) {
            filePath = path.resolve(docDescDir, 'zh/component', realName)
          }
          return new Promise((resolve2, reject2) => {
            ejs.renderFile(tempPath, renderData, {}, (err, result) => {
              if (err) {
                reject2(err)
              } else {
                fse.writeFileSync(filePath, result)
                resolve2(result)
              }
            })
          })
        })).then(resolve, reject)
      })
  })
  
}

async function addSidbar(fileName) {
  const link = {
    "link": `/${fileName}`,
    "text": currentName
  }
  const linkFileName = path.resolve(docDescDir, '.vitepress/i18n/pages/component.json')
  const linkConfig = await fse.readJson(linkFileName)
  linkConfig.zh.basic.children.push(link)
  fse.writeFileSync(linkFileName, JSON.stringify(linkConfig, null, 2))
}

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

function convertName(name, type) {
  if (!name) return ''
  return name.replace(/[A-Z]/g, (char, index) => {
    return index ? '-' + char : char
  }).toLowerCase()
}
