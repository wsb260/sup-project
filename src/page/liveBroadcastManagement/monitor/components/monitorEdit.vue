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
      <span>举报信息编辑</span>
    </p>
    <Form :model="byIdData" :label-width="100" :rules="ruleValidate" ref="editForm">
      <Row>
        <i-col span="24">
          <FormItem label="举报人：">
            <div v-text="jbr"></div>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="被举报人：">
            <div v-text="bjbr"></div>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="举报类型：" prop="px">
            <Select v-model="byIdData.type" style="width:200px">
              <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="备注：" prop="bz">
            <Input
              type="textarea"
              v-model="byIdData.mark"
              placeholder="请输入备注"
              style="width: 200px"
              :rows="4"
            />
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
    open(jbr, bjbr, id) {
      this.jbr = jbr || false;
      this.bjbr = bjbr || false;
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
      console.log(1);
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
