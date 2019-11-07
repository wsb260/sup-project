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
          <span class="title">接收人：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入接收人" style="width: 150px" />
          </span>
          <span class="title">内容：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入内容" style="width: 150px" />
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
    <info-check ref="infoCheck"></info-check>
    <send-info ref="sendInfo"></send-info>
  </div>
</template>
<script>
import popupDelete from "components/situation/popup-delete";
import infoCheck from "./components/infoCheck";
import sendInfo from "./components/sendInfo";
export default {
  data() {
    return {
      table: {
        columns: [
          { type: "index", width: 50, align: "center" },
          { title: "发送类型", key: "fslx", align: "center" },
          { title: "接收人", key: "jsr", align: "center" },
          { title: "会员ID", key: "hyid", align: "center" },
          { title: "标题", key: "bt", align: "center" },
          {
            title: "内容",
            key: "nr",
            align: "center",
            render: (h, params) => {
              return h(
                "a",
                {
                  attrs: {
                    style: "color:#f40"
                  },
                  on: {
                    click: () => {
                      this.$refs.infoCheck.open(params.row.id);
                    }
                  }
                },
                "查看"
              );
            }
          },
          { title: "验证码", key: "yzm", align: "center" },
          { title: "创建时间", key: "cjsj", align: "center" },
          { title: "发送时间", key: "fssj", align: "center" },
          { title: "发送状态", key: "fszt", align: "center" },
          { title: "结果", key: "jg", align: "center" },
          { title: "信息", key: "xx", align: "center" },
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
                      title: "发送",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.sendInfo.open(
                          params.row.id,
                          "businessQueueList/sendInfo"
                        );
                      }
                    }
                  },
                  "发送"
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
                          "businessQueueList/delete"
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
      return this.$store.state.businessQueueList.tableData;
    },
    searchData() {
      return this.$store.state.businessQueueList.searchData;
    },
    tableLoading() {
      return this.$store.state.businessQueueList.tableLoading;
    },
    current() {
      return this.$store.state.businessQueueList.current;
    },
    page_size() {
      return this.$store.state.businessQueueList.page_size;
    },
    total() {
      return this.$store.state.businessQueueList.total;
    },
    pageWait() {
      return this.$store.state.businessQueueList.pageWait;
    }
  },
  components: {
    popupDelete,
    infoCheck,
    sendInfo
  },
  created() {
    this.$store.dispatch({
      type: "businessQueueList/refreshData"
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
        type: "businessQueueList/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "businessQueueList/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "businessQueueList/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>

