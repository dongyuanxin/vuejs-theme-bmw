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

Passage.prototype.search = params => {
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/passage/search", params)
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else resolve([]);
      })
      .catch(error => reject(error));
  });
};

Passage.prototype.fetchCategoryWithCount = () => {
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/passage/category/fetch-with-count")
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

Passage.prototype.calcCategoryCount = category => {
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/passage/category/calc-category-count", { category })
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

Passage.prototype.fetchByTime = time => {
  return new Promise((resolve, reject) => {
    if (time.length !== 10) {
      return reject(new Error("Time format is wrong"));
    }
    axiosApi
      .post("/api/passage/fetch-by-time", { time })
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

Passage.prototype.fetchByCategory = (category, page, step) => {
  return new Promise((resolve, reject) => {
    if (category.length <= 0) {
      return reject(new Error("Category is missing"));
    }
    axiosApi
      .post("/api/passage/fetch-by-category", { category, page, step })
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

Passage.prototype.fetchByTag = (tag, page, step) => {
  return new Promise((resolve, reject) => {
    if (tag.length <= 0) {
      return reject(new Error("Category is missing"));
    }
    axiosApi
      .post("/api/tag/fetch", { tag, page, step })
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

Passage.prototype.fetchTagWithCount = () => {
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/tag/fetch-with-count")
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

Passage.prototype.calcTagCount = tag => {
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/tag/calc-tag-count", { tag })
      .then(res => {
        if (res.data.code === 0) resolve(res.data.results);
        else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

export default Passage;
