<template>
  <div>
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
            <Icon type="md-grid" />提现列表
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
    <agree ref="agree"></agree>
    <refuse ref="refuse"></refuse>
  </div>
</template>
<script>
import agree from "./agree";
import refuse from "./refuse";
export default {
  data() {
    return {
      table: {
        columns: [
          { type: "index", width: 50, align: "center" },
          { title: "管理员账号", key: "glyzh", align: "center" },
          { title: "管理员组", key: "glyz", align: "center" },
          { title: "状态", key: "zt", align: "center" },
          { title: "最后上线时间", key: "zhsxsj", align: "center" },
          { title: "最后上线IP", key: "zhsxip", align: "center" },
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
                      title: "编辑",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.agree.open(
                          params.row.id,
                          "systemAdministrator/agree"
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
                        this.$refs.refuse.open(
                          params.row.id,
                          "systemAdministrator/refuse"
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
      return this.$store.state.systemAdministrator.tableData;
    },
    searchData() {
      return this.$store.state.systemAdministrator.searchData;
    },
    tableLoading() {
      return this.$store.state.systemAdministrator.tableLoading;
    },
    current() {
      return this.$store.state.systemAdministrator.current;
    },
    page_size() {
      return this.$store.state.systemAdministrator.page_size;
    },
    total() {
      return this.$store.state.systemAdministrator.total;
    },
    pageWait() {
      return this.$store.state.systemAdministrator.pageWait;
    }
  },
  components: {
    agree,
    refuse
  },
  created() {
    this.$store.dispatch({
      type: "systemAdministrator/refreshData"
    });
  },
  methods: {
    searchMember() {
      this.$store.dispatch({
        type: "systemAdministrator/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "systemAdministrator/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "systemAdministrator/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>