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
          <span class="title">被举报房间号：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入被举报房间号" style="width: 150px" />
          </span>
          <span class="title">举报人：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入举报人" style="width: 150px" />
          </span>
          <span class="title">被举报人：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入被举报人" style="width: 150px" />
          </span>
          <span class="title">举报类型：</span>
          <span class="info">
            <Select v-model="searchData.type" style="width:200px" placeholder="请选择举报类型">
              <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
    <reporting-list-edit ref="reportingListEdit"></reporting-list-edit>
    <popup-delete ref="popupDelete"></popup-delete>
    <warning ref="warning"></warning>
    <prohibition ref="prohibition"></prohibition>
  </div>
</template>
<script>
import reportingListEdit from "./components/reportingListEdit";
import popupDelete from "components/situation/popup-delete";
import warning from "./components/warning";
import prohibition from "./components/prohibition";
export default {
  data() {
    return {
      types: [
        { value: "0", label: "全部" },
        { value: "1", label: "暴力" },
        { value: "2", label: "LOL" },
        { value: "3", label: "涉黄" },
        { value: "4", label: "广告" }
      ],
      table: {
        columns: [
          { type: "selection", width: 60, align: "center" },
          { type: "index", width: 50, align: "center" },
          { title: "被举报房间号", key: "bjbfjh", align: "center" },
          { title: "举报人", key: "jbr", align: "center" },
          { title: "被举报人", key: "bjbr", align: "center" },
          { title: "举报类型", key: "jblx", align: "center" },
          { title: "举报时间", key: "jbsj", align: "center" },
          { title: "备注", key: "bz", align: "center" },
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
                      title: "进入直播间",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        console.log("进入直播间");
                      }
                    }
                  },
                  "进入"
                ),
                h(
                  "span",
                  {
                    attrs: {
                      title: "查看举报内容",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        console.log("查看举报内容");
                      }
                    }
                  },
                  "查看"
                ),
                h(
                  "span",
                  {
                    attrs: {
                      title: "警告",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.warning.open(
                          params.row.id,
                          "reportingList/warning"
                        );
                      }
                    }
                  },
                  "警告"
                ),
                h(
                  "span",
                  {
                    attrs: {
                      title: "封禁",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.prohibition.open(
                          params.row.id,
                          "reportingList/prohibition"
                        );
                      }
                    }
                  },
                  "封禁"
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
      return this.$store.state.reportingList.tableData;
    },
    searchData() {
      return this.$store.state.reportingList.searchData;
    },
    tableLoading() {
      return this.$store.state.reportingList.tableLoading;
    },
    current() {
      return this.$store.state.reportingList.current;
    },
    page_size() {
      return this.$store.state.reportingList.page_size;
    },
    total() {
      return this.$store.state.reportingList.total;
    },
    pageWait() {
      return this.$store.state.reportingList.pageWait;
    }
  },
  components: {
    reportingListEdit,
    popupDelete,
    prohibition,
    warning
  },
  created() {
    this.$store.dispatch({
      type: "reportingList/refreshData"
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
        type: "reportingList/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "reportingList/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "reportingList/refreshData",
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

