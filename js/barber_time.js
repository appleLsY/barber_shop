var pageBar = new Vue({
    el: '#home',
    data: {
        name:'',
        if_takeoff:false,
        canlender:false,
        packa:[],
        start_date:"",
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
        hours:[],
        isblues:[{isblue:true},{isblue:true},{isblue:true},{isblue:true},{isblue:true},{isblue:true},{isblue:true},
        {isblue:true},{isblue:true},{isblue:true},{isblue:true},{isblue:true},{isblue:true},{isblue:true},
        {isblue:true},{isblue:true},{isblue:true}],
        status:"",
        times:[],
        data_time:[{startime:"09:00", endtime:"09:30"},{startime:"09:30", endtime:"10:00"},
        {startime:"10:00",endtime:"10:30",},{startime:"10:30",endtime:"11:00"},
        {startime:"11:00",endtime:"11:30",},{startime:"11:30",endtime:"12:00"},
        {startime:"12:00",endtime:"12:30",},{startime:"12:30",endtime:"13:00"},
        {startime:"13:00",endtime:"13:30",},{startime:"13:30",endtime:"14:00"},
        {startime:"14:00",endtime:"14:30",},{startime:"14:30",endtime:"15:00"},
        {startime:"15:00",endtime:"15:30",},{startime:"15:30",endtime:"16:00"},
        {startime:"16:00",endtime:"16:30",},{startime:"16:30",endtime:"17:00"},
        {startime:"17:00",endtime:"17:30",}
        ],
        data_status:[{status:"禁用"},{status:"禁用"},{status:"禁用"},{status:"禁用"},{status:"禁用"},{status:"禁用"},{status:"禁用"},
        {status:"禁用"},{status:"禁用"},{status:"禁用"},{status:"禁用"},{status:"禁用"},{status:"禁用"},{status:"禁用"},{status:"禁用"},
        {status:"禁用"},{status:"禁用"},
        ]
    },
    methods:{
        getName:function(){
            this.name=localStorage.getItem("username");
        },
        login_out:function(){
            localStorage.clear();
            window.location.href="../login.html";
        },
        leave:function(){
            if(this.if_takeoff==false){
                this.if_takeoff=true;
            }
            else{
                this.if_takeoff=false;
            }
        },
        show:function(dae){
            if(this.data_status[dae].status=="禁用"){
                this.$http.post('http://localhost:11162/api/v1/schedule/forbiden',{
                StartTime:this.data_time[dae].startime,
                EndTime:this.data_time[dae].endtime
            },
            {headers:{token:localStorage.getItem("userId")}},
                {
                    emulateJSON:true
                }).then(function(data){
                    this.data_status[dae].status="已禁用";
                })
            }
        },
        getData:function(){
            this.$http.get('http://localhost:11162/api/v1/schedule/all',{
                headers:{token:localStorage.getItem("userId")},
            },{
                emulateJSON:true,
            }).then(function(data){
                console.log(data.body);
                this.times=data.body;
                alert(this.times.length);
                if(this.times.length==0){
                    for(var i=0;i<this.data_status.length;i++){
                        this.data_status[i].status="禁用";
                    }
                }
                else{
                    for(var i=0;i<this.times.length;i++){
                        var stattime=this.times[i].StartTime;
                        stattime=stattime.substring(11,16);
                        var endtime=this.times[i].EndTime;
                        endtime=endtime.substring(11,16);
                        var k,m;
                        for(j=0;j<this.data_time.length;j++){
                            if(this.data_time[j].startime==stattime){
                                k=j;
                            }
                            if(this.data_time[j].startime==endtime){
                                m=j;
                            }
                            for(var t=k;t<m;t++){
                                    this.data_status[t].status="已预约";
                                    this.isblues[t].isblue=false;
                            }
                        }
                    }
                }
            })
        },
        take_off_click:function(){
            alert(this.start_date);
            this.$http.post('http://localhost:11162/api/v1/schedule',{
                date:this.start_date,
            },
            {headers:{token:localStorage.getItem("userId")}},
            {
                emulateJSON: true
            }).then(function(data){
                alert("请假成功");
                window.location.reload();
            })
        },
        cancel:function(){
            this.if_takeoff=false;
        },
        show_calender:function(){
            if(this.canlender==true){
                this.canlender=false
            }
            else
                this.canlender=true;
        },
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
    },
    created:function(){  //页面加载就执行getData方法
        this.getName();
        this.initData(null);
        this.getData();
    },
})