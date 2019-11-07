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
      <span>举报信息编辑</span>
    </p>
    <Form :model="byIdData" :label-width="100" :rules="ruleValidate" ref="editForm">
      <Row>
        <i-col span="24">
          <FormItem label="名称：">
            <Input v-model="name" placeholder="请输入名称" />
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="状态：">
            <RadioGroup v-model="status">
              <Radio label="有效"></Radio>
              <Radio label="无效"></Radio>
            </RadioGroup>
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
      name: "",
      status: "",
      ruleValidate: {
        name: [{ required: true, message: "请输入分类名称！" }],
        status: [{ required: true, message: "请选择分类状态！" }]
      }
    };
  },
  computed: {
    byIdData() {
      return this.$store.state.reportTypeManagement.byIdData;
    },
    showEdit: {
      get: function() {
        return this.$store.state.reportTypeManagement.showEdit;
      },
      set: function(val) {
        this.$store.commit("reportTypeManagement/changeShowEdit", val);
      }
    },
    popupLoading() {
      return this.$store.state.reportTypeManagement.popupLoading;
    }
  },
  mounted() {},
  methods: {
    open(name, status, id) {
      this.name = name || false;
      this.status = status || false;
      this.id = id || false;
      this.$store.commit("reportTypeManagement/changeShowEdit", true);
    },
    result() {
      this.$refs["editForm"].resetFields();
    },
    onOk() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch({
            type: "reportTypeManagement/saveData",
            id: this.id
          });
        }
      });
    },
    onCancel() {
      this.$store.commit("reportTypeManagement/changeShowEdit", false);
    },
    visibleChange(val) {
      this.$store.commit("reportTypeManagement/changePageWait", val);
    }
  }
};
</script>
