(function(){

	function Oslider(opts){
		this.wrapper=opts.wrapper;	   //最外围元素id	
		this.isAutoPlay=opts.isAutoPlay;          //默认自动播放.
		this.autoPlayTimeGap=opts.autoPlayTimeGap || 3000;     //默认自动播放时间间隙
		
		this.len='';      //全局  图片的个数	
		this.init();
		
	}

	var Until={
		getById:function(s){
			if( typeof s == 'string'){
				return  document.getElementById(s);
			}else if( typeof s == 'object'){
				return s;
			}
		},
		getByClass:function(s){
			if(document.querySelector){
				return typeof s == 'string' ? document.querySelector('.'+s) : s;
			}
		},
		bind:function(obj, ev, fn) { 
		    if (obj.addEventListener) {
		        obj.addEventListener(ev, fn, false);
		    } else {
		        obj.attachEvent('on' + ev, function() {
		            fn.call(obj);
		        });
		    }
		},
		view: function() {
		    return {
		        w: document.documentElement.clientWidth,
		        h: document.documentElement.clientHeight
		    };
		},
		addClass: function(obj, sClass) { 
		    var aClass = obj.className.split(' ');
		    if (!obj.className) {
		        obj.className = sClass;
		        return;
		    }
		    for (var i = 0; i < aClass.length; i++) {
		        if (aClass[i] === sClass) return;
		    }
		    obj.className += ' ' + sClass;
		},
		removeClass: function(obj, sClass) { 
		    var aClass = obj.className.split(' ');
		    if (!obj.className) return;
		    for (var i = 0; i < aClass.length; i++) {
		        if (aClass[i] === sClass) {
		            aClass.splice(i, 1);
		            obj.className = aClass.join(' ');
		            break;
		        }
		    }
		}
	}

	Oslider.prototype.init=function(){
		
		var _this=this;
		var oTab=Until.getById(this.wrapper);
		var oList=Until.getByClass("swiperList");
		var oListLi=oList.getElementsByTagName('li');
		var aNav='';  //图标导航的子元素
		var iNow=0;
		var iX=0;
		var iW=Until.view().w;
		var oTimer=0;
		var iStartTouchX=0;
		var iStartX=0;
		
		var len=this.len=oList.getElementsByTagName('li').length;
		
		oList.style.width=this.len+'00%';
		for(var i=0;i<this.len;i++){
			oListLi[i].style.width=100/this.len+'%';
		}
		
		//默认自动播放	
		if(this.isAutoPlay==false){
		}else{
			auto();
		}
		initBind();
		initNav();
		/*
		**生成slide小图标
		*/
		function initNav(){
			
			var oSection=document.createElement('section');
			var oNav=document.createElement('nav');

			oSection.className='swiperNav';
			
			for(var i=0;i<len;i++){

				var oA=document.createElement('a');
				if(i==0){
					oA.className='active';
				}
				oA.href='javascript:;';
				oNav.appendChild(oA);
			}
			oSection.appendChild(oNav);
			oTab.appendChild(oSection);

			aNav=oTab.getElementsByTagName("nav")[0].children;
		}

		/*
		*处理所有绑定事件
		*/
		function initBind(){
			Until.bind(oTab,"touchstart",fnStart);
			Until.bind(oTab,"touchmove",fnMove);
			Until.bind(oTab,"touchend",fnEnd);
		}

		function auto()
		{
			oTimer=setInterval(function(){
				iNow++;	
				iNow=iNow%aNav.length;
				tab();
			},_this.autoPlayTimeGap);
			
		}
		function fnStart(ev)
		{
			oList.style.transition="none";
			ev=ev.changedTouches[0];
			iStartTouchX=ev.pageX;
			iStartX=iX;
			clearInterval(oTimer);
		}
		function fnMove(ev)
		{
			ev=ev.changedTouches[0];
			var iDis=ev.pageX-iStartTouchX;
			iX=iStartX+iDis;
			oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
		}
		function fnEnd()
		{
			iNow=iX/iW;
			iNow=-Math.round(iNow);
			if(iNow<0)
			{
				iNow=0;
			}
			if(iNow>aNav.length-1)
			{
				iNow=aNav.length-1;
			}
			tab();
			if(this.isAutoPlay==false){
			}else{
				auto();
			}
		}
		function tab()
		{
			iX=-iNow*iW;
			oList.style.transition="0.5s";
			oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
			for(var i=0;i<aNav.length;i++)
			{
				Until.removeClass(aNav[i],"active");
			}
			Until.addClass(aNav[iNow],"active");
		}
	}

	window.Oslider=Oslider;

})()