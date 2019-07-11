<template>
  <el-container class="index">
    <el-header>
      <div class="login"></div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="logout">
        欢迎登陆
        <a @click="logout" href="javascript:;">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
          >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$confirm('你确定要退出吗', '提示', {
        type: 'warning'
      }).then(() => {
        // 点击了确定
        localStorage.removeItem('token')
        // 跳转到登录页
        this.$router.push('/login')
      }).catch(() => {
        this.$message('取消操作')
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.index {
  height: 100%;
  .el-header {
    background-color: #b3c1cd;
    display: flex;
    .login,
    .logout {
      width: 180px;
    }
    .login {
      background: url("../assets/logo.png") no-repeat center center;
      background-size: contain;
    }
    .title {
      flex: 1;
      h1 {
        font-size: 30px;
        text-align: center;
        height: 60px;
        line-height: 60px;
      }
    }
    .logout {
      font-weight: 700;
      height: 60px;
      line-height: 60px;
      text-align: left;
      a{
        color: orange;
      }
    }
  }
  .el-aside{
    background-color: #545c64;
  }
  .el-main {
    background-color: #eaeef1;
  }
}
</style>
