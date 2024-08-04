<template>
    <form @submit.prevent="login">
        <p>
            <input type="text" placeholder="username" v-model="user.username">
        </p>
        <p>
            <input type="password" placeholder="password" v-model="user.password">
        </p>
        <p>
            <button type="submit">Login</button>
        </p>
        <p v-if="error">{{ error }}</p>
    </form>
</template>
<script>
import auth from '@/services/auth.service';

export default {
    name: 'LoginView',
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
        async login () {
            const userJSON = JSON.stringify(this.user);
            await auth.login(userJSON)
            .then((resp) => {
                // filtrando as informações
                const userInfo = { id: resp.data.id, username: resp.data.username };
                const token = resp.data.token;

                // aplicando elas ao caching do navegador
                localStorage.setItem("user-info", JSON.stringify(userInfo));
                localStorage.setItem("token", token);
                
                // redirecionando o usuário para a página apropriada
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