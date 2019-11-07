<template>
  <Modal
    v-model="showEdit"
    :mask-closable="!1"
    draggable
    :transfer="!1"
    @on-visible-change="visibleChange"
    :closable="!popupLoading"
    :class-name="(id ? 'yellow' : 'green') + (popupLoading ? ' popupLoading' : '')"
    width="540"
  >
    <p slot="header">
      <span class="fa fa-edit" v-if="id"></span>
      <Icon type="ios-add-circle-outline" v-else></Icon>
      <span>查看小视频</span>
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
        status: [{ required: true, message: "请选择分类状态！" }],
        px: [
          { required: true, message: "请输入排序！" },
          {
            validator: eltValidators,
            notEmpty: true,
            rules: [
              {
                name: "number",
                message: "排序只能为数字！",
                info: ""
              }
            ]
          }
        ]
      }
    };
  },
  computed: {
    byIdData() {
      return this.$store.state.smallVideoList.byIdData;
    },
    showEdit: {
      get: function() {
        return this.$store.state.smallVideoList.showEdit;
      },
      set: function(val) {
        this.$store.commit("smallVideoList/changeShowEdit", val);
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
      this.$store.commit("smallVideoList/changeShowEdit", true);
    },
    result() {
      this.$refs["editForm"].resetFields();
    },
    onOk() {
      console.log(1);
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
      this.$store.commit("smallVideoList/changeShowEdit", false);
    },
    visibleChange(val) {
      this.$store.commit("smallVideoList/changePageWait", val);
    }
  }
};
</script>
