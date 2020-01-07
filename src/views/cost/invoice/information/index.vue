<template>
    <div class="information">
        <el-tabs :tab-position="device == 'mobile'?'top': 'left'" style="height: 200px;">
            <el-tab-pane label="增值税普通发票">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="税务登记证号">
                        <el-input v-model="form.certificate" style="maxWidth: 320px"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="增值税专用发票">
                <el-form ref="form" :model="form" label-width="130px">
                    <el-form-item label="税务登记证号">
                        <el-input v-model="form.certificate" style="maxWidth: 320px"></el-input>
                    </el-form-item>
                    <el-form-item label="基本开户银行名称">
                        <el-input v-model="form.bank" style="maxWidth: 320px"></el-input>
                    </el-form-item>
                    <el-form-item label="基本开户账号">
                        <el-input v-model="form.account" style="maxWidth: 320px"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                certificate: "",
                account: "",
                bank: ""
            }
        };
    },
    computed: {
        device() {
            return this.$store.state.app.device;
        }
    }
};
</script>

<style lang="scss" scoped>
.information {
    padding: 20px;
}
</style>