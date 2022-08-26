# Vange

Vue3 UI Components Library

注：该仓库主要记录从 0 搭建一个组件库的方法，包括组件文档的编写

### 克隆代码到本地

```shell

# github
git clone https://github.com/vangleer/vangle.git

# gitee
git clone https://gitee.com/vangleer/vangle.git

```

### 安装依赖

```
pnpm install
```
> 我当前的 pnpm 版本是 6.32.6

### 相关命令

```json
{
  "scripts": {
    "play": "pnpm dev --filter ./play", // 本地查看
    "docs:dev": "pnpm docs:dev --filter ./packages/docs", // 本地文档
    "docs:build": "pnpm docs:build --filter ./packages/docs", // 文档打包
    // ...
  }
}
```