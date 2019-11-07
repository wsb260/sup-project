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
          <span class="title">关键字：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入关键字" style="width: 150px" />
          </span>
          <span class="title">操作时间：</span>
          <span class="info">
            <DatePicker
              v-model="searchData.startDate"
              type="date"
              placeholder="起始日期"
              style="width: 200px"
            ></DatePicker>
          </span>
          <span class="title">-</span>
          <span class="info">
            <DatePicker
              v-model="searchData.endDate"
              type="date"
              placeholder="结束日期"
              style="width: 200px"
            ></DatePicker>
          </span>
          <button class="btns" @click="searchMember">搜索</button>
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
    <popup-delete ref="popupDelete"></popup-delete>
  </div>
</template>
<script>
import popupDelete from "components/situation/popup-delete";
export default {
  data() {
    return {
      table: {
        columns: [
          { type: "index", width: 50, align: "center" },
          { title: "日志信息", key: "rzxx", align: "center" },
          { title: "操作时间", key: "czsj", align: "center" },
          { title: "操作IP", key: "czip", align: "center" },
          { title: "管理员", key: "gly", align: "center" },
          { title: "操作结果", key: "czjg", align: "center" },
          { title: "模块", key: "mk", align: "center" },
          { title: "函数", key: "hs", align: "center" },
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
                          "systemLog/delete"
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
      return this.$store.state.systemLog.tableData;
    },
    searchData() {
      return this.$store.state.systemLog.searchData;
    },
    tableLoading() {
      return this.$store.state.systemLog.tableLoading;
    },
    current() {
      return this.$store.state.systemLog.current;
    },
    page_size() {
      return this.$store.state.systemLog.page_size;
    },
    total() {
      return this.$store.state.systemLog.total;
    },
    pageWait() {
      return this.$store.state.systemLog.pageWait;
    }
  },
  components: {
    popupDelete
  },
  created() {
    this.$store.dispatch({
      type: "systemLog/refreshData"
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
        type: "systemLog/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "systemLog/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "systemLog/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>

