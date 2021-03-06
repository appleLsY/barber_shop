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