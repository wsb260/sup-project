<template>
  <div class="poptipBox">
    <Poptip
      trigger="hover"
      placement="bottom-end"
      @mouseover.native="showDate"
      @mouseout.native="clearDate"
    >
      <div>
        <img src="../../../assets/images/user.png" />
        <!-- <Icon type="ios-arrow-down" /> -->
      </div>
      <div slot="content" class="userDetail">
        <table cellspacing="0">
          <tr>
            <td>欢迎 {{userInfo.name}} 登录</td>
          </tr>
          <tr>
            <td>当前时间 : {{time}}</td>
          </tr>
          <tr>
            <td colspan="2">
              <!-- <Button tpye="primary" @click.native="open">修改密码</Button> -->
              <Button tpye="primary" @click.native="exit">退出登录</Button>
            </td>
          </tr>
        </table>
      </div>
    </Poptip>
    <Modal v-model="changeShow" :mask-closable="!1" draggable :transfer="!1" width="500">
      <p slot="header" style="color:#f60;">
        <Icon type="information-circled"></Icon>
        <span>修改密码</span>
      </p>
      <Form ref="password" :model="password" :rules="ruleCustom" :label-width="100">
        <Row>
          <i-col span="18">
            <FormItem label="旧密码" prop="oldPassword">
              <i-input type="password" v-model="password.oldPassword"></i-input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="18">
            <FormItem label="新密码" prop="newPassword">
              <i-input type="password" v-model="password.newPassword"></i-input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="18">
            <FormItem label="确认新密码" prop="passwdCheck">
              <i-input type="password" v-model="password.passwdCheck"></i-input>
            </FormItem>
          </i-col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="success" @click="onOk">确认</Button>
        <Button type="error" @click="onCancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { eltValidators } from "tool/eltValidators.js";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.password.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.password.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("再次输入密码"));
      } else if (value !== this.password.newPassword) {
        callback(new Error("两次密码输入不同!"));
      } else {
        callback();
      }
    };
    return {
      show: false,
      password: {
        newPassword: "",
        passwdCheck: "",
        oldPassword: ""
        // username: "",
        // regCode: ""
      },
      time: new Date().toLocaleString(),
      time_s: 0,
      ruleCustom: {
        newPassword: [{ required: true, validator: validatePass }],
        passwdCheck: [{ required: true, validator: validatePassCheck }],
        oldPassword: [{ required: true, message: "请输入旧密码！" }],
        regCode: [
          { required: true, message: "请输入发送至您绑定邮箱的验证码！" }
        ]
      }
    };
  },
  props: {},
  created() {},
  computed: {
    userInfo() {
      return this.$store.state.login.userInfo;
    },
    changeShow() {
      return this.$store.state.login.changeShow;
    },
    back() {
      return this.$store.state.login.back;
    }
  },
  mounted() {},
  watch: {
    back(back) {
      if (back) {
        this.$router.push("/homepage");
      }
    }
  },
  methods: {
    showDate() {
      this.time = new Date().toLocaleString();
      this.time_s = setInterval(() => {
        this.time = new Date().toLocaleString();
      }, 1000);
    },
    clearDate() {
      clearInterval(this.time_s);
    },
    exit() {
      this.$store.dispatch("login/loginOut").then(() => {
        this.$router.push("/login");
      });
    },
    open(id) {
      // this.show = true;
      this.$store.commit("login/changeShow", true);
      this.$refs["password"].resetFields();
    },
    onOk() {
      this.$refs["password"].validate(valid => {
        if (valid) {
          this.$store.dispatch({
            type: "login/changePassword",
            password: this.password.passwdCheck,
            oldPassword: this.password.oldPassword
          });
        }
      });
      this.show = this.changeShow;
      // this.$router.push("/homepage");
    },
    sendCode() {
      this.$store.dispatch({
        type: "login/sendCode"
      });
    },
    onCancel() {
      this.$store.commit("login/changeShow", false);
    }
  }
};
</script>

<style lang="scss">
.poptipBox {
  height: 100%;
  float: right;
  line-height: 18px;
  margin-right: 20px;
  // padding: 6px 16px 0;
  cursor: pointer;
  .ivu-poptip {
    padding: 20px 16px 0;
  }
  img {
    display: inline-block;
    width: 28px;
    height: 28px;
    border: 2px solid #fff;
    border-radius: 50%;
    vertical-align: middle;
  }
  .ivu-icon {
    color: #fff;
  }
  &:hover {
    img {
      box-shadow: 0 0 4px #333;
    }
    .ivu-icon {
      color: #4d535a;
    }
  }
  .userDetail td {
    color: #333;
    height: 30px;
    line-height: 30px;
    padding: 0.2rem 0.5rem;
    text-align: center;
  }
}
</style>