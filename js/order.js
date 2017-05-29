var vm=new Vue({
    el:"#home",
    data:{
        barber_select:"",
        package_select:"",
        selected:"洗发",
        price:"",
        options:[
        ],
        barbers:[],
        times:[
            {text:"10:00",value:"10:00"},
            {text:"10:30",value:"10:30"},
            {text:"11:00",value:"11:00"},
            {text:"11:30",value:"11:30"},
            {text:"14:00",value:"14:00"},
            {text:"14:30",value:"14:30"},
            {text:"15:00",value:"15:00"},
            {text:"15:30",value:"15:30"},
            {text:"16:00",value:"16:00"},
            {text:"16:30",value:"16:30"},
        ],
        starttime:"10:00",
        start_date:"",
        endtime:"",
        spend_time:0,
        pay_method:"0",
        pays:[
            {text:"线上支付",value:"0"},
            {text:"线下支付",value:"1"},
        ],
        canlender:false,
        packa:[],
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
        hours:[],

    },
    methods:{
        getData:function (datas){
            this.$http.get("http://localhost:11162/api/v1/account/allBarber").then(function(data){
                this.barbers=data.body;
                this.barber_select=this.barbers[0].Id;
            })
        },
        gettaocan:function(datas){
            this.$http.get("http://localhost:11162/api/v1/package/all").then(function(data){
            this.options=data.body;
            this.package_select=this.options[0].Id;
            this.price=this.options[0].Price;
            this.spend_time=this.options[0].Timespan;
            })
        },
        yuyue:function(){
            this.$http.post("http://localhost:11162/api/v1/order",{
                UserId:2,
                BarberId:this.barber_select,
                StartTime:this.start_date+" "+this.starttime,
                Chanel:this.pay_method,
                Packages:[
                    {
                        Id:this.package_select,
                    }
                ]
            },{
                    emulateJSON: true
            }).then(function(data){
                console.log(data);
                alert("预约成功")
            },function(dd){
                alert(dd.message);
            }
            )
        },
        show_price:function(){
            alert(this.package_select);
            this.$http.get("http://localhost:11162/api/v1/package?id="+this.package_select).then(function(data){
                this.packa=data.body;
                this.price=this.packa.Price;
                this.spend_time=this.packa.Timespan;
            })
        },
        show_endtime:function(){
            if(this.start_date==null||this.start_date==""){
                alert("请先选择预约日期");
            }
            else
            {
                var stri=this.start_date+" "+this.starttime;
                var dat=new Date(stri);
                dat.setMinutes(dat.getMinutes()+this.spend_time);
                this.endtime=this.formathours(dat.getHours(),dat.getMinutes());
            }
        },
        show_calender:function(){
            if(this.canlender==true){
                this.canlender=false
            }
            else
                this.canlender=true;
        },


        //选择日期
        initData: function(cur) {
            var date;
            if (cur) {
                date = new Date(cur);
            } else {
                date = new Date();
            }
            this.currentDay = date.getDate();
            this.currentYear = date.getFullYear();
            this.currentMonth = date.getMonth() + 1;
            this.currentWeek = date.getDay(); // 1...6,0
            if (this.currentWeek == 0) {
                this.currentWeek = 7;
            }
            var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
            console.log("today:" + str + "," + this.currentWeek);
            this.days.length = 0;
            // 今天是周日，放在第一行第7个位置，前面6个
            for (var i = this.currentWeek - 1; i >= 0; i--) {
                var d = new Date(str);
                d.setDate(d.getDate() - i);
                console.log("y:" + d.getDate());
                this.days.push(d);
            }
            for (var i = 1; i <= 35 - this.currentWeek; i++) {
                var d = new Date(str);
                d.setDate(d.getDate() + i);
                this.days.push(d);
            }
        },
        pick: function(date) {
            this.start_date=this.formatDate(date.getFullYear(),date.getMonth()+1,date.getDate());
            this.canlender=false;
            //alert(this.formatDate( date.getFullYear() , date.getMonth() + 1, date.getDate()));
        },
        pickPre: function(year, month) {
            //  setDate(0); 上月最后一天
            //  setDate(-1); 上月倒数第二天
            //  setDate(dx) 参数dx为 上月最后一天的前后dx天
            var d = new Date(this.formatDate(year , month , 1));
            d.setDate(0);
            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        pickNext: function(year, month) {
            var d = new Date(this.formatDate(year , month , 1));
            d.setDate(35);
            this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
        },
        pickYear: function(year, month) {
            alert(year + "," + month);
        },
        // 返回 类似 2016-01-02 格式的字符串
        formatDate: function(year,month,day){
            var y  = year;
            var m = month;
            if(m<10) m = "0" + m;
            var d = day;
            if(d<10) d = "0" + d;
            return y+"-"+m+"-"+d
        },
        //返回类似10:00格式的字符串
        formathours:function(hour,minute){
            var h=hour;
            var m=minute;
            if(m==0){
                m="0"+m;
            }
            return h+":"+m;
        },
    },
    created:function(){
        this.getData();
        this.gettaocan();
        this.initData(null);
    },
})