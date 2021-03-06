//公告请求
$(function () {
    $(".shop_time input").attr('disabled', 'true');
    console.log(localStorage.getItem("username"));
    // $.ajax({
    //     url:'http://localhost:11162/api/v1/announcement/all'
    // });
    if (localStorage.length != 0) {
        $("#userName").text(localStorage.getItem("username"));
    }
    $.ajax({
        url: 'http://localhost:11162/api/v1/announcement/search',
        headers: {
            token: localStorage.getItem("userId"),
        },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.List.length; i++) {
                var newcontent = (data.List[i].Content).substring(0, 8);
                $("#account").append("<div class=\"row\"><div class=\"col-xs-2\">" + data.List[i].Id + "</div>" +
                    "<div class=\"col-xs-2\">" + data.List[i].Title + "</div>" +
                    "<div class=\"col-xs-2\">" + newcontent + "</div>" +
                    "<div class=\"col-xs-2\">" + data.List[i].CreatedOn + "</div>" +
                    "<div class=\"col-xs-2\">" + data.List[i].CreatedBy + "</div>" +
                    "<div class=\"col-xs-2\"><button id=\"edit_announcement" + i + "\" class=\"btn btn-success btn-xs\" data-toggle=\"modal\"data-target=\"#reviseAnnouncement\" onclick=\"show_announcement(" + data.List[i].Id + ")\">" +
                    "修改" + "</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger btn-xs\" data-toggle=\"modal\" data-target=\"#deleteAnnouncement\" onclick=\"del(" + data.List[i].Id + ")\">" +
                    "删除" + "</button></div></div>"
                )
                 $("input[name='situation'][value='"+data.List[i].IsEnable+"']").attr("checked",true);
            }
            for (var i = 1; i < (Math.ceil(data.RecordCount / 5) + 1); i++) {
                $("#announcement_page").append("<option value=\"" + i + "\">" + i + "</option>")
            }
            $("#all_page").text("共" + Math.ceil(data.RecordCount / 5) + "页");
        }
    });
    //添加公告
    $("#announce_save").click(function () {
        var title = $("#sName").val();
        var content = $("#publish_content").val();
        var value = $("input[name='situation']:checked").val();
        console.log(title);
        console.log(content);
        $.ajax({
            url: 'http://localhost:11162/api/v1/announcement',
            headers: {
                token: localStorage.getItem("userId"),
            },
            type: 'POST',
            dataType: 'json',
            data: {
                Title: title,
                Content: content,
                IsEnable: value
            },
            success: function (data) {
                window.location.reload();
            }
        })
    });
    //修改公告保存
    $("#edit_save").click(function () {
        var edit_title = $("#slName").val();
        var edit_content = $("#announce_content").val();
        var edit_id = $("#hide_announce_id").val();
        var value = $("input[name='situation']:checked").val(); //获取被选中Radio的Value值
        alert(value);
        console.log(edit_title);
        console.log(edit_content);
        $.ajax({
            url: 'http://localhost:11162/api/v1/announcement',
            headers: {
                token: localStorage.getItem("userId"),
            },
            type: 'PUT',
            dataType: 'json',
            data: {
                Id: edit_id,
                Title: edit_title,
                Content: edit_content,
                IsEnable: value,
            },
            success: function (data) {
                window.location.reload();
            }
        })
    })

    //用户管理请求
    $("#user_manage").click(function () {
        $("#alluser").html("");
        $("#user_page").text("");
        $.ajax({
            url: 'http://localhost:11162/api/v1/account/search',
            headers: {
                token: localStorage.getItem("userId"),
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.List.length; i++) {
                    var N = data.List[i].Name == null ? "" : data.List[i].Name;
                    var P = data.List[i].PhoneNumber == null ? "" : data.List[i].PhoneNumber;
                    var E = data.List[i].Email == null ? "" : data.List[i].Email;
                    var I = data.List[i].PersonalInfo == null ? "" : data.List[i].PersonalInfo;
                    $("#alluser").append("<div class=\"row\"><div class=\"col-xs-1\">" + data.List[i].Id + "</div>" +
                        "<div class=\"col-xs-2\">" + N + "</div>" +
                        "<div class=\"col-xs-2\">" + P + "</div>" +
                        "<div class=\"col-xs-2\">" + E + "</div>" +
                        "<div class=\"col-xs-5\">" + I + "</div>" +
                        "</div>"
                    )
                }
                for (var i = 1; i < (Math.ceil(data.RecordCount / 10) + 1); i++) {
                    $("#user_page").append("<option value=\"" + i + "\">" + i + "</option>")
                }
                $("#user_all_page").text("共" + Math.ceil(data.RecordCount / 10) + "页");
            }
        })
    })
    $("#save_user").click(function () {
        var username = $("#publish_user_name").val();
        var userphone = $("#publish_user_phone").val();
        var useremail = $("#publish_user_email").val();
        var userinfo = $("#publish_user_personalinfo").val();
        $.ajax({
            url: 'http://localhost:11162/api/v1/account/barber',
            headers: {
                token: localStorage.getItem("userId"),
            },
            type: 'POST',
            dataType: 'json',
            data: {
                Name: username,
                PhoneNumber: userphone,
                Email: useremail,
                PersonalInfo: userinfo,
            },
            success: function (data) {
                $("#user_manage").click();
            }
        })
    })

    //用户搜索
    $("#search_user").click(function () {
        var uu = $("#s_user").val();
        $.ajax({
            url: 'http://localhost:11162/api/v1/account/search?keyWord=' + uu,
            headers: {
                token: localStorage.getItem("userId")
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $("#alluser").html("");
                $("#user_page").html("");
                $("#user_all_page").html("");
                console.log(data);
                for (var i = 0; i < data.List.length; i++) {
                    var N = data.List[i].Name == null ? "" : data.List[i].Name;
                    var P = data.List[i].PhoneNumber == null ? "" : data.List[i].PhoneNumber;
                    var E = data.List[i].Email == null ? "" : data.List[i].Email;
                    var I = data.List[i].PersonalInfo == null ? "" : data.List[i].PersonalInfo;
                    $("#alluser").append("<div class=\"row\"><div class=\"col-xs-1\">" + data.List[i].Id + "</div>" +
                        "<div class=\"col-xs-2\">" + N + "</div>" +
                        "<div class=\"col-xs-2\">" + P + "</div>" +
                        "<div class=\"col-xs-2\">" + E + "</div>" +
                        "<div class=\"col-xs-5\">" + I + "</div>" +
                        "</div>"
                    )
                }
                for (var i = 1; i < (Math.ceil(data.RecordCount / 10) + 1); i++) {
                    $("#user_page").append("<option value=\"" + i + "\">" + i + "</option>")
                }
                $("#user_all_page").text("共" + Math.ceil(data.RecordCount / 10) + "页");
            }

        })
    })
    //订单搜索

    //分享搜索
    $("#search_share").click(function () {
        var uu = $("#s_share").val();
        $.ajax({
            url: 'http://localhost:11162/api/v1/share/search?keyWord=' + uu,
            headers: {
                token: localStorage.getItem("userId")
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $("#allshare").html("");
                $("#share_page").html("");
                $("#share_all_page").html("");
                console.log(data);
                for (var i = 0; i < data.List.length; i++) {
                    $("#allshare").append("<div class=\"row\"><div class=\"col-xs-1\">" + data.List[i].Id + "</div>" +
                        "<div class=\"col-xs-2\">" + data.List[i].User.Name + "</div>" +
                        "<div class=\"col-xs-2\">" + data.List[i].CreatedOn + "</div>" +
                        "<div class=\"col-xs-5\">" + data.List[i].Content + "</div>" +
                        "<div class=\"col-xs-2\"><button class=\"btn btn-danger btn-xs\" data-toggle=\"modal\" data-target=\"#deletePackage\">" +
                        "删除" + "</button></div></div>"
                    )
                }
                for (var i = 1; i < (Math.ceil(data.RecordCount / 10) + 1); i++) {
                    $("#share_page").append("<option value=\"" + i + "\">" + i + "</option>")
                }
                $("#share_all_page").text("共" + Math.ceil(data.RecordCount / 10) + "页");
                $("#share_return").text("返回");
            }
        })
    })
    $("#share_return").click(function () {
        $("#share_manage").click();
    })

    //套餐搜索
 $("#search_package").click(function(){
     var uu=$("#s_package").val();
     alert(uu);
     $.ajax({
         url:'http://localhost:11162/api/v1/package/search?keyWord='+uu,
         headers:{token:localStorage.getItem("userId")},
         type:'GET',
         dataType:'json',
         success:function(data){
            console.log(data);
            $("#allpackage").html("");
            $("#package_page").html("");
            $("#all_package").html("");
            console.log(data);
            for(var i=0;i<data.List.length;i++){
                $("#allpackage").append("<div class=\"row\"><div class=\"col-xs-2\">"+data.List[i].Id+"</div>"+
                "<div class=\"col-xs-2\">"+data.List[i].Name+"</div>"+
                "<div class=\"col-xs-2\">"+data.List[i].Description+"</div>"+
                "<div class=\"col-xs-2\">"+data.List[i].Timespan+"</div>"+
                "<div class=\"col-xs-2\">"+data.List[i].Price+"</div>"+
                "<div class=\"col-xs-2\"><button id=\"edit_announcement"+i+"\" class=\"btn btn-success btn-xs\" data-toggle=\"modal\"data-target=\"#revisePackage\" onclick=\"show_package("+data.List[i].Id+")\">"+
                "修改"+"</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger btn-xs\" data-toggle=\"modal\" data-target=\"#deletePackage\">"+
                "删除"+"</button></div></div>"
                )
            }
            for(var i=1;i<(Math.ceil(data.RecordCount/5)+1);i++)
            {
                $("#package_page").append("<option>"+i+"</option>")
            }
            $("#all_package").text("共"+Math.ceil(data.RecordCount/5)+"页");
                $("#package_return").text("返回");
        }
     })
 })
 $("#package_return").click(function(){
     $("#pakage_manage").click();
 })

    //公告搜索
 $("#search_announcement").click(function(){
     var uu=$("#s_announcement").val();
     alert(uu);
     $.ajax({
         url:'http://localhost:11162/api/v1/announcement/search?keyWord='+uu,
         headers:{token:localStorage.getItem("userId")},
         type:'GET',
         dataType:'json',
         success: function (data) {
             $("#account").html("");
             $("#announcement_page").html("");
             $("#all_page").html("");
            for(var i=0;i<data.List.length;i++){
                var newcontent=(data.List[i].Content).substring(0,8);
                $("#account").append("<div class=\"row\"><div class=\"col-xs-2\">"+data.List[i].Id+"</div>"+
                "<div class=\"col-xs-2\">"+data.List[i].Title+"</div>"+
                "<div class=\"col-xs-2\">"+newcontent+"</div>"+
                "<div class=\"col-xs-2\">"+data.List[i].CreatedOn+"</div>"+
                "<div class=\"col-xs-2\">"+data.List[i].CreatedBy+"</div>"+
                "<div class=\"col-xs-2\"><button id=\"edit_announcement"+i+"\" class=\"btn btn-success btn-xs\" data-toggle=\"modal\"data-target=\"#reviseAnnouncement\" onclick=\"show_announcement("+data.List[i].Id+")\">"+
                "修改"+"</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger btn-xs\" data-toggle=\"modal\" data-target=\"#deleteAnnouncement\" onclick=\"del("+data.List[i].Id+")\">"+
                "删除"+"</button></div></div>"
                )
            }
            for(var i=1;i<(Math.ceil(data.RecordCount/5)+1);i++)
            {
                $("#announcement_page").append("<option value=\""+i+"\">"+i+"</option>")
            }
            $("#all_page").text("共"+Math.ceil(data.RecordCount/5)+"页");
            $("#announcement_return").text("返回");
        }
     })
 })
 $("#announcement_return").click(function(){
     window.location.reload();
 })


    //套餐管理
    $("#pakage_manage").click(function () {
        $("#allpackage").html("");
        $("#package_page").text("");
        $.ajax({
            url: 'http://localhost:11162/api/v1/package/all',
            headers: {
                token: localStorage.getItem("userId"),
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $("#allpackage").append("<div class=\"row\"><div class=\"col-xs-2\">" + data[i].Id + "</div>" +
                        "<div class=\"col-xs-2\">" + data[i].Name + "</div>" +
                        "<div class=\"col-xs-2\">" + data[i].Description + "</div>" +
                        "<div class=\"col-xs-2\">" + data[i].Timespan + "</div>" +
                        "<div class=\"col-xs-2\">" + data[i].Price + "</div>" +
                        "<div class=\"col-xs-2\"><button id=\"edit_announcement" + i + "\" class=\"btn btn-success btn-xs\" data-toggle=\"modal\"data-target=\"#revisePackage\" onclick=\"show_package(" + data[i].Id + ")\">" +
                        "修改" + "</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-danger btn-xs\" data-toggle=\"modal\" data-target=\"#deletePackage\">" +
                        "删除" + "</button></div></div>"
                    )
                    // onclick=\"show_user("+data[i].Id+")\"
                    // onclick=\"del("+data[i].Id+")\"
                }
                for (var i = 1; i < (Math.ceil(data.length / 5) + 1); i++) {
                    $("#package_page").append("<option>" + i + "</option>")
                }
                $("#all_package").text("共" + Math.ceil(data.length / 5) + "页");
            }
        })

    })
    $("#save_package").click(function () {
        var id = $("#hide_package_id").val();
        var packname = $("#package_name").val();
        var packcontent = $("#package_content").val();
        var packtime = $("#package_time").val();
        var packprice = $("#package_price").val();
        $.ajax({
            url: 'http://localhost:11162/api/v1/package',
            headers: {
                token: localStorage.getItem("userId"),
            },
            type: 'PUT',
            dataType: 'json',
            data: {
                Id: id,
                Name: packname,
                Timespan: packtime,
                Price: packprice,
                Description: packcontent,
            },
            success: function (data) {
                $("#pakage_manage").click();
            }
        })
    })

    $("#save_order").click(function () {
        var id = $("#hide_order_id").val();
        var stauts=$("#order_status").val();
        // var ss="";
        // alert(stauts);
        // if(status==1){
        //     ss="Closed";
        // }
        // else if(status==2){
        //     ss="Completed";
        // }
        // alert(ss);
        $.ajax({
            url: 'http://localhost:11162/api/v1/order',
            headers: {
                token: localStorage.getItem("userId"),
            },
            type: 'PUT',
            dataType: 'json',
            data: {
                Id: id,
                OrderStatus:stauts,
            },
            success: function (data) {
                $("#order_manage").click();
            }
        })
    })
    

    //订单管理
    $("#order_manage").click(function () {
        $("#allorder").html("");
        $("#order_page").text("");
        $.ajax({
            url: 'http://localhost:11162/api/v1/order/search',
            headers: {
                token: localStorage.getItem("userId"),
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var h="";
                console.log(data);
                for (var i = 0; i < data.List.length; i++) {
                    if(data.List[i].OrderStatus=="Completed"){
                        h="已完成";
                    }
                    else if(data.List[i].OrderStatus=="Paid"){
                        h="已支付";
                    }
                    else if(data.List[i].OrderStatus=="NoPay"){
                        h="未支付";
                    }
                    else{
                        h="已关闭"
                    }
                    $("#allorder").append("<div class=\"row\"><div class=\"col-xs-2\">" + data.List[i].OrderNo + "</div>" +
                        "<div class=\"col-xs-2\">" + data.List[i].UserName + "</div>" +
                        "<div class=\"col-xs-2\">" + data.List[i].Packages[0].Name + "</div>" +
                        "<div class=\"col-xs-2\">" + data.List[i].Packages[0].Description + "</div>" +
                        "<div class=\"col-xs-2\">" + h + "</div>" +
                        "<div class=\"col-xs-1\">" + data.List[i].Packages[0].Price + "</div>" +
                        "<div class=\"col-xs-1\"><button id=\"edit_announcement" + i + "\" class=\"btn btn-success btn-xs\" data-toggle=\"modal\"data-target=\"#reviseOrder\" onclick=\"show_order(" + data.List[i].Id + ")\">" +
                        "开始服务" + "</button></div>"
                    )
                }
                for (var i = 1; i < (Math.ceil(data.RecordCount / 5) + 1); i++) {
                    $("#order_page").append("<option>" + i + "</option>")
                }
                $("#all_order").text("共" + Math.ceil(data.RecordCount / 5) + "页");
            }
        })

    })

    //分享管理
    $("#share_manage").click(function () {
        $("#allshare").html("");
        $("#share_page").text("");
        $.ajax({
            url: 'http://localhost:11162/api/v1/share/search',
            headers: {
                token: localStorage.getItem("userId"),
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                for (var i = 0; i < data.List.length; i++) {
                    $("#allshare").append("<div class=\"row\"><div class=\"col-xs-1\">" + data.List[i].Id + "</div>" +
                        "<div class=\"col-xs-2\">" + data.List[i].User.Name + "</div>" +
                        "<div class=\"col-xs-2\">" + data.List[i].CreatedOn + "</div>" +
                        "<div class=\"col-xs-5\">" + data.List[i].Content + "</div>" +
                        "<div class=\"col-xs-2\"><button class=\"btn btn-danger btn-xs\" data-toggle=\"modal\" data-target=\"#deleteShare\" onclick=\"del_share(" + data.List[i].Id + ")\">" +
                        "删除" + "</button></div></div>"
                    )
                    // onclick=\"show_user("+data[i].Id+")\"
                    // onclick=\"del("+data[i].Id+")\"
                }
                for (var i = 1; i < (Math.ceil(data.RecordCount / 5) + 1); i++) {
                    $("#share_page").append("<option>" + i + "</option>")
                }
                $("#all_share").text("共" + Math.ceil(data.RecordCount / 5) + "页");
                $("#share_return").text("");
            }
        })
    })

    //店铺管理
    $("#shopinfo_manage").click(function () {
        $.ajax({
            url: 'http://localhost:11162/api/v1/shopSetting',
            headers: {
                token: localStorage.getItem("userId")
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                $("#start_time").val("");
                $("#end_time").val("");
                $("#barber_name").val("");
                $("#maxpeople").val("");
                console.log(data)
                var s = data.StartTime;
                s = s.substring(11, 19)
                var e = data.EndTime;
                e = e.substring(11, 19);
                var name=data.Name;
                var max=data.MaxServeCount;
                var dd=data.IsBusiness;
                $("#start_time").val(s);
                $("#end_time").val(e);
                $("#barber_name").val(name);
                $("#maxpeople").val(max);
                $("input[name='ifopen'][value='"+dd+"']").attr("checked",true);
            }
        })

    })

    //修改店铺消息
    $("#editTime").click(function () {
        $(".shop_time input").removeAttr('disabled');
    })
    $("#cancelTime").click(function () {
        $(".shop_time input").attr('disabled', 'true');
        $("input:radio[name='ifopen']").attr("checked",false);
        $("#shopinfo_manage").click();
    })
    $("#changeTime").click(function () {
        var newName = $("#barber_name").val();
        var start = $("#start_time").val();
        var end = $("#end_time").val();       
       // var isbusiness=$("input[name='ifopen'][checked]").val();
        var isbusiness=$("input[name='ifopen']:checked").val();
        alert(isbusiness);
        $.ajax({
            url: 'http://localhost:11162/api/v1/shopSetting',
            headers: {
                token: localStorage.getItem("userId")
            },
            type: "PUT",
            dataType: 'json',
            data: {
                Name: newName,
                StartTime: start,
                EndTime: end,
                IsBusiness: isbusiness
            },
            success: function (data) {
                alert("修改成功");
                $(".shop_time input").attr('disabled', 'true');
                $("#shopinfo_manage").click();
            }
        })
    })
    //统计
    $("#count_manage").click(function () {
        $.ajax({
            url: 'http://localhost:11162/api/v1/statistics/loginCounts',
            headers: {
                token: localStorage.getItem("userId")
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                login(data)
                console.log(data)
                inputchart()
            }
        })

        function inputchart() {
            $.ajax({
                url: 'http://localhost:11162/api/v1/statistics/inputCounts',
                headers: {
                    token: localStorage.getItem("userId")
                },
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    input(data)
                }
            })
        }

    })

    function login(datas) {
        var xdata = new Array();
        var ydata = new Array();
        for(i=0;i<datas.length;i++)
        {
            xdata[i] = datas[i].Key.substring(0,10);
             ydata[i] = datas[i].Value;
        }
        console.log(xdata);
        console.log(ydata);
        var myChart = echarts.init(document.getElementById('loginCount'));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '周登陆统计',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['登陆人数']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        show: true,
                        type: ['stack', 'tiled']
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xdata
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '登陆人数',
                type: 'line',
                smooth: true,
                data: ydata
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }

    function input(datas) {
        var xdata = new Array();
        var ydata = new Array();
        for(i=0;i<datas.length;i++)
        {
            xdata[i] = datas[i].Key.substring(0,10);
             ydata[i] = datas[i].Value;
        }
        console.log(xdata);
        console.log(ydata);
        var myChart1 = echarts.init(document.getElementById('amountCount'));

        var option1 = {
             title: {
                text: '周收入统计',
                subtext: ''
            },
            legend: {
                data: ['收入']
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: xdata,
                axisTick: {
                    alignWithLabel: true
                }
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '收入',
                type: 'bar',
                barWidth: '60%',
                data: ydata
            }]
        };
        myChart1.setOption(option1);
    }

    $("#login_out").click(function () {
        localStorage.clear();
        window.location.href = "../login.html";
    })
});