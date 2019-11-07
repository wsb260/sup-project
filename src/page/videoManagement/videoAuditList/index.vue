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
            <Icon type="md-grid" />视频审核列表
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
  </div>
</template>
<script>
import popupDelete from "components/situation/popup-delete";
export default {
  data() {
    return {
      table: {
        height: 500,
        columns: [
          { type: "index", width: 50, align: "center" },
          { title: "发布人ID", key: "plyh", align: "center" },
          { title: "发布人", key: "yhid", align: "center" },
          { title: "小视频类型", key: "plnr", align: "center" },
          { title: "内容", key: "sj", align: "center" },
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
                      title: "查看",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.popupDelete.open(
                          params.row.id,
                          "commentList/delete"
                        );
                      }
                    }
                  },
                  "查看"
                ),
                h(
                  "span",
                  {
                    attrs: {
                      title: "通过",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.popupDelete.open(
                          params.row.id,
                          "commentList/delete"
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
                        this.$refs.popupDelete.open(
                          params.row.id,
                          "commentList/delete"
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
      return this.$store.state.commentList.tableData;
    },
    searchData() {
      return this.$store.state.commentList.searchData;
    },
    tableLoading() {
      return this.$store.state.commentList.tableLoading;
    },
    current() {
      return this.$store.state.commentList.current;
    },
    page_size() {
      return this.$store.state.commentList.page_size;
    },
    total() {
      return this.$store.state.commentList.total;
    },
    pageWait() {
      return this.$store.state.commentList.pageWait;
    }
  },
  components: {
    popupDelete
  },
  created() {
    this.$store.dispatch({
      type: "commentList/refreshData"
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
        type: "commentList/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "commentList/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "commentList/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>

