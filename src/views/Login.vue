<template>
    <div class="login" v-loading.fullscreen.lock="state.isInProgress">
        <el-alert title="Une erreur est survenue" type="error" v-if="state.isError"></el-alert>
        <h1>Login</h1>
        <el-form :inline="true" :model="form">
            <el-form-item label="Email">
                <el-input v-model="form.username" placeholder="Email" clearable></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input type="password" v-model="form.password" placeholder="Password" clearable></el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="onSubmit()">Login</el-button>
    </div>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Mutation, State } from 'vuex-class';


@Component
export default class Login extends Vue {
    @State(state => state) state;
    @Action('signIn') signIn;

    data() {
        return {
            form: {
                username: "",
                password: ""
            }
        }
    }

    async onSubmit() {
        await this.signIn(this.form);
        if(this.state.isAuthentified) {
            this.$router.push({name: "Dashboard"});
        }
    }

}
</script>