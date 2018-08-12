// 生成长度为 length 的随机字符串
function generateRandomStr(length) {
  length = length || 0;
  let arr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  let arrLen = arr.length,
    str = "",
    index = 0;
  for (let i = 0; i < length; ++i) {
    str = str + arr[parseInt(Math.random() * arrLen, 10)];
  }
  return str;
}

// 对数组元素为对象的元素进行快排，支持次要排序 : <<Javascript 精髓>> P81
function objSortBy(name, ascend, minor) {
  ascend = ascend === undefined || ascend === null ? true : ascend;
  return function(o, p) {
    var a, b;
    if (o && p && typeof o === "object" && typeof p === "object") {
      a = o[name];
      b = p[name];
      if (a === b) {
        return typeof minor === "function" ? minor(o, p) : 0;
      }
      if (typeof a === typeof b) {
        if (ascend === true) return a < b ? -1 : 1;
        else return a < b ? 1 : -1;
      }
      if (ascend === true) return typeof a < typeof b ? -1 : 1;
      else return typeof a < typeof b ? 1 : -1;
    } else {
      throw {
        name: "Error",
        message: "Expected an object when sorting by " + name
      };
    }
  };
}

// 判断是否为空字符串
function isEmptyStr(str) {
  return str === "" || str === undefined || str === null;
}

// 得到时区对应的时间戳
function getOffsetTime(offset) {
  let date = new Date();
  let now = date.getTime(),
    localOffset = date.getTimezoneOffset() * 60 * 1000;
  let utc = now + localOffset; // 全球统一时间
  return offset && offset <= 12 && offset >= -12
    ? utc + 60 * 60 * 1000 * offset
    : utc;
}

// 是否包含非Unicode编码
function includeNonUnicode(str) {
  for (var i = 0; i < str.length; ++i) {
    if (str.charCodeAt(i) > 255) return true;
  }
  return false;
}

export {
  generateRandomStr,
  objSortBy,
  isEmptyStr,
  getOffsetTime,
  includeNonUnicode
};
