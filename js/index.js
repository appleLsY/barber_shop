var vm=new Vue({
    el:"#index",
    data:{
        login_in:true,
        if_login:false,
        name:"",
        articles:[ //公告文章
        ],
        barbers:[],
        newBarbers:[],
        article_data:[],
        newData:[],
        article_title_one:"",
        article_content_one:"",
        article_title_two:"",
        article_content_two:"",
        article_title_three:"",
        article_content_three:"",
        barbername:"",
    },

    methods:{
        getAccount:function(){
            this.$http.get("http://localhost:11162/api/v1/announcement/all").then(function(data){
                this.articles=data.body;
                this.article_title_one=this.articles[0].Title;
                this.article_content_one=this.articles[0].Content;
                this.article_title_two=this.articles[1].Title;
                this.article_content_two=this.articles[1].Content;
                this.article_title_three=this.articles[2].Title;
                this.article_content_three=this.articles[2].Content;
            })
        },
        news_click:function(){
            window.location.href="news.html"
        },
        getBarber:function(){
            this.$http.get('http://localhost:11162/api/v1/account/allBarber').then(function(data){
                this.barbers=data.body;
                for(var i=0;i<4;i++)
                {
                    this.newBarbers.push(this.barbers[i]);
                }
                this.barbername=this.barbers[0].Name;
                console.log(this.newBarbers)
            })
        },
        // getCookie:function(name){
        //     var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        
        //     if(arr=Document.cookie.match(reg))
        
        //         return unescape(arr[2]); 
        //     else 
        //         return null;        
        //     },
        show_barber:function(){
            window.location.href="barber.html";
        },
        getUser:function(){
            if(window.localStorage.length!=0)
            {
                this.name=localStorage.getItem("username");
                this.if_login=true;
                this.login_in=false;
            }
            else
            {
                this.if_login=false;
                this.login_in=true;
            }
        },
        login_out:function(){
            localStorage.clear();
            window.location.href="login.html";
        },
    },
    created:function(){
        this.getUser();
        this.getAccount(); 
        this.getBarber();
        // alert("sadas");
        // this.name=this.getCookie("account");
        // //alert(this.name);
        // if(this.name!="")
        // {
        //     this.if_login=true;
        //     this.login_in=false;
        // }
    },
})