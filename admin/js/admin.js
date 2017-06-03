//公告请求
$(function() {
    $(".shop_time input").attr('disabled', 'true');
    console.log(localStorage.getItem("username"));
    // $.ajax({
    //     url:'http://localhost:11162/api/v1/announcement/all'
    // });
    if(localStorage.length!=0){
        $("#userName").text(localStorage.getItem("username"));
    }
$.ajax({
     url: 'http://localhost:11162/api/v1/announcement/all',
     headers:{
         token:localStorage.getItem("userId"),
     },
     type: 'GET',
     dataType: 'json',
     success: function (data) {
         for(var i=0;i<5;i++){
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
         headers:{
            token:localStorage.getItem("userId"),
        },
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
    var value  = $('input[name="situation"]:checked').val(); //获取被选中Radio的Value值
    console.log(edit_title);
    console.log(edit_content);
    $.ajax({
        url:'http://localhost:11162/api/v1/announcement',
        headers:{
            token:localStorage.getItem("userId"),
        },
        type:'PUT',
        dataType:'json',
        data:{
            Id:edit_id,
            Title:edit_title,
            Content:edit_content,
            IsEnable:value,
        },
        success:function(data){
             window.location.reload();
         }
    })
})

 //用户管理请求
 $("#user_manage").click(function(){
     $("#alluser").html("");
     $("#user_page").text("");
     $.ajax({
         url:'http://localhost:11162/api/v1/account/search',
         headers:{
             token:localStorage.getItem("userId"),
            },
         type:'GET',
         dataType:'json',
         success:function(data){
            for(var i=0;i<data.List.length;i++){
                var N=data.List[i].Name==null?"":data.List[i].Name;
                var P=data.List[i].PhoneNumber==null?"":data.List[i].PhoneNumber;
                var E=data.List[i].Email==null?"":data.List[i].Email;
                var I=data.List[i].PersonalInfo==null?"":data.List[i].PersonalInfo;
                $("#alluser").append("<div class=\"row\"><div class=\"col-xs-1\">"+data.List[i].Id+"</div>"+
                "<div class=\"col-xs-2\">"+N+"</div>"+
                "<div class=\"col-xs-2\">"+P+"</div>"+
                "<div class=\"col-xs-2\">"+E+"</div>"+
                "<div class=\"col-xs-5\">"+I+"</div>"+
                "</div>"
                )
            }
            for(var i=1;i<(Math.ceil(data.RecordCount/5)+1);i++)
            {
                $("#user_page").append("<option value=\""+i+"\">"+i+"</option>")
            }
        $("#user_all_page").text("共"+Math.ceil(data.RecordCount/5)+"页");
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
         headers:{
            token:localStorage.getItem("userId"),
        },
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

 //用户搜索
 $("#search_user").click(function(){
     var uu=$("#s_user").val();
     $.ajax({
         url:'http://localhost:11162/api/v1/account/search?keyWord='+uu,
         headers:{token:localStorage.getItem("userId")},
         type:'GET',
         dataType:'json',
         success:function(data){
             console.log(data);
            $("#alluser").html("");
            console.log(data);
            for(var i=0;i<data.List.length;i++){
                var N=data.List[i].Name==null?"":data.List[i].Name;
                var P=data.List[i].PhoneNumber==null?"":data.List[i].PhoneNumber;
                var E=data.List[i].Email==null?"":data.List[i].Email;
                var I=data.List[i].PersonalInfo==null?"":data.List[i].PersonalInfo;
                $("#alluser").append("<div class=\"row\"><div class=\"col-xs-1\">"+data.List[i].Id+"</div>"+
                "<div class=\"col-xs-2\">"+N+"</div>"+
                "<div class=\"col-xs-2\">"+P+"</div>"+
                "<div class=\"col-xs-2\">"+E+"</div>"+
                "<div class=\"col-xs-5\">"+I+"</div>"+
                "</div>"
                )
            }
            for(var i=1;i<(Math.ceil(data.RecordCount/5)+1);i++)
            {
                $("#user_page").append("<option value=\""+i+"\">"+i+"</option>")
            }
            $("#user_all_page").text("共"+Math.ceil(data.RecordCount/5)+"页");
        }

     })
 })
 //订单搜索
 //分享搜索
 //套餐搜索
 //公告搜索

//套餐管理
$("#pakage_manage").click(function(){
     $("#allpackage").html("");
     $("#package_page").text("");
     $.ajax({
         url:'http://localhost:11162/api/v1/package/all',
         headers:{
            token:localStorage.getItem("userId"),
        },
         type:'GET',
         dataType:'json',
         success:function(data){
            for(var i=0;i<data.length;i++){
                $("#allpackage").append("<div class=\"row\"><div class=\"col-xs-2\">"+data[i].Id+"</div>"+
                "<div class=\"col-xs-2\">"+data[i].Name+"</div>"+
                "<div class=\"col-xs-2\">"+data[i].Description+"</div>"+
                "<div class=\"col-xs-2\">"+data[i].Timespan+"</div>"+
                "<div class=\"col-xs-2\">"+data[i].Price+"</div>"+
                "<div class=\"col-xs-2\"><button id=\"edit_announcement"+i+"\" class=\"btn btn-success btn-xs\" data-toggle=\"modal\"data-target=\"#revisePackage\" onclick=\"show_package("+data[i].Id+")\">"+
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
 $("#save_package").click(function(){
     var id=$("#hide_package_id").val();
     var packname=$("#package_name").val();
     var packcontent=$("#package_content").val();
     var packtime=$("#package_time").val();
     var packprice=$("#package_price").val();
     $.ajax({
         url:'http://localhost:11162/api/v1/package',
         headers:{
            token:localStorage.getItem("userId"),
        },
         type:'PUT',
         dataType:'json',
         data:{
             Id:id,
             Name:packname,
             Timespan:packtime,
             Price:packprice,
             Description:packcontent,
         },
         success:function(data){
             $("#pakage_manage").click();
         }
     })
 })

//订单管理
$("#order_manage").click(function(){
    $("#allorder").html("");
    $("#order_page").text("");
     $.ajax({
         url:'http://localhost:11162/api/v1/order/search',
         headers:{
            token:localStorage.getItem("userId"),
        },
         type:'GET',
         dataType:'json',
         success:function(data){
             console.log(data);
            for(var i=0;i<data.List.length;i++){
                $("#allorder").append("<div class=\"row\"><div class=\"col-xs-2\">"+data.List[i].OrderNo+"</div>"+
                "<div class=\"col-xs-2\">"+data.List[i].UserName+"</div>"+
                "<div class=\"col-xs-2\">"+data.List[i].Packages[0].Name+"</div>"+
                "<div class=\"col-xs-3\">"+data.List[i].Packages[0].Description+"</div>"+
                "<div class=\"col-xs-2\">"+data.List[i].Packages[0].Timespan+"</div>"+
                "<div class=\"col-xs-1\">"+data.List[i].Packages[0].Price+"</div>"+
                "</div>"
                )
            }
            for(var i=1;i<(Math.ceil(data.RecordCount/5)+1);i++)
            {
                $("#order_page").append("<option>"+i+"</option>")
            }
        $("#all_order").text("共"+Math.ceil(data.RecordCount/5)+"页");
         }
     })

})

//分享管理
$("#share_manage").click(function(){
    $("#allshare").html("");
    $("#share_page").text("");
     $.ajax({
         url:'http://localhost:11162/api/v1/share/search',
         headers:{
            token:localStorage.getItem("userId"),
        },
         type:'GET',
         dataType:'json',
         success:function(data){
             console.log(data);
            for(var i=0;i<data.List.length;i++){
                $("#allshare").append("<div class=\"row\"><div class=\"col-xs-1\">"+data.List[i].Id+"</div>"+
                "<div class=\"col-xs-2\">"+data.List[i].User.Name+"</div>"+
                "<div class=\"col-xs-2\">"+data.List[i].CreatedOn+"</div>"+
                "<div class=\"col-xs-5\">"+data.List[i].Content+"</div>"+
                "<div class=\"col-xs-2\"><button class=\"btn btn-danger btn-xs\" data-toggle=\"modal\" data-target=\"#deleteShare\" onclick=\"del_share("+data.List[i].Id+")\">"+
                "删除"+"</button></div></div>"
                )
// onclick=\"show_user("+data[i].Id+")\"
// onclick=\"del("+data[i].Id+")\"
            }
            for(var i=1;i<(Math.ceil(data.RecordCount/5)+1);i++)
            {
                $("#share_page").append("<option>"+i+"</option>")
            }
        $("#all_share").text("共"+Math.ceil(data.RecordCount/5)+"页");
         }
     })
})

//店铺管理
$("#shopinfo_manage").click(function(){
    $.ajax({
        url:'http://localhost:11162/api/v1/shopSetting',
        headers:{token:localStorage.getItem("userId")},
        type:'GET',
        dataType:'json',
        success:function(data){
            console.log(data.StartTime)
            var s=data.StartTime;
            s=s.substring(11,19)
            var e=data.EndTime;
            e=e.substring(11,19)
            $("#start_time").val(s);
            $("#end_time").val(e);
        }
    })
    
})

//修改店铺消息
$("#editTime").click(function(){
    $(".shop_time input").removeAttr('disabled');
})
$("#cancelTime").click(function(){
    $(".shop_time input").attr('disabled', 'true');
    $("#shopinfo_manage").click();
})
$("#changeTime").click(function(){
    var start=$("#start_time").val();
    var end=$("#end_time").val();
    $.ajax({
        url:'http://localhost:11162/api/v1/shopSetting',
        headers:{token:localStorage.getItem("userId")},
        type:"PUT",
        dataType:'json',
        data:{
            StartTime:start,
            EndTime:end,            
        },
        success:function(data){
            alert("修改成功");
            $(".shop_time input").attr('disabled', 'true');
            $("#shopinfo_manage").click();
        }
    })
})

$("#login_out").click(function(){
    localStorage.clear();
    window.location.href="../login.html";
})
}) ;