<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">用户注册</h3>
      </div>

      <el-form-item prop="UserId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="UserId"
          v-model="loginForm.UserId"
          placeholder="用户账号"
          name="UserId"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="UserName">
        <span class="svg-container">
          <svg-icon icon-class="table" />
        </span>
        <el-input
          ref="UserName"
          v-model="loginForm.Username"
          placeholder="用户名"
          name="UserName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="UserEmail">
        <span class="svg-container">
          <svg-icon icon-class="form" />
        </span>
        <el-input
          ref="UserEmail"
          v-model="loginForm.Email"
          placeholder="邮箱地址"
          name="UserEmail"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="UserMobile">
        <span class="svg-container">
          <svg-icon icon-class="example" />
        </span>
        <el-input
          ref="UserEmail"
          v-model="loginForm.Mobile"
          placeholder="电话"
          name="UserMobile"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="Password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="Password"
          v-model="loginForm.Password"
          :type="passwordType"
          placeholder="至少六位字符的用户密码"
          name="Password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleRegister"
      >注册</el-button>
      <el-button type="text" @click="goLogin">用户登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUserId, validUsername } from "@/utils/validate";
import Axios from "axios";

export default {
  name: "Login",
  data() {
    const validateUserId = (rule, value, callback) => {
      if (!validUserId(value)) {
        callback(new Error("Please enter the correct user ID"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error("Please enter the correct email"));
      } else {
        callback();
      }
    };
    const validateMobile = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error("Please enter the correct mobilephone number"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        UserId: "",
        Password: "",
        Username: "",
        Email: "",
        Mobile: ""
      },
      loginRules: {
        UserId: [
          { required: true, trigger: "blur", validator: validateUserId }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ],
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        email: [{ required: true, trigger: "blur", validator: validateEmail }],
        mobile: [{ required: true, trigger: "blur", validator: validateMobile }]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleRegister() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          // this.$store.dispatch('user/login', this.loginForm).then(() => {
          //   this.$router.push({ path: this.redirect || '/' })
          //   this.loading = false
          // }).catch(() => {
          //   this.loading = false
          // })
          Axios.post("https://localhost:5001/api/User/Register", this.loginForm)
            .then(res => {
              console.log(res.data);
              this.$message("您已注册成功");
            })
            .catch(this.$message("注册失败"))
            .finally((this.loading = false));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
