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
      <span>添加分类</span>
    </p>
    <Form :model="byIdData" :label-width="100" :rules="ruleValidate" ref="editForm">
      <Row>
        <i-col span="24">
          <FormItem label="分类名称：" prop="name">
            <i-input v-model="byIdData.name" placeholder="请输入分类名称"></i-input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="状态：" prop="status">
            <RadioGroup v-model="byIdData.status">
              <Radio label="有效"></Radio>
              <Radio label="无效"></Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="排序：" prop="px">
            <i-input v-model="byIdData.px" placeholder="请输入排序"></i-input>
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
      return this.$store.state.classifiedManagement.byIdData;
    },
    showEdit: {
      get: function() {
        return this.$store.state.classifiedManagement.showEdit;
      },
      set: function(val) {
        this.$store.commit("classifiedManagement/changeShowEdit", val);
      }
    },
    popupLoading() {
      return this.$store.state.classifiedManagement.popupLoading;
    }
  },
  mounted() {},
  methods: {
    open(id) {
      this.id = id || false;
      this.result();
      if (this.id) {
        this.$store.dispatch({
          type: "classifiedManagement/getByIdData",
          id: this.id
        });
      } else {
        this.$store.commit({ type: "classifiedManagement/isNewData" });
      }
      this.$store.commit("classifiedManagement/changeShowEdit", true);
    },
    result() {
      this.$refs["editForm"].resetFields();
    },
    onOk() {
      console.log(1);
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch({
            type: "classifiedManagement/saveData",
            id: this.id
          });
        }
      });
    },
    onCancel() {
      this.$store.commit("classifiedManagement/changeShowEdit", false);
    },
    visibleChange(val) {
      this.$store.commit("classifiedManagement/changePageWait", val);
    }
  }
};
</script>
