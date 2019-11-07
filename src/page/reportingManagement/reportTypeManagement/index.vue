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
            <Icon type="md-grid" />举报类型列表
          </span>
          <button class="btns rightbtn" @click="batchDeletion">批量删除</button>
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
    <report-edit ref="reportEdit"></report-edit>
  </div>
</template>
<script>
import popupDelete from "components/situation/popup-delete";
import reportEdit from "./components/reportEdit";
export default {
  data() {
    return {
      typeArr: [],
      table: {
        columns: [
          { type: "selection", width: 50, align: "center" },
          { type: "index", width: 50, align: "center" },
          { title: "名称", key: "name", align: "center" },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              return h(
                "span",
                {
                  attrs: {
                    style:
                      params.row.status === "有效" ? "color:green" : "color:red"
                  }
                },
                params.row.status
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
                      title: "编辑",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.reportEdit.open(
                          params.row.name,
                          params.row.status,
                          params.row.id
                        );
                      }
                    }
                  },
                  "编辑"
                ),
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
                          "reportTypeManagement/delete"
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
      return this.$store.state.reportTypeManagement.tableData;
    },
    searchData() {
      return this.$store.state.reportTypeManagement.searchData;
    },
    tableLoading() {
      return this.$store.state.reportTypeManagement.tableLoading;
    },
    current() {
      return this.$store.state.reportTypeManagement.current;
    },
    page_size() {
      return this.$store.state.reportTypeManagement.page_size;
    },
    total() {
      return this.$store.state.reportTypeManagement.total;
    },
    pageWait() {
      return this.$store.state.reportTypeManagement.pageWait;
    }
  },
  components: {
    popupDelete,
    reportEdit
  },
  created() {
    this.$store.dispatch({
      type: "reportTypeManagement/refreshData"
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
        type: "reportTypeManagement/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "reportTypeManagement/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "reportTypeManagement/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    },
    select(selection) {
      this.typeArr = selection;
    },
    batchDeletion() {
      var str = "";
      this.typeArr.forEach(e => {
        str += e.id + ",";
      });
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
      }
      if (str.length == 0) {
        this.$Message.warning("请先选中要批量删除的数据！");
        return false;
      }
      this.$refs.popupDelete.open(str, "reportTypeManagement/delete");
    }
  }
};
</script>

