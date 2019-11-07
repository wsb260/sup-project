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
          <span class="title">小视频ID：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入小视频ID" style="width: 150px" />
          </span>
          <span class="title">发布人ID：</span>
          <span class="info">
            <Input v-model="searchData.value" placeholder="请输入发布人ID" style="width: 150px" />
          </span>
          <span class="title">发布时间：</span>
          <span class="info">
            <DatePicker
              v-model="searchData.startDate"
              type="date"
              placeholder="起始日期"
              style="width: 200px"
            ></DatePicker>
          </span>
          <span class="title">-</span>
          <span class="info">
            <DatePicker
              v-model="searchData.endDate"
              type="date"
              placeholder="结束日期"
              style="width: 200px"
            ></DatePicker>
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
    <small-video-check ref="smallVideoCheck"></small-video-check>
    <comment-check ref="commentCheck"></comment-check>
  </div>
</template>
<script>
import popupDelete from "components/situation/popup-delete";
import smallVideoCheck from "./components/smallVideoCheck";
import commentCheck from "./components/commentCheck";
export default {
  data() {
    return {
      table: {
        height: 500,
        columns: [
          { type: "index", width: 50, align: "center" },
          { title: "小视频编号", key: "xspbh", align: "center" },
          { title: "发布人ID", key: "fbrid", align: "center" },
          { title: "发布人", key: "fbr", align: "center" },
          { title: "小视频类型", key: "xsplx", align: "center" },
          { title: "标题", key: "bt", align: "center", width: 100 },
          { title: "位置", key: "wz", align: "center" },
          {
            title: "小视频状态",
            key: "xspzt",
            align: "center",
            width: 80,
            render: (h, params) => {
              return h(
                "span",
                {
                  attrs: {
                    style:
                      params.row.xspzt === "有效" ? "color:green" : "color:red"
                  }
                },
                params.row.xspzt
              );
            }
          },
          { title: "点赞数量", key: "dzsl", align: "center" },
          { title: "播放数量", key: "bfsl", align: "center" },
          { title: "转发数量", key: "zfsl", align: "center" },
          { title: "是否推荐", key: "sftj", align: "center" },
          { title: "发布时间", key: "fbsj", align: "center", width: 150 },
          {
            title: "操作",
            key: "action",
            width: 250,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  {
                    attrs: {
                      title: "查看小视频",
                      style:
                        "cursor:pointer;margin: 10px;color:#f40;paddingp-top:10px"
                    },
                    on: {
                      click: () => {
                        this.$refs.smallVideoCheck.open(params.row.id);
                      }
                    }
                  },
                  "查看小视频"
                ),
                h(
                  "span",
                  {
                    attrs: {
                      title: "查看评论",
                      style: "cursor:pointer;margin:0 10px;color:#f40"
                    },
                    on: {
                      click: () => {
                        this.$refs.commentCheck.open(params.row.id);
                      }
                    }
                  },
                  "查看评论"
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
                          "smallVideoList/delete"
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
      return this.$store.state.smallVideoList.tableData;
    },
    searchData() {
      return this.$store.state.smallVideoList.searchData;
    },
    tableLoading() {
      return this.$store.state.smallVideoList.tableLoading;
    },
    current() {
      return this.$store.state.smallVideoList.current;
    },
    page_size() {
      return this.$store.state.smallVideoList.page_size;
    },
    total() {
      return this.$store.state.smallVideoList.total;
    },
    pageWait() {
      return this.$store.state.smallVideoList.pageWait;
    }
  },
  components: {
    popupDelete,
    smallVideoCheck,
    commentCheck
  },
  created() {
    this.$store.dispatch({
      type: "smallVideoList/refreshData"
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
        type: "smallVideoList/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "smallVideoList/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "smallVideoList/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>

