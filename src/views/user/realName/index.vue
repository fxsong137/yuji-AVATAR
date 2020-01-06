<template>
  <div class="real-name">
    <el-row type="flex" justify="space-around">
      <el-col :xs="24" :sm="12" :md="10">
        <div class="grid-content bg-purple userAttestation">
          <div>
            <span>实名认证：</span>
          </div>
          <div>
            <el-radio v-model="radio" label="1">已实名</el-radio>
            <el-radio v-model="radio" label="2">未实名</el-radio>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="{span: 18, offset: 3}" :sm="{span: 9, offset: 2}" :md="{span: 6, offset: 5}" :lg="{span: 4, offset: 7}" class="imgs">
        <div class="img-box" @click="humanFaceUpload(1)">

          <el-image
            style="width: 15.9em; height: 11.9em"
            :src="user.humanFaceImg?user.humanFaceImg:require('@/assets/user/userface.png')"
            fit="cover"
          />
        </div>
      </el-col>
      <el-col :xs="20" :sm="2" :md="2" :lg="2" :xl="2" class="imgs" />
      <el-col :xs="{span: 18, offset: 3}" :sm="{span: 9, offset: 2}" :md="{span: 6, offset: 2}" :lg="{span: 4, offset: 2}" class="imgs">
        <div class="img-box" @click="humanFaceUpload(2)">
          <el-image
            style="width: 15.9em; height: 11.9em"
            :src="user.frontImg?user.frontImg:require('@/assets/user/nationalemblem.png')"
            fit="cover"
          />
        </div>
      </el-col>

    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :xs="6" :sm="6" :md="6" :lg="3" :xl="2">
        <div class="grid-content bg-purple sub">
          <el-button type="primary">保存</el-button>
        </div>
      </el-col>
    </el-row>
    <input id="file" type="file" name="file" style="display:none" accept="image/jpg,image/jpeg,image/png,image/PNG" @change="uploadImg(this)">

  </div>
</template>

<script>
// eslint-disable-next-line
let that
export default {
  data() {
    return {
      radio: '1',
      user: {
        humanFaceImg: '',
        frontImg: ''
      },
      zf: 1
    }
  }, mounted() {
    that = this
  }, methods: {
    humanFaceUpload: function(e) { // 人脸上传
      that.zf = e
      // eslint-disable-next-line
      var fileObj = document.getElementById('file').click()
    },
    uploadImg: function() { // 文件上传
      var fileImg = new FileReader()
      var f = document.getElementById('file').files[0]
      fileImg.readAsDataURL(f)
      fileImg.onload = function(e) {
        that.zf === 1 ? that.user.humanFaceImg = this.result : that.user.frontImg = this.result
        document.getElementById('file').value = '' // 清除值 允许重复上传同一张图片进行覆盖
      }
    }
  }

}
</script>
<style lang="scss" >

</style>
<style lang="scss" scoped>
.real-name {
  padding-top: 30px;
  >div:nth-of-type(2){
    margin-top:30px
  }
}
.img-box {
  margin: 20px 0;
  width: 100%;
  height: 100%;
  display:flex;
  justify-content: center;
}
.imgs{
  height:100%;
}
.el-row{
    img:hover{
       cursor: pointer;
     }
     img{
       width: 100%;
       height: 100%;
     }
     .userAttestation{
       display: flex;
       justify-content: center
     }
  .sub{
    margin-top: 10px;
    margin-bottom:10px;
    width: 100%;
     .el-button{
    width: 100%;
     }
  }
}

</style>
