

　　　　	//cav对象
	var cav = (function(){
		var canvas = document.getElementById("canvas");
		var cxt = canvas.getContext("2d");
		var width = window.screen.availHeight || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;


		canvas.width = 600;
		canvas.height = height;
		
		if (width<600) {
			canvas.width = width;
		}
		
		var cavW = canvas.width;
		var cavH = canvas.height;
		var gapW = 20;
		return {
			cv : canvas,
			cxt : cxt,
			cW : cavW,
			cH : cavH,
			gap : gapW
		}
	}());
	
	var gmObj = (function(cav){
		//游戏对象

		//游戏对象初始位置
		var x = cav.cW/2, y = 20;
		var w = cav.gap, h = cav.gap;

		cav.cxt.fillStyle = "red";
		cav.cxt.fillRect(x,y,w,h);
		return {
			set : function(i,j){
				//重绘游戏对象

				//每次重绘时先清除上次的游戏对象
				cav.cxt.clearRect(x,y,w,h);

				x = i, y = j;
				cav.cxt.fillStyle = "red";
				cav.cxt.fillRect(x,y,w,h);

			},
			get : function(){
				return{
					curX : x,
					curY : y
				}
			},
			init : function(){
				x = cav.cW/2, y = 20;
				w = cav.gap, h = cav.gap;

				cav.cxt.fillStyle = "red";
				cav.cxt.fillRect(x,y,w,h);
			}
		}
	})(cav);

	var glObj = (function(cav){
		var x = cav.cW/2, y = parseInt((cav.cH - 30)/cav.gap)*cav.gap;
		var w = cav.gap, h = cav.gap;
		cav.cxt.fillStyle = "blue";
		cav.cxt.fillRect(x,y,w,h);
		return{
			get : function  () {
				return{
					x:x,
					y:y
				}
			},
			init : function(){
				x = cav.cW/2, y = parseInt((cav.cH - 30)/cav.gap)*cav.gap;
				w = cav.gap, h = cav.gap;
				cav.cxt.fillStyle = "blue";
				cav.cxt.fillRect(x,y,w,h);
			}
		}
	})(cav);

	var mapObj = (function(cav){
		var map = new Array();
		var lenX = parseInt(cav.cW/cav.gap);
		var lenY = parseInt(cav.cH/cav.gap);
		for (var i = 0; i < lenX; i++) {
			map[i] = new Array();
			for (var j = 0; j < lenX; j++) {
				map[i][j] = 1;
			}
		}

		return{
			
			set : function(i,j,v){
				map[i][j] = v;
			},
			get : function(i,j){
				return map[i][j];
			},
			map : function(){
				return map;
			}
		}
	})(cav);

	var blockObj = (function(cav){
		//生成障碍物
		var time = {
			time : 1
		};
		var num;
		time.time = 1;
		generateBlck(1);
		return{
			setTime : function(time){
				time.time = time;
				console.log(time.time);
			},
			getTime : function(){
				return {
					time : time.time
				}
			},
			set : function(time){
				generateBlck(time);
			},
			clear : function(){
				clearBlck();
			}
		}
		function generateBlck(time){
			num = parseInt(Math.random()*2 + 2*time);
		
			for (var n = 0; n < num; n++) {
				var x = parseInt((Math.random()*cav.cW)/cav.gap)*cav.gap;
				var y = parseInt((Math.random()*(glObj.get().y-40)+40)/cav.gap)*cav.gap;

				var w = parseInt(Math.random()*2 + 2)*cav.gap;
				var h = parseInt(Math.random()*2 + 4)*cav.gap;
				if (x + w > cav.cW) {
					x = cav.cW -w;
				}
				if (y + h > glObj.get().y) {
					y = glObj.get().y -h;
				}

				for (var i = x/cav.gap; i < x/cav.gap + w/cav.gap; i++) {
					for (var j = y/cav.gap; j < y/cav.gap + h/cav.gap; j++) {
						mapObj.set(i,j,0);
					}
				}
				

				cav.cxt.fillStyle = "black";
				cav.cxt.fillRect(x,y,w,h);
			}
		
		}
		function clearBlck(){
			
		var map = mapObj.map();
				
		var mapL = map.length;
		for (var i = 0; i < mapL; i++) {
			var rl = map[i].length;
				for (var j = 0; j < rl; j++) {
					if(map[i][j] === 0){
						cav.cxt.clearRect(i*cav.gap,j*cav.gap,cav.gap,cav.gap);
						mapObj.set(i,j,1);
					}
				};
			};	

			
		
		}

	})(cav);
	

	var time = 1;
	cav.cv.addEventListener('click',function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		var x = e.clientX - cav.cv.offsetLeft;
		var y = e.clientY - cav.cv.offsetTop;
		x = parseInt(x/cav.gap)*cav.gap;
		y = parseInt(y/cav.gap)*cav.gap;
		
		var curX = gmObj.get().curX, curY = gmObj.get().curY;

		require(['astar'], function (astar){
			var Map = astar.Map;
			var astar = astar.astar;
			var maps = new Map(mapObj.map());
			var cx = curX/cav.gap,cy=curY/cav.gap;
			var start = maps.maps[cx][cy];
	    	var end = maps.maps[x/cav.gap][y/cav.gap];
			var result = astar.path(maps, start, end);
			if (result === undefined) {
				time = 1;
				blockObj.clear();
				blockObj.set(time);
			}
			var o = new pathObj(result,function(){
				if (glObj.get().x===x&&glObj.get().y===y) {
					gmObj.init();
					glObj.init();
					
					time++;
					blockObj.clear();
					blockObj.set(time);
				}
			});
			o.setR();

		
		
});
		
		
		//var o = new pathObj1();
		function pathObj(result,callback){
			var i =0;
			var result = result;
			var rl = result.length;
			this.setR = function() {
				
				var self = this;
				//console.log(result);
				
				if (i<rl) {
					gmObj.set(cav.gap*result[i].x,cav.gap*result[i].y);
					i++;
				
					t=window.setTimeout(function(){self.setR();},50)
					
				}else{
					
					clearTimeout(t);
					if(typeof callback == "function") {  callback(); } 
				}
				
			}
		}
		
		
	},true);
