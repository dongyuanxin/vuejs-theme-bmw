import Axios from "@/vendor/axios";
const axiosApi = new Axios();

function Introduct() {}

Introduct.prototype.fetch = (type, page, step) => {
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/introduct/content/fetch", {
        type,
        page,
        step
      })
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

export default Introduct;
