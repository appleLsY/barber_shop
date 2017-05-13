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
          repass: "",
          regestpass: "",
          regestuser: ""
      },
      methods: {
          sign: function () {
              vm.ifLogin = false;
              vm.ifRegest = true;
          },
          returnLogin: function () {
              vm.ifLogin = true,
                  vm.ifRegest = false
          },
          submitRegest: function () {
              var telepehone = /^1\d{10}$/; //手机号的正则表达式
              var emai = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; //邮箱的正则表达式
              var re_user = vm.regestuser;
              var re_pass = vm.regestpass;
              var repass = vm.repass;
              if (re_pass != "" || re_pass != null) {
                  if (re_pass !== repass) { //判断两个密码是否相等
                      vm.IfRepassError = true;
                      vm.ifRegestUserError = false;
                      vm.repassError = "两次密码输入不一样，请重新输入";
                  } else if (telepehone.test(re_user) || emai.test(re_user)) { //不要弹出框，文本框后面显示
                      vm.IfRepassError = false;
                      vm.ifRegestUserError = false;
                      alert("注册成功");
                  } else {
                      vm.IfRepassError = false;
                      vm.ifRegestUserError = true;
                      vm.regestUserError = "请检查账号是否为手机号或者邮箱";
                  }
              }
          },
          login: function () {
              var telepehone = /^1\d{10}$/; //手机号的正则表达式
              var emai = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
              var user = vm.usern;
              if (telepehone.test(user) || emai.test(user)) {
                  //发送get请求
                  this.$http.post('http://localhost:11162/api/v1/account/login', {
                      Account: user,
                      Password: vm.passw
                  }, {
                      emulateJSON: true
                  }).then(function (res) {
                      alert(res.body);
                  }, function () {
                      console.log('请求失败处理');
                  })
              } else {
                  vm.ifUserError = true;
                  vm.userError = "请输入正确的账号";
                  alert("请输入正确的账号");
              }
          }

      }
  })