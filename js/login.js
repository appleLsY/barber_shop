  var vm = new Vue({
      el: '#hear',
      data: {
          ifLogin: true,
          ifRegest: false,
          usern: "",
          passw: "",
          userError: "",
          regestUserError: "",
          repassError: "",
          ifUserError: false,
          ifPassError: false,
          ifRegestUserError: false,
          IfRepassError: false,
          repass: "",          //确认密码
          regestpass: "",      //注册密码
          regestuser: "",     //注册账号
          if_user_true:false,
          if_repass_true:false,
          if_userlogin_true:false,
      },
      methods: {
          sign: function () {
              this.ifLogin = false;
              this.ifRegest = true;
          },
          returnLogin: function () {
              this.ifLogin = true;
              this.ifRegest = false;
          },
          test_account_login: function(){
              var telepehone = /^1\d{10}$/; //手机号的正则表达式
              var emai = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; //邮箱的正则表达式
              var login_user=this.usern;
              if(telepehone.test(login_user)||emai.test(login_user)){
                  this.if_userlogin_true=true;
                  this.ifUserError=false;
              }
              else{
                  this.if_userlogin_true=false;
                  this.ifUserError=true;
                  this.userError="手机号格式不正确";
              }
          },
          test_account_repass:function(){
              var regest_pass = vm.regestpass;
              var repass = vm.repass;
              if (regest_pass != "" || regest_pass != null) {
                  if (regest_pass !== repass) { //判断两个密码是否相等
                      this.if_repass_true=false;
                      this.IfRepassError = true;
                      this.ifRegestUserError = false;
                      this.repassError = "两次密码输入不一样，请重新输入";
                  }
                  else{
                      this.if_repass_true=true;
                      this.IfRepassError = false;
                      this.ifRegestUserError = false;
                  }
              }
          },
          test_account_regest: function(){
              var telepehone = /^1\d{10}$/; //手机号的正则表达式
              var emai = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; //邮箱的正则表达式
              var re_user=this.regestuser;
              if (telepehone.test(re_user) || emai.test(re_user)){
                  this.if_user_true=true;
                  this.IfRepassError = false;
                  this.ifRegestUserError = false;
              } else {
                  this.if_user_true=false;
                      this.IfRepassError = false;
                      this.ifRegestUserError = true;
                      this.regestUserError = "请检查账号是否为手机号或者邮箱";
                  }
          },
          submitRegest: function () {
              var telepehone = /^1\d{10}$/; //手机号的正则表达式
              if(this.if_repass_true==true&&this.if_user_true==true)
              {
                  if(telepehone.test(this.regestuser))
                  {
                    this.$http.post('http://localhost:11162/api/v1/account/register',{
                        PhoneNumber:this.regestuser,
                        Password:this.regestpass
                    },{
                        emulateJSON:true
                    }).then(function (res) {
                      alert("手机注册成功");
                      window.location.href="login.html"
                  }, function () {
                      console.log('请求失败处理');
                  })
                  }
                  else
                  {
                    this.$http.post('http://localhost:11162/api/v1/account/register',{
                        Email:this.regestuser,
                        Password:this.regestpass
                    },{
                        emulateJSON:true
                    }).then(function (res) {
                      alert("邮箱注册成功");
                      window.location.href="login.html"
                  }, function () {
                      console.log('请求失败处理');
                  })
                  }
              }
              else
              {
                  alert("注册失败,请认真确认是否填写错误")
              }
          },
          login: function () {
        //       var telepehone = /^1\d{10}$/; //手机号的正则表达式
        //       var emai = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                this.$http.post('http://localhost:11162/api/v1/account/login', {
                    Account: this.usern,
                    Password: this.passw
                }, {
                    emulateJSON: true
                }).then(function (res) {
                    window.localStorage.setItem("userId",res.body.Token);
                    window.localStorage.setItem("username",res.body.Name);
                    if(res.body.Role.Id=='3'){
                        window.location.href="index.html";
                    }
                    else if(res.body.Role.Id=='2')
                    {
                        window.location.href="lifashi/barber.html";
                    }
                    else{
                        window.location.href="admin/admin.html";
                    }
                }, function () {
                    console.log('请求失败处理');
                    alert("登录失败")
                })
          },
          if_has_user:function(){
              if(localStorage.length!=0){
                  localStorage.clear();
                  window.location.reload();
              }
          }
      },
      created:function(){
          this.if_has_user();
      }
  })