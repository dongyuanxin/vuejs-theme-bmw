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

let copyRight = `
> 本文作者： 董沅鑫<br>
本文链接： ??<br>
版权声明： 本博客所有文章除特别声明外，均采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议。转载请注明出处！
`;

export { cdn, server, lc, copyRight };
