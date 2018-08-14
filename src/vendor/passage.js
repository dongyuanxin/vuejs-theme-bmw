import Axios from "@/vendor/axios";
const axiosApi = new Axios();

function Passage() {}

Passage.prototype.fetch = (page, step, needSummary) => {
  return new Promise(resolve => {
    axiosApi
      .post("/api/passage/fetch", {
        page,
        step,
        needSummary: needSummary === undefined ? false : true
      })
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else resolve([]);
      })
      .catch(error => resolve([]));
  });
};

Passage.prototype.calculate = () => {
  return new Promise(resolve => {
    axiosApi
      .post("/api/passage/calculate")
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else resolve(0);
      })
      .catch(error => resolve(0));
  });
};

Passage.prototype.search = id => {
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/passage/search", {
        id
      })
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else resolve([]);
      })
      .catch(error => reject(error));
  });
};

Passage.prototype.fetchCategory = () => {
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/passage/category/fetch")
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

Passage.prototype.checkPrevAndNext = id => {
  if (typeof id === "string") {
    id = parseInt(id, 10);
  }
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/passage/check/prev-next", { id })
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

export default Passage;
