# CLAUDE.md
AI代理修改仓库时必须遵守的架构指引与硬性规则
> 严格要求：除非我明确推翻，否则下面所有规则必须遵守，不得擅自改动。未经许可严禁执行git命令。

## 项目总览
个人博客，Astro 6.x 纯静态生成(SSG)。
设计风格：积木粗野风；主色调蓝色 `#0284c7`。
站点内容为中文，附带双语SEO元数据。
无SSR，所有页面提前预渲染为静态HTML。

## 可用命令
```bash
pnpm dev          # 启动本地开发服务 http://localhost:3000，热更新
pnpm build        # 打包静态资源输出到 dist 文件夹
pnpm preview      # 预览打包后的站点
pnpm lint         # TS类型检查，执行 tsc --noEmit
```

## 目录权责对照表（修改任何文件前，必须先看本表）
> 判断修改目标文件的唯一依据
- `src/pages/` → 路由文件夹，每一个astro文件对应一条网页地址。**禁止随意重命名，会破坏永久链接**
- `src/layouts/Layout.astro` → 全站基础父布局。导航栏、页脚、全局头部元标签、页面过渡动画、自定义光标全部在此注入。
  > ⚠️ 高危文件：改动此处等于修改全站所有页面。修改前务必二次确认。页面独有的改动，写到对应页面文件，不要改全局布局。
- `src/content/posts/` → 博客文章Markdown，**仅存放内容，禁止在这里写页面逻辑代码**
- `src/content/talks/` → 碎碎念/动态Markdown，仅存放内容
- `src/utils/` → TS工具函数，文章分页、筛选、阅读时长等业务逻辑
- `src/components/react/` → React19交互组件：AI对话、AI摘要、Waline评论、标签筛选、首页横幅
- `src/components/svelte/` → Svelte5轻量小组件：自定义光标、日历、图片灯箱、分享按钮、数据统计、动态流
- `src/config/` → 全站配置：站点信息、导航、第三方服务密钥配置、友链数据，只放常量，不写页面渲染代码
- `src/index.css` → 全局样式、Tailwind v4、积木粗野风设计变量
- `astro.config.mjs` → React/Svelte框架集成、Vite配置
- `tsconfig.json` → 路径别名 `@/*` 指向项目根目录
- `vercel.json` → Vercel部署规则，预览环境禁止搜索引擎收录

## 硬性禁止清单，没有我的许可绝对不能修改
1. 不要重命名 `src/pages/` 内任何文件，防止网址失效
2. 非全站通用需求，一律不准修改 `Layout.astro`。单页专属改动写到对应页面文件。
3. React组件只能放在react文件夹，Svelte组件只能放在svelte文件夹，禁止互相迁移
4. 未经允许不要新增环境变量、API密钥
5. 不要修改内容集合的校验规则，`z.any()`宽松校验是刻意设计的
6. 没有我的批准，不准安装任何新的 pnpm/npm 依赖包
7. 项目永远保持纯静态SSG，禁止新增SSR、后端接口、Astro服务端点

## 组件与孤岛开发规范
- 交互组件必须使用 Astro 客户端指令：`client:load` 或 `client:visible`
- React、Svelte 只做交互小岛；页面布局、HTML标记写在`.astro`文件

## 样式与设计规范（积木粗野风）
- 主色：`#0284c7`
- 标准积木阴影写法：
```css
border-4 border-sky-500 shadow-[4px_4px_0px_0px_#0284c7]
```
- 当前使用 Tailwind v4，采用 `@tailwindcss/vite`，**不存在 tailwind.config.js**，自定义主题写在 `src/index.css`

## 路由与重定向规则
- 动态路由：`posts/[id].astro`、`category/[categoryName].astro`、`tag/[tagName].astro`、`talk/[id].astro`
- RSS订阅：`rss.xml.ts`；站点地图：`sitemap.xml.ts`

## 接到修改需求之后，固定执行流程
1. 查阅本CLAUDE.md目录对照表，筛选出候选修改文件，**先列出文件清单，再动手改代码**
2. 如果改动属于全站生效，先判断放到Layout.astro还是src/config配置文件。文字类站点设置优先放到config。
3. 修改做到最小改动，禁止无必要大范围重构。
4. 修改完成后自检，不能引入TS报错。
5. 结束时输出所有变更文件的git diff摘要。