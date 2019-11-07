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
          { title: "账号", key: "zh", align: "center" },
          { title: "姓名", key: "xm", align: "center" },
          { title: "金额", key: "je", align: "center" },
          { title: "申请时间", key: "sqsj", align: "center" },
          { title: "申请备注", key: "sqbz", align: "center" },
          { title: "是否审核", key: "sfsh", align: "center" },
          { title: "确认支付时间", key: "qrzfsj", align: "center", width: 100 },
          { title: "业务单号", key: "ywdh", align: "center" },
          { title: "支付备注", key: "zfbz", align: "center" },
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
                      title: "通过",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.agree.open(
                          params.row.id,
                          "cashManagement/agree"
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
                          "cashManagement/refuse"
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
      return this.$store.state.cashManagement.tableData;
    },
    searchData() {
      return this.$store.state.cashManagement.searchData;
    },
    tableLoading() {
      return this.$store.state.cashManagement.tableLoading;
    },
    current() {
      return this.$store.state.cashManagement.current;
    },
    page_size() {
      return this.$store.state.cashManagement.page_size;
    },
    total() {
      return this.$store.state.cashManagement.total;
    },
    pageWait() {
      return this.$store.state.cashManagement.pageWait;
    }
  },
  components: {
    agree,
    refuse
  },
  created() {
    this.$store.dispatch({
      type: "cashManagement/refreshData"
    });
  },
  methods: {
    searchMember() {
      this.$store.dispatch({
        type: "cashManagement/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "cashManagement/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "cashManagement/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>