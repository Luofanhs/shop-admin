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
    <el-button type="success" plain style="margin-left:20px">添加用户</el-button>
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
      label="状态">
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
      <template v-slot:default="{row}">
        <el-button type="primary" icon="el-icon-edit" plain size="small"></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteUser(row.id)" plain size="small"></el-button>
        <el-button type="success" icon="el-icon-check" plain size="small">分配角色</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <div class="block">
    <!--
      size-change 指下拉菜单变化
      current-change 指当前页发生变化
     -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
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
  // 一进页面就渲染
  created () {
    this.getrequest()
  },
  methods: {
    // 封装ajax
    getrequest () {
      axios({
        url: 'http://localhost:8888/api/private/v1/users',
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res.data)
        const { data, meta } = res.data
        if (meta.status === 200) {
          this.tableData = data.users
          this.total = data.total
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
      this.getrequest()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getrequest()
    },
    queryUser () {
      this.pagenum = 1
      this.getrequest()
    },
    // 删除
    deleteUser (id) {
      this.$confirm('确定删除吗?', '温馨提示', {
        type: 'warning'
      }).then(() => {
        axios({
          method: 'delete',
          url: `http://localhost:8888/api/private/v1/users/${id}`,
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }).then(res => {
          console.log(res.data)
          const { meta } = res.data
          if (meta.status === 200) {
            this.$message.success('删除成功')
            if (this.tableData.length === 1 && this.pagenum > 1) {
              this.pagenum--
            }
            this.getrequest()
          }
        })
      })
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
