import axios from "axios";
import sha256 from "sha256";
import { server } from "@/vendor/setting";
import { generateRandomStr, getOffsetTime } from "@/vendor/util";

function Axios() {}

Axios.getSign = params => {
  // 将key逆序排列
  let keys = Object.keys(params).sort((x, y) => {
    if (x < y) return 1;
    if (x > y) return -1;
    return 0;
  });
  let canstring = "";
  for (let key of keys) {
    if (key !== "sign" && key !== "salt") {
      canstring += key + "=" + params[key] + "&";
    }
  }
  canstring = canstring.substr(0, canstring.length - 1) + params.salt;
  return sha256(canstring);
};

Axios.prototype.get = (url, data) => {
  url = server.url + url;
  const promise = new Promise((resolve, reject) => {
    axios
      .get(url, data)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return promise;
};

Axios.prototype.post = (url, data) => {
  // 参数检查
  let needCheck =
    data !== undefined &&
    (data.hasOwnProperty("timestamp") ||
      data.hasOwnProperty("salt") ||
      data.hasOwnProperty("sign"));
  if (needCheck) {
    throw new Error("Parameter has been used");
  }
  url = server.url + url;
  let realData = {},
    plus = {
      timestamp: Math.ceil(getOffsetTime(8) / 1000),
      salt: generateRandomStr(32),
      sign: ""
    };
  Object.assign(realData, data, plus);
  realData.sign = Axios.getSign(realData); // 生成签名值
  const promise = new Promise((resolve, reject) => {
    axios
      .post(url, realData)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
  return promise;
};

export default Axios;
