<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">资金在线管理系统</span>
        <el-form
          :model="registerForm"
          status-icon
          :rules="rules"
          ref="registerForm"
          label-width="auto"
          class="registerForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              type="text"
              v-model="registerForm.name"
              autocomplete="off"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="email"
              v-model="registerForm.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerForm.password"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="registerForm.checkPass"
              autocomplete="off"
              placeholder="请确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择身份">
            <el-select v-model="registerForm.identity" placeholder="请选择身份">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('registerForm')"
              class="submit_btn"
              >提交</el-button
            >
            <el-button @click="resetForm('registerForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";

//登录界面
export default {
  name: "register",
  component: {},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        name: "",
        email: "",
        password: "",
        checkPass: "",
        identity: "employee", //默认值为员工
      },
      rules: {
        name: [
          {
            required: true,
            message: "需要填写姓名",
            trigger: "blur",
          },
          {
            min: 2,
            max: 30,
            message: "用户名字符须在2~30个字符内",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "邮箱不可为空",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入正确的邮箱格式",
          },
        ],
        pass: [
          {
            required: true,
            message: "需要填写密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 30,
            message: "用户名字符须在6~30个字符内",
            trigger: "blur",
          },
        ],
        checkPass: [
          {
            required: true,
            message: "需要确认密码",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur" },
        ],
      },
      options: [
        {
          value: "manager",
          label: "管理员",
        },
        {
          value: "employee",
          label: "员工",
          default: true,
        },
      ],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //随后"/api" -> "http://localhost:3000/api/"
          //关于第二个参数 this.registerForm:
          //作为一个JS 对象,将在请求时自动转换为 JSON 格式并放在请求报文的 body中
          axios.post("/api/user/register", this.registerForm).then((res) => {
            Message.success("注册成功");
          });

          //跳转到登录页面
          this.$router.push("/login");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 60%;
}
</style>