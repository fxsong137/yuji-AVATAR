<template>
  <div class="api-list">
    <el-row>
      <el-col :xs="{span: 14, offset: 10}" :sm="{span: 7, offset: 1}" :md="{span: 4, offset: 1}" :lg="{span: 4, offset: 3}" :xl="{span: 4, offset: 3}">
        <el-button type="primary" round @click="dialogFormVisible = true">申请新项目</el-button>
      </el-col>
      <el-col :xs="{span: 18, offset: 4}" :sm="{span: 7, offset: 9}" :md="{span: 8, offset: 10}" :lg="{span: 6, offset: 8}" :xl="{span: 5, offset: 8}" class="query ">
        <el-input v-model="querySeo" class="textarea" placeholder="请输入内容" />
        <el-button type="primary" round @click="query">搜索</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="{span: 23, offset: 1}" :sm="{span: 24, offset: 0}" :md="{span: 22, offset: 1}" :lg="{span: 18, offset: 3}" :xl="{span: 17, offset: 3}">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="API名称" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.nameApi }}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价/元" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.money }}</span>
            </template>
          </el-table-column>
          <el-table-column label="成交次数" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.count }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="experienceImpl(scope.$index, scope.row)"
              >体验</el-button>
              <el-button
                size="mini"
                type="success"
                @click="buyImpl(scope.$index, scope.row)"
              >购买</el-button>
              <el-button
                size="mini"
                type="warning"
                @click="explainImpl(scope.$index, scope.row)"
              >说明</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="detailsImpl(scope.$index, scope.row)"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
    </el-row>
    <el-dialog title="申请新项目" :visible.sync="dialogFormVisible" center :width="width>970?'45%':'70%'">
      <el-form ref="form" :model="form">
        <el-form-item prop="description" label="项目描述:" size="mini" :rules="[{ required: true, message: '项目描述不允许未空'}]">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item prop="phone" label="电话:" :rules="[{ required: true, message: '电话号码不允许为空'}]">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="name" label="姓名:" :rules="[{ required: true, message: '姓名不允许为空'}]">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="company" label="公司:" :rules="[{ required: true, message: '公司不允许为空'}]">
          <el-input v-model="form.company" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bakover('form')">取 消</el-button>
        <el-button type="primary" @click="createName('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line
let that
export default {
  data() {
    return {
      tableData: [
        {
          id: 0,
          nameApi: '牛逼class',
          date: '2016-05-02',
          money: 0.3,
          count: 1000,
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 1,
          nameApi: '小牛逼',
          date: '2016-05-04',
          money: 1,
          count: 987,
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 2,
          nameApi: '大傻逼',
          date: '2016-05-01',
          money: 0.2,
          count: 999,
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 3,
          nameApi: 'No.1',
          date: '2016-05-03',
          money: 0.2,
          count: 999999999,
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      width: `${document.documentElement.clientHeight}`,
      querySeo: '', // 搜索字符串
      dialogFormVisible: false, // 对话框
      form: {
        description: '',
        phone: '',
        name: '',
        company: ''
      }

    }
  },
  mounted() {
    that = this
    window.onresize = () => {
      return (() => {
        // 可以在这里保存到浏览器中，也可以保存到其他地方
        that.width = `${document.documentElement.clientWidth}`
      })()
    }
  },
  methods: {
    query: function() { // 模糊搜索
      if (!that.querySeo) {
        this.$message({
          message: '请输入查询内容',
          type: 'warning'
        })
        return
      }
    },
    createName: function(formName) { // 申请新项目确认
      that.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) { // 规则验证通过
          that.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    bakover: function(formName) {
      that.$refs[formName].resetFields()// 清除数据
      that.dialogFormVisible = false
    },
    experienceImpl: function(index, row) { // 体验
      console.log(index, row)
    },
    buyImpl: function(index, row) { // 购买
      console.log(index, row)
    },
    explainImpl: function(index, row) { // 说名
      console.log(index, row)
    },
    detailsImpl: function(index, row) { // 详情
      // console.log(index, row)
      that.$router.push({
        name: 'details',
        params: {
          id: row.id
        },
        query: {
          t: +new Date() // 保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.api-list{
  padding: 20px;
  >div:nth-of-type(2){
    margin-top: 30px
  }
  .el-row{
    >div{
      margin-top: 10px;
    }
  }
  .query{
    display: flex;
    .textarea{
      >>>.el-input__inner{
    border-radius: 20px 0 0 20px;
     }
    }
    button{
      border-radius:  0 20px 20px 0;
    }
  }
  .el-button+.el-button{
    margin: 5px 0;

  }
}
</style>
