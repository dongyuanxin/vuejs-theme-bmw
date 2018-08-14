import Axios from "@/vendor/axios";
const axiosApi = new Axios();

function Friend() {}

Friend.prototype.fetch = (page, step) => {
  return new Promise(resolve => {
    axiosApi
      .post("/api/friend/fetch", {
        page,
        step
      })
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else resolve([]);
      })
      .catch(error => resolve([]));
  });
};

export default Friend;
