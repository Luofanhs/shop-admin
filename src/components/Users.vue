<template>
<div class="users">
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 搜索框 -->
  <div>
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="queryUser"></el-button>
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
      <!--
        v-slot:default="{ row }" 指作用域插槽
        default是默认插槽的意思
       -->
      <template v-slot:default="{ row }">
        <el-switch
          v-model="row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template v-slot:default="{ row }">
        <el-button type="primary" icon="el-icon-edit" plain round></el-button>
        <el-button type="danger" icon="el-icon-delete" plain round @click="deleteUser(row.id)"></el-button>
        <el-button type="success" icon="el-icon-check" plain round>分配角色</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pagenum"
    :page-sizes="[2, 4, 6, 8, 10]"
    :page-size="pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      query: '',
      tableData: [],
      pagenum: 1,
      pagesize: 2,
      total: 0
    }
  },
  // 钩子函数
  created () {
    this.getUserList()
    console.log(this)
  },
  methods: {
    getUserList () {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        },
        // 设置请求头
        // 要渲染列表要加上token
        // headers 请求头
        // Authorization 授权
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        const { meta, data } = res.data
        if (meta.status === 200) {
          this.tableData = data.users
          this.total = data.total
        }
      })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getUserList()
    },
    queryUser () {
      this.pagenum = 1
      this.getUserList()
    },
    deleteUser (id) {
      console.log(id)
      this.$confirm('确定删除吗?', '温馨提示', {
        type: 'warning'
      }).then(() => [
        axios.delete(`http://localhost:8888/api/private/v1/users/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }).then(res => {
          const { meta } = res.data
          console.log(res)
          if (meta.status === 200) {
            this.$message.success('删除成功')
            // 判断，如果当前页就剩下一条，应该让pagenum -1
            if (this.tableData.length === 1 && this.pagenum > 1) {
              this.pagenum--
            }
            // 重新渲染
            this.getUserList()
          } else {
            this.$message.error(meta.msg)
          }
        })
      ])
    }
  }
}
</script>

<style lang='scss' scoped>
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
