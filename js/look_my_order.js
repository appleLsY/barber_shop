var pageBar = new Vue({
    el: '#home',
    data: {
        all:1,
        pages:[],
        len:3,//页面展示公告的数量
        cur: 1,//当前页码
        pageLen:3,
        async:false,//是否请求服务器端的数据
        articles:[ //公告文章
        ],
        newData:[],
        activeNum:0,
        name:"",
        username:'',
        allorders:[],
        orders:[],
    },
    methods:{
        //获取页码数量
        getPage:function(){
            // this.pages=[];
            // this.all=Math.ceil(this.articles.length/this.len);
            // if (this.all <= this.pageLen) {
            //     for (let i = 1; i <= this.all; i++) {
            //         this.pages.push(i)
            //     }
            // } else {
            //     for (let i = 1; i <= this.pageLen; i++) {
            //         this.pages.push(i)
            //     }
            // }
        },
        //页码变化获取数据
        getData:function(datas){
            if(window.localStorage.length!=0){
                this.name=localStorage.getItem("username");
                this.allorders=[];
                this.$http({
                    method:'GET',
                    headers:{token:localStorage.getItem("userId")},
                    url:'http://localhost:11162/api/v1/order/search'
                }).then(function(data){
                    this.allorders=data.body.List;
                    this.orders=[];
                    let len=this.len;
                    var pageNum=datas-1;
                    for (let i = pageNum * len; i < (pageNum * len + len); i++) {
                        this.allorders[i].StartTime=this.allorders[i].StartTime.replace("T"," ");
                    this.allorders[i] !== undefined ? this.orders.push(this.allorders[i]) : '';
                    }
                })
            }
            else{
                alert("请先登录!");
                window.location.href="login.html";
            }
        },
        look_order:function(){
            window.location.href="look_my_order.html";
        },
        look_share:function(){
            window.location.href="look_my_share.html";
        },
        look_info:function(){
            window.location.href="user_info.html";
        },
        delete_share:function(data){
            alert(data);
        },
        btnClick: function(data){//页码点击事件
            if(data != this.cur){
                this.cur = data ;
                this.getData(data);
            }
        },
        return_index:function(){
            window.location.href="index.html";
        },
        pageClick: function(){
            //console.log('现在在'+this.cur+'页');
            this.activeNum=this.cur;
            this.getData(this.cur);
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
            // this.all=Math.ceil(this.articles.length/this.len);
            var left = 1;
            var right = this.all;
            var ar = [];
            if(this.all>= 3){ //保证显示的页数只有5条 1-5 超过5 例如6 就会变成2-6
                if(this.cur > 1 && this.cur < this.all-1){
                        left = this.cur - 1
                        right = this.cur + 1
                }else{
                    if(this.cur<=3){
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
        }
    }
})