<template>
  <div
    class="layout-page-tool"
    :class="'pageBody' + (pageWait ? ' wait' : '')"
    style="width:90%;height:100%;margin:0 auto;"
  >
    <div class="layout-page-content">
      <div class="listShow">
        <div class="top">
          <span class="sign">
            <Icon type="md-grid" />认证列表
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
    <popup-delete ref="popupDelete"></popup-delete>
    <real-check ref="realCheck"></real-check>
    <agree ref="agree"></agree>
    <refuse ref="refuse"></refuse>
  </div>
</template>
<script>
import popupDelete from "components/situation/popup-delete";
import realCheck from "./components/realCheck";
import agree from "./components/agree";
import refuse from "./components/refuse";
export default {
  data() {
    return {
      table: {
        columns: [
          { type: "index", width: 50, align: "center" },
          { title: "用户ID", key: "yhid", align: "center" },
          { title: "昵称", key: "nc", align: "center" },
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
          { title: "粉丝", key: "fs", align: "center" },
          { title: "等级", key: "dj", align: "center" },
          { title: "申请类型", key: "sqlx", align: "center" },
          {
            title: "实名认证信息",
            key: "sj",
            align: "center",
            render: (h, params) => {
              return h(
                "span",
                {
                  attrs: {
                    style: "color:#f40;cursor:pointer"
                  },
                  on: {
                    click: () => {
                      this.$refs.realCheck.open(params.row.id);
                    }
                  }
                },
                "查看"
              );
            }
          },
          {
            title: "操作",
            key: "action",
            width: 150,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  {
                    attrs: {
                      title: "通过",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.agree.open(
                          params.row.id,
                          "authenticationList/agree"
                        );
                      }
                    }
                  },
                  "通过"
                ),
                h(
                  "span",
                  {
                    attrs: {
                      title: "拒绝",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.refuse.open(
                          params.row.id,
                          "authenticationList/refuse"
                        );
                      }
                    }
                  },
                  "拒绝"
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
      return this.$store.state.authenticationList.tableData;
    },
    searchData() {
      return this.$store.state.authenticationList.searchData;
    },
    tableLoading() {
      return this.$store.state.authenticationList.tableLoading;
    },
    current() {
      return this.$store.state.authenticationList.current;
    },
    page_size() {
      return this.$store.state.authenticationList.page_size;
    },
    total() {
      return this.$store.state.authenticationList.total;
    },
    pageWait() {
      return this.$store.state.authenticationList.pageWait;
    }
  },
  components: {
    popupDelete,
    realCheck,
    agree,
    refuse
  },
  created() {
    this.$store.dispatch({
      type: "authenticationList/refreshData"
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
        type: "authenticationList/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "authenticationList/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "authenticationList/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>

