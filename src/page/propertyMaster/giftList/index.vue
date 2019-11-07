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
          <span class="title">名称：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入礼物名称" style="width: 150px" />
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
    <gift-edit ref="giftEdit"></gift-edit>
  </div>
</template>
<script>
import popupDelete from "components/situation/popup-delete";
import giftEdit from "./components/giftEdit";
export default {
  data() {
    return {
      table: {
        columns: [
          { type: "index", width: 50, align: "center" },
          { title: "名称", key: "mc", align: "center" },
          { title: "消耗秀币数量", key: "xhxbsl", align: "center" },
          { title: "是否全频道推送", key: "sfqpdts", align: "center" },
          { title: "状态", key: "zt", align: "center" },
          {
            title: "排序",
            key: "px",
            align: "center",
            width: 80,
            render: (h, params) => {
              return h("input", {
                attrs: {
                  style: "border:1px solid #ccc;width:50px;text-align:center",
                  value: params.row.px
                },
                on: {
                  blur: function() {
                    console.log(params.row.px);
                  }
                }
              });
            }
          },
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
                        this.$refs.giftEdit.open(params.row.id);
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
                          "giftList/delete"
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
      return this.$store.state.giftList.tableData;
    },
    searchData() {
      return this.$store.state.giftList.searchData;
    },
    tableLoading() {
      return this.$store.state.giftList.tableLoading;
    },
    current() {
      return this.$store.state.giftList.current;
    },
    page_size() {
      return this.$store.state.giftList.page_size;
    },
    total() {
      return this.$store.state.giftList.total;
    },
    pageWait() {
      return this.$store.state.giftList.pageWait;
    }
  },
  components: {
    popupDelete,
    giftEdit
  },
  created() {
    this.$store.dispatch({
      type: "giftList/refreshData"
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
        type: "giftList/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "giftList/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "giftList/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>

