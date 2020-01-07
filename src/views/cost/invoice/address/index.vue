<template>
    <div class="address">
        <div class="top">
            <div class="top-right" @click="changeAddr('add')">添加新地址</div>
        </div>
        <div class="bottom">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="name" align="center" label="姓名" width></el-table-column>
                <el-table-column prop="phone" align="center" label="电话" width></el-table-column>
                <el-table-column prop="addr" align="center" label="地址"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <div class="btn-box" :class="device == 'mobile'?'mobile': ''">
                            <div class="btn edit" @click="changeAddr('edit',scope.row)">修改</div>
                            <div class="btn del">删除</div>
                            <div
                                class="btn default"
                                :class="scope.row.default == 1?'isDef':''"
                            >{{scope.row.default == 1?'默认':'设为默认'}}</div>
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

        <el-dialog :title="title" :visible.sync="dialog" :width="device == 'mobile'?'90%': '30%'" :close-on-click-modal="false" center v-if="dialog">
            <el-form :model="Form" :rules="rules" ref="Form" label-width="70px">
                <el-form-item label="姓名" prop="name">
                    <el-input type="name" v-model.number="Form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input type="phone" v-model.number="Form.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮编" prop="code">
                    <el-input type="code" v-model.number="Form.code" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input type="addr" v-model.number="Form.addr" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="save" @click="submitForm('Form')">保存</div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        var validatePhone = (rule, value, callback)=>{
            if(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
                 callback(new Error('手机号码不正确'));
            } else {
                callback()
            }
        }
        var validateCode = (rule, value, callback)=>{
            if(!/^[1-9][0-9]{5}$/.test(value)) {
                 callback(new Error('邮编不正确'));
            } else {
                callback()
            }
        }
        var validateName = (rule, value, callback)=>{
            if(! /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,5}$/.test(value)) {
                 callback(new Error('请输入正确的姓名'));
            } else {
                callback()
            }
        }
       
        return {
            tableData: [
                {
                    name: "羽迹科技",
                    phone: "13800138000",
                    code: 518000,
                    addr:
                        "广东省深圳市南山区蛇口招商街道沿山路22号火炬创业大厦",
                    default: 1
                },
                {
                    name: "腾讯科技",
                    phone: "13300130000",
                    code: 518000,
                    addr:
                        "广东省深圳市南山区蛇口招商街道沿山路21号腾讯大厦",
                    default: 2
                }
            ],
            dialog: false,
            Form: {
                name: '',
                phone: '',
                code: '',
                addr: ''
            },
            title: '',
            rules: {
                name: [
                    { required: true, message: "姓名不能为空" },
                    {validator: validateName, trigger: 'blur'}
                ],
                phone: [
                    { required: true, message: "手机号不能为空" },
                    { validator: validatePhone, trigger: 'blur' }
                ],
                code: [
                    { required: true, message: "邮编不能为空" },
                    {validator: validateCode, trigger: 'blur' }
                ],
                addr: [
                    { required: true, message: "地址不能为空" }
                ],
            }
        };
    },
    computed: {
        device() {
            return this.$store.state.app.device;
        }
    },
    methods: {
        submitForm: function(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert("submit!");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        changeAddr: function(type,item) {
            this.dialog = true;
            this.title = type == 'add'?'新增':'修改'
            console.log(item)
            this.Form = {...item}
        }
    }
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
        cursor: pointer;
        &.default {
            background: #b5b5b5;
        }
        &.edit {
            background: #99ccff;
        }
        &.del {
            background: #66ccff;
        }

        &.isDef {
            background: #ef5e79;
        }
    }
}

.save {
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background: rgba(94, 218, 239, 1);
    border-radius: 25px;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -100px;
}
</style>