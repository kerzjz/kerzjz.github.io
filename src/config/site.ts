/**
 * 站点基础配置
 * 包含站点名称、作者、URL、头像、社交账号、外部服务等
 */

export const siteConfig = {
  /** 站点标题（显示在导航栏和浏览器标题中） */
  title: "Ker ZJZ",
  /** 首字母（分享海报） */
  initial: "K", 
  /** 站点副标题（用 "/" 分隔多句，首页打字动画会轮流展示） */
  subtitle: "HI I AM KERZJZ / KZ AND YOU",
  /** 站点描述（用于 SEO 和社交分享） */
  description: "Ker ZJZ",
  /** 作者名 */
  author: "Ker ZJZ",
  /** 站点 URL（影响 Canonical、Sitemap、OG、RSS 等所有绝对链接） */
  url: "https://kerzjz.qzz.io", // Base URL of the site
  /** 作者头像 URL（导航栏、关于页、AuthorCard 等处使用） */
  avatar: "/images/big.webp",
  /** 作者签名/座右铭（显示在 AuthorCard 侧边栏） */
  signature: "Stay hungry, stay foolish. ",
  defaultBgUrl: "/images/bg.jpg",
  fallbackUrl: "https://kerzjz.github.io/newblog",
  
  /** 社交链接（AuthorCard、页脚等处使用，关于页的“找到我”在下方，需单独修改） */
  socials: {
    github: "https://github.com/kerzjz",
    /** GitHub 用户名（关于页拉取仓库列表用，大写） */
    githubUser: "KERZJZ",
    bilibili: "https://space.bilibili.com/3546746017810685",
    /** Bilibili mid（关于页拉取视频列表用） */
    bilibiliMid: "3546746017810685",
    /** AuthorCard 上显示的 Bilibili 文字 */
    bilibiliDisplayName: "Ker_ZJZ",
    email: "kerzjz@outlook.com",
    website: "https://kerzjz.qzz.io",
    /** 关于页额外社交链接 */
    wechat: "@Ker ZJZ",
    qq: "3869843633",
    /** QQ群链接（欢迎提示中使用） */
        /** 订阅链接（欢迎提示中的"订阅"按钮，指向 GitHub Issues 等） */
    subscribe: "https://github.com/kerzjz/kerzjz.github.io/issues",
  },


  /** 访问统计 — Umami（可配多个实例，留空数组则不加载） */
  analytics: {
    umami: [
      { src: "https://cloud.umami.is/script.js", id: "e0312402-c63e-47b2-ba66-e4a7ab208eef" },
    ],
    /** Umami 网站 ID（StatsDashboard 面板使用） */
    umamiWebsiteId: 'e0312402-c63e-47b2-ba66-e4a7ab208eef',
    /** Umami 公开面板链接 */
    umamiDashboard: 'https://stats.upxuu.com/share/sFftlqBkgk2z9JM2',
    /** 站点统计 API 基础地址 */
    statsApiBase: 'https://blogapi.476543.xyz',
    /** 站点统计 API（页脚访问量/在线人数、欢迎提示调用） */
    statsApi: {
      alltime: 'https://blogapi.476543.xyz/statsapi/alltime',
      active: 'https://blogapi.476543.xyz/api/active',
    },
    /** 文章页浏览统计 API（ShareButton 中用于显示阅读次数） */
    pageViewsApi: 'https://beat.345696.xyz/api/stats',
    /** 页面浏览追踪 API（Layout 中用于发送 beacon） */
    pageTrackApi: 'https://beat.345696.xyz/api/track',
    /** 天气 API（欢迎提示中显示访客位置和天气） */
    weatherApi: 'https://uapis.cn/api/v1/misc/weather',
    /** Umami 自托管实例域名（隐私政策页面引用） */
    umamiInstance: 'stats.upxuu.com',
    /** AI 后端 API 基础域名（隐私政策页面引用） */
    aiApiBase: 'blogapi.upxuu.com',
  },

  /** 图片 CDN / 默认封面 */
  assets: {
    /** 文章列表缺省封面图（为空时使用随机图） */
    defaultPostCover: "/images/big.webp",
    /** 随机图服务地址（当文章无封面时 fallback 使用） */
    randomImage: "/images/me.webp",
    /** 站点 favicon 路径（相对站点根目录） */
    favicon: "/images/me.webp",
    /** 分享海报中使用的头像（绝对路径，用于 Canvas 绘制） */
    posterAvatar: "/images/me.webp",
  },

  /** 站点运行起始时间（页脚"已在互联网中航行"计时器用） */
  startTime: new Date(2026, 6, 31, 8, 40, 0),

  /** 外部链接安全配置 — 可信域名（点击这些域名的外链不弹确认框） */
  trustedDomains: [
    'github.com',
    'bilibili.com',
    'space.bilibili.com',
    'icp.gov.moe',
  ],
};

/**
 * 导航栏菜单项配置
 * - desktop: 桌面端导航栏直接显示的项
 * - mobileMore: 移动端汉堡菜单中的额外项
 * - external: 外链项（桌面端"更多"下拉 + 移动端汉堡菜单底部）
 */
export interface NavItem {
  /** 显示名称 */
  name: string;
  /** 链接路径（站内以 / 开头，外链以 http 开头） */
  href: string;
  /** 是否在新标签打开 */
  external?: boolean;
  /** 图标key，对应Navbar.astro中iconMap的key */
  iconKey: string;
  /** 仅 desktop 数组生效：''全部设备显示 | sm/md/lg/xl，大于等于该断点才显示 */
  breakpoint?: '' | 'sm' | 'md' | 'lg' | 'xl';
  /** 路由匹配正则，用来判断当前页面高亮激活 */
  activeMatch: RegExp;
}

export const navConfig: {
  desktop: NavItem[];
  mobileMore: NavItem[];
  external: NavItem[];
} = {
  /** 桌面端导航栏主项 */
  desktop: [
    { name: "首页", href: "/", iconKey:"home", breakpoint: "", activeMatch: /^(\/|\/page\/|\/posts\/|\/category\/|\/tag\/)/ },
    { name: "关于", href: "/about", iconKey:"about", breakpoint: "", activeMatch: /^$/ },
  ],
  /** 移动端汉堡菜单中的额外项 */
  mobileMore: [

  ],
  /** 外部链接项（桌面端"更多"下拉 + 移动端汉堡菜单底部） */
  external: [
    { name: "访问精简版", href: "/lite", iconKey:"linkOut", activeMatch: /^$/ },
    { name: "音乐", href: "/music", iconKey:"linkOut", activeMatch: /^$/ },    
    { name: "归档", href: "/archive", iconKey:"archive", activeMatch: /^$/ },
    { name: "标签", href: "/tags", iconKey:"tags", activeMatch: /^$/ },
    { name: "说说", href: "/talks", iconKey:"talks", activeMatch: /^$/ },
    { name: "友链", href: "/friends", iconKey:"friends", activeMatch: /^$/ },


  ],
};


/**
 * 页脚配置
 */
export const footerConfig = {
  /** 版权文字 */
  copyrightText: "© 2026 Ker ZJZ. All Rights Reserved. ",
  /** ICP 备案信息（留空则不显示） */
  icp: {
    text: "萌 ICP 备 20269426 号",
    link: "https://icp.gov.moe/?keyword=20269426",
  },
  /** 页脚底部链接列表 */
  links: [
    { name: "法律声明", path: "/pages/legal", external: false },
    { name: "RSS", path: "/rss.xml", external: true },
    { name: "Sitemap", path: "/sitemap.xml", external: true },
  ],
  /** 页脚开源仓库文字 */
  tplText: "模版 ",
  /** 页脚开源仓库链接 */
  tplUrl: "https://github.com/ImUpXuu/xuhome",
  /** 页脚开源仓库显示名 */
  tplDisplayName: "IMUPXUU/XUHOME",
  /** 页脚开源仓库链接 */
  repoUrl: "https://github.com/kerzjz/kerzjz.github.io",
  /** 页脚开源仓库显示名 */
  repoDisplayName: "kerzjz/kerzjz.github.io",
};

/**
 * SEO 配置
 */
export const seoConfig = {
  /** 默认页面标题（无 title 时使用） */
  defaultTitle: "Ker ZJZ",
  /** 标题后缀（拼接到每个页面 title 之后） */
  titleTemplate: " - Ker ZJZ",
  /** 默认页面描述 */
  defaultDescription: "Ker ZJZ",
  /** 默认 OG 图片 URL */
  defaultImage: "/images/big.webp",
  /** SEO 关键词 */
  keywords: ["Ker ZJZ", "blog", "科技", "艺术与文化", "经济"],
  /** robots meta 内容 */
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
};

/**
 * 页面横幅（PageBanner）配置
 */
export const bannerConfig = {
  /** Banner 主标题（一般等于站点标题） */
  title: "Ker ZJZ",
  /** 背景网格图案透明度（0-1） */
  gridPatternOpacity: 0.12,
  /** 各页面类型的标签文字 */
  labels: {
    category: "Category",
    tag: "Tag",
    post: "POST",
    page: "PAGE",
    talk: "TALK",
  },
  /** 说说页打字动画内容 */
  talkTicker: {
    sequence: [
      "Ker ZJZ",
      2500,
      "TECH | ART&CULTURE | ECONOMICS",
      2500,
    ],
  },
};

/**
 * 副标题打字动画配置（首页 Banner 左侧）
 */
export const subtitleConfig = {
  sequence: [
    "HI I AM Ker ZJZ",
    2500,
    "KZ AND YOU",
    2500,
  ],
};

/**
 * 欢迎提示（WelcomeToast）配置
 */
export const welcomeConfig = {
  /** 是否启用欢迎提示 */
  enabled: true,
  /** 提示显示时长（毫秒） */
  duration: 5000,
  /** 天气 API 地址（用于显示访客位置和天气） */
  weatherApi: siteConfig.analytics.weatherApi,
  /** 默认问候语（天气 API 失败时显示） */
  fallbackMessage: "Hi！远方的朋友",
  /** sessionStorage 键名（标记是否已展示过） */
  sessionKey: "xuhome_visit_flag",
  /** 提示中的快捷链接 */
  quickLinks: [
    { name: "订阅", href: siteConfig.socials.subscribe, color: "green" },
    { name: "RSS", href: "", action: "copyRss", color: "orange" },
  ],
};

/**
 * 内容相关配置（文章/说说）
 */
export const contentConfig = {
  /** 文章列表每页数量 */
  postsPerPage: 10,
  /** 阅读速度（字/分钟，用于计算预计阅读时间） */
  readingSpeed: 400,
  /** 文章版权许可信息 */
  license: {
    /** 许可协议名称 */
    name: "All Rights Reserved",
    /** 许可协议链接 */
    url: "/about",
  },
  /** AI 摘要模型列表（url 为完整请求地址） */
  aiSummaryModels: [
    { id: 'gpt-oss', name: 'GPT-OSS-120B', url: 'https://blogapi.upxuu.com/summarize', hasThinking: false },
    { id: 'gemma', name: 'Gemma-4-31b-it (OpenRouter)', url: 'https://blogapi.upxuu.com/summarize2', hasThinking: true },
    { id: 'deepseek-r1', name: 'DeepSeek-R1', url: 'https://blogapi.upxuu.com/summarize3', hasThinking: true },
  ],
  /** AI 对话模型列表（url 为完整请求地址） */
  aiChatModels: [
    { id: 'gpt-oss', name: 'GPT-OSS-120B', url: 'https://blogapi.upxuu.com/chat', hasThinking: false },
    { id: 'gemma', name: 'Gemma-4-31b-it (OpenRouter)', url: 'https://blogapi.upxuu.com/chat2', hasThinking: true },
    { id: 'deepseek-r1', name: 'DeepSeek-R1', url: 'https://blogapi.upxuu.com/chat3', hasThinking: true },
  ],
};

/**
 * 评论系统配置（Giscus）
 */
export const commentsConfig = {
  /** Giscus 仓库名称（格式：owner/repo） */
  repo: 'kerzjz/kerzjz.github.io',
  /** Giscus 仓库 ID */
  repoId: 'R_kgDOToBa3A',
  /** Giscus 讨论分类 */
  category: 'Announcements',
  /** Giscus 讨论分类 ID */
  categoryId: 'DIC_kwDOToBa3M4DCWsk',
};

/**
 * 友链申请配置
 */
export const friendsApplyConfig = {
  /** GitHub Issue 友链申请模板 URL */
  issueTemplateUrl: 'https://github.com/kerzjz/kerzjz.github.io/issues/new?template=friend-request.yml',
};

/**
 * 欢迎提示（WelcomeToast）运行时配置
 * 注：其余字段（duration、fallbackMessage、quickLinks）在 welcomeConfig 中
 */
export const welcomeRuntimeConfig = {
  /** sessionStorage 键名（标记是否已展示过） */
  sessionKey: 'xuhome_visit_flag',
  /** 站点唯一域名标识（显示在欢迎提示横幅中） */
  domainBadge: 'KERZJZ.QZZ.IO',
};

/**
 * 关于页面配置
 */
export const aboutConfig = {
  /** 关于页浏览器标题 */
  title: "关于我",
  /** 关于页 SEO 描述 */
  description: "Ker ZJZ",
  /** 角色标签 */
  role: "开发者、创作者",
  /** 简介文字（{author} 会被替换为 siteConfig.author） */
  intro: `你好👋 我是${siteConfig.author}～`,
  /** 技能标签列表 */
  skills: [
    "CSS3", "HTML5", "JavaScript", "Markdown", "Python", "Cloudflare", "NPM", "GitHub Actions", "Git", "GitHub"
],
  /** GitHub 介绍文字 */
  githubBio: "Tech[Web/AI]・Art&Culture[Piano/Design]・Game[Minecraft]・Economics",
  /** Bilibili 板块标题 */
  bilibiliTitle: "MY bilibili @Ker_ZJZ",
  /** GitHub 仓库链接（关于页"找到我"区块） */
  githubLink: "https://github.com/kerzjz",
  /** GitHub 显示文字 */
  githubValue: "@Ker ZJZ\nkerzjz",
  /** 邮箱显示文字 */
  emailValue: siteConfig.socials.email,
  /** 邮箱链接 */
  emailLink: `mailto:${siteConfig.socials.email}`,
  /** QQ 显示文字 */
  qqValue: siteConfig.socials.qq,
  wechatValue: siteConfig.socials.wechat,
  /** GitHub Socials 区块的邮箱链接 */
  socialEmailLink: "mailto:kerzjz@outlook.com",
};

/**
 * 音乐歌单页配置（/music）
 * 播放载体仅为网易云官方 outchain iframe，元数据全部手动维护，
 * 不抓取任何网易云接口、不接触音频流。
 */
export const musicConfig = {
  /** 是否启用歌单页（false 时页面显示"暂未开放"提示） */
  enabled: true,
  /** 浏览器标题 */
  title: "我的歌单",
  /** 页面 SEO 描述 */
  description: "Ker ZJZ 的歌单",
  /** 页面卡片内显示的栏目标题 */
  sectionTitle: "歌单",
  /** 网易云 outchain 播放器高度（官方 iframe 参数，同步写入 iframe 标签） */
  playerHeight: 100,
  /** 歌单为空时的提示文字 */
  emptyText: "歌单里还没有歌曲",
  /** 禁用时页面显示的文字 */
  disabledText: "歌单暂未开放",
  /**
   * 歌单数据（手动维护，sid 为网易云歌曲页地址中的歌曲 id）
   * 只有访客视角：无新增/编辑/删除入口，无表单，无本地存储
   */
  playlist: [
    { sid: "1341433", title: "Can Can", artist: "Edward Simoni" },
    { sid: "1476239407", title: "所念皆星河", artist: "房东的猫" },
    { sid: "371362", title: "小跳蛙", artist: "青蛙乐队" },
    { sid: "1473228889", title: "给某某丨《某某》广播剧第一季主题曲", artist: "陈亦洺/马里奥（Mario）" },
    { sid: "1869136936", title: "又将盛夏丨《某某》广播剧第二季主题曲", artist: "陈亦洺/马里奥（Mario）" },
    { sid: "2615459226", title: "第七年丨《某某》广播剧第一季600w播放纪念·主题曲", artist: "陈亦洺" },
    { sid: "3362530581", title: "正年少丨《某某》广播剧破亿纪念曲", artist: "陈亦洺/柏鹿/动点/Mario" },
    { sid: "1944644041", title: "夏夜灯塔丨小说《某某》官方主题曲", artist: "沈以诚" },
  ],
};

/**
 * 全站文案配置（i18n）
 * 所有页面中的固定文字都从这里读取，方便修改和未来国际化
 */
export const i18nConfig = {
  /** 404 页面 */
  notFound: {
    title: "页面未找到",
    bigText: "404",
    message: "这个页面好像不见了",
    backHome: "回到首页",
    browseArchive: "浏览归档",
  },
  /** 归档页面 */
  archive: {
    title: "文章归档",
    description: "博客文章时间轴归档",
    timelineTitle: "时间轴",
    emptyText: "暂无文章归档",
    emptySubtext: "还没有发布任何文章",
    /** 区块标题（Layout 中显示的栏目名，可与页面 title 不同） */
    sectionTitle: "归档",
  },
  /** 首页 */
  home: {
    /** 首页浏览器标题（传给 Layout 的 title） */
    title: "Ker ZJZ",
    /** 首页 SEO 描述 */
    description: "Ker ZJZ",
    /** 首页文章列表区块标题 */
    sectionTitle: "最新文章",
  },
  /** 说说页 */
  talks: {
    /** 说说页浏览器标题 */
    title: "说说",
    /** 说说页区块标题 */
    sectionTitle: "说说",
    /** 说说列表页 SEO 描述 */
    description: "Ker ZJZ 的说说",
  },
  /** 说说详情页 */
  talk: {
    /** 说说详情页标题缺失时的回退文案 */
    detailFallbackTitle: "说说详情",
  },
  /** 分类页 */
  category: {
    /** 分类页标题后缀（拼在分类名后） */
    titleSuffix: " 分类",
    /** 分类页描述模板（{name} 会被替换为分类名） */
    descriptionTemplate: "{name} 分类下的全部文章 - Ker ZJZ",
  },
  /** 标签页 */
  tag: {
    /** 标签页标题后缀（拼在标签名后） */
    titleSuffix: " 标签",
    /** 标签页描述模板（{name} 会被替换为标签名） */
    descriptionTemplate: "标签 {name} 下的全部文章 - Ker ZJZ",
  },
  /** 友链页面 */
  friends: {
    title: "友情链接",
    description: "友情链接",
  },
  /** 隐私政策页面 */
  privacy: {
    title: "隐私政策",
    description: "Ker ZJZ 的隐私政策——我们如何收集、使用和保护你的个人信息。",
    lastUpdated: "2026 年 7 月 30 日",
    effectiveDate: "2026 年 7 月 30 日",
    contactEmail: "kerzjz@outlook.com",
  },
  /** 统计页面 */
  stats: {
    title: "网站统计",
  },
  /** 文章详情页 */
  post: {
    readingTime: "预计阅读",
    readingTimeUnit: "分钟",
    copyrightTitle: "作者",
    publishedTitle: "发布于",
    licenseTitle: "许可协议",
    relatedPosts: "相关文章",
    prevPost: "上一篇",
    nextPost: "下一篇",
    noMorePrev: "没有更多上一篇了",
    noMoreNext: "没有更多下一篇了",
    tocTitle: "目录",
    tocEmpty: "无目录",
    /** 移动端浮动目录按钮的 aria-label */
    viewToc: "查看目录",
  },
  /** 搜索 */
  search: {
    placeholder: "搜索文章标题、简述、内容或标签...",
    clear: "清除",
    noResults: "哎呀，没有找到文章",
    jumpTo: "跳转...",
    go: "GO",
  },
  /** 通用 */
  common: {
    darkMode: "暗色",
    lightMode: "亮色",
    more: "更多",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    toggleDarkMode: "切换暗色模式",
  },
};
