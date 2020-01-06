<template>
<<<<<<< HEAD
  <div>
    余额
  </div>
=======
    <div class="balance" :style="device == 'mobile'?'margin:10px':'' ">
        <div class="top">
            <div class="right" :style="device == 'mobile'?'left:0;top:0':'' ">
                <div class="r-left">
                    <div class="title">可用余额:</div>
                    <div class="price">
                        <span class="num">
                            <span class="icon">￥</span>2020
                        </span>
                    </div>
                </div>
                <div class="r-right" @click="Invoice">充值</div>
            </div>
        </div>
        <div class="my-tab" :class="device == 'mobile'?'mobile':'' ">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="充值成功" name="first">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="num" align="center" label="订单号" width></el-table-column>
                        <el-table-column prop="type" align="center" label="类型" width></el-table-column>
                        <el-table-column prop="money" align="center" label="充值金额" width></el-table-column>
                        <el-table-column prop="time" align="center" label="充值时间" width></el-table-column>
                        <el-table-column prop="times" align="center" label="完成时间" width></el-table-column>
                        <el-table-column label="操作" align="center" width>
                            <template slot-scope="scope">
                                <el-button
                                    @click="handleClick(scope.row)"
                                    type="text"
                                    size="small"
                                >详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                            :small="device == 'mobile'?true: false"
                            layout="prev, pager, next"
                            :total="20"
                        ></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="充值失败" name="second">充值失败</el-tab-pane>
            </el-tabs>
        </div>
    </div>
>>>>>>> 7e58f6e87e03da49863e2c673be01615b2b86da0
</template>

<script>
export default {
<<<<<<< HEAD

}
=======
    name: "Balance",
    data() {
        return {
            activeName: "first",
            tableData: [
                {
                    num: "456132132156132",
                    type: '支付宝',
                    money: 50,
                    time: "2019-01-02",
                    times: "2019-01-02"
                },
                {
                    num: "456132132156132",
                    type: '微信',
                    money: 50,
                    time: "2019-01-02",
                    times: "2019-01-02"
                },
                {
                    num: "456132132156132",
                    type: '银行卡转账',
                    money: 50,
                    time: "2019-01-02",
                    times: "2019-01-02"
                },
                {
                    num: "456132132156132",
                    type: '银行卡转账',
                    money: 50,
                    time: "2019-01-02",
                    times: "2019-01-02"
                },
                {
                    num: "456132132156132",
                    type: '银行卡转账',
                    money: 50,
                    time: "2019-01-02",
                    times: "2019-01-02"
                },
                {
                    num: "456132132156132",
                    type: '支付宝',
                    money: 50,
                    time: "2019-01-02",
                    times: "2019-01-02"
                },
                {
                    num: "456132132156132",
                    type: '支付宝',
                    money: 50,
                    time: "2019-01-02",
                    times: "2019-01-02"
                },
                {
                    num: "456132132156132",
                    type: '支付宝',
                    money: 50,
                    time: "2019-01-02",
                    times: "2019-01-02"
                },
                {
                    num: "456132132156132",
                    type: '支付宝',
                    money: 50,
                    time: "2019-01-02",
                    times: "2019-01-02"
                },
                {
                    num: "456132132156132",
                    money: 50,
                    time: "2019-01-02",
                    times: "2019-01-02",
                    type: '支付宝',
                }
            ]
        };
    },
    computed: {
        device() {
            return this.$store.state.app.device;
        }
    },
    methods: {
        handleClick: function(tab, event) {
            console.log(tab, event);
        },
        Invoice: function() {
            this.$router.push({ name: "Order" });
        }
    }
};
>>>>>>> 7e58f6e87e03da49863e2c673be01615b2b86da0
</script>

<style lang="scss" scoped>
.balance {
    margin: 30px;

<<<<<<< HEAD
</style>
=======
    .top {
        position: relative;
        .right {
            position: absolute;
            right: 0;
            top: -15px;
            display: flex;
            align-items: center;
            .r-left {
                display: flex;
                align-items: baseline;
                margin-right: 15px;
                .title {
                    font-size: 16px;
                    color: #000;
                    font-weight: bold;
                    margin-right: 10px;
                }
                .price {
                    color: #f26342;
                    display: flex;
                    align-items: flex-end;
                    vertical-align: middle;
                    .num {
                        font-size: 40px;
                        font-weight: bold;
                        .icon {
                            font-size: 16px;
                        }
                    }
                }
            }
            .r-right {
                width: 100px;
                height: 42px;
                line-height: 42px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                background: rgba(94, 218, 239, 1);
                border-radius: 24px;
                cursor: pointer;
                z-index: 1;
            }
        }
    }
}

.mobile {
    padding-top: 50px;
}
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}
</style>
>>>>>>> 7e58f6e87e03da49863e2c673be01615b2b86da0
