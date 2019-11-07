<template>
  <div
    class="layout-page-tool"
    :class="'pageBody' + (pageWait ? ' wait' : '')"
    style="width:90%;height:100%;margin:0 auto;padding-top:20px"
  >
    <div class="layout-page-tool">
      <div class="quickSearch">
        <div class="searchTitle">
          <Icon type="md-search" />筛选查询
        </div>
        <div class="list">
          <span class="title">用户ID：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入用户ID" style="width: 150px" />
          </span>
          <span class="title">用户昵称：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入用户昵称" style="width: 150px" />
          </span>
          <button class="btns" @click="searchMember">搜索</button>
        </div>
      </div>
    </div>
    <div class="layout-page-content">
      <div class="listShow">
        <div class="top">
          <span class="sign">
            <Icon type="md-grid" />提现审核记录列表
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
          { title: "用户ID", key: "yhid", align: "center" },
          { title: "用户名称", key: "yhmc", align: "center" },
          { title: "充值方式", key: "czfs", align: "center" },
          { title: "充值金额", key: "czje", align: "center" },
          { title: "充值时间", key: "czsj", align: "center" },
          { title: "业务单号", key: "ywdh", align: "center" },
          { title: "账户余额", key: "zhye", align: "center" },
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
                      style: "color:#f40;cursor:pointer,margin-right:10px"
                    },
                    on: {
                      click: () => {
                        this.$refs.popupDelete.open(
                          params.row.id,
                          "rechargeRecord/delete"
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
      return this.$store.state.rechargeRecord.tableData;
    },
    searchData() {
      return this.$store.state.rechargeRecord.searchData;
    },
    tableLoading() {
      return this.$store.state.rechargeRecord.tableLoading;
    },
    current() {
      return this.$store.state.rechargeRecord.current;
    },
    page_size() {
      return this.$store.state.rechargeRecord.page_size;
    },
    total() {
      return this.$store.state.rechargeRecord.total;
    },
    pageWait() {
      return this.$store.state.rechargeRecord.pageWait;
    }
  },
  components: {
    popupDelete
  },
  created() {
    this.$store.dispatch({
      type: "rechargeRecord/refreshData"
    });
  },
  methods: {
    searchMember() {
      this.$store.dispatch({
        type: "rechargeRecord/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "rechargeRecord/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "rechargeRecord/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>