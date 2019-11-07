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
          <span class="title">靓号ID：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入靓号ID" style="width: 150px" />
          </span>
          <span class="title">主播昵称：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入主播昵称" style="width: 150px" />
          </span>
          <span class="title">是否已卖出：</span>
          <span class="info">
            <Select v-model="searchData.model" style="width:200px" clearable>
              <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
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
          <button class="btns rightbtn" style="margin-left:10px" @click="lhAdd">新增</button>
          <button class="btns rightbtn" @click="batchDeletion">批量删除</button>
        </div>
        <div class="tableData">
          <Table
            v-loading="tableLoading"
            :height="table.height"
            :columns="table.columns"
            :data="tableData"
            :highlight-row="true"
            @on-selection-change="select"
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
    <lh-add ref="lhAdd"></lh-add>
    <sell-out ref="sellOut"></sell-out>
    <recovery ref="recovery"></recovery>
  </div>
</template>
<script>
import popupDelete from "components/situation/popup-delete";
import lhAdd from "./components/lhAdd";
import sellOut from "./components/sellOut";
import recovery from "./components/recovery";
export default {
  data() {
    return {
      status: [{ value: "1", label: "是" }, { value: "2", label: "否" }],
      lhArr: [],
      table: {
        columns: [
          { type: "selection", width: 60, align: "center" },
          { type: "index", width: 50, align: "center" },
          { title: "靓号", key: "lh", align: "center" },
          { title: "用户id", key: "yhid", align: "center" },
          { title: "主播昵称", key: "zbnc", align: "center" },
          { title: "是否被购买", key: "sfbgm", align: "center" },
          { title: "售价", key: "sj", align: "center" },
          {
            title: "操作",
            key: "action",
            width: 100,
            align: "center",
            render: (h, params) => {
              return h("div", [
                params.row.sfbgm === "是"
                  ? h(
                      "span",
                      {
                        attrs: {
                          title: "回收",
                          style: "cursor:pointer;margin:0 10px;color:#f40"
                        },
                        on: {
                          click: () => {
                            this.$refs.recovery.open(
                              params.row.id,
                              "lhmanagement/recovery"
                            );
                          }
                        }
                      },
                      "回收"
                    )
                  : h(
                      "span",
                      {
                        attrs: {
                          title: "卖出",
                          style: "cursor:pointer;margin:0 10px;color:#f40"
                        },
                        on: {
                          click: () => {
                            this.$refs.sellOut.open(
                              params.row.id,
                              "lhmanagement/sellOut"
                            );
                          }
                        }
                      },
                      "卖出"
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
                          "lhmanagement/delete"
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
      return this.$store.state.lhmanagement.tableData;
    },
    searchData() {
      return this.$store.state.lhmanagement.searchData;
    },
    tableLoading() {
      return this.$store.state.lhmanagement.tableLoading;
    },
    current() {
      return this.$store.state.lhmanagement.current;
    },
    page_size() {
      return this.$store.state.lhmanagement.page_size;
    },
    total() {
      return this.$store.state.lhmanagement.total;
    },
    pageWait() {
      return this.$store.state.lhmanagement.pageWait;
    }
  },
  components: {
    popupDelete,
    lhAdd,
    sellOut,
    recovery
  },
  created() {
    this.$store.dispatch({
      type: "lhmanagement/refreshData"
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
        type: "lhmanagement/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "lhmanagement/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "lhmanagement/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    },
    lhAdd() {
      this.$refs.lhAdd.open();
    },
    select(selection, row) {
      this.lhArr = selection;
    },
    batchDeletion() {
      var str = "";
      this.lhArr.forEach(e => {
        str += e.id + ",";
      });
      if (str.length > 0) {
        str = str.substr(0, str.length - 1);
      }
      if (str.length == 0) {
        this.$Message.warning("请先选中要批量删除的数据！");
        return false;
      }
      this.$refs.popupDelete.open(str, "lhmanagement/delete");
    }
  }
};
</script>

