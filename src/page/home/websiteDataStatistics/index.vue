<template>
  <div class="webData">
    <div class="container">
      <div class="top">
        <div class="show" v-for="item in top" :key="item.id">
          <div class="num">{{item.num}}</div>
          <div class="text">{{item.title}}</div>
        </div>
      </div>
      <div class="userData">
        <div class="title">用户统计</div>
        <div class="charts">
          <div class="left">
            <div id="leftUser"></div>
          </div>
          <div class="right">
            <div id="rightUser"></div>
          </div>
        </div>
      </div>
      <div class="userData">
        <div class="title">直播统计</div>
        <div class="charts">
          <div class="livingTitle">
            <p>直播总数：</p>
            <p>礼物总数：</p>
          </div>
          <div id="livingChart"></div>
        </div>
      </div>
      <div class="userData">
        <div class="title">小视频统计</div>
        <div class="charts">
          <div class="livingTitle">
            <p>小视频总数：</p>
          </div>
          <div id="smallVideoChart"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./index.scss";
import echarts from "echarts";
export default {
  data() {
    return {
      top: [
        { num: 1000, title: "在线人数", id: 1 },
        { num: 1394, title: "下载量", id: 2 },
        { num: 1421, title: "正在直播", id: 3 },
        { num: 1241, title: "小视频数量", id: 4 }
      ]
    };
  },
  created() {},
  mounted() {
    this.leftUserChart();
    this.rightUser();
    this.livingChart();
    this.smallVideoChart();
  },
  methods: {
    leftUserChart() {
      var myChart = echarts.init(document.getElementById("leftUser"));
      // 绘制图表
      myChart.setOption({
        title: {
          x: "center" //x轴方向对齐方式
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "2%",
          top: "3%",
          data: ["总数", "贵族数量", "主播数量"]
        },
        series: [
          {
            name: "用户总计",
            type: "pie",
            radius: "40%",
            center: ["55%", "50%"],
            data: [
              {
                value: 345,
                name: "总数",
                itemStyle: { color: "#fbd437" }
              },
              {
                value: 310,
                name: "贵族数量",
                itemStyle: { color: "#f2637b" }
              },
              {
                value: 234,
                name: "主播数量",
                itemStyle: { color: "#f40" }
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              normal: {
                label: {
                  show: true,
                  formatter: "{b} : {c} ({d}%)"
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      });
    },
    rightUser() {
      this.chartLine = echarts.init(document.getElementById("rightUser"));
      var option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["生活用户", "每日注册用户", "新增贵族用户"],
          top: "2%"
        },
        color: ["#1890ff", "#2fc25b"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {
          //设置x轴
          type: "category",
          boundaryGap: false, //坐标轴两边不留白
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          name: "", //X轴 name
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: "#FA6F53",
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {
            //坐标轴轴线相关设置。
            lineStyle: {
              color: "#aaa"
            }
          }
        },
        yAxis: {
          name: "用户统计",
          nameTextStyle: {
            color: "#aaa",
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: "#aaa"
            }
          },
          type: "value"
        },
        series: [
          {
            name: "生活用户",
            data: [71, 69, 95, 145, 184, 215, 252, 262, 233, 183, 139, 96],
            type: "line", // 类型为折线图
            lineStyle: {
              normal: {
                color: "#1890ff"
              }
            }
          },
          {
            name: "每日注册用户",
            data: [39, 42, 57, 85, 119, 152, 117, 166, 142, 103, 66, 48],
            type: "line",
            lineStyle: {
              normal: {
                color: "#2fc25b"
              }
            }
          },
          {
            name: "新增贵族用户",
            data: [19, 72, 37, 25, 49, 112, 100, 86, 142, 103, 47, 41],
            type: "line",
            lineStyle: {
              normal: {
                color: "#f40"
              }
            }
          }
        ]
      };
      this.chartLine.setOption(option);
    },
    livingChart() {
      this.chartLine = echarts.init(document.getElementById("livingChart"));
      var option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["生活用户", "每日注册用户", "新增贵族用户"],
          top: "2%"
        },
        color: ["#1890ff", "#2fc25b"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {
          //设置x轴
          type: "category",
          boundaryGap: false, //坐标轴两边不留白
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          name: "", //X轴 name
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: "#FA6F53",
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {
            //坐标轴轴线相关设置。
            lineStyle: {
              color: "#aaa"
            }
          }
        },
        yAxis: {
          name: "用户统计",
          nameTextStyle: {
            color: "#aaa",
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: "#aaa"
            }
          },
          type: "value"
        },
        series: [
          {
            name: "生活用户",
            data: [71, 69, 95, 145, 184, 215, 252, 262, 233, 183, 139, 96],
            type: "line", // 类型为折线图
            lineStyle: {
              normal: {
                color: "#1890ff"
              }
            }
          },
          {
            name: "每日注册用户",
            data: [39, 42, 57, 85, 119, 152, 117, 166, 142, 103, 66, 48],
            type: "line",
            lineStyle: {
              normal: {
                color: "#2fc25b"
              }
            }
          },
          {
            name: "新增贵族用户",
            data: [19, 72, 37, 25, 49, 112, 100, 86, 142, 103, 47, 41],
            type: "line",
            lineStyle: {
              normal: {
                color: "#f40"
              }
            }
          }
        ]
      };
      this.chartLine.setOption(option);
    },
    smallVideoChart() {
      this.chartLine = echarts.init(document.getElementById("smallVideoChart"));
      var option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["生活用户", "每日注册用户", "新增贵族用户"],
          top: "2%"
        },
        color: ["#1890ff", "#2fc25b"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {
          //设置x轴
          type: "category",
          boundaryGap: false, //坐标轴两边不留白
          data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          name: "", //X轴 name
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: "#FA6F53",
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {
            //坐标轴轴线相关设置。
            lineStyle: {
              color: "#aaa"
            }
          }
        },
        yAxis: {
          name: "用户统计",
          nameTextStyle: {
            color: "#aaa",
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: "#aaa"
            }
          },
          type: "value"
        },
        series: [
          {
            name: "生活用户",
            data: [71, 69, 95, 145, 184, 215, 252, 262, 233, 183, 139, 96],
            type: "line", // 类型为折线图
            lineStyle: {
              normal: {
                color: "#1890ff"
              }
            }
          },
          {
            name: "每日注册用户",
            data: [39, 42, 57, 85, 119, 152, 117, 166, 142, 103, 66, 48],
            type: "line",
            lineStyle: {
              normal: {
                color: "#2fc25b"
              }
            }
          },
          {
            name: "新增贵族用户",
            data: [19, 72, 37, 25, 49, 112, 100, 86, 142, 103, 47, 41],
            type: "line",
            lineStyle: {
              normal: {
                color: "#f40"
              }
            }
          }
        ]
      };
      this.chartLine.setOption(option);
    }
  }
};
</script>