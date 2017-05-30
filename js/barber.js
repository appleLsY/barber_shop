var vue=new Vue({
    el:"#home",
    data:{
        orders:[],
        allorders:[],
        name:'',
    },
    methods:{
        get_orderinfo:function(datas){
            if(localStorage.length!=0){
                this.name=localStorage.getItem("username");
                this.$http({
                     method:'GET',
                     headers:{token:localStorage.getItem("userId")},
                     url:"http://localhost:11162/api/v1/order/search",
                }).then(function(data){
                    this.orders=data.body;
                    console.log(this.orders.List);
                    this.allorders=this.orders.List;
                    // for(var i=0;i<this.orders.List.length;i++){
                    // }
                })
            }
        },
        login_out:function(){
            localStorage.clear();
            window.location.href="../login.html";
        },
    },
    created:function(){

        this.get_orderinfo();
    }
})