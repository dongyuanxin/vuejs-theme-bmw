import Axios from "@/vendor/axios";
const axiosApi = new Axios();

function Friend() {}

Friend.prototype.fetch = () => {
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/music/get-music-list")
      .then(res => {
        if (res.data.code === 0)
          resolve(
            res.data.results.map(item => {
              let index = -1;
              for (let key of Object.keys(item)) {
                if (
                  typeof item[key] === "string" &&
                  item[key].startsWith("http")
                ) {
                  index = item[key].indexOf("//");
                  item[key] = item[key].substr(index);
                }
              }
              item.lrc = item.lyric;
              return item;
            })
          );
        else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

export default Friend;
