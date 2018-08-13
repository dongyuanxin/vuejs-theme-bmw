const cdn = {
  bgImgUrl: "/image/wallpaper", // 背景图片地址
  mdImgUrl:
    "https://raw.githubusercontent.com/dongyuanxin/markdown-static/master" // markdown图片地址
};

const server = {
  url: "//193.112.241.232"
};

const about = {
  webHistory: {
    title: "小站历史",
    history: [
      "<h3>2018-5-15~2018-5-17 </h3><p>功能开发</p><p>完成用户系统和文章管理系统的开发</p>",
      "<h3>2018-5-18~2018-5-21 </h3><p>测试</p><p>主要是调色，并且对所有功能进行测试</p>",
      "<h3>2018-5-22 </h3><p>准备进行线上部署</p><p></p>",
      "<h3>未 完 待 续</h3><p>持续维护中</p><p></p>"
    ]
  }
};

const md = {
  friend: `
### 友链申请

> 1. **申请前请先添加本博客链接** (特殊情况可在\`Email\`中说明)
> 2. 如果您的链接违反国家规定, 我将不会通过您的申请
> 3. 如果您的链接失效, 我将暂时删除您的链接
> 4. 发送邮件: [yuanxin.me@gmail](). 内容包括链接, 昵称, 一句话介绍
> 5. 更多资源: 入群请填写个人网站链接
> ![个人网站开发交流群群二维码.png](https://upload-images.jianshu.io/upload_images/5486602-6f7c72026824895e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
`
};

export { cdn, server, about, md };
