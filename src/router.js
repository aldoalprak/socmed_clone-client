    
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    import TimeLine from './views/TimeLine.vue'
    import Login from './views/Login.vue'
    import Register from './views/Register.vue'
    
    
    Vue.use(VueRouter)

    export default 
        new VueRouter({
            routes: [
                {
                    name: "timeline",
                    path: "/timeline",
                    component: TimeLine
                },
                {
                    name: "login",
                    path:"/",
                    component: Login    
                },
                {
                    name:"register",
                    path: "/register",
                    component: Register
                }
            ],
            mode:"history"
        })
    