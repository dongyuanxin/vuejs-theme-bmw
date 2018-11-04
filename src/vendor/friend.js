import { cdn } from "@/vendor/setting";

import Axios from "@/vendor/axios";
const axiosApi = new Axios();

function Friend() {}

Friend.prototype.fetch = (page, step) => {
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/friend/fetch", {
        page,
        step
      })
      .then(res => {
        let results = res.data.results;
        for (let i = 0; i < results.length; ++i) {
          results[i].headImgUrl = cdn.friendUrl + "/" + results[i].headImgUrl;
        }
        if (res.data.code === 0) resolve(results);
        else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

export default Friend;
