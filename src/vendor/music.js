import Axios from "@/vendor/axios";

import { cdn } from "@/vendor/setting";

const axiosApi = new Axios();

function Friend() {}

Friend.prototype.fetch = () => {
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/music/get-music-list")
      .then(res => {
        if (res.data.code === 0) {
          resolve(
            res.data.results.map(item => {
              let { artist, name, url_suffix } = item;
              return {
                name,
                artist,
                url:
                  cdn.musicUrl + "/" + artist + "/" + name + "." + url_suffix,
                cover: cdn.musicUrl + "/" + artist + "/" + name + ".jpg",
                lrc: cdn.musicUrl + "/" + artist + "/" + name + ".lrc"
              };
            })
          );
        } else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

export default Friend;
