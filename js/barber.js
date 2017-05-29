var vue=new Vue({
    el:"#home",
    data:{
        orders:[],
        allorders:[],
    },
    methods:{
        get_orderinfo:function(datas){
            this.$http.get("http://localhost:11162/api/v1/order/search").then(function(data){
                this.orders=data.body;
                console.log(this.orders.List);
                this.allorders=this.orders.List;
                // for(var i=0;i<this.orders.List.length;i++){
                // }
            })

        },
    },
    created:function(){
        this.get_orderinfo();
    }
})