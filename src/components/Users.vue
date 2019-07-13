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
    <el-input style="width:300px" placeholder="请输入内容" v-model="query" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="queryUser"></el-button>
    </el-input>
    <el-button type="success" plain style="margin-left:20px" @click="showAddDialog">添加用户</el-button>
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
          inactive-color="#ff4949"
          @change="changeState(row)"
          >
        </el-switch>
      </template>

    </el-table-column>
    <el-table-column
      label="操作">
      <template v-slot:default="{row}">
        <el-button type="primary" icon="el-icon-edit" @click="showEditDialog(row)" plain size="small"></el-button>
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

  <!-- 点击添加显示对话框 -->
  <el-dialog
    title="添加用户"
    :visible.sync="addDialogVisible"
    width="40%"
    >
    <el-form ref="addForm" :model="addForm" :rules="rules" label-width="100px" status-icon>
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input placeholder="请输入邮箱" v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input placeholder="请输入手机" v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
  </el-dialog>
  <!-- 修改用户 -->
  <el-dialog
    title="修改用户"
    :visible.sync="editDialogVisible"
    width="40%"
    >
    <el-form ref="editForm" :model="editForm" :rules="rules" label-width="100px" status-icon>
      <el-form-item label="用户名" prop="username">
        <el-tag type="info">{{editForm.username}}</el-tag>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input placeholder="请输入邮箱" v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input placeholder="请输入手机" v-model="editForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editUser">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      tableData: [],
      pagenum: 1,
      pagesize: 2,
      total: 0,
      // 添加用户的对话框，默认是隐藏
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入有效的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editForm: {
        id: '',
        email: '',
        mobile: '',
        username: ''
      }
    }
  },
  // 一进页面就渲染
  created () {
    this.getrequest()
  },
  methods: {
    // 封装ajax
    async getrequest () {
      const { data, meta } = await this.axios({
        url: 'users',
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (meta.status === 200) {
        this.tableData = data.users
        this.total = data.total
      }
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
    async deleteUser (id) {
      await this.$confirm('确定删除吗?', '温馨提示', {
        type: 'warning'
      })
      const { meta } = await this.axios({
        method: 'delete',
        url: `users/${id}`
      })
      if (meta.status === 200) {
        this.$message.success('删除成功')
        if (this.tableData.length === 1 && this.pagenum > 1) {
          this.pagenum--
        }
        this.getrequest()
      }
    },
    // 修改状态功能
    async changeState ({ id, mg_state: state }) {
      const res = await this.axios.put(`users/${id}/state/${state}`)
      const { status, msg } = res.meta
      if (status === 200) {
        this.$message.success('修改成功')
        this.getrequest()
      } else {
        this.$message.error(msg)
      }
    },
    showAddDialog () {
      this.addDialogVisible = true
    },
    // 添加功能
    async addUser () {
      // validate 对内容进行校验
      await this.$refs.addForm.validate()
      const res = await this.axios.post('users', this.addForm)
      const { status } = res.meta
      if (status === 201) {
        // 提示消息
        this.$message.success('添加成功')
        // 重置表单
        this.$refs.addForm.resetFields()
        // 隐藏对话框
        this.addDialogVisible = false
        // 重新渲染
        this.total++ // 总个数++
        this.pagenum = Math.ceil(this.total / this.pagesize)
        this.getrequest()
      } else {
        this.$message.error('添加失败')
      }
    },
    // 修改框显示
    showEditDialog (user) {
      this.editDialogVisible = true
      this.editForm = { ...user }
    },
    // 开始修改内容
    async editUser () {
      await this.$refs.editForm.validate()
      const { id, email, mobile } = this.editForm
      const res = await this.axios.put(`users/${id}`, { email, mobile })
      const { msg, status } = res.meta
      if (status === 200) {
        this.$message.success('修改成功')
        this.editDialogVisible = false
        this.getrequest()
      } else {
        this.$message.error(msg)
      }
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
</style>
