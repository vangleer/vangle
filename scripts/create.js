// 创建组件
const path = require('path')
const fse = require('fs-extra')
const glob = require('glob')
// ejs模板渲染
const ejs = require('ejs')
const args = require('minimist')(process.argv.slice(2))

const { prompt } = require('enquirer')

const componentSrcDir = resolve('./template/component')
const componentDestDir = resolve('../packages/components')
const docDir = resolve('./template/doc')

let currentName = args._[0]
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

  if (!currentName) {
    const { name } = await prompt({
      type: 'input',
      name: 'name',
      message: `${type} name`
    })
    currentName = name
  }

  fn()
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
      }))
    })
  })
  
}

function createDoc() {
  console.log('创建文档')
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
