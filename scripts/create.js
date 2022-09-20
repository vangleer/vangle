// 创建组件
const path = require('path')
const fs = require('fs-extra')
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
  |-- button
    |-- index.ts
    |-- src
    |   |-- button.ts
    |   |-- button.vue
    |   |-- button.less
    |-- __test__
*/
function createComponent() {
  console.log('创建组件')
  const desc = path.resolve(componentDestDir, currentName)
  fs.copySync(componentSrcDir, desc)


  return new Promise((resolve, reject) => {
    glob('**', {
      cwd: desc,
      nodir: true
    }, (err, files) => {
      if (err) {
        return reject(err)
      }
      
      const renderData = {
        fileName: convertName(currentName),
        name: currentName
      }
      Promise.all(files.map(file => {
        const tempPath = path.resolve(desc, file)
        const filePath = path.resolve(desc, file.replace('component', renderData.fileName).replace('.ejs', ''))
        return new Promise((resolve2, reject2) => {
          ejs.renderFile(tempPath, renderData, {}, (err, result) => {
            if (err) {
              reject2(err)
            } else {
              fs.writeFileSync(filePath, result)
              fs.removeSync(tempPath)
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
