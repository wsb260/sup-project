import controller from "controller/index.js";

function getByClass(className) {
  return document.getElementsByClassName(className);
}

function getById(classId) {
  return document.getElementById(classId);
}

function makeAjaxUrl(data) {
  //统一的ajax的数据地址拼接
  let info = "";
  forEachToJson(data, (key, v) => {
    info += (info.length > 0 ? "&" : "") + key + "=" + v;
  });
  return info;
}

function makeGetAjaxUrl(data) {
  //统一的ajax的get请求数据拼接
  var newData = "?";
  var first = true;
  for (let i in data) {
    newData += (first ? "" : "&") + i + "=" + data[i];
    first = false;
  }
  return newData;
}

function forEach(array, fun) {
  //因为懒得判断，所以返回true就会结束循环
  if (array && array.length > 0 && fun) {
    for (let i = 0; i < array.length; i++) {
      if (fun(i, array[i])) {
        break;
      }
    }
  }
}

//遍历json数组的方法
function forEachToJson(jsonList, fun) {
  //因为懒得判断，所以返回true就会结束循环
  if (jsonList && fun) {
    for (var key in jsonList) {
      if (fun(key, jsonList[key])) {
        break;
      }
    }
  }
}

function getTableHeight() {
  let pageBody = getByClass("pageBody");
  let tool = getByClass("layout-page-tool");
  let page = getByClass("layout-page-page");

  return (
    (pageBody[0] ? pageBody[0].offsetHeight : 0) -
    (tool[0] ? tool[0].offsetHeight : 0) -
    (page[0] ? page[0].offsetHeight : 0)
  );
}

function getTableHeightInCode(id) {
  let r = getById(id) || getByClass(id)[0];
  return (
    r.offsetHeight -
    (r.children[0] ? r.children[0].offsetHeight : 0) -
    (r.children[2] ? r.children[2].offsetHeight : 0)
  );
}

function makeSelectOptions(data, label, value) {
  var newData = [];
  if (data.length > 0) {
    data.forEach((v, i) => {
      var thisNode = Object.assign({}, v);
      if (!(v.label && (v.label.length > 0 || v.label >= 0))) {
        thisNode.label = v[label] || v.router || v.title || v.name;
      }
      if (!(v.value && v.value.length > 0)) {
        thisNode.value = (v[value] || v.id) + "";
      }
      newData.push(thisNode);
    });
  }
  return newData;
}
// 这方法里就先不考虑数据不存在之类的情况了，出现这些问题的话直接去改代码

function makeData(info) {
  let mainData = Object.assign([], info.mainData);
  mainData.forEach((v, i) => {
    info.mainInfo.forEach((v2, i2) => {
      v2.id = v2.id || "id"; //只有这个允许为空
      v2.list.forEach((v3, i3) => {
        if (v[v3.name]) {
          let vs = v[v3.name].toString().split(",");
          if (vs.length > 1) {
            //例如用户角色，用户可能会有多个角色
            vs.forEach((v4, i4) => {
              v2.info.eltForEach((v5, i5) => {
                if (v4 == v5[v2.id]) {
                  v[v3.name + "Text"] = v[v3.name + "Text"] || "";
                  v[v3.name + "Text"] +=
                    (i4 == 0 ? "" : v3.interval || "、") +
                    (v3.before || "") +
                    v5[v3.key] +
                    (v3.after || "");
                  return true;
                }
              });
            });
          } else {
            v2.info.eltForEach((v4, i4) => {
              if (v[v3.name] == v4[v2.id]) {
                v[v3.name + "Text"] = v4[v3.key];
                return true;
              }
            });
          }
        }
      });
    });
  });
  return mainData;
}

function makeTree({
  treeInfo = [],
  id = "id",
  title = "title",
  parent = "parent",
  expand = true,
  rootId = 0
}) {
  let arr = Object.assign([], treeInfo);
  arr.forEach((v, i) => {
    v.title = v[title];
    v.expand = expand;
    if (v[parent] != 0) {
      arr.eltForEach((v2, i2) => {
        if (parseInt(v[parent], 10) == parseInt(v2[id], 10)) {
          v2.children = v2.children || [];
          v2.children.push(v);
          return true;
        }
      });
    }
  });
  return arr.filter(item => item[parent] == rootId);
}

//将日期型数据转化为字符串型
function timeText(info) {
  if (info) {
    var newTime = info.toLocaleString();
    newTime = newTime.split("/");
    newTime[2] = newTime[2].split(" ");
    info =
      newTime[0] +
      "-" +
      (parseInt(newTime[1]) > 9
        ? parseInt(newTime[1])
        : "0" + parseInt(newTime[1])) +
      "-" +
      (parseInt(newTime[2][0]) > 9
        ? parseInt(newTime[2][0])
        : "0" + parseInt(newTime[2][0]));
  }
  return info;
}
function timeTextMonth(info) {
  if (info) {
    var newTime = info.toLocaleString();
    newTime = newTime.split("/");
    newTime[2] = newTime[2].split(" ");
    info =
      newTime[0] +
      "-" +
      (parseInt(newTime[1]) > 9
        ? parseInt(newTime[1])
        : "0" + parseInt(newTime[1]));
  }
  return info;
}

//将字符串型日期转化为日期型，但是转化失败的话会返回当前日期
function makeDate(info) {
  return info && info != null && info != "" && info != undefined
    ? new Date(info)
    : new Date();
}
//  删除数组中指定元素
function removeByValue(arr, target) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
      arr.splice(i, 1);
      break;
    }
  }
}

export {
  makeAjaxUrl,
  makeGetAjaxUrl,
  forEach,
  forEachToJson,
  makeTreeInfo,
  getTableHeight,
  getTableHeightInCode,
  makeSelectOptions,
  makeTree,
  makeData,
  eltToArray,
  arrangeTreeInfo,
  timeText,
  timeTextMonth,
  makeDate,
  removeByValue
};

Array.prototype.del = function(n) {
  //n表示第几项，从0开始算起。
  if (n < 0) {
    //如果n<0，则不进行任何操作。
    return this;
  } else {
    return this.slice(0, n).concat(this.slice(n + 1, this.length));
  }
  /*
  　concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
  　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
    组成的新数组，这中间，刚好少了第n项。
  　slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。

    var test=new Array(0,1,2,3,4,5);
    test=test.del(3);　//从0算起，删除第4项。
    alert(test);
  */
};

//数组的排序方法，name是需要判断的依据字段，比如id或者number
Array.prototype.eltSort = function(name) {
  return this.sort((x, y) => {
    x = name ? x[name] : x;
    y = name ? y[name] : y;
    if (x < y) {
      return -1;
    } else if (x > y) {
      return 1;
    } else {
      return 0;
    }
  });
};

//自定义遍历方法，和vue自带的相比，自定义的可以接收返回值，每次循环如果返回 true 则结束整个循环
Array.prototype.eltForEach = function(fun) {
  if (this && this.length > 0 && fun) {
    for (let i = 0; i < this.length; i++) {
      if (fun(this[i], i)) {
        break;
      }
    }
  }
};

//字符串处理，将 "1,2,3,4,5" 这种数据转化为数字数组的形式 [1,2,3,4,5]
String.prototype.eltToArray = function(string) {
  let s = this.toString().split(",");
  //这里使用 forEach 的话数据类型转换会失效，不知道为啥……
  for (let i = 0; i < s.length; i++) {
    s[i] = parseInt(s[i], 10) + (string ? "" : 0);
  }
  return s;
};

window.log = (...logInfo) => {
  controller.type == 1 ? console.log(logInfo) : "";
};
