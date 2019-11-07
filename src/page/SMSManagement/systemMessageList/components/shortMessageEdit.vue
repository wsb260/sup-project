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
      <span>短信接口编辑</span>
    </p>
    <Form :model="byIdData" :label-width="120" :rules="ruleValidate" ref="editForm">
      <Row>
        <i-col span="24">
          <FormItem label="接口名称：">
            <div v-text="byIdData.jbr"></div>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="类名：">
            <div v-text="byIdData.bjbr"></div>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="短信接口账号：">
            <Input v-model="byIdData.value" placeholder="请输入短信接口账号" />
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="短信接口密码：">
            <Input v-model="byIdData.value" placeholder="请输入短信接口密码" />
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="描述：">
            <Input v-model="byIdData.value" placeholder="请输入描述" />
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="模板ID：">
            <Input v-model="byIdData.value" placeholder="请输入模板ID" />
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="签名：">
            <Input v-model="byIdData.value" placeholder="请输入签名" />
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
      return this.$store.state.monitor.byIdData;
    },
    showEdit: {
      get: function() {
        return this.$store.state.monitor.showEdit;
      },
      set: function(val) {
        this.$store.commit("monitor/changeShowEdit", val);
      }
    },
    popupLoading() {
      return this.$store.state.monitor.popupLoading;
    }
  },
  mounted() {},
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
      this.$store.commit("monitor/changeShowEdit", true);
    },
    result() {
      this.$refs["editForm"].resetFields();
    },
    onOk() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch({
            type: "monitor/saveData",
            id: this.id
          });
        }
      });
    },
    onCancel() {
      this.$store.commit("monitor/changeShowEdit", false);
    },
    visibleChange(val) {
      this.$store.commit("monitor/changePageWait", val);
    }
  }
};
</script>
