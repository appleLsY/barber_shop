var pageBar = new Vue({
    el: '#home',
    data: {
        login_in:true,
        if_login:false,
        look_my:false,
        all:5,
        pages:[],
        len:3,//页面展示公告的数量
        cur: 1,//当前页码
        pageLen:5,
        min:true,
        max:false,
        search_name:"",
        async:false,//是否请求服务器端的数据
        articles:[ //分享文章
        ],
        newData:[],
        newPhoto:[],
        activeNum:0,
        name:'',
    },
    methods:{
        //获取页码数量
        getPage:function(){
            this.pages=[];
            this.all=Math.ceil(this.articles.length/this.len);
            if (this.all <= this.pageLen) {
                for (let i = 1; i <= this.all; i++) {
                    this.pages.push(i)
                }
            } else {
                for (let i = 1; i <= this.pageLen; i++) {
                    this.pages.push(i)
                }
            }
        },
        //页码变化获取数据
        getData:function(datas){
            if(window.localStorage.length!=0){
                this.if_login=true;
                this.login_in=false;
                this.name=localStorage.getItem("username");
                this.look_my=true;
            }
            else{
                this.if_login=false;
                this.login_in=true;
                this.look_my=false;
            }
            this.$http({
                     method:'GET',
                     url:"http://localhost:11162/api/v1/share/search",
            }).then(function(data){
                this.articles=data.body.List;
                this.newData=[];
                console.log(this.articles.ImageUrl);
                let len=this.len;
                var pageNum=datas-1;
                for (let i = pageNum * len; i < (pageNum * len + len); i++) {
                 this.articles[i] !== undefined ? this.newData.push(this.articles[i]) : '';
                 console.log(this.newData);
             }                
            })
        },
        btnClick: function(data){//页码点击事件
            if(data != this.cur){
                this.cur = data ;
                this.getData(data);
            }
        },
        pageClick: function(){
            //console.log('现在在'+this.cur+'页');
            this.activeNum=this.cur;
            this.getData(this.cur);
        },
        publish:function(){
            if(window.localStorage.length!=0){
                window.location.href="publish_article.html";
            }
            else
            {
                alert("请先登录再发表");
                window.location.href="login.html";
            }
        },
        search_share:function(datas){
            this.articles=[];
            this.$http({
                method:'GET',
                headers:{token:localStorage.getItem("userId")},
                url:'http://localhost:11162/api/v1/share/search?keyWord='+this.search_name,
            }).then(function(data){
                this.articles=data.body.List;
                this.newData=[];
                let len=this.len;
                var pageNum=datas-1;
                for (let i = pageNum * len; i < (pageNum * len + len); i++) {
                 this.articles[i] !== undefined ? this.newData.push(this.articles[i]) : '';
                }
            })
        },
        show:function(image_index){
            //alert(image_index);
            // if(this.min==true){
            //     this.min=false;
            //     this.max=true;
            // }
            // else{
            //     this.min=true;
            //     this.max=false;
            // }
        },
        return_index:function(){
            window.location.href="index.html";
        },
        login_out:function(){
            localStorage.clear();
            window.location.href="login.html";
        },
    },
    watch: {
        cur: function(oldValue , newValue){
            //获取文章
            //console.log(arguments);
        }
    },
    created:function(){  //页面加载就执行getData方法
        this.getData(1);
    },
    computed: {
        indexs: function(){
            //this.getData(this.cur);
            this.all=Math.ceil(this.articles.length/this.len);
            var left = 1;
            var right = this.all;
            var ar = [];
            if(this.all>= 3){ //保证显示的页数只有3页 1-3 超过3 例如4 就会变成2-4
                if(this.cur > 1 && this.cur < this.all-1){
                        left = this.cur - 1
                        right = this.cur + 1
                }else{
                    if(this.cur<=1){
                        left = 1
                        right = 3
                    }else{
                        right = this.all
                        left = this.all -2
                    }
                }
            }
            while (left <= right){
                ar.push(left)
                left ++
            }
            return ar;
        },
    }
})

