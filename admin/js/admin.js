//公告请求
$(function() {
$.ajax({
     url: 'http://localhost:11162/api/v1/announcement/all',
     type: 'GET',
     dataType: 'json',
     success: function (data) {
         for(var i=0;i<data.length;i++){
             var newcontent=(data[i].Content).substring(0,8);
             $("#account").append("<div class=\"row\"><div class=\"col-xs-2\">"+data[i].Id+"</div>"+
             "<div class=\"col-xs-2\">"+data[i].Title+"</div>"+
             "<div class=\"col-xs-2\">"+newcontent+"</div>"+
             "<div class=\"col-xs-2\">"+data[i].CreatedOn+"</div>"+
             "<div class=\"col-xs-2\">"+data[i].CreatedBy+"</div>"+
             "<div class=\"col-xs-2\"><button id=\"edit_announcement"+i+"\" class=\"btn btn-success btn-xs\" data-toggle=\"modal\"data-target=\"#reviseAnnouncement\" onclick=\"show_announcement("+data[i].Id+")\">"+
             "修改"+"</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger btn-xs\" data-toggle=\"modal\" data-target=\"#deleteAnnouncement\" onclick=\"del("+data[i].Id+")\">"+
             "删除"+"</button></div></div>"
            )
         }
        for(var i=1;i<(Math.ceil(data.length/5)+1);i++)
        {
            $("#announcement_page").append("<option value=\""+i+"\">"+i+"</option>")
        }
        $("#all_page").text("共"+Math.ceil(data.length/5)+"页");
     }
 });
 //添加公告
 $("#announce_save").click(function(){
     var title=$("#sName").val();
     var content=$("#publish_content").val();
     console.log(title);
     console.log(content);
     $.ajax({
         url:'http://localhost:11162/api/v1/announcement',
         type:'POST',
         dataType: 'json',
         data:{
             Title:title,
             Content:content,
         },
         success:function(data){
             window.location.reload();
         }
     })
 });
//修改公告保存
$("#edit_save").click(function(){
    var edit_title=$("#slName").val();
    var edit_content=$("#announce_content").val();
    var edit_id=$("#hide_announce_id").val();
    alert(edit_id);
    console.log(edit_title);
    console.log(edit_content);
    $.ajax({
        url:'http://localhost:11162/api/v1/announcement',
        type:'PUT',
        dataType:'json',
        data:{
            Id:edit_id,
            Title:edit_title,
            Content:edit_content
        },
        success:function(data){
            alert("修改成功")
             window.location.reload();
         }
    })
})

 //用户管理请求
 $("#user_manage").click(function(){
     $("#alluser").html("");
     $("#user_page").text("");
     $.ajax({
         url:'http://localhost:11162/api/v1/account/allBarber',
         type:'GET',
         dataType:'json',
         success:function(data){
            for(var i=0;i<5;i++){
                $("#alluser").append("<div class=\"row\"><div class=\"col-xs-1\">"+data[i].Id+"</div>"+
                "<div class=\"col-xs-1\">"+data[i].Name+"</div>"+
                "<div class=\"col-xs-2\">"+data[i].PhoneNumber+"</div>"+
                "<div class=\"col-xs-2\">"+data[i].Email+"</div>"+
                "<div class=\"col-xs-4\">"+data[i].PersonalInfo+"</div>"+
                "<div class=\"col-xs-2\"><button id=\"edit_announcement"+i+"\" class=\"btn btn-success btn-xs\" data-toggle=\"modal\"data-target=\"#changeChar\" onclick=\"show_user("+data[i].Id+")\">"+
                "修改"+"</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger btn-xs\" data-toggle=\"modal\" data-target=\"#deleteChar\" onclick=\"del_user("+data[i].Id+")\">"+
                "删除"+"</button></div></div>"
                )
            }
            for(var i=1;i<(Math.ceil(data.length/5)+1);i++)
            {
                $("#user_page").append("<option value=\""+i+"\">"+i+"</option>")
            }
        $("#user_all_page").text("共"+Math.ceil(data.length/5)+"页");
         }
     })
 })
 $("#save_user").click(function(){
     var username=$("#publish_user_name").val();
     var userphone=$("#publish_user_phone").val();
     var useremail=$("#publish_user_email").val();
     var userinfo=$("#publish_user_personalinfo").val();
     $.ajax({
         url:'http://localhost:11162/api/v1/account/barber',
         type:'POST',
         dataType:'json',
         data:{
             Name:username,
             PhoneNumber:userphone,
             Email:useremail,
             PersonalInfo:userinfo,
         },
         success:function(data){
             $("#user_manage").click();
         }
     })
 })

//套餐管理
$("#pakage_manage").click(function(){
     $("#allpackage").html("");
     $("#package_page").text("");
     $.ajax({
         url:'http://localhost:11162/api/v1/package/all',
         type:'GET',
         dataType:'json',
         data:{
             pa:"1",
         },
         success:function(data){
            for(var i=0;i<data.length;i++){
                $("#allpackage").append("<div class=\"row\"><div class=\"col-xs-2\">"+data[i].Id+"</div>"+
                "<div class=\"col-xs-2\">"+data[i].Name+"</div>"+
                "<div class=\"col-xs-2\">"+data[i].Description+"</div>"+
                "<div class=\"col-xs-2\">"+data[i].Timespan+"</div>"+
                "<div class=\"col-xs-2\">"+data[i].Price+"</div>"+
                "<div class=\"col-xs-2\"><button id=\"edit_announcement"+i+"\" class=\"btn btn-success btn-xs\" data-toggle=\"modal\"data-target=\"#revisePackage\">"+
                "修改"+"</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger btn-xs\" data-toggle=\"modal\" data-target=\"#deletePackage\">"+
                "删除"+"</button></div></div>"
                )
// onclick=\"show_user("+data[i].Id+")\"
// onclick=\"del("+data[i].Id+")\"
            }
            for(var i=1;i<(Math.ceil(data.length/5)+1);i++)
            {
                $("#package_page").append("<option>"+i+"</option>")
            }
        $("#all_package").text("共"+Math.ceil(data.length/5)+"页");
         }
     })

})


//订单管理
$("#order_manage").click(function(){

})

//分享管理
$("#share_manage").click(function(){

})

//店铺管理
$("#shopinfo_manage").click(function(){
    
})
}) ;