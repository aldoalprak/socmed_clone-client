<template>
    <div class="col s3" id="column-1">
        <div class="row">
            <div class="col s12" id="profile-box">
                <h4>@{{username}}</h4>
                <p>{{email}}</p>
                <hr>
                <p>
                    <span> Tweets 10 </span>
                    <span>Following 500 </span>
                    <span>Followers 2M  </span>
                </p>
            </div>
        </div>
        <div class="row trendForYou">
            <div class="col s12">
                <h6>Trends for you</h6>  
                <ul class="trending">
                    <li>
                        <a href="#">#trump</a><br>
                        <span id="trend-tweet">102k tweets</span> 
                    </li>
                        <li>
                        <a href="#">#worldcup2018</a><br>
                        <span id="trend-tweet">50k tweets</span> 
                    </li>   
                        <li>
                        <a href="#">#savekpk</a><br>
                        <span id="trend-tweet">12k tweets</span> 
                    </li>
                        <li>
                        <a href="#">#cr7</a><br>
                        <span id="trend-tweet">10k tweets</span> 
                    </li>
                        <li>
                        <a href="#">#umkm</a><br>
                        <span id="trend-tweet">8k tweets</span> 
                    </li>
                        <li>
                        <a href="#">#erdogan</a><br>
                        <span id="trend-tweet">5k tweets</span> 
                    </li>
                        <li>
                        <a href="#">#melania</a><br>
                        <span id="trend-tweet">4k tweets</span> 
                    </li>
                        <li>
                        <a href="#">#helloworld</a><br>
                        <span id="trend-tweet">3k tweets</span> 
                    </li>
                        <li>
                        <a href="#">#doratheexplorer</a><br>
                        <span id="trend-tweet">2k tweets</span> 
                    </li>
                        <li>
                        <a href="#">#trumpvskimjongun</a><br>
                        <span id="trend-tweet">1k tweets</span> 
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios"

export default {
    data() {
        return{
            username:"",
            email:""
        }
    },
    created() {
        this.getName()
    },
    methods:{

        getName() {
            axios({
                method:"get",
                url:"http://localhost:3000/users/showone",
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            .then(({data})=>{
                this.username = data.username
                this.email = data.email
                this.$emit('usernamePassed',data.username)
                
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>


<style scoped>
#column-1 {
    /* background-color: aqua; */
    margin-left: 20px;
    margin-top: 20px
}

#profile-box {
    background-color:#90caf9 
}

.trendForYou {
    background-color: blanchedalmond;
    
}

#trend-tweet {
    font-size: 12px
}

</style>
