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

Passage.prototype.update = params => {
  let realParams = {
    id: params.id,
    title: params.title,
    content: params.content,
    category: params.category,
    summary: params.summary,
    operationPwd: params.operationPwd
  };
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/passage/update", realParams)
      .then(res => {
        if (res.data.code === 0) resolve(true);
        else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

Passage.prototype.create = params => {
  let realParams = {
    title: params.title,
    content: params.content,
    category: params.category,
    summary: params.summary,
    operationPwd: params.operationPwd
  };
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/passage/create", realParams)
      .then(res => {
        if (res.data.code === 0) resolve(true);
        else reject(new Error(res.data.msg));
      })
      .catch(error => reject(error));
  });
};

Passage.prototype.del = (id, operationPwd) => {
  return new Promise((resolve, reject) => {
    axiosApi
      .post("/api/passage/del", {
        id,
        operationPwd
      })
      .then(res => {
        if (res.data.code === 0) resolve(true);
        else reject(new Error(res.data.msg));
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

export default Passage;
