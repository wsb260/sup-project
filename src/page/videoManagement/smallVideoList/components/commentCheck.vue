<template>
  <Modal
    v-model="showCommentEdit"
    :mask-closable="!1"
    draggable
    :transfer="!1"
    @on-visible-change="visibleChange"
    :closable="!popupLoading"
    :class-name="(id ? 'yellow' : 'green') + (popupLoading ? ' popupLoading' : '')"
    width="540"
  >
    <p slot="header">
      <span class="fa fa-check" v-if="id"></span>
      <Icon type="ios-add-circle-outline" v-else></Icon>
      <span>查看评论</span>
    </p>
    <Form :model="byIdData" :label-width="100" :rules="ruleValidate" ref="editForm"></Form>
    <div slot="footer">
      <button class="btns" @click="onOk" :loading="popupLoading">保存</button>
      <button class="btns" @click="onCancel" :loading="popupLoading">关闭</button>
    </div>
  </Modal>
</template>
<script>
import { eltValidators } from "tool/eltValidators.js";
export default {
  data() {
    return {
      id: false,
      jbr: "",
      bjbr: "",
      types: [
        { value: "1", label: "暴力" },
        { value: "2", label: "LOL" },
        { value: "3", label: "涉黄" },
        { value: "4", label: "广告" }
      ],
      ruleValidate: {
        name: [{ required: true, message: "请输入分类名称！" }],
        status: [{ required: true, message: "请选择分类状态！" }]
      }
    };
  },
  computed: {
    byIdData() {
      return this.$store.state.smallVideoList.byIdData;
    },
    showCommentEdit: {
      get: function() {
        return this.$store.state.smallVideoList.showCommentEdit;
      },
      set: function(val) {
        this.$store.commit("smallVideoList/changeShowCommentEdit", val);
      }
    },
    popupLoading() {
      return this.$store.state.smallVideoList.popupLoading;
    }
  },
  mounted() {},
  methods: {
    open(id) {
      this.id = id || false;
      this.result();
      if (this.id) {
        this.$store.dispatch({
          type: "smallVideoList/getByIdData",
          id: this.id
        });
      } else {
        this.$store.commit({ type: "smallVideoList/isNewData" });
      }
      this.$store.commit("smallVideoList/changeShowCommentEdit", true);
    },
    result() {
      this.$refs["editForm"].resetFields();
    },
    onOk() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch({
            type: "smallVideoList/saveData",
            id: this.id
          });
        }
      });
    },
    onCancel() {
      this.$store.commit("smallVideoList/changeShowCommentEdit", false);
    },
    visibleChange(val) {
      this.$store.commit("smallVideoList/changePageWait", val);
    }
  }
};
</script>
