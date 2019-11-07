<template>
  <div>
    <div class="layout-page-tool">
      <div class="quickSearch">
        <div class="searchTitle">
          <Icon type="md-search" /> 筛选查询
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
            <Icon type="md-grid" /> 管理员分组列表
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
          { title: "名称", key: "mc", align: "center" },
          { title: "状态", key: "zt", align: "center" },
          {
            title: "操作",
            key: "action",
            width: 100,
            align: "center",
            render: (h, params) => {
              return h("div", []);
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
      return this.$store.state.systemAdministrator.groupTableData;
    },
    searchData() {
      return this.$store.state.systemAdministrator.groupSearchData;
    },
    tableLoading() {
      return this.$store.state.systemAdministrator.tableLoading;
    },
    current() {
      return this.$store.state.systemAdministrator.groupCurrent;
    },
    page_size() {
      return this.$store.state.systemAdministrator.groupPage_size;
    },
    total() {
      return this.$store.state.systemAdministrator.groupTotal;
    },
    pageWait() {
      return this.$store.state.systemAdministrator.pageWait;
    }
  },
  created() {
    this.$store.dispatch({
      type: "systemAdministrator/groupRefreshData"
    });
  },
  methods: {
    searchMember() {
      this.$store.dispatch({
        type: "systemAdministrator/groupRefreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "systemAdministrator/groupRefreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "systemAdministrator/groupRefreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>