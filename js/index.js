var vm=new Vue({
    el:"#home",
    data:{
        login_in:true,
        if_login:false,
        name:getCookie("account"),
    },
    methods:{
        getCookie:function(name){
           var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
           if(arr=document.cookie.match(reg))
               return unescape(arr[2]);
           else
               return null;      
        }
    },
    // created:function(){
    //     alert("sadas");
    //     this.name=this.getCookie(name);
    //     alert(this.name);
    //     if(this.name!="")
    //     {
    //         this.if_login=true;
    //         this.login_in=false;
    //     }
    // },
})