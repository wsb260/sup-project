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
          <span class="title">分类名称：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入分类名称" style="width: 150px" />
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
          <button class="btns rightbtn" @click="addClass">新增</button>
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
    <add-class ref="addClass"></add-class>
  </div>
</template>
<script>
import addClass from "./components/addClass";
export default {
  data() {
    return {
      table: {
        columns: [
          { type: "index", width: 50, align: "center" },
          { title: "分类名称", key: "flmc", align: "center" },
          {
            title: "状态",
            key: "zt",
            align: "center",
            render: (h, params) => {
              return h(
                "span",
                {
                  attrs: {
                    style:
                      params.row.zt === "有效" ? "color:green" : "color:red"
                  }
                },
                params.row.zt
              );
            }
          },
          { title: "排序", key: "px", align: "center" },
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
                          "classifiedManagement/delete"
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
      return this.$store.state.classifiedManagement.tableData;
    },
    searchData() {
      return this.$store.state.classifiedManagement.searchData;
    },
    tableLoading() {
      return this.$store.state.classifiedManagement.tableLoading;
    },
    current() {
      return this.$store.state.classifiedManagement.current;
    },
    page_size() {
      return this.$store.state.classifiedManagement.page_size;
    },
    total() {
      return this.$store.state.classifiedManagement.total;
    },
    pageWait() {
      return this.$store.state.classifiedManagement.pageWait;
    }
  },
  components: {
    addClass: addClass
  },
  created() {
    this.$store.dispatch({
      type: "classifiedManagement/refreshData"
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
        type: "classifiedManagement/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "classifiedManagement/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "classifiedManagement/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    },
    addClass() {
      this.$refs.addClass.open();
    }
  }
};
</script>

