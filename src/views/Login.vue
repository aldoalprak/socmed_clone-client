<template>
    <div class="login">
        <div class="container">
            <Login/>
        </div>
        
    </div>
</template>

<script>

import Login from '../components/Login.vue'
export default {
    name:"login",
    components: {
        Login
    }
}
</script>

<style scoped>

.login {
    background-image: url("https://wallup.net/wp-content/uploads/2017/11/22/395849-Twitter-social_networks.jpg");
    background-size: contain
}
</style>

