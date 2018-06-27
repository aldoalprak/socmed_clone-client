<template>
    <div>
        <Navbar/>    
       
            <div class="row">
                <LeftColumn @usernamePassed="username = $event"></LeftColumn>
                
                <div class="col s5" id="column-2">
                    <div class="row" id="post" v-for="(post,index) in allPosts" :key="index" >
                        <div class="col s12">
                            <div class="card blue-grey darken-1">
                                <div class="card-content white-text">
                                    <span class="card-title">@{{post.userId.username}}</span>
                                    <p>{{post.content}}</p>
                                </div>
                                <div class="card-action">
                                    <button id="like-com-button" data-target="modal3" class="btn-small modal-trigger" v-on:click="addComment(post)">
                                        <i class="material-icons icon-yellow" id="comment" >comment</i></button>
                                         <!-- Modal Structure -->
                                        <div id="modal3" class="modal">
                                            <div class="modal-content">
                                                <h5 align="center">Compose Comment</h5>
                                                <hr><br>
                                                <textarea id="text-area" cols="30" rows="10" placeholder="what's happening?" v-model="commentText"></textarea>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="modal-close waves-effect waves-red btn red" v-on:click="addComment()">Tweet</button>
                                            </div>
                                        </div>    
                                
                                    <button id="like-com-button" v-on:click="addLike(post)" > 
                                        <i  class="material-icons icon-yellow" id="star" >star</i>
                                        {{post.like.length }}
                                    </button>    
                                    <!-- Modal Trigger -->
                                    <button data-target="modal2" class="btn-small red modal-trigger" v-on:click="getComment(post)">see all comments</button>       
                                    <!-- Modal Structure -->
                                    <div id="modal2" class="modal" >
                                        <div class="modal-content" >
                                            <div class="row" v-for="comment in comments" >
                                                <div class="col s12 ">
                                                    <div class="card blue-grey darken-1">
                                                        <div class="card-content white-text">
                                                            <span class="card-title">@{{comment.username}}</span>
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
                            </div>
                        </div>
                    </div>
                </div>
                <RightColumn></RightColumn>              
            </div>
       
    </div>
</template>


<script>

import Navbar from '../components/Navbar.vue'
import LeftColumn from '../components/LeftColumn.vue'
import RightColumn from '../components/RightColumn.vue'
import axios from 'axios'

export default {
    name:"timeline",
    components: {
        Navbar,
        LeftColumn,
        RightColumn
    },
    data() {
        return {
            commentText:"",
            username:"",
            allPosts:null,
            postmodalId:"", //for modal to catch post id
            comments:[]
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
         addComment(post) {
            if(post) {
                console.log("xxx",post._id)
                var elems = document.querySelectorAll('#modal3');
                var instances = M.Modal.init(elems);
                this.postmodalId = post._id
            }else{
            //    console.log("posting",this.postmodalId);
                axios({
                    method:"put",
                    url:"http://localhost:3000/posts/addcomment",
                    data: {
                        username: this.username,
                        content:this.commentText,
                        postId: this.postmodalId
                    }
                })
                .then(response=>{
                    console.log(response);
                    
                })
                .catch(err=>{
                    console.log(err.message)
                })
            }
                
        },
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
        addLike(post) {
            let statusLike = post.like.indexOf(this.username)

            if(statusLike == -1){
                post.like.push(this.username)
                axios({
                    method:"put",
                    url:"http://localhost:3000/posts/updatelike",
                    data:{
                        username: this.username,
                        postId: post._id
                    }
                })
                .then(response=>{
                    console.log(response)
                })
                .catch(err=>{
                    console.log(err)
                })
            }else{
                swal(
                    "warning",
                    "you have like this post",
                    "warning"
                )
            }
        }
        ,
        getComment(post) {
            this.showComment=true
            var elems = document.querySelectorAll('#modal2');
            var instances = M.Modal.init(elems);

            axios({
                method:"get",
                url:"http://localhost:3000/posts/showOnePost",
                headers:{
                    id: post._id
                }
            })
            .then(({data})=>{
                console.log(data.comment)
                this.comments=data.comment
            })
            .catch(err=>{
                console.log(err)
            })
        }

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

#like-com-button {
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
}

</style>
