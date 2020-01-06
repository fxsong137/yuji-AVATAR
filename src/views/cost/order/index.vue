<template>
<<<<<<< HEAD
  <div>
    订单
  </div>
=======
    <div class="order">
        <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="12" :md="18" :lg="16" :xl="12">
                <div class="rechare" :class="device == 'mobile'?'mobile':'' ">
                    <div
                        class="rechare-item"
                        @click="select(1)"
                        :class="active == '1'?'active':'' "
                    >
                        <svg-icon icon-class="zhifubao" />
                        <span>支付宝</span>
                    </div>
                    <div
                        class="rechare-item"
                        @click="select(2)"
                        :class="active == '2'?'active':'' "
                    >
                        <svg-icon icon-class="weixin" />
                        <span>微信支付</span>
                    </div>
                    <div
                        class="rechare-item"
                        @click="select(3)"
                        :class="active == '3'?'active':'' "
                    >
                        <svg-icon icon-class="yinhangka" />
                        <span>银行卡支付</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="8">
                <div class="qr-box" v-if="active == 1">
                    <div class="qr">
                        <img src="@/assets/image/qr.png" alt srcset />
                    </div>
                    <span>打开支付宝扫码支付</span>
                </div>
                <div class="qr-box" v-if="active == 2">
                    <div class="qr">
                        <img src="@/assets/image/qr.png" alt srcset />
                    </div>
                    <span>打开微信扫码支付</span>
                </div>
                <div class="bank" v-if="active == 3" :class="device == 'mobile'?'mobile':'' ">
                    <div class="input-box">
                        <span class="title">银行名称</span>
                        <span class="value">中国银行</span>
                    </div>
                    <div class="input-box">
                        <span class="title">银行卡号</span>
                        <span class="value">6228481461234567890</span>
                    </div>
                    <div class="input-box">
                        <span class="title">收款人</span>
                        <span class="value">羽迹科技</span>
                    </div>
                    <div class="tips">如果您转账已完成请将转账记录图上传已便于工作人员查询</div>
                    <div class="upload">
                        <div class="upload-img">
                            <i class="el-icon-plus"></i>
                            <span>点击上传</span>
                        </div>
                        <div class="upload-btn">
                            确认
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
>>>>>>> 7e58f6e87e03da49863e2c673be01615b2b86da0
</template>

<script>
export default {
<<<<<<< HEAD

}
=======
    data() {
        return {
            active: 1
        };
    },
    computed: {
        device() {
            return this.$store.state.app.device;
        }
    },
    methods: {
        select: function(i) {
            this.active = i;
        }
    }
};
>>>>>>> 7e58f6e87e03da49863e2c673be01615b2b86da0
</script>

<style lang="scss" scoped>
.order {
    margin: 20px;
    .rechare {
        display: flex;
        justify-content: space-between;
        .rechare-item {
            padding: 30px;
            height: 100px;
            background: #eee;
            border-radius: 4px;
            display: flex;
            justify-content: space-around;
            align-items: center;

<<<<<<< HEAD
</style>
=======
            svg {
                width: 70px;
                height: 70px;
            }
            span {
                margin-left: 30px;
            }
            &.active {
                border: 1px solid #5edaef;
            }
        }
        &.mobile {
            .rechare-item {
                padding: 20px;

                span {
                    display: none;
                }
                svg {
                    width: 50px;
                    height: 50px;
                }
            }
        }
    }
}

.qr-box {
    border: 1px solid #eee;
    border-radius: 8px;
    margin-top: 30px;
    padding: 30px 0 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .qr {
        width: 200px;
        height: 200px;
        margin: 30px 0;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.bank {
    margin-top: 30px;
    border: 1px solid #eee;
    padding: 20px;
    border-radius: 8px;
    &.mobile {
        border: none;
        padding: 0;
    }
    .input-box {
        display: flex;
        align-items: center;
        margin-top: 18px;
        .title {
            flex-basis: 60px;
            font-size: 14px;
            text-align: right;
            color: #9b9b9b;
            margin-right: 20px;
        }
        .value {
            flex: 1;
            background: #f4f4f4;
            height: auto;
            border-radius: 4px;
            padding: 13px;
            color: #333;
            font-size: 16px;
            border: 1px solid #eee;
        }
    }
    .tips {
        text-align: center;
        font-size: 14px;
        color: #1b1b1b;
        margin: 30px 0;
    }
    .upload {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .upload-img {
            border: 1px dashed #a0a0a0;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 150px;
            width: 300px;
            position: relative;
            cursor: pointer;
            .el-icon-plus {
                font-size: 30px;
                margin-bottom: 10px;
                font-weight: bold;
            }
        }
        .upload-btn {
            height: 45px;
            line-height: 45px;
            text-align: center;
            font-size: 14px;
            color: #fff;
            background:#5EDAEF; 
            width: 35%;
            margin-top: 20px;
            border-radius: 4px;
        }
    }
}
</style>
>>>>>>> 7e58f6e87e03da49863e2c673be01615b2b86da0
