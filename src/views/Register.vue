<template>
    <div class="register">
        <div class="container">
            <Register/>
        </div>
        
    </div>
</template>

<script>

import Register from '../components/Register.vue'
export default {
    name:"register",
    components: {
        Register
    }
}
</script>

<style scoped>

.register {
    background-image: url("https://wallup.net/wp-content/uploads/2017/11/22/395849-Twitter-social_networks.jpg");
    background-size: contain
}
</style>

