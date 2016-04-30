window.onload = function(){
	var cav = document.getElementById("canvas");
	var btns = document.getElementById('btns');
	var goB = document.getElementById('go');
	cav.width = 540;
	cav.height = 540;
	var cavW = cav.width;
	var cavH = cav.height;
	var cxt = cav.getContext("2d");
	cxt.strokeStyle = "#666";

	var line = (function(cav, gap){
		//绘制棋盘格子

		var w = cav.width;
		var h = cav.height;
		//cxt.linewidth
		for (var i = 0; i <= w; i+=gap) {
			cxt.moveTo(i, 0);
			cxt.lineTo(i, h);
		
			cxt.moveTo(0, i);
			cxt.lineTo(w, i);
			
		}
		cxt.stroke();
	})(cav, 30);

	var gameObj = (function(cxt){
		cxt.fillStyle = "red";
		cxt.fillRect(0,0,30, 30);
		cxt.fillStyle = "blue";
		cxt.fillRect(0,20,30,10);
		var flag = 3;
		var x = 0;
		var y = 0;
		return {
			set:function(i,j){
				cxt.clearRect(x,y,30,30);
				cxt.moveTo(0, 0);
				cxt.lineTo(0, 30);
				cxt.lineTo(30, 30);
				cxt.lineTo(30, 0);
				cxt.closePath();
				cxt.stroke();
				x = i*30;
				y = j*30;
				cxt.fillStyle = "red";
				cxt.fillRect(x,y,30,30);
				cxt.fillStyle = "blue";
				cxt.fillRect(x,y+20,30,10);
			},
			change:function(i,j,or){
				var x1 = x + i*30;
				var y1 = y + j*30;
				
				
				if(x1 >= 0 && x1 < cavW && y1 >= 0 && y1 < cavH){
					cxt.clearRect(x,y,30,30);
					cxt.moveTo(x, y);
					cxt.lineTo(x, y+30);
					cxt.lineTo(x+30, y+30);
					cxt.lineTo(x+30, y);
					cxt.closePath();
					cxt.stroke();

					x += i*30;
					y += j*30;

					console.log(x);
					cxt.fillStyle = "red";
					cxt.fillRect(x,y,30,30);
					cxt.fillStyle = "blue";
					//cxt.fillRect(x,y+20,30,10);
					if (or === 1) {
						cxt.fillRect(x,y,30,10);
					}
					if (or === 2) {
						cxt.fillRect(x+20,y,10,30);
					}
					if (or === 3) {
						cxt.fillRect(x,y+20,30,10);
					}
					if (or === 4) {
						cxt.fillRect(x,y,10,30);
					}
				}
				
			},
			turn:function(or){
				cxt.clearRect(x,y,30,30);
				cxt.moveTo(0, 0);
				cxt.lineTo(0, 30);
				cxt.lineTo(30, 30);
				cxt.lineTo(30, 0);
				cxt.closePath();
				cxt.stroke();
				
				cxt.fillStyle = "red";
				cxt.fillRect(x,y,30,30);
				cxt.fillStyle = "blue";
				if (or === 1) {
					cxt.fillRect(x,y,30,10);
				}
				if (or === 2) {
					cxt.fillRect(x+20,y,10,30);
				}
				if (or === 3) {
					cxt.fillRect(x,y+20,30,10);
				}
				if (or === 4) {
					cxt.fillRect(x,y,10,30);
				}
				
			},
			get:function(){
				return{
					x:x,
					y:y
				}
			},
			flag:flag
		}
		function initRect(){

		}
	})(cxt);
	btns.addEventListener("click", function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if (target.nodeName === "BUTTON") {
			var id = target.id;
			if (id === "go") {
				if (gameObj.flag === 3) {
					gameObj.change(0,1,3);
					return;
				}
				if (gameObj.flag === 1) {
					gameObj.change(0,-1,1);
					return;
				}
				if (gameObj.flag === 2) {
					gameObj.change(1,0,2);
					return;
				}
				if (gameObj.flag === 4) {
					gameObj.change(-1,0,4);
					return;
				}

			}
			if (id === "left") {
				if (gameObj.flag === 3) {
					gameObj.turn(2);
					gameObj.flag = 2;
					console.log(gameObj.flag);
					return;
				}
				if (gameObj.flag === 2) {
					gameObj.turn(1);
					gameObj.flag = 1;
					console.log(gameObj.flag);
					return;
				}
				if (gameObj.flag === 1) {
					gameObj.turn(4);
					gameObj.flag = 4;
					return;
				}
				if (gameObj.flag === 4) {
					gameObj.turn(3);
					gameObj.flag = 3;
					return;
				}
			}
			if (id === "right") {
				if (gameObj.flag === 3) {
					gameObj.turn(4);
					gameObj.flag = 4;
					return;
				}
				if (gameObj.flag === 4) {
					gameObj.turn(1);
					gameObj.flag = 1;
					return;
				}
				if (gameObj.flag === 1) {
					gameObj.turn(2);
					gameObj.flag = 2;
					return;
				}
				if (gameObj.flag === 2) {
					gameObj.turn(3);
					gameObj.flag = 3;
					return;
				}
			}
			if (id === "back") {
				if (gameObj.flag === 3) {
					gameObj.turn(1);
					gameObj.flag = 1;
					return;
				}
				if (gameObj.flag === 4) {
					gameObj.turn(2);
					gameObj.flag = 2;
					return;
				}
				if (gameObj.flag === 1) {
					gameObj.turn(3);
					gameObj.flag = 3;
					return;
				}
				if (gameObj.flag === 2) {
					gameObj.turn(4);
					gameObj.flag = 4;
					return;
				}
			}
		}
	});
	
};