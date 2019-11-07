<template>
  <div
    class="layout-page-tool"
    :class="'pageBody' + (pageWait ? ' wait' : '')"
    style="width:90%;height:100%;margin:0 auto;"
  >
    <div class="layout-page-tool">
      <div class="quickSearch">
        <div class="searchTitle">
          <Icon type="md-search" />筛选查询
        </div>
        <div class="list">
          <span class="title">主播ID：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入主播ID" style="width: 150px" />
          </span>
          <span class="title">主播昵称：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入主播昵称" style="width: 150px" />
          </span>
          <button class="btns" @click="searchMember">搜索</button>
          <span class="title" style="margin-left:10px">排序：</span>
          <span class="info">
            <Select v-model="searchData.sort" style="width:200px" placeholder="请选择排序方式">
              <Option v-for="item in sort" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </span>
        </div>
      </div>
    </div>
    <div class="layout-page-content">
      <div class="listShow">
        <div class="top">
          <span class="sign">
            <Icon type="md-grid" />数据列表
          </span>
        </div>
        <div class="tableData">
          <Table
            v-loading="tableLoading"
            :height="table.height"
            :columns="table.columns"
            :data="tableData"
            :highlight-row="true"
          ></Table>
        </div>
        <div class="layout-page-page">
          <Page
            :total="total"
            :current="current"
            :page-size="page_size"
            :page-size-opts="page.page_sizepts"
            @on-change="page_change"
            @on-page-size-change="page_size_change"
            show-sizer
            show-elevator
            show-total
            size="small"
          ></Page>
        </div>
      </div>
    </div>
    <anchor-check ref="anchorCheck"></anchor-check>
    <prohibition ref="prohibition"></prohibition>
  </div>
</template>
<script>
import anchorCheck from "./components/anchorCheck";
import prohibition from "./components/prohibition";
export default {
  data() {
    return {
      sort: [
        { value: "1", label: "礼物" },
        { value: "2", label: "热度" },
        { value: "3", label: "人数" }
      ],
      table: {
        columns: [
          { type: "index", width: 50, align: "center" },
          { title: "主播ID", key: "zbid", align: "center" },
          { title: "主播昵称", key: "zbnc", align: "center" },
          { title: "直播标题", key: "zbbt", align: "center" },
          {
            title: "直播封面",
            key: "zbfm",
            align: "center",
            render: (h, params) => {
              return h("img", {
                attrs: {
                  src: params.row.zbfm,
                  style: "width:60px;height:35px"
                }
              });
            }
          },
          { title: "热度", key: "rd", align: "center" },
          { title: "礼物总数", key: "lwzs", align: "center" },
          { title: "观看人数", key: "gkrs", align: "center" },
          { title: "洪峰观看人数", key: "hfgkrs", align: "center", width: 100 },
          { title: "直播类型", key: "zblx", align: "center" },
          { title: "举报次数", key: "jbcs", align: "center" },
          { title: "推荐", key: "tj", align: "center" },
          { title: "排序", key: "px", align: "center" },
          {
            title: "操作",
            key: "action",
            width: 100,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  {
                    attrs: {
                      title: "查看",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.anchorCheck.open(params.row.zbid);
                      }
                    }
                  },
                  "查看"
                ),
                h(
                  "span",
                  {
                    attrs: {
                      title: "封禁",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.prohibition.open(params.row.zbid);
                      }
                    }
                  },
                  "封禁"
                )
              ]);
            }
          }
        ]
      },
      page: {
        page_sizepts: [10, 20, 50]
      }
    };
  },
  computed: {
    tableData() {
      return this.$store.state.liveListInProgress.tableData;
    },
    searchData() {
      return this.$store.state.liveListInProgress.searchData;
    },
    tableLoading() {
      return this.$store.state.liveListInProgress.tableLoading;
    },
    current() {
      return this.$store.state.liveListInProgress.current;
    },
    page_size() {
      return this.$store.state.liveListInProgress.page_size;
    },
    total() {
      return this.$store.state.liveListInProgress.total;
    },
    pageWait() {
      return this.$store.state.liveListInProgress.pageWait;
    }
  },
  components: {
    anchorCheck,
    prohibition
  },
  created() {
    this.$store.dispatch({
      type: "liveListInProgress/refreshData"
    });
  },
  mounted() {
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function() {
      history.pushState(null, null, document.URL);
    });
  },
  methods: {
    searchMember() {
      this.$store.dispatch({
        type: "liveListInProgress/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "liveListInProgress/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "liveListInProgress/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    },
    addClass() {
      this.$refs.addClass.open();
    }
  }
};
</script>

