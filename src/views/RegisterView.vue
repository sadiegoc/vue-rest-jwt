<template>
    <form @submit.prevent="register">
        <p>
            <input type="text" placeholder="username" v-model="user.username">
        </p>
        <p>
            <input type="password" placeholder="password" v-model="user.password">
        </p>
        <p>
            <button type="submit">Register</button>
        </p>
        <p v-if="error">{{ error }}</p>
    </form>
</template>
<script>
import auth from '@/services/auth.service';
export default {
    name: 'RegisterView',
    data () {
        return {
            error: "",
            user: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        async register () {
            const userJSON = JSON.stringify(this.user);
            await auth.register(userJSON)
            .then((resp) => {
                const userInfo = { id: resp.data.id, username: resp.data.username };
                const token = resp.data.token;
                localStorage.setItem("user-info", userInfo);
                localStorage.setItem("token", token);
                this.$router.push({ name: 'dashboard' });
            })
            .catch((err) => {
                this.error = err.response.data?.message;
            });
        }
    }
}
</script>
<style scoped>
    
</style>