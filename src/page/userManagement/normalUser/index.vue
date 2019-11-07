<template>
  <div
    class="layout-page-tool normalUser"
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
        </div>
      </div>
    </div>
    <div class="layout-page-content">
      <div class="listShow">
        <div class="top">
          <span class="sign">
            <Icon type="md-grid" />用户信息
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: {
        columns: [
          { type: "index", width: 50, align: "center" },
          { title: "用户ID", key: "yhid", align: "center" },
          { title: "用户昵称", key: "yhnc", align: "center" },
          {
            title: "头像",
            key: "tx",
            align: "center",
            render: (h, params) => {
              return h("img", {
                attrs: {
                  src: params.row.tx,
                  style: "width:50px;height:35px"
                }
              });
            }
          },
          { title: "创建时间", key: "cjsj", align: "center" },
          { title: "手机号", key: "sjh", align: "center" },
          { title: "所属地区", key: "ssdq", align: "center" },
          { title: "秀币", key: "xb", align: "center" },
          { title: "累计消耗秀币数量", key: "ljxhxbsl", align: "center" },
          { title: "关注", key: "gz", align: "center" },
          { title: "粉丝", key: "fs", align: "center" },
          { title: "等级", key: "dj", align: "center" },
          { title: "登录IP", key: "dlip", align: "center" },
          {
            title: "操作",
            key: "action",
            width: 100,
            align: "center",
            render: (h, params) => {
              return h(
                "Select",
                {
                  attrs: {
                    style: "width:80px",
                    placeholder: "操作"
                  },
                  on: {
                    "on-change": event => {
                      switch (event) {
                        case "账户日志":
                          this.$store.commit("pageTab/addTabs", "accountLog");
                          this.$router.push("/accountLog");
                          break;
                        case "小视频列表":
                          this.$store.commit(
                            "pageTab/addTabs",
                            "smallVideoList"
                          );
                          this.$router.push("/smallVideoList");
                          break;
                        case "封禁":
                          this.$refs.prohibition.open(params.row.id);
                      }
                    }
                  }
                },
                [
                  h(
                    "Option",
                    {
                      props: {
                        value: "账户日志"
                      }
                    },
                    "账户日志"
                  ),
                  h(
                    "Option",
                    {
                      props: {
                        value: "小视频列表"
                      }
                    },
                    "小视频列表"
                  ),
                  h(
                    "Option",
                    {
                      props: {
                        value: "封禁"
                      }
                    },
                    "封禁"
                  )
                ]
              );
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
      return this.$store.state.normalUser.tableData;
    },
    searchData() {
      return this.$store.state.normalUser.searchData;
    },
    tableLoading() {
      return this.$store.state.normalUser.tableLoading;
    },
    current() {
      return this.$store.state.normalUser.current;
    },
    page_size() {
      return this.$store.state.normalUser.page_size;
    },
    total() {
      return this.$store.state.normalUser.total;
    },
    pageWait() {
      return this.$store.state.normalUser.pageWait;
    }
  },
  components: {},
  created() {
    this.$store.dispatch({
      type: "normalUser/refreshData"
    });
  },
  methods: {
    searchMember() {
      this.$store.dispatch({
        type: "normalUser/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "normalUser/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "normalUser/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>
<style lang="scss">
.normalUser {
  .layout-page-content {
    .listShow {
      .tableData {
        .ivu-table-wrapper {
          overflow: visible;
        }
      }
    }
  }
}
</style>