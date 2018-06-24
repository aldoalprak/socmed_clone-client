<template>
    <div>
        <div class="navbar-fixed">
            <nav class="blue lighten-3">
            <div class="nav-wrapper">
                <a href="#!" class="brand-logo center"><i class="material-icons">cloud</i></a>
                
                <ul class="right hide-on-med-and-down" >
                    <li >
                        <!-- Modal Trigger -->
                        <button data-target="modal1" class="btn red modal-trigger" v-on:click="modalJs()">Tweet</button>
                    
                        <!-- Modal Structure -->
                        <div id="modal1" class="modal">
                            <div class="modal-content">
                                <h5 align="center">Compose New Tweet</h5>
                                <hr><br>
                                <textarea id="text-area" cols="30" rows="10" placeholder="what's happening?" v-model="textArea"></textarea>
                               
                            </div>
                                <div class="modal-footer">
                                    <a href="/timeline" class="modal-close waves-effect waves-red btn red" v-on:click="postTweet()">Tweet</a>
                                </div>
                        </div>
                    </li>
                    <li><a href v-on:click="logout()">Logout</a></li>
                    
                </ul>

                <ul class="left hide-on-med-and-down">
                <li><a href="">Home</a></li>  
                <li><a href="">Notification</a></li>
                <li><a href="">Message</a></li>
                </ul>
            </div>
            </nav>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            textArea:""
        }
    },
    
    methods: {
        modalJs() {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems);
        },
        
        postTweet() {
            axios({
                method:"post",
                url:"http://localhost:3000/posts/add",
                data: {
                    content:this.textArea
                },
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(response=>{
                // this.$router.push("/timeline")
            })
            .catch(err=>{
                console.log(err)
            })
        },
        logout() {
            console.log("masuk")
            localStorage.clear()
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.modal {
    background-color: #90caf9 ;
    color: black
}
.modal-footer{
    background-color: #90caf9 ;
}

#text-area {
    background-color: white
}
</style>
