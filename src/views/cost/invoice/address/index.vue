<template>
    <div class="address">
        <div class="top">
            <div class="top-right">添加新地址</div>
        </div>
        <div class="bottom">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="name" align="center" label="姓名" width="100"></el-table-column>
                <el-table-column prop="phone" align="center" label="电话" width="120"></el-table-column>
                <el-table-column prop="address" align="center" label="地址" width></el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <div class="btn-box"  :class="device == 'mobile'?'mobile': ''">
                            <div class="btn edit">修改</div>
                            <div class="btn del">删除</div>
                            <div class="btn default" :class="scope.row.default == 1?'isDef':''">{{scope.row.default == 1?'默认':'设为默认'}}</div>
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
                    name: '羽迹科技',
                    phone: '13800138000',
                    address: '广东省深圳市南山区蛇口招商街道沿山路22号火炬创业大厦',
                    default: 1,
                },
                 {
                    name: '羽迹科技',
                    phone: '13800138000',
                    address: '广东省深圳市南山区蛇口招商街道沿山路22号火炬创业大厦',
                    default: 2,
                }
            ]
        }
    },
    computed: {
        device() {
            return this.$store.state.app.device;
        }
    },
};
</script>

<style lang="scss" scoped>
.address {
    padding: 20px;
    .top {
        display: flex;
        justify-content: flex-end;
        .top-right {
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
    .bottom {
        margin-top: 20px;
    }
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.btn-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 10px;
    &.mobile {
        flex-direction: column;
        .btn {
            width: 70px;
        }
    }
    .btn {
       color: #fff; 
       border-radius: 23px; 
       width: 90px;
       margin: 10px 0;
       font-size: 14px;
       height: 40px;
       line-height: 40px;
       &.default {
           background: #B5B5B5;
       }
       &.edit {
           background: #99CCFF;  
       }
       &.del {
           background: #66CCFF;  
       }

       &.isDef {
           background: #EF5E79; 
       }
    }
}
</style>