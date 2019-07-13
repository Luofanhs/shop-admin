<template>
  <div class="login">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <img src="../assets/avatar.jpg" alt />
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登陆</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单的数据
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      // 用于重置表单内容
      this.$refs.form.resetFields()
    },
    async login () {
      try {
        await this.$refs.form.validate()
        const { meta, data } = await this.axios.post('login', this.form)
        // form表单数据也是一个对象，直接this.form
        // 解构
        if (meta.status === 200) {
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
          // token是在客户端频繁向服务端请求数据，
          // 服务端频繁的去数据库查询用户名和密码并进行对比，判断用户名和密码正确与否，并作出相应提示
          localStorage.setItem('token', data.token)
          this.$router.push('/')
        } else {
          this.$message.error(meta.msg)
        }
      } catch (e) {
        return false
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;

  .el-form {
    width: 400px;
    margin: 200px auto;
    background-color: #fff;
    padding: 75px 40px 15px;
    border-radius: 20px;
    position: relative;
  }

  img {
    border-radius: 50%;
    position: absolute;
    left: 175px;
    top: -70px;
    border: 10px solid #fff;
  }

  .el-button:nth-child(2) {
    margin-left: 80px;
  }
}
</style>
