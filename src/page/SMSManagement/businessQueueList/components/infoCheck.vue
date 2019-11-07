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
      <span>查看内容</span>
    </p>
    <Form :model="byIdData" :label-width="120" :rules="ruleValidate" ref="editForm">
      <Row>
        <i-col span="24">
          <div v-text="jbr"></div>
        </i-col>
      </Row>
    </Form>
    <div slot="footer">
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
      jbr: "您的验证码是：5411。请不要把验证码泄露给其他人。",
      ruleValidate: {
        name: [{ required: true, message: "请输入分类名称！" }],
        status: [{ required: true, message: "请选择分类状态！" }]
      }
    };
  },
  computed: {
    byIdData() {
      return this.$store.state.businessQueueList.byIdData;
    },
    showEdit: {
      get: function() {
        return this.$store.state.businessQueueList.showEdit;
      },
      set: function(val) {
        this.$store.commit("businessQueueList/changeShowEdit", val);
      }
    },
    popupLoading() {
      return this.$store.state.businessQueueList.popupLoading;
    }
  },
  mounted() {},
  methods: {
    open(id) {
      this.id = id || false;
      if (this.id) {
        this.$store.dispatch({
          type: "businessQueueList/getByIdData",
          id: this.id
        });
      } else {
        this.$store.commit({ type: "businessQueueList/isNewData" });
      }
      this.$store.commit("businessQueueList/changeShowEdit", true);
    },
    onCancel() {
      this.$store.commit("businessQueueList/changeShowEdit", false);
    },
    visibleChange(val) {
      this.$store.commit("businessQueueList/changePageWait", val);
    }
  }
};
</script>
