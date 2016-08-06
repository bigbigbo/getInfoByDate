(function(){
	
		var lunarInfo=new Array(
		0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
		0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
		0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
		0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
		0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
		0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
		0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
		0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
		0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
		0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
		0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
		0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
		0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
		0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
		0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0)

		var nStr1 = new Array('十','一','二','三','四','五','六','七','八','九');
		var nStr2 = new Array('初','十','廿','卅');
		var nStr3 = new Array('一','二','三','四','五','六','七','八','九','十','十一','十二');
		var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);

		// 新历节日
		var sFtv = new Array(
		"0101 元旦",
		"0214 情人节",
		"0308 妇女节",
		"0312 植树节",
		"0315 消费者权益日",
		"0401 愚人节",
		"0501 劳动节",
		"0504 青年节",
		"0512 护士节",
		"0601 儿童节",
		"0701 建党节",
		"0801 建军节",
		"0910 教师节",
		"0928 孔子诞辰",
		"1001 国庆节",
		"1006 老人节",
		"1024 联合国日",
		"1224 平安夜",
		"1225 圣诞节")

		//农历节日
		var lFtv = new Array(
		"0101 春节",
		"0115 元宵节",
		"0505 端午节",
		"0707 七夕情人节",
		"0715 中元节",
		"0815 中秋节",
		"0909 重阳节",
		"1208 腊八节",
		"1224 小年")

		//返回农历y年的总天数
		function lYearDays(y) {
		   var i, sum = 348;
		   for(i=0x8000; i>0x8; i>>=1)sum+=(lunarInfo[y-1900]&i)?1:0;
		   return(sum+leapDays(y));
		}

		//返回农历y年闰月的天数
		function leapDays(y) {
		   if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29);
		   else return(0);
		}

		//判断y年的农历中那个月是闰月,不是闰月返回0
		function leapMonth(y){
		   return(lunarInfo[y-1900]&0xf);
		}

		//返回农历y年m月的总天数
		function monthDays(y,m){
		   return((lunarInfo[y-1900]&(0x10000>>m))?30:29);
		}

		// 用中文显示农历的日期
		function cDay(d){
		   var s;
		   switch (parseInt(d)) {
		      case 10:
							//console.log('ss')
		         s = '初十'; break;
		      case 20:
		         s = '二十'; break;
		      case 30:
		         s = '三十'; break;
		         break;
		      default :
		         s = nStr2[Math.floor(d/10)];
		         s += nStr1[d%10];
		   }
		   return(s);
		}

		//算出当前月第一天的农历日期和当前农历日期下一个月农历的第一天日期
		function Dianaday(objDate) {
		   var i, leap=0, temp=0;
		   var baseDate = new Date(1900,0,31);
		   var offset   = (objDate - baseDate)/86400000;
		   this.dayCyl = offset+40;
		   this.monCyl = 14;
		   for(i=1900; i<2050 && offset>0; i++) {
		      temp = lYearDays(i)
		      offset -= temp;
		      this.monCyl += 12;
		   }
		   if(offset<0) {
		      offset += temp;
		      i--;
		      this.monCyl -= 12;
		   }
		   this.year = i;
		   this.yearCyl=i-1864;
		   leap = leapMonth(i); //闰哪个月
		   this.isLeap = false;
		   for(i=1; i<13 && offset>0; i++) {
		      if(leap>0 && i==(leap+1) && this.isLeap==false){    //闰月
		          --i; this.isLeap = true; temp = leapDays(this.year);}
		      else{
		         temp = monthDays(this.year, i);}
		      if(this.isLeap==true && i==(leap+1)) this.isLeap = false;    //解除闰月
		      offset -= temp;
		      if(this.isLeap == false) this.monCyl++;
		   }
		   if(offset==0 && leap>0 && i==leap+1)
		      if(this.isLeap){ this.isLeap = false;}
		      else{this.isLeap=true;--i;--this.monCyl;}
		   if(offset<0){offset+=temp;--i;--this.monCyl;}
		   this.month=i;
		   this.day=offset+1;
		}

		//返回公历y年m+1月的天数
		function solarDays(y,m){
		   if(m==1)
		      return(((y%4==0)&&(y%100!=0)||(y%400==0))?29:28);
		   else
		      return(solarMonth[m]);
		}

		//记录公历和农历某天的日期
		function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap) {
		      //公历
		      this.sYear = sYear;
		      this.sMonth = sMonth;
		      this.sDay = sDay;
		      this.week = week;
		      //农历
		      this.lYear = lYear;
		      this.lMonth = lMonth;
		      this.lDay = lDay;
		      this.isLeap = isLeap;
		}

		//保存y年m+1月的相关信息
		var fat=mat=9;
		var eve=0;
		function calendar(y,m) {
		   fat=mat=0;
		   var sDObj,lDObj,lY,lM,lD=1,lL,lX=0;
		   var lDPOS = new Array(3);
		   var n = 0;
		   var firstLM = 0;
		   sDObj = new Date(y,m,1);    //当月第一天的日期
		   this.length = solarDays(y,m);    //公历当月天数
		   this.firstWeek = sDObj.getDay();    //公历当月1日星期几
		   if ((m+1)==5){fat=sDObj.getDay()}
		   if ((m+1)==6){mat=sDObj.getDay()}
		   for(var i=0;i<this.length;i++) {
		      if(lD>lX) {
		         sDObj = new Date(y,m,i+1);    //当月第一天的日期
		         lDObj = new Dianaday(sDObj);     //农历
		         lY = lDObj.year;           //农历年
		         lM = lDObj.month;          //农历月
		         lD = lDObj.day;            //农历日
		         lL = lDObj.isLeap;         //农历是否闰月
		         lX = lL? leapDays(lY): monthDays(lY,lM); //农历当月最後一天
		         if (lM==12){eve=lX}
		         if(n==0) firstLM = lM;
		         lDPOS[n++] = i-lD+1;
		      }
		      this[i] = new calElement(y,m+1,i+1,nStr1[(i+this.firstWeek)%7],lY,lM,lD++,lL);
		   }
		}
		
		// 补零
		function addZero(num){
			if(num < 10){
				return "0" + num;
			}else{
				return num.toString()
			}
		}
		
		window.getInfoByDate=function(date){
			var oYear = date.getFullYear();
			var oMonth = date.getMonth();
			var oDay = date.getDate();
			var oWeekday = date.getDay();
			var oWeek = Math.ceil(oDay / 7);

			var oObject = new calendar( oYear , oMonth )
			var _index = oDay - 1;

			var xMonth= addZero(date.getMonth()+1);//公历月
			var xDay= addZero(date.getDate());//公历日

			var lMonth = addZero(oObject[_index].lMonth); //农历月
			var lDay = addZero(oObject[_index].lDay);  //农历日
			var nStr3Index = oObject[_index].lMonth - 1;

			var oDate= xMonth + xDay;
			var lDate= lMonth + lDay; //农历日月字符串格式

			var oFestival={
				oYear  : oYear,
				xDate  : xMonth + "-" + xDay,
				lDate  : nStr3[nStr3Index] + "月" + cDay(lDay),
				sFtv   : "",
				lFtv   : ""
			};
			
			for( var i=0,len = sFtv.length; i < len ; i++ ){
				if( sFtv[i].substr(0,4) === oDate ){
					oFestival.sFtv=sFtv[i].substr(5);
				}
			}

			for( var i=0,len=lFtv.length; i < len; i++ ){
				if( lFtv[i].substr(0,4) === lDate ){
					oFestival.lFtv=lFtv[i].substr(5);
				}
			}
			
			if(xMonth == 5 && oWeek === 2 && oWeekday === 0){
				oFestival.sFtv="母亲节";
			}

			if(xMonth == 6 && oWeek === 3 && oWeekday === 0){
				oFestival.sFtv="父亲节";
			}
			if( oFestival.lFtv!="" || oFestival.sFtv!="" ){
				return oFestival;
			}else{
				return cDay(lDay)
			}
		}
})(window)

