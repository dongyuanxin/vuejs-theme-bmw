const cdn = {
  bgImgUrl: "/image/wallpaper", // 背景图片地址
  mdImgUrl:
    "https://raw.githubusercontent.com/dongyuanxin/markdown-static/master" // markdown图片地址
};

const server = {
  // url: "//193.112.241.232"
  url: "//localhost"
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

export { cdn, server, about };
