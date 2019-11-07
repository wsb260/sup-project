<template>
  <Modal
    v-model="showProhibition"
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
      <span>封禁</span>
    </p>
    <Form :model="byIdData" :label-width="100" :rules="ruleValidate" ref="editForm">
      <Row>
        <i-col span="24">
          <FormItem label="封禁理由：">
            <Input type="textarea" :rows="3" v-model="byIdData.fjly" placeholder="请输入封禁理由" />
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="封禁时长：">
            <Input v-model="byIdData.fjsc" placeholder="请输入封禁时长" />
          </FormItem>
        </i-col>
      </Row>
    </Form>
    <div slot="footer">
      <button class="btns" @click="onOk" :loading="popupLoading">提交</button>
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
      return this.$store.state.monitor.byIdData;
    },
    showProhibition: {
      get: function() {
        return this.$store.state.monitor.showProhibition;
      },
      set: function(val) {
        this.$store.commit("monitor/changeShowProhibition", val);
      }
    },
    popupLoading() {
      return this.$store.state.monitor.popupLoading;
    }
  },
  methods: {
    open(id) {
      this.id = id || false;
      this.result();
      if (this.id) {
        this.$store.dispatch({
          type: "monitor/getByIdData",
          id: this.id
        });
      } else {
        this.$store.commit({ type: "monitor/isNewData" });
      }
      this.$store.commit("monitor/changeShowProhibition", true);
    },
    result() {
      this.$refs["editForm"].resetFields();
    },
    onOk() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch({
            type: "monitor/prohibition",
            id: this.id
          });
        }
      });
    },
    onCancel() {
      this.$store.commit("monitor/changeShowProhibition", false);
    },
    visibleChange(val) {
      this.$store.commit("monitor/changePageWait", val);
    }
  }
};
</script>
