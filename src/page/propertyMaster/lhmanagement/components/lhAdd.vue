<template>
  <Modal
    v-model="showEdit"
    :mask-closable="!1"
    draggable
    :transfer="!1"
    @on-visible-change="visibleChange"
    :closable="!popupLoading"
    :class-name="(id ? 'yellow' : 'green') + (popupLoading ? ' popupLoading' : '')"
    width="400"
  >
    <p slot="header">
      <span class="fa fa-edit" v-if="id"></span>
      <Icon type="ios-add-circle-outline" v-else></Icon>
      <span>靓号新增</span>
    </p>
    <Form :model="byIdData" :label-width="70" :rules="ruleValidate" ref="editForm">
      <Row>
        <i-col span="24">
          <FormItem label="靓号ID：" prop="lh">
            <i-input v-model="byIdData.lh" placeholder="请输入靓号"></i-input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="售价：" prop="price">
            <i-input v-model="byIdData.price" placeholder="请输入售价"></i-input>
          </FormItem>
        </i-col>
      </Row>
    </Form>
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
      ruleValidate: {
        name: [{ required: true, message: "请输入分类名称！" }],
        status: [{ required: true, message: "请选择分类状态！" }]
      }
    };
  },
  computed: {
    byIdData() {
      return this.$store.state.giftList.byIdData;
    },
    showEdit: {
      get: function() {
        return this.$store.state.giftList.showEdit;
      },
      set: function(val) {
        this.$store.commit("giftList/changeShowEdit", val);
      }
    },
    popupLoading() {
      return this.$store.state.giftList.popupLoading;
    }
  },
  mounted() {},
  methods: {
    open(id) {
      this.id = id || false;
      this.result();
      if (this.id) {
        this.$store.dispatch({
          type: "giftList/getByIdData",
          id: this.id
        });
      } else {
        this.$store.commit({ type: "giftList/isNewData" });
      }
      this.$store.commit("giftList/changeShowEdit", true);
    },
    result() {
      this.$refs["editForm"].resetFields();
    },
    onOk() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch({
            type: "giftList/saveData",
            id: this.id
          });
        }
      });
    },
    onCancel() {
      this.$store.commit("giftList/changeShowEdit", false);
    },
    visibleChange(val) {
      this.$store.commit("giftList/changePageWait", val);
    }
  }
};
</script>
