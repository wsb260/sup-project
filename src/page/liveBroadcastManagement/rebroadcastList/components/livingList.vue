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
          { title: "主播ID", key: "zbid", align: "center" },
          { title: "主播昵称", key: "zbnc", align: "center" },
          { title: "直播时间", key: "zbsj", align: "center", width: 190 },
          { title: "热度", key: "rd", align: "center" },
          { title: "礼物总数", key: "lwzs", align: "center" },
          { title: "实际观看人数", key: "sjgkrs", align: "center" },
          { title: "洪峰观看人数", key: "hfgkrs", align: "center" },
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
                        this.$refs.rebroadcastListEdit.open(
                          params.row.jbr,
                          params.row.bjbr,
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
      return this.$store.state.rebroadcastList.tableData;
    },
    searchData() {
      return this.$store.state.rebroadcastList.searchData;
    },
    tableLoading() {
      return this.$store.state.rebroadcastList.tableLoading;
    },
    current() {
      return this.$store.state.rebroadcastList.current;
    },
    page_size() {
      return this.$store.state.rebroadcastList.page_size;
    },
    total() {
      return this.$store.state.rebroadcastList.total;
    },
    pageWait() {
      return this.$store.state.rebroadcastList.pageWait;
    }
  },
  created() {},
  mounted() {},
  methods: {
    searchMember() {
      this.$store.dispatch({
        type: "rebroadcastList/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "rebroadcastList/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "rebroadcastList/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>