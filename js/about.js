var vm=new Vue({
    el:"#home",
    data:{
        login_in:true,
        if_login:false,
        name:"",
    },

    methods:{
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