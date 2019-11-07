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
            <Icon type="md-grid" />系统消息列表
          </span>
        </div>
        <div class="tableData">
          <Table
            v-loading="tableLoading"
            :height="table.height"
            :columns="table.columns"
            :data="tableData"
            :highlight-row="true"
            @on-selection-change="select"
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
    <short-message-edit ref="shortMessageEdit"></short-message-edit>
  </div>
</template>
<script>
import popupDelete from "components/situation/popup-delete";
import shortMessageEdit from "./components/shortMessageEdit";
export default {
  data() {
    return {
      arr: [],
      table: {
        columns: [
          { type: "selection", width: 50, align: "center" },
          { type: "index", width: 50, align: "center" },
          { title: "内容", key: "nr", align: "center" },
          { title: "发送人", key: "fsr", align: "center" },
          { title: "发送时间", key: "fssj", align: "center" },
          { title: "发送状态", key: "fszt", align: "center" },
          { title: "发送方式", key: "fsfs", align: "center" },
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
                      title: "删除",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.popupDelete.open(
                          params.row.id,
                          "systemMessageList/delete"
                        );
                      }
                    }
                  },
                  "删除"
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
      return this.$store.state.systemMessageList.tableData;
    },
    searchData() {
      return this.$store.state.systemMessageList.searchData;
    },
    tableLoading() {
      return this.$store.state.systemMessageList.tableLoading;
    },
    current() {
      return this.$store.state.systemMessageList.current;
    },
    page_size() {
      return this.$store.state.systemMessageList.page_size;
    },
    total() {
      return this.$store.state.systemMessageList.total;
    },
    pageWait() {
      return this.$store.state.systemMessageList.pageWait;
    }
  },
  components: {
    popupDelete,
    shortMessageEdit
  },
  created() {
    this.$store.dispatch({
      type: "systemMessageList/refreshData"
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
        type: "systemMessageList/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "systemMessageList/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "systemMessageList/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    },
    select(selection, row) {
      this.arr = selection;
    },
    batchDeletion() {
      var str = "";
      this.arr.forEach(e => {
        str += e.id + ",";
      });
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
      }
      if (str.length == 0) {
        this.$Message.warning("请先选中要批量删除的数据！");
        return false;
      }
      this.$refs.popupDelete.open(str, "lhmanagement/delete");
    }
  }
};
</script>

