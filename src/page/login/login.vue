<template>
  <div class="loginBox">
    <div class="logoTitle">易社团协会监管平台</div>
    <div class="login">
      <div class="login-title">用户登录</div>
      <div class="form">
        <Form ref="formData" :model="formData" :rules="formDataValidate">
          <FormItem prop="username">
            <input
              class="input"
              v-model="formData.username"
              placeholder="请输入账号/邮箱"
              @keyup.enter.native="login"
            />
          </FormItem>
          <FormItem prop="password">
            <input
              class="input"
              v-model="formData.password"
              type="password"
              placeholder="请输入密码"
              @keyup.enter.native="login"
            />
          </FormItem>
        </Form>
        <button class="login-btn" long :loading="loading" @click="login">登 录</button>
        <!-- <Button type="primary" class="login-btn" long :loading="loading" @click="login">
          <span v-if="!loading" class="loginBtn">登 录</span>
          <span v-else class="load">登录中...</span>
        </Button>-->
      </div>
    </div>
  </div>
</template>

<script>
import "./login.scss";
import { makeAjaxUrl } from "tool/tool.js";
export default {
  data() {
    return {
      loginNumber: 0,
      loading: false,
      formData: {
        username: "",
        password: ""
        // coding: ""
      },
      formDataValidate: {
        username: [{ required: true, message: "请输入账号" }],
        password: [{ required: true, message: "请输入密码" }]
        // coding: [{ required: true, message: "请输入验证码" }]
      },
      userinfo: {
        id: 1
      }
    };
  },
  created() {},
  mounted() {
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function() {
      history.pushState(null, null, document.URL);
    });
  },
  methods: {
    login() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.$store
            .dispatch({
              type: "login/login",
              data: {
                username: this.formData.username,
                password: this.formData.password
              }
            })
            .then(type => {
              if (type) {
                this.$Message.success("登录成功");
                this.formData = { username: "", password: "" };
                this.$refs["formData"].resetFields();
                this.$router.push("/index");
              } else {
                this.$Message.error("登录失败");
              }
            });
        } else {
          this.$Message.error("账号或密码不能为空");
        }
      });
    },
    changeCodingImg() {
      this.loginNumber++;
    }
  }
};
</script>
