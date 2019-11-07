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
      <span>礼物信息编辑</span>
    </p>
    <Form :model="byIdData" :label-width="140" :rules="ruleValidate" ref="editForm">
      <Row>
        <i-col span="24">
          <FormItem label="名称：" prop="name">
            <i-input v-model="byIdData.name" placeholder="请输入礼物名称"></i-input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="消耗秀币数量：" prop="price">
            <i-input v-model="byIdData.price" placeholder="请输入消耗秀币数量"></i-input>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="是否全频道推送：" prop="px">
            <RadioGroup v-model="byIdData.sfqpdts">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
          </FormItem>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <FormItem label="状态：" prop="px">
            <RadioGroup v-model="byIdData.status">
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
