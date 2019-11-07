<template>
  <div>
    <div class="layout-page-tool">
      <div class="quickSearch">
        <div class="searchTitle">
          <Icon type="md-search" />筛选查询
        </div>
        <div class="list">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: {
        columns: [
          { type: "index", width: 50, align: "center" },
          { title: "礼物名称", key: "name", align: "center" },
          { title: "价格", key: "price", align: "center" },
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
                          "rebroadcastList/delete"
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
      return this.$store.state.rebroadcastList.giftTableData;
    },
    searchData() {
      return this.$store.state.rebroadcastList.giftSearchData;
    },
    tableLoading() {
      return this.$store.state.rebroadcastList.tableLoading;
    },
    current() {
      return this.$store.state.rebroadcastList.giftCurrent;
    },
    page_size() {
      return this.$store.state.rebroadcastList.giftPage_size;
    },
    total() {
      return this.$store.state.rebroadcastList.giftTotal;
    },
    pageWait() {
      return this.$store.state.rebroadcastList.pageWait;
    }
  },
  created() {},
  methods: {
    searchMember() {
      this.$store.dispatch({
        type: "rebroadcastList/refreshGiftData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "rebroadcastList/refreshGiftData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "rebroadcastList/refreshGiftData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>