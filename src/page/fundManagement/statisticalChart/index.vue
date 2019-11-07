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
            <Icon type="md-grid" />统计图表
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
          { title: "充值金额", key: "yhid", align: "center" },
          { title: "提现金额", key: "nc", align: "center" },
          { title: "利润", key: "fs", align: "center" },
          { title: "时间选择", key: "dj", align: "center" },
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
                      title: "删除",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },  
                    on: {
                      click: () => {
                        this.$refs.refuse.open(
                          params.row.id,
                          "authenticationList/refuse"
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
      return this.$store.state.authenticationList.tableData;
    },
    searchData() {
      return this.$store.state.authenticationList.searchData;
    },
    tableLoading() {
      return this.$store.state.authenticationList.tableLoading;
    },
    current() {
      return this.$store.state.authenticationList.current;
    },
    page_size() {
      return this.$store.state.authenticationList.page_size;
    },
    total() {
      return this.$store.state.authenticationList.total;
    },
    pageWait() {
      return this.$store.state.authenticationList.pageWait;
    }
  },
  components: {
    popupDelete
  },
  created() {
    this.$store.dispatch({
      type: "authenticationList/refreshData"
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
        type: "authenticationList/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "authenticationList/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "authenticationList/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>

