var pageBar = new Vue({
    el: '#home',
    data: {
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
        {name:"hello1",photo:"images/user_share_one.png",share_image:["images/google.png","images/god2.jpg"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello2",photo:"images/user_share_one.png",share_image:["images/google.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello3",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello4",photo:"images/user_share_one.png",share_image:"",content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello5",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello6",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello7",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello8",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello9",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello10",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello11",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello12",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello13",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello14",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello15",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello16",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello17",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        {name:"hello18",photo:"images/user_share_one.png",share_image:["images/google.png","images/email.png"],content:"我很喜欢这个洗发师，特别亲切，能够给你提出很多值得你尝试的意见，都是很中肯的意见，赞赞赞"},
        ],
        newData:[],
        newPhoto:[],
        activeNum:0,
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
            this.newData=[];
            let len=this.len;
            var pageNum=datas-1;
            for(let i=pageNum*len;i<(pageNum*len+len);i++){
                this.articles[i]!==undefined?this.newData.push(this.articles[i]):'';
                console.log(this.newData);
            }
            // this.$http.get("http://localhost:11162/api/v1/announcement/all").then(function(data){
            //     this.articles=data.body;
            //     //console.log(this.articles);
            //     for(var i=0; i<this.articles.length;i++)
            //     {
            //         console.log(this.articles[i].Title);
            //     }
            //     this.newData=[];
            //     let len = this.len;
            //     var pageNum = datas - 1;
            //     for (let i = pageNum * len; i < (pageNum * len + len); i++) {
            //         this.articles[i] !== undefined ? this.newData.push(this.articles[i]) : '';
            //         console.log(this.newData);
            //     }

            // })
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
            window.location.href="publish_article.html"
        },
        show:function(){
            if(this.min==true){
                this.min=false;
                this.max=true;
            }
            else{
                this.min=true;
                this.max=false;
            }
        }
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