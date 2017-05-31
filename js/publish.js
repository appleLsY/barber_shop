var vue=new Vue({
    el:"#publish_home",
    data:{
        content:"",
        img_url:"",
    },
    methods:{
        return_publish:function(){
            window.location.href="share.html"
        },
        submit_publish:function(){
            alert(this.content);
            alert(this.img_url);
            alert("保存成功");
        }
    }
})