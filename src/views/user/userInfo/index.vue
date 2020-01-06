<template>
  <div class="user-info">
    <el-row type="flex" justify="center">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="2">
        <div class="icon">
          <img src="@/assets/image/icon.jpg" alt srcset />
          <span>羽迹 AVATAR</span>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="20" :sm="12" :md="10" :lg="8" :xl="6">
        <div class="input-box">
          <span class="title">账号</span>
          <span class="value">13800138000</span>
        </div>
        <div class="input-box">
          <span class="title">真实姓名</span>
          <span class="value">羽迹</span>
        </div>
        <div class="input-box">
          <span class="title">实名状态</span>
          <span class="value">已实名</span>
        </div>
        <div class="input-box">
          <span class="title">微信号</span>
          <span class="value">weixinhao</span>
        </div>
        <div class="input-box">
          <span class="title">手机号</span>
          <span class="value">13800138000</span>
        </div>
        <div class="input-box">
          <span class="title">邮箱</span>
          <span class="value">yujishishi@163.com</span>
        </div>
        <div class="input-box">
          <span class="title">公司名</span>
          <span class="value">羽迹科技</span>
        </div>
        <div class="input-box">
          <span class="title">公司地址</span>
          <span class="value">深圳南山火炬大厦深圳南山火炬大厦</span>
        </div>
      </el-col>
    </el-row>
     <el-row type="flex" justify="center">
      <el-col :xs="20" :sm="12" :md="10" :lg="8" :xl="6">
          <div class="btn-box">
            <div class="btn">保存</div>
          </div>
      </el-col>
    </el-row>    
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
        zhanghao: 'yuji',
    };
  }
};
</script>

<style lang="scss" scoped>
.user-info {
    margin-top: 30px;
}
.icon {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
  span {
    margin: 10px 0 20px;
    font-size: 16px;
    color: #4c4c4c;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.input-box {
    display: flex;
    align-items: center;
    margin-top: 18px;
    .title {
        flex-basis: 60px;
        font-size: 14px;
        text-align: right;
        color: #9B9B9B;
        margin-right: 20px;
    }
    .value {
        flex: 1;
        background: #F4F4F4;
        height: auto;
        border-radius: 4px;
        padding: 13px;
        color: #333;
        font-size: 16px;
        border: 1px solid #eee;
    }
}
.btn-box {
    display: flex;
    justify-content: center;
    margin: 30px 0;
    .btn {
        width: 40%;
        height: 40px;
        line-height: 40px;
        color: #fff;
        background: #5EDAEF;
        text-align: center;
        border-radius: 4px;
    }
}
</style>