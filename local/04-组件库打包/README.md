# 手把手从零搭建一个 vue3 组件库 (四)：使用 vite 打包并发布到 npm

前面几篇文章分享了一个组件库的搭建、组件的编写、样式的处理和编写组件库文档。

今天这篇文章主要来分享一下组件库的打包和发布

话不多说，开搞！！！

[在线预览](https://vangleer.github.io/vangle)

[github 地址](https://github.com/vangleer/vangle)

[gitee 地址](https://gitee.com/vangleer/vangle)

## 准备工作

- 在 packages 目录下创建 vangle 目录，这个目录就是我们要发布的，在这个目录下初始化要发布的 package.json，填写必要的信息

```json
{
  "name": "vangle",
  "version": "1.0.16",
  "description": "A Component Library for Vue 3",
  "keywords": ["vangle", "component library", "ui framework", "ui", "vue"],
  "homepage": "https://vangleer.github.io/vangle/",
  "bugs": {
    "url": "https://github.com/vangleer/vangle/issues"
  },
  "license": "MIT",
  "main": "dist/index.es.js",
  "module": "dist/index.es.ts",
  "unpkg": "dist/index.umd.js",
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.umd.js",
      "types": "./dist/types/vangle/index.d.ts"
    },
    "./*": "./*"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/vangleer/vangle.git"
  },
  "publishConfig": {
    "access": "public"
  },
  "style": "dist/style.css",
  "scripts": {},
  "author": "vangleer",
  "peerDependencies": {
    "vue": "^3.2.0"
  }
}
```

- 新建 index.ts 将 packages/components 目录下的组件全部导出，附加 install 方法注册全部组件

```typescript
export * from '../components'
import type { App, Plugin } from 'vue'

import { VanButton } from '@vangle/components'

const components = [VanButton] as Plugin[]

const INSTALLED_KEY = Symbol('INSTALLED_KEY')
export const install = (app: App) => {
  if (app[INSTALLED_KEY]) return
  app[INSTALLED_KEY] = true
  components.forEach(comp => app.use(comp))
}

export default {
  install
}
```

## 编写打包脚本

**步骤：**

- 根目录新建 scripts/build.js

```javascript
const path = require('path')
const fs = require('fs')

// 使用vite打包
const { build, defineConfig } = require('vite')

// 用到的插件
const vue = require('@vitejs/plugin-vue')
const dts = require('vite-plugin-dts')
const DefineOptions = require('unplugin-vue-define-options/vite')

// 根目录
const rootDir = path.resolve(__dirname, '../')

// 打包后的目录
const outDir = resolve('packages/vangle/dist')

const baseConfig = defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    dts({
      include: ['packages/vangle', 'packages/components'],
      outputDir: path.resolve(outDir, 'types')
    })
  ],
  build: {
    lib: {
      entry: resolve('packages/vangle/index.ts'),
      name: 'vangle',
      fileName: format => `index.${format}.js`
    },
    outDir,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})

main()

async function main() {
  // build
  await build(baseConfig)

  await copyFiles()
}

async function copyFiles() {
  // fs.copyFileSync(
  //   resolve('packages/vangle/package.json'),
  //   resolve('packages/vangle/dist/package.json')
  // )
  fs.copyFileSync(resolve('README.md'), resolve('packages/vangle/README.md'))
}

function resolve(...urlOrUrls) {
  return path.resolve(rootDir, ...urlOrUrls)
}
```

- 在 package.json 中添加打包脚本

```json
{
  "scripts": {
    "build": "node ./scripts/build.js"
  }
}
```

## 发布到 npm 上

**步骤：**

1. 如果没有传入版本，提示可选版本
2. 根据所选版本，更新所有包 package.json 的版本号
3. git 提交并打上 tag
4. npm 发布，没有登录的话会提示先登录

- 根目录新建 scripts/release.js

```javascript
const { execSync } = require('child_process')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

const semver = require('semver')
const { prompt } = require('enquirer')
const args = require('minimist')(process.argv.slice(2))
const currentVersion = require('../package.json').version

const packages = ['vangle', 'components']

const versionIncrements = ['patch', 'minor', 'major']
const step = msg => console.log(chalk.cyan(msg))
const getPkgRoot = pkg => path.resolve(__dirname, '../packages/' + pkg)

const inc = i => semver.inc(currentVersion, i)

async function main() {
  let targetVersion = args._[0]

  // 如果没有传入版本，提示选择
  if (!targetVersion) {
    // no explicit version, offer suggestions
    const { release } = await prompt({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom'])
    })

    if (release === 'custom') {
      targetVersion = (
        await prompt({
          type: 'input',
          name: 'version',
          message: 'Input custom version',
          initial: currentVersion
        })
      ).version
    } else {
      targetVersion = release.match(/\((.*)\)/)[1]
    }
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`
  })

  if (!yes) {
    return
  }

  // update all package versions and inter-dependencies
  step('\nUpdating cross dependencies...')
  updateVersions(targetVersion)

  // publish packages
  step('\nPublishing packages...')

  for (const pkg of packages) {
    await publishPackage(pkg, targetVersion)
  }
}

main()

function updateVersions(version) {
  // 1. update root package.json
  updatePackage(path.resolve(__dirname, '..'), version)
  // 2. update all packages
  packages.forEach(p => updatePackage(getPkgRoot(p), version))
}

function updatePackage(pkgRoot, version) {
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

async function publishPackage(pkgName, version) {
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  if (pkg.private) {
    return
  }

  step(`Publishing ${pkgName}...`)
  console.log(pkgRoot, 'pkgRootpkgRoot')

  try {
    execSync('git add .', { stdio: 'inherit' })

    execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' })
    execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' })
    execSync('npm publish', { cwd: pkgRoot, stdio: 'inherit' })

    console.log(chalk.green(`Successfully published ${pkgName}@${version}`))
  } catch (e) {
    if (e.stderr.match(/previously published/)) {
      console.log(chalk.red(`Skipping already published: ${pkgName}`))
    } else {
      throw e
    }
  }
}
```

- 在 package.json 中添加发布脚本

```json
{
  "scripts": {
    "release": "node ./scripts/release.js"
  }
}
```
