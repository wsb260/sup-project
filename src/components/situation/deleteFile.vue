<template>
  <Modal v-model="show" :mask-closable="!1" class="red delete" width="300">
    <p slot="header">
      <Icon type="trash-a"></Icon>
      <span>确认删除？</span>
    </p>
    <div>确认将此文件删除？</div>
    <div slot="footer">
      <Button type="success" @click="onOk">确认</Button>
      <Button type="error" @click="onCancel">取消</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      id: 0,
      type: "",
      url: ""
    };
  },
  methods: {
    open(id, type, url) {
      if (id == null || (id == "" && id != 0) || id == undefined) {
        this.$store.commit({
          type: "notice/noticeError",
          title: "无法获取到数据id!",
          desc: "请联系客服或者开发人员解决。"
        });
        return;
      } else if (!type) {
        this.$store.commit({
          type: "notice/noticeError",
          title: "删除请求地址错误!",
          desc: "请联系客服或者开发人员解决。"
        });
        return;
      }
      this.id = id || "";
      this.type = type || "";
      this.url = url || "";
      this.show = true;
    },
    onOk() {
      this.$store.dispatch({ type: this.type, id: this.id, url: this.url });
      this.show = false;
    },
    onCancel() {
      this.show = false;
    }
  }
};
</script>
