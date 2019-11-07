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
          <span class="title">短信接口：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入短信接口名称" style="width: 150px" />
          </span>
          <button class="btns" @click="searchMember">发送测试</button>
        </div>
      </div>
    </div>
    <div class="layout-page-content">
      <div class="listShow">
        <div class="top">
          <span class="sign">
            <Icon type="md-grid" />短信接口列表
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
    <uninstall ref="uninstall"></uninstall>
    <short-message-edit ref="shortMessageEdit"></short-message-edit>
  </div>
</template>
<script>
import popupDelete from "components/situation/popup-delete";
import uninstall from "./components/uninstall";
import shortMessageEdit from "./components/shortMessageEdit";
export default {
  data() {
    return {
      table: {
        columns: [
          { type: "index", width: 50, align: "center" },
          { title: "接口名称", key: "jkmc", align: "center" },
          { title: "描述", key: "ms", align: "center" },
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
                      title: "编辑",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.shortMessageEdit.open(params.row.id);
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "span",
                  {
                    attrs: {
                      title: "卸载",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.uninstall.open(
                          params.row.id,
                          "shortMessageList/delete"
                        );
                      }
                    }
                  },
                  "卸载"
                ),
                h(
                  "span",
                  {
                    attrs: {
                      title: "使用该短信接口",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.popupDelete.open(
                          params.row.id,
                          "shortMessageList/delete"
                        );
                      }
                    }
                  },
                  "使用"
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
      return this.$store.state.shortMessageList.tableData;
    },
    searchData() {
      return this.$store.state.shortMessageList.searchData;
    },
    tableLoading() {
      return this.$store.state.shortMessageList.tableLoading;
    },
    current() {
      return this.$store.state.shortMessageList.current;
    },
    page_size() {
      return this.$store.state.shortMessageList.page_size;
    },
    total() {
      return this.$store.state.shortMessageList.total;
    },
    pageWait() {
      return this.$store.state.shortMessageList.pageWait;
    }
  },
  components: {
    popupDelete,
    uninstall,
    shortMessageEdit
  },
  created() {
    this.$store.dispatch({
      type: "shortMessageList/refreshData"
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
        type: "shortMessageList/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "shortMessageList/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "shortMessageList/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>

