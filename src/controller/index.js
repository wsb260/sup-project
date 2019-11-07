//1开发环境，2生产环境，3 测试环境
var type = 1;
var allOptions = {
  base: () => {
    switch (type) {
      case 1:
        return "/static/testAjax";
      case 2:
        return "http://sup.estxy.com";
      case 3:
        return "/api";
    }
  },
  imgUrl: type == 1 ? "" : "/ytscms" //ytscms
};
export default {
  type: type,
  base: allOptions.base(),
  imgUrl: allOptions.imgUrl
};
