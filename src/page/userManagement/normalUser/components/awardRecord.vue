<template>
  <div>
    <div class="layout-page-tool">
      <div class="quickSearch">
        <div class="searchTitle">
          <Icon type="md-search" />筛选查询
        </div>
        <div class="list">
          <span class="title">支付方式：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入支付方式" style="width: 150px" />
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
          { title: "受邀人", key: "czje", align: "center" },
          { title: "奖励金额", key: "zffs", align: "center" },
          { title: "时间", key: "sj", align: "center" },
          {
            title: "操作",
            key: "action",
            width: 200,
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
                          "normalUser/delete"
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
      return this.$store.state.normalUser.awardTableData.tableData;
    },
    searchData() {
      return this.$store.state.normalUser.awardTableData.searchData;
    },
    tableLoading() {
      return this.$store.state.normalUser.tableLoading;
    },
    current() {
      return this.$store.state.normalUser.awardTableData.current;
    },
    page_size() {
      return this.$store.state.normalUser.awardTableData.page_size;
    },
    total() {
      return this.$store.state.normalUser.awardTableData.total;
    },
    pageWait() {
      return this.$store.state.normalUser.pageWait;
    }
  },
  components: {
    popupDelete
  },
  created() {
    this.$store.dispatch({
      type: "normalUser/awardRefreshData"
    });
  },
  methods: {
    searchMember() {
      this.$store.dispatch({
        type: "normalUser/awardRefreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "normalUser/awardRefreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "normalUser/awardRefreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>