<template>
    <div class="demand">
        <div class="top">
            <div class="select">
                <div class="s-left">
                    <div class="optional"  :class="device == 'mobile'?'mobile': ''">
                        <span>可开票金额：</span>
                        <span>￥{{totalPrice}}</span>
                    </div>
                    <div class="select-num" :class="device == 'mobile'?'mobile': ''">
                        <span>已选金额：</span>
                        <span>￥{{selectPrice}}</span>
                    </div>
                </div>
                <div class="s-right">
                    <div class="text">已选择<span>{{selectList.length}}</span>笔账单</div>
                    <div class="sure">立即开票</div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <el-table :data="tableData" border style="width: 100%"  @selection-change="selectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="order" align="center" label="订单号" width></el-table-column>
                <el-table-column prop="name" align="center" label="API名称" width></el-table-column>
                <el-table-column prop="time" align="center" label="购买时间"></el-table-column>
                <el-table-column prop="num" align="center" label="使用次数"></el-table-column>
                <el-table-column prop="totalPrice" align="center" label="金额"></el-table-column>
                <el-table-column prop="price" align="center" label="单价"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <div class="btn-box">
                            <div class="btn info" @click="changeAddr('edit',scope.row)">详情</div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    :small="device == 'mobile'?true: false"
                    layout="prev, pager, next"
                    :total="10"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    order: 'AWDGREGE123',
                    name: '人脸计算',
                    time: '2019-10-20',
                    num: '20120',
                    totalPrice: 2012,
                    price: 0.1
                },
                {
                    order: 'AWDGREGE123',
                    name: '人脸融合',
                    time: '2019-07-10',
                    num: '2012',
                    totalPrice: 202,
                    price: 0.1
                },
                {
                    order: 'AWDGREGE123',
                    name: '人脸计算',
                    time: '2019-10-20',
                    num: '20120',
                    totalPrice: 2012,
                    price: 1
                }
            ],
            selectList: []
        };
    },
    computed: {
        device() {
            return this.$store.state.app.device;
        },
        selectPrice() {
            var num = 0;
            this.selectList.forEach(el=>{
                num += el.totalPrice
            })
            return num
        },
        totalPrice() {
            var num = 0;
            this.tableData.forEach(el=>{
                num += el.totalPrice
            })
            return num
        }
    },
    methods: {
        selectionChange: function(val) {
            console.log(val)
            this.selectList = val
        }
    }
};
</script>

<style lang="scss" scoped>
.demand {
    padding: 20px;
    .top {
        display: flex;
        justify-content: flex-end;
        .select {
            width: 400px;
            height: 140px;
            border: 1px solid #b5b5b5;
            border-radius: 4px;
            display: flex;
            justify-content: space-around;
            padding: 10px 0;
            .s-left {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .optional {
                    color: #F26342;
                    font-weight: bold;
                    font-size: 16px;
                    
                }
                .select-num {
                    font-size: 14px;
                }
                .mobile {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    span {
                        margin: 4px 0;
                    }
                }
            }
            .s-right {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                .text {
                    font-size: 14px;
                    margin-top: 30px;
                }
                .sure {
                    width: 140px;
                    height: 40px;
                    line-height: 40px;
                    background: #F26342;
                    color: #fff;
                    text-align: center;
                    border-radius: 25px;
                    cursor: pointer;
                }
            }
        }
    }
    .bottom {
        margin-top: 20px;
    }
    .btn-box {
        display: flex;
        justify-content: center;
        align-items: center;
        .btn {
            max-width: 90px;
            height:40px;
            line-height: 40px;
            background:rgba(156,156,156,1);
            border-radius:23px;
            text-align: center;
            color: #fff;
            flex: 1;
            cursor: pointer;
        }
    }
}
</style>