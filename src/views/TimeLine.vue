<template>
    <div>
        <Navbar/>    
       
            <div class="row">
                <LeftColumn/>
                <div class="col s6" id="column-2">
                    <div class="row" id="post" v-for="post in allPosts">
                        <div class="col s12">
                            <div class="card blue-grey darken-1">
                                <div class="card-content white-text">
                                    <span class="card-title">@{{post.userId.username}}</span>
                                    <p>{{post.content}}</p>
                                </div>
                                <div class="card-action">
                                    <a href="#">
                                        <i class="material-icons icon-yellow" id="comment" >comment</i>
                                    </a>
                                    
                                    <a href v-on:click="addLike(post._id)">   
                                        <i class="material-icons icon-yellow" id="star" >star</i>
                                        {{post.likeId.length}}   

                                    </a>    
                                    <!-- Modal Trigger -->
                                    <button data-target="modal2" class="btn-small red modal-trigger" v-on:click="getComment(post._id)">see all comments</button>       
                                                 
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Modal Structure -->
                    <div id="modal2" class="modal" v-if="showComment==true" >
                        <div class="modal-content">
                            <div class="row">
                                <div class="col s12 ">
                                    <div class="card blue-grey darken-1" v-for="comment in comment">
                                        <div class="card-content white-text">
                                            <span class="card-title">@{{comment.userId.username}}</span>
                                            <p>{{comment.content}}</p>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button  class="modal-close waves-effect waves-red btn red">close</button>
                        </div>
                    </div> 
                    
                </div>
                <div class="col s3">
                        
                </div>
            </div>
       
    </div>
</template>


<script>

import Navbar from '../components/Navbar.vue'
import LeftColumn from '../components/LeftColumn.vue'
import axios from 'axios'

export default {
    name:"timeline",
    components: {
        Navbar,
        LeftColumn
    },
    data() {
        return {
            allPosts:null,
            star:"black",
            comment:[{content:null,userId:{username:null}}],
            showComment:false
        }
    },
    created() {
        if(localStorage.hasOwnProperty("token")){
            this.getPost()
        }else{
            this.$router.push("/")
        }
       
    },
    methods:{

        getPost() {
            axios({
                method: "get",
                url: "http://localhost:3000/posts/showAll"
            })
            .then(({data})=>{
                let reverseData=[]
                for(let i=data.length-1;i>=0;i--) {
                    reverseData.push(data[i])
                }    
                this.allPosts = reverseData 
            })
            .catch(err=>{
                console.log(err.response);
                
            })
        },
        changeIconColor() {
            console.log("masuk")
            // var element = document.getElementById("star");
            // element.classList.add(".icon-yellow");
            this.star="yellow"
        },
        addLike(postId) {
            axios({
                method:"post",
                url:"http://localhost:3000/likes/add",
                headers:{
                    token: localStorage.getItem("token")
                },
                data:{
                    status:"true",
                    postId: postId
                }
            })
            .then(response=>{
                console.log(response)
                this.getPost()
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getComment(postId) {
            this.showComment=true
            var elems = document.querySelectorAll('#modal2');
            var instances = M.Modal.init(elems);

            axios({
                method:"get",
                url:"http://localhost:3000/comments/show",
                headers:{
                    id: postId
                }
            })
            .then(({data})=>{
                console.log(data)
                this.comment=data
            })
            .catch(err=>{
                console.log(err)
            })
        },

    }
}
</script>

<style>


#column-2 {
    margin-top: 20px;
    margin-left: 20px;
    background-color:#90caf9 
}
#post {
     margin-bottom:0!important;
     margin-top:0!important;
   
 
}

.card-action {
    cursor:pointer
}

i.icon-yellow {
    color:yellow
}

</style>
