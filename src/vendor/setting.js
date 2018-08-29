const cdn = {
  bgImgUrl: "/image/wallpaper", // 背景图片地址
  mdImgUrl:
    process.env.NODE_ENV === "development"
      ? "//raw.githubusercontent.com/dongyuanxin/markdown-static/master"
      : "//blog-1255463368.file.myqcloud.com/markdown-static", // markdown图片地址
  musicUrl: "//blog-1255463368.file.myqcloud.com/music"
};

const server = {
  url:
    process.env.NODE_ENV === "development"
      ? "//localhost"
      : "//" + window.location.host
};

const lc = {
  i: "j3TlSqBMjoXnrIrNYB5En5Y1-gzGzoHsz",
  k: "d2rWR1nq5chvzXzh3bSyB8ug"
};

export { cdn, server, lc };
