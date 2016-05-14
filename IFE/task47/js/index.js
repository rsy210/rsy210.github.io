　	var cav = (function(){
		//cav对象
		var canvas = document.getElementById("canvas");
		var cxt = canvas.getContext("2d");
		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
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
		var cxt = cav.cxt;
		//游戏对象初始位置
		var x = cvtGap(cav.cW/2)*20, y = 20;
		var r = cav.gap/2, h = cav.gap;
		var num = 0;


		cxt.fillStyle = "#64BA9D";
		cxt.beginPath();
		cxt.arc(x+10,y+10,r,0,Math.PI*2,true);
		cxt.closePath();
		cxt.fill();
		var bulletPool = new Pool(30);
		bulletPool.init();
		var t1;
		var lv = true;

		
		return {
			set : function(i,j){
				//重绘游戏对象

				//每次重绘时先清除上次的游戏对象
				cxt.clearRect(x,y,h,h);

				x = i, y = j;
				cxt.clearRect(x,y,h,h);
				cxt.fillStyle = "#64BA9D";
				cxt.beginPath();
				cxt.arc(x+10,y+10,r,0,Math.PI*2,true);
				//cxt.closePath();
				cxt.fill();

			},
			get : function(){
				return{
					curX : x,
					curY : y,
					r : r
				}
			},
			draw : function(){
				cxt.fillStyle = "#64BA9D";
				cxt.beginPath();
				cxt.arc(x+10,y+10,r,0,Math.PI*2,true);
				cxt.closePath();
				cxt.fill();
			},
			init : function(){
				x = cvtGap(cav.cW/2)*20, y = 20;
				r = cav.gap/2, h = cav.gap;

				cxt.fillStyle = "#64BA9D";
				cxt.beginPath();
				cxt.arc(x+10,y+10,r,0,Math.PI*2,true);
				cxt.closePath();
				cxt.fill();
			},
			fire : function(x1,y1){
				bulletPool.get(x+10, y+10, 3,x1+10,y1+10,"gmObj");
				//console.log(t1);
				/*if (t1 != undefined) {
					clearTimeout(t1);
				}*/
				
				//animate();
			},
			setLv : function(bool){
				lv = bool;
			},
			getLv : function(){
				return lv;
			},
			bullet : bulletPool
		}
		/*function animate() {
			bulletPool.animate();
			t1=setTimeout(animate, 1000/60);
			//requestAnimFrame( animate );
		/*	num++;
			if (num>20) {
				num = 0;
				bulletPool.get(x+20, y+20, 3);
			}
			
			
		}*/
	})(cav);

	var glObj = (function(cav){
		//目标对象
		var x = cvtGap(cav.cW/2)*cav.gap, y = parseInt((cav.cH - 30)/cav.gap)*cav.gap;
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
			draw : function(){
				cav.cxt.fillStyle = "blue";
				cav.cxt.fillRect(x,y,w,h);
			},
			init : function(){
				x = cvtGap(cav.cW/2)*cav.gap, y = parseInt((cav.cH - 30)/cav.gap)*cav.gap;
				w = cav.gap, h = cav.gap;
				cav.cxt.fillStyle = "blue";
				cav.cxt.fillRect(x,y,w,h);
			}
		}
	})(cav);

	var mapObj = (function(cav){
		//地图坐标对象
		var map = new Array();
		var lenX = parseInt(cav.cW/cav.gap);
		var lenY = parseInt(cav.cH/cav.gap);

		for (var i = 0; i < lenY; i++) {
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
		var block = [];
		var num;
		time.time = 1;
		generateBlck(1);
		return{
			setTime : function(time){
				time.time = time;
			},
			getTime : function(){
				return {
					time : time.time
				}
			},
			set : function(time){
				generateBlck(time);
			},
			draw : function(){
				draw();
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
						mapObj.set(j,i,0);
					}
				}
				block.push({
					x:x,
					y:y,
					w:w,
					h:h
				});

				cav.cxt.fillStyle = "black";
				cav.cxt.fillRect(x,y,w,h);
			}
		}
		function draw(){
				var l = block.length;
				var x;
				var y;
				var w;
				var h;
				cav.cxt.fillStyle = "black";
				for (var i = 0; i < l; i++) {
					x = block[i].x;
					y = block[i].y;
					w = block[i].w;
					h = block[i].h;
					cav.cxt.fillRect(x,y,w,h);
				};
			}
		function clearBlck(){
			
			var map = mapObj.map();
					
			var mapL = map.length;
			for (var i = 0; i < mapL; i++) {
				var rl = map[i].length;
					for (var j = 0; j < rl; j++) {
						if(map[i][j] === 0){
							cav.cxt.clearRect(j*cav.gap,i*cav.gap,cav.gap,cav.gap);
							mapObj.set(i,j,1);
						}
					};
			}
			block = [];
			}
	})(cav);
	
	var guardObj = (function(cav){
		var self = this;
		var cxt = cav.cxt;
		var num = 0;
		var time = 1
		var guard = [];
		
		var t1;
		generategGuard(time);

		var bulletPool = new Pool(30);
		bulletPool.init();
		var s ={
			x:0,
			y:0
		};
		var e ={
			x:0,
			y:0
		};
		return{
			set : function(time){
				generategGuard(time);
			},
			draw : function(){
				draw();
			},
			fire : function(x,y,x1,y1){
				fire(x,y,x1,y1);
			},
			collision : function(cx,cy){
				collision(cx,cy);
			},
			clear : function(xo,yo){
				clear(xo,yo)
			},
			clearAll : function(){
				clearAll();
			},
			redraw : function(){
				animate(s.x,s.y,e.x,e.y);
			},
			bullet : function(){
				num++;
				/*if (num>2) {
					num = 0;
					bulletPool.get(s.x+10, s.y+10, 3,e.x+10,e.y+10,"guard");
				}*/
				return bulletPool.animate();
			}
		}
		function fire(x,y,x1,y1){
				s.x = x;
				s.y = y;
				e.x = x1;
				e.y = y1;
				bulletPool.get(s.x+10, s.y+10, 3,e.x+10,e.y+10,"guard");
				//console.log(t1);
				if (t1 != undefined) {
					clearTimeout(t1);
				}
				
				//animate(s.x,s.y,e.x,e.y);
			}
		/*function animate() {
			bulletPool.animate();
			if (gmObj.getLv()) {
				num++;
				if (num>15) {
					num = 0;
					bulletPool.get(s.x+10, s.y+10, 3,e.x+10,e.y+10,"guard");
				}
			}
			//requestAnimFrame( animate );
		 	
			t1=setTimeout(animate, 1000/60 );
		}*/
				function generategGuard(time){
			time = time;
			var r = cav.gap/2, h = cav.gap;
			var ken = r*5;
			cxt.fillStyle="#FF0000";
			cxt.strokeStyle = "#F56249";
			for (var n = 0; n < time; n++) {
				var x = parseInt((Math.random()*cav.cW)/cav.gap);
				var y = parseInt((Math.random()*(glObj.get().y))/cav.gap);
				//console.log(Math.sqrt(Math.pow(x*cav.cW- gmObj.get().curX,2)+Math.pow(y*cav.cW- gmObj.get().curY,2)));
				console.log(x*cav.gap,gmObj.get().curX,x*cav.gap - gmObj.get().curX);
				while(mapObj.get(y,x) !== 1 || Math.sqrt(Math.pow(x*cav.gap- gmObj.get().curX,2)+Math.pow(y*cav.gap- gmObj.get().curY,2)) <= ken+r){
					x = parseInt((Math.random()*cav.cW)/cav.gap);
					y = parseInt((Math.random()*(glObj.get().y-40)+40)/cav.gap);
				}
				mapObj.set(y,x,8);
				//console.log(y,x,mapObj.get(y,x));
				x = x*cav.gap;
				y = y*cav.gap; 
				cxt.beginPath();
				cxt.arc(x+r,y+r,r,0,Math.PI*2,true);
				cxt.closePath();
				cxt.fill();
				cxt.beginPath();
				cxt.arc(x+r,y+r,ken,0,Math.PI*2,true);
				cxt.closePath();
				cxt.stroke();

				guard.push({
					x:x,
					y:y,
					r:r,
					ken:ken
				});
			}
		
		}
		function draw(){
			var l = guard.length;
			var x;
			var y;
			var r;
			var ken;
			cxt.fillStyle="#FF0000";
			cxt.strokeStyle = "#F56249";
			for (var i = 0; i < l; i++) {
				x = guard[i].x;
				y = guard[i].y;
				r = guard[i].r;
				ken = guard[i].ken;
				cxt.beginPath();
				cxt.arc(x+r,y+r,r,0,Math.PI*2,true);
				cxt.closePath();
				cxt.fill();
				cxt.beginPath();
				cxt.arc(x+r,y+r,ken,0,Math.PI*2,true);
				cxt.closePath();
				cxt.stroke();
			};
		}
		function clear(xo,yo){
			var l = guard.length;
			var x;
			var y;
			var r;
			var ken;
			var xo = xo;
			var yo = yo;
			cxt.fillStyle="#FF0000";
			cxt.strokeStyle = "#F56249";
			for (var i = 0; i < l; i++) {
				x = guard[i].x;
				y = guard[i].y;
				r = guard[i].r;
				if (xo-r === x && yo-r === y) {
					guard.splice(i,1);
					mapObj.set(y/cav.gap,x/cav.gap,1);
					break;
				}
			};
		}
		function clearAll(){
			
			var l = guard.length;
			var x;
			var y;
			var r;
			var ken;
			for (var i = 0; i < l; i++) {
				x = guard[i].x;
				y = guard[i].y;
				r = guard[i].r;
					mapObj.set(y/cav.gap,x/cav.gap,1);
		
			}
			guard = [];
		}
		function collision(cx,cy){
			var l = guard.length;
			var x;
			var y;
			var r;
			var ken;
			var dt;
			cxt.fillStyle="#FF0000";
			cxt.strokeStyle = "#F56249";
			for (var i = 0; i < l; i++) {
				x = guard[i].x;
				y = guard[i].y;
				r = guard[i].r;
				ken = guard[i].ken;
				dt = Math.sqrt(Math.pow(cx-x,2)+Math.pow(cy-y,2));
				if (dt<ken+gmObj.get().r) {
					fire(x,y,cx,cy);
				}
			};
		}
		
	})(cav);


	var time = 1;
	window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
var id = null;
function animate() {
	id = requestAnimFrame(animate);
	cav.cxt.clearRect(0,0,cav.cW,cav.cH);
	
	glObj.draw();
	gmObj.draw();
	blockObj.draw();
	guardObj.draw();

		gmObj.bullet.animate();
		guardObj.bullet();
		if (!gmObj.getLv()) {
			window.cancelAnimationFrame(id);
			window.setTimeout(function(){
						gmObj.init();
						glObj.init();
						
						time =0;
						blockObj.clear();
						guardObj.clearAll();
						
						blockObj.set(time);
						guardObj.set(time);
						redraw();
						},500);
		}

}
	animate();
	cav.cv.addEventListener('click',function(e){
		//检测点击函数
		var e = e || window.event;
		var target = e.target || e.srcElement;
		var x = e.clientX - cav.cv.offsetLeft;
		var y = e.clientY - cav.cv.offsetTop;
		x = parseInt(x/cav.gap)*cav.gap;
		y = parseInt(y/cav.gap)*cav.gap;
		var curX = gmObj.get().curX, curY = gmObj.get().curY;
		//console.log(mapObj.map());
		//console.log(mapObj.get(parseInt(y/cav.gap),parseInt(x/cav.gap)));

		if (mapObj.get(parseInt(y/cav.gap),parseInt(x/cav.gap)) === 0) {
			return;
		}
		
		
		if (x === curX && y === curY) {
			return;
		}
		if (mapObj.get(parseInt(y/cav.gap),parseInt(x/cav.gap)) === 8) {
			gmObj.fire(x,y);
			//guardObj.fire(x,y,curX,curY);
			return;
		}
		require(['astar'], function (astar){
			//引入astar模块
			var Map = astar.Map;
			var astar = astar.astar;
			var maps = new Map(mapObj.map());
			var cx = cvtGap(curX),cy=cvtGap(curY);
			var start = maps.maps[cy][cx];
	    	var end = maps.maps[cvtGap(y)][cvtGap(x)];
			var result = astar.path(maps, start, end);

			if (result === undefined) {
				time = 1;
				blockObj.clear();
				blockObj.set(time);
			}else{
				var o = new pathObj(result);
				o.setR();
			}	
		
		});
		function pathObj(result,callback){
			//绘制路径过程
			var i =0;
			var result = result;
			var rl = result.length;
			var x;
			var y;
			this.setR = function() {
				
				var self = this;
				if (!gmObj.getLv()) {
						clearTimeout(t);
						return;
					}
				if (i<rl) {
					x = cav.gap*result[i].y;
					y = cav.gap*result[i].x;
					gmObj.set(x, y);
					guardObj.collision(x, y);
					
					if (glObj.get().x===x&&glObj.get().y===y) {
						window.setTimeout(function(){
						gmObj.init();
						glObj.init();
						
						time++;
						blockObj.clear();
						guardObj.clearAll();
						
						blockObj.set(time);
						guardObj.set(time);
						redraw();
						},500);
						

					}else{
						i++;
						t=window.setTimeout(function(){self.setR();},1000/60);
					}	
				}else{	
					
				}
				
			}
		}
		
		
	},true);

	
	function cvtGap(x){
		return parseInt(x/cav.gap);
	}
	function redraw(){
		var cxt = cav.cxt;

		cxt.clearRect(0,0,cav.cW,cav.cH);
		gmObj.draw();
		glObj.draw();
		blockObj.draw();
		guardObj.draw();
	
		//guardObj.redraw();

	}


function Bullet(obj){
	//子弹对象
	this.alive = false;
	this.r = 5;
	this.x = 0;
	this.y = 0;
	this.xf;
	this.yf;
	var self;
	var x0,xg;
	var y0,yg;
	this.l;
	this.f = 1;
}
Bullet.prototype.set = function(x,y,sp,x1,y1,obj) {
	// 设置想x,y,speed
	this.x = x;
	this.y = y;
	this.sp = sp;
	this.alive = true;
	this.end = false;
	this.f = 1;
	x0 = this.x;
	y0 = this.y;
	xg = x1;
	yg = y1;
	this.yf = yg-y0;
	this.xf = xg-x0;
	this.l = Math.abs(this.yf)/Math.abs(this.xf);
	if (this.yf < 0) {
		//l等于0时，y值相同，增量为0
		this.y -= this.l===0 ? 0 : 2*this.r;
	}else{
		this.y += this.l===0 ? 0 : 2*this.r;;
	}
	if (this.xf<0) {
		this.x -= this.l===0 ? 2*this.r : (2*this.r)/this.l;
	}else{
		//对x值相同情况，l为无穷大，x增量为0，因此未做判断
		this.x += this.l===0 ? 2*this.r : (2*this.r)/this.l;
	}
	self = obj;
};
Bullet.prototype.init = function(x,y){
	this.x = x;
	this.y = y;
};
Bullet.prototype.draw = function(cav) {
	// body...
	var cxt = cav.cxt;
	//redraw();
	/*if (self === "guard") {
		if(Math.sqrt(Math.pow(gmObj.get().curX+10-this.x,2)+Math.pow(gmObj.get().curY+10-this.y,2)) < 15){
			//cxt.clearRect(xg-51,yg-51,102,102);
			//guardObj.clear(xg,yg);
			//redraw();
			gmObj.setLv(false);
			return true;
		}
	}*/
	
	if (self === "guard") {
		cxt.fillStyle = "#F56249";
	}else if (self === "gmObj") {
		cxt.fillStyle = "#64BA9D";
	}
	if (!this.end) {
		if (this.f !== 1) {
			cxt.clearRect(this.x-this.r-1,this.y-this.r,2*this.r+2,2*this.r);
		}
		this.f = 2;
		if (this.yf < 0) {
			//l等于0时，y值相同，增量为0
			this.y -= this.l===0 ? 0 : this.r;
		}else{
			this.y += this.l===0 ? 0 : this.r;;
		}
		if (this.xf<0) {
			this.x -= this.l===0 ? this.r : this.r/this.l;
		}else{
			//对x值相同情况，l为无穷大，x增量为0，因此未做判断
			this.x += this.l===0 ? this.r : this.r/this.l;
		}
	}
	
	
	/*if(Math.sqrt((this.y-20)*(this.y-20)+(this.x-300)*(this.x-180))>=this.r+10) {
		return true;
	}*/
	if(this.y > cav.cH || this.x > cav.cW || this.y < 0 || this.x < 0) {
		return true;
	}else{
		
		cxt.save();
		cxt.beginPath();
		cxt.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		cxt.closePath();
        cxt.fill();
        cxt.restore();
	}

	if (mapObj.get(parseInt((this.y)/cav.gap),parseInt((this.x)/cav.gap)) === 0) {
		//cxt.clearRect(this.x-this.r,this.y-this.r,2*this.r,2*this.r);
		redraw();
		return true;
	}

	if (self === "guard") {
		if(Math.sqrt(Math.pow(gmObj.get().curX+10-this.x,2)+Math.pow(gmObj.get().curY+10-this.y,2)) < 15){
			//cxt.clearRect(xg-51,yg-51,102,102);
			//guardObj.clear(xg,yg);
			gmObj.setLv(false);
			//redraw();
			this.end = true;
		}
	}else if (self === "gmObj") {
		if(Math.sqrt(Math.pow(xg-this.x,2)+Math.pow(yg-this.y,2)) < 15){
			//cxt.clearRect(xg-51,yg-51,102,102);
			guardObj.clear(xg,yg);
			redraw();
			return true;
		}
	}
};
Bullet.prototype.clear = function() {
	// body...
	this.x = 0;
	this.y = 0;
	this.sp = 0;
	this.alive = false; 
};

function Pool(maxsize){
	//对象池
	var size = maxsize;
	var pool = [];
	var poolEnd = [];

	this.init = function(obj){
		for (var i = 0; i < size; i++) {
			var bullet = new Bullet(obj);
			//bullet.init(0,0);
			pool[i] = bullet;
		}
	};
	this.get = function(x,y,sp,x1,y1,obj){
		if (!pool[size-1].alive) {
			pool[size-1].set(x,y,sp,x1,y1,obj);
			pool.unshift(pool.pop());
		}
	};
	this.animate = function(){
		for (var i = 0; i < size; i++) {
			if (pool[i].alive) {
				if (pool[i].draw(cav)) {
					pool[i].clear();
					pool.push((pool.splice(i,1))[0]);
					i--;
				}
			}else{
				break;
			}
		};
	};
	this.clear = function(){
		for (var i = 0; i < size; i++) {
			pool[i].clear();
		}
	};

}



