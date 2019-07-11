<template>
<div class="users">
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 搜索框 -->
  <div style="margin-top: 15px;">
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
  <!-- 表格 -->
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
    <el-table-column
      label="用户状态">
    </el-table-column>
    <el-table-column
      label="操作">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      tabledata: ''
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style>
.el-breadcrumb{
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  font-size: 16px;
  background-color: #d4dae0;
}
.el-input{
  width: 300px;
}
</style>
