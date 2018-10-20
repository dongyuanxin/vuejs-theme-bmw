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
              let { artist, name, cover_url, music_url } = item;
              return { name, artist, url: music_url, cover: cover_url };
            })
          );
        } else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

export default Friend;
