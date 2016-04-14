window.onload = function(){


	//首页，事件委托，监听点击事件是单机、双人（同机）、多人在线
	var modulesBt = document.getElementById("modules");
	var game_container = document.getElementById("game_container");
	var home_page = document.getElementById("home");
	var can_sgl = document.getElementById("canvas_single");
	modulesBt.addEventListener('click', function(e){
		var self = this;
		var e = e || window.event;
		var tarElm =e.target || e.srcElement;
		if(tarElm && tarElm.nodeName == "BUTTON"){
			var idx = getNodeIdx(self, tarElm);
			//var can_node = getIdxbyNode(game_container,idx);

			home_page.style.display="none";
			game_container.style.display="block";
			can_sgl.style.display="block";
			initCan(idx);
		}
	});

	
	function initCan(idx_i){

	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	//var can_sgl = document.getElementById("canvas_single");
	can_sgl.width = width;
	can_sgl.height = height;
	var canW = can_sgl.width;
	var canH = can_sgl.height;

	var cxt_sgl = can_sgl.getContext("2d");

	
	//界面虚线绘制
	cxt_sgl.dashLine([canW/4, canH/2], [canW*3/4, canH/2], 10, 5);
	cxt_sgl.lineWidth=5;
	cxt_sgl.strokeStyle = "rgba(255,255,255,0.3)";
	cxt_sgl.stroke();
	


	/*cxt_sgl.fillStyle="#FF0000";
	cxt_sgl.fillRect(canW*3/5,canH*4/5,150,75);*/

	//var dealtxt="DEAL(发牌)";
    var dealtxtX = canW*3/5, dealtxtY = canH*7/8;
    var dealtxtW;
   // cxt_sgl.fillText(dealtxt, canW*3/5,canW*3/5);
	dealText();
	/*cxt_sgl.fillStyle = "#fff";
    cxt_sgl.font = "30px Microsoft YaHei";
    cxt_sgl.textAlign = 'start';
    cxt_sgl.textBaseline = 'top';*/
    
	//控制文字绘制
	/*cxt_sgl.fillStyle = "#fff";
    cxt_sgl.font = "30px Microsoft YaHei";
    cxt_sgl.textAlign = 'start';
    cxt_sgl.textBaseline = 'top';
    var hitxt="HIT(要)";
    var hitlength=cxt_sgl.measureText(hitxt);
    cxt_sgl.fillText(hitxt, canW*3/5, canH*7/8);
    var standtxt="STAND(停)";
    var standlength=cxt_sgl.measureText(standtxt);
    cxt_sgl.fillText(standtxt, canW*3/5 + hitlength.width + 30, canH*7/8);*/
    var hitxtX = canW*3/5, hitxtY = canH*7/8;
    var hitxtW;
    var standtxtX , standtxtY = canH*7/8;
    var standtxtW;

    //投注圆圈区域绘制
    var betX = canW/8;
    var betY = canH/2;
    var betR = canW/16;
    betArc();
    function betArc(){
    	cxt_sgl.lineWidth=5;
    	cxt_sgl.strokeStyle = "rgba(255,255,255,0.6)";
    	cxt_sgl.beginPath();
		cxt_sgl.arc(betX, betY, betR, 0, Math.PI*2,true);
		cxt_sgl.closePath();
		cxt_sgl.stroke();
    }
	

	//筹码绘制
	var chipW = 200, chipH = 200;
	
	var img=new Image();
	img.src="./img/imgpk.png";
	var chip1X = betX + 15 - betR, chip1Y = canH/2 + betR + 10;
	var chip2X = betX + 15, chip2Y = chip1Y;
	var chip3X = chip1X, chip3Y = canH/2 + betR + 20 + canW/32;
	var chip4X = chip2X, chip4Y = chip3Y;
	var chipDrW = canW/32, chipDrH = canW/32;
	img.onload = function(){
		cxt_sgl.drawImage(img, 1247,   5, chipW, chipH, chip1X, chip1Y, chipDrW, chipDrH);//1
		cxt_sgl.drawImage(img, 1247, 215, chipW, chipH, chip2X, chip2Y, chipDrW, chipDrH);//10
		cxt_sgl.drawImage(img, 1247, 425, chipW, chipH, chip3X, chip3Y, chipDrW, chipDrH);//50
		cxt_sgl.drawImage(img, 1247, 635, chipW, chipH, chip4X, chip4Y, chipDrW, chipDrH);//100
		
	}
	//清除下注按钮
	var clearX = chip2X + chipDrW + chipDrW/2 -5, clearY = chip1Y + chipDrW/2 -5;
	var clearW = chipDrW+10, clearH =  chipDrW+10;
	cxt_sgl.lineWidth=3;
	cxt_sgl.strokeStyle = "rgba(255,255,255,0.8)";
    cxt_sgl.strokeRect(chip2X + chipDrW + chipDrW/2 -5, chip1Y + chipDrW/2 -5, chipDrW+10, chipDrW+10);
	cxt_sgl.fillStyle = "#fff";
    cxt_sgl.font = "1.2em Microsoft YaHei";
    cxt_sgl.textAlign = 'start';
    cxt_sgl.textBaseline = 'top';
    var cleartxt1="清除";
    var cleartxt2="赌注";
    //var clearW=cxt_sgl.measureText(cleartxt).width;
    cxt_sgl.fillText(cleartxt1, chip2X + chipDrW + chipDrW/2, chip1Y + chipDrW/2, chipDrW);
    cxt_sgl.textBaseline = 'bottom';
    cxt_sgl.fillText(cleartxt2, chip2X + chipDrW + chipDrW/2, chip1Y + 3*chipDrW/2, chipDrW);

    //首页
    var indexTxt = "首页";
    var indexW=cxt_sgl.measureText(indexTxt).width;
    cxt_sgl.lineWidth=2;
    cxt_sgl.strokeStyle = "rgba(255,255,255,0.8)";
    cxt_sgl.strokeRect(canW-indexW-35, -2, indexW+10, indexW);
    cxt_sgl.fillText(indexTxt, canW-indexW-30, 30 , indexW);
	
	
	var gameM = {
		re : 200,
		bet : 0,
		time : 0
	}
	var chipCN = {
		C1 : 0,
		C2 : 0,
		C3 : 0,
		C4 : 0
	}
	var dealFlag = false;
	var hitBkClick = false;//标记庄家hit是否可点

	var hitNum = 0; 
	var standNum = 0;
	var hasANum = {
		bker : 0,
		pyer : 0
	};

	var pCount = {
		banker : 0,
		player : 0
	};
 	moneyText();
	can_sgl.addEventListener('click', function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		var cp = {//当前鼠标坐标位置
			x : e.clientX,
			y : e.clientY
		}
		console.log(handleEvent(cp, canW-indexW-30, 30, indexW, 30));
		if (handleEvent(cp, canW-indexW-35, 0, indexW + 10, indexW)) {
			//回首页
			location.reload();
			gameM = {
				re : 200,
				bet : 0,
				time : 0
			};
		 chipCN = {
			C1 : 0,
			C2 : 0,
			C3 : 0,
			C4 : 0
		}
		dealFlag = false;
		hitBkClick = false;//标记庄家hit是否可点

		hitNum = 0; 
		standNum = 0;
		hasANum = {
		bker : 0,
		pyer : 0
		};

		pCount = {
		banker : 0,
		player : 0
		};
			game_container.style.display="none";
				home_page.style.display="block";
		}

		if(!dealFlag && !hitBkClick){
		
			//添加筹码
			if(handleEvent(cp, chip1X, chip1Y, chipDrW, chipDrW)){
				var putChipX = betX - chipDrW, putChipY = canH/2 - chipDrW;
				if(gameM.bet +1 > gameM.re){alert("下注数超过总额");return;}
				cxt_sgl.drawImage(img, 1247,   5, chipW, chipH, putChipX -2*chipCN.C1, putChipY - 3*chipCN.C1, chipDrW, chipDrH);
				chipCN.C1++;
				//gameM.re--;
				gameM.bet++;
				moneyText();
			}
			if(handleEvent(cp, chip2X, chip2Y, chipDrW, chipDrH)){
				if(gameM.bet +10 > gameM.re){alert("下注数超过总额");return;}
				var putChipX = betX, putChipY = canH/2 - chipDrW;
				cxt_sgl.drawImage(img, 1247, 215, chipW, chipH, putChipX -2*chipCN.C2, putChipY - 2*chipCN.C2, chipDrW, chipDrH);
				chipCN.C2++;
				//gameM.re -=10;
				gameM.bet += 10;
				moneyText();
			}
			if(handleEvent(cp, chip3X, chip3Y, chipDrW, chipDrH)){
				if(gameM.bet +50 > gameM.re){alert("下注数超过总额");return;}
				var putChipX = betX - chipDrW, putChipY = canH/2;
				cxt_sgl.drawImage(img, 1247, 425, chipW, chipH, putChipX -2*chipCN.C3, putChipY - 2*chipCN.C3, chipDrW, chipDrH);
				chipCN.C3++;
				gameM.bet += 50;
				moneyText();
			}
			if(handleEvent(cp, chip4X, chip4Y, chipDrW, chipDrH)){
				if(gameM.bet + 100 > gameM.re){alert("下注数超过总额");return;}
				var putChipX = betX, putChipY = canH/2;
				cxt_sgl.drawImage(img, 1247, 635, chipW, chipH, putChipX -2*chipCN.C4, putChipY - 2*chipCN.C4, chipDrW, chipDrH);
				chipCN.C4++;
				gameM.bet += 100;
				moneyText();
			}
			//清除筹码
			if(handleEvent(cp, clearX, clearY, clearW, clearH) && gameM.bet > 0){
				cxt_sgl.clearRect(0, 0, canW/4, canH/2+betR);
				betArc();
				gameM.bet = 0;
				moneyText();
			}

			//点击发牌
			if(handleEvent(cp, dealtxtX, dealtxtY, dealtxtW.width, 30)){
				if(gameM.bet <= 0){
					alert("请先投注");
					return;
				}
				if(gameM.bet > gameM.re){alert("下注数超过总额");return;}
				gameM.re -= gameM.bet;
				moneyText();
				cxt_sgl.clearRect(dealtxtX, dealtxtY-10, dealtxtW.width, 60);
				controlText();
				
				dealFlag = true;
				dealPok();
				gameState(pCount.player, pCount.banker, 0);
			}

		}else if (dealFlag && !hitBkClick){
			if (handleEvent(cp, hitxtX, hitxtY, hitxtW, 30)) {
				//点击hit要牌
				if(pCount.player < 21){
					var pyerN = getRdmN(52);
					new pokerObject(pyerN, canW/2 + (++hitNum)*10, canH/2 + 20);
					pCount.player = getpCount(pCount.player, pyerN, 1);
					pCountText(1);
					if (pCount.player === 21){
						bkAction();
					}
					//console.log(pCount.player);
					gameState(pCount.player, pCount.banker, 1);
					//console.log(pCount.player);
					//gameState(pCount.player, "YOU")
				}
				if (pCount.player === 21){
					bkAction();
				}
				gameState(pCount.player, pCount.banker, 1);
			}
			if (handleEvent(cp, standtxtX,standtxtY,standtxtW, 30) && pCount.player < 21){
				//点击stand 听牌
				new pokerObject(bkerN0, canW/2-canH/6*128/191, canH/4);//bg
				pCountText(0);

				if (idx_i === 0) {
					while(pCount.banker < 17){
						var bkerN = getRdmN(52);
						new pokerObject(bkerN, canW/2 + (++standNum)*10, canH/4);
						pCount.banker = getpCount(pCount.banker, bkerN, 0);
						console.log(pCount.banker);
						pCountText(0);
						pCountText(1);
						if(!gameState(pCount.player, pCount.banker, 31)){
							return;
						}
					}
					gameState(pCount.player, pCount.banker, 32);

				}
				
				if(idx_i === 1){
					
					//如果是2人对战
					if (pCount.banker <= pCount.player && pCount.banker<=21){
						//
						controlTextBk();
						controlText(0.5, 0.5);
						dealFlag = false;
						hitBkClick = true;
					}
					if (pCount.banker > pCount.player && pCount.banker<=21){
						//canW*3/5 + hitxtW + 30
						controlTextBk(0.5, 0.5);
						hitBkClick = false;
						gameState(pCount.player, pCount.banker, 32);
					}
				}
				
			}			
		}
		function bkAction(){
			new pokerObject(bkerN0, canW/2-canH/6*128/191, canH/4);//bg
				pCountText(0);

				if (idx_i === 0) {
					while(pCount.banker < 17){
						var bkerN = getRdmN(52);
						new pokerObject(bkerN, canW/2 + (++standNum)*10, canH/4);
						pCount.banker = getpCount(pCount.banker, bkerN, 0);
						console.log(pCount.banker);
						pCountText(0);
						pCountText(1);
						if(!gameState(pCount.player, pCount.banker, 31)){
							return;
						}
					}
					gameState(pCount.player, pCount.banker, 32);

				}
				
				if(idx_i === 1){
					
					//如果是2人对战
					if (pCount.banker <= pCount.player && pCount.banker<=21){
						//
						controlTextBk();
						controlText(0.5, 0.5);
						dealFlag = false;
						hitBkClick = true;
					}
					if (pCount.banker > pCount.player && pCount.banker<=21){
						//canW*3/5 + hitxtW + 30
						controlTextBk(0.5, 0.5);
						hitBkClick = false;
						gameState(pCount.player, pCount.banker, 32);
					}
				}
		}
		if (hitBkClick) {
				if(handleEvent(cp, canW*3/5, canH*1/8, hitxtBkW, 30)){
					//庄家点击hit
					var bkerN = getRdmN(52);
					new pokerObject(bkerN, canW/2 + (++standNum)*10, canH/4);
					pCount.banker = getpCount(pCount.banker, bkerN, 0);
					console.log(pCount.banker);
					pCountText(0);
					pCountText(1);
					if(!gameState(pCount.player, pCount.banker, 31)){
						return;
					}
				}
				if(handleEvent(cp, canW*3/5 + hitxtW + 30, canH*1/8, standtxtBkW, 30)){
					//庄家点击stand
					
					pCountText(0);
					pCountText(1);
					if(!gameState(pCount.player, pCount.banker, 31)){
						return;
					}
						controlTextBk(0.5, 0.5);
						gameState(pCount.player, pCount.banker, 32);
					return;
				}
				return;
			}
			return;
	}, false);

	function gameState(pyNum, bkNum, flag){

		//bj
		if(flag === 0) {
			//flag 为0 代表对初始发完牌的情况判断
			if(pyNum === 21 && bkNum != 21){
				gameResultTxT("YOU has BJ");
				gameM.re += 2*gameM.bet;
				gameDataInit();
				return;
			}
			if(pyNum != 21 && bkNum === 21){
				gameResultTxT("DEALER has BJ");
				new pokerObject(bkerN0, canW/2-canH/6*128/191, canH/4);//bg
				pCountText(0);
				gameDataInit();
				return;
			}
			if(pyNum === 21 && bkNum === 21){
				//玩家庄家点数都为21，平局
					new pokerObject(bkerN0, canW/2-canH/6*128/191, canH/4);//bg
					gameResultTxT("PUSH（平）");
					pCountText(0);
					gameM.re += gameM.bet;
					gameDataInit();
					return;
				}
		}
		if(flag === 1) {
			//hit过程的判断
				if(pyNum > 21){
				//玩家点数大于21，玩家爆
				gameResultTxT("YOU BUST（玩家爆）");
				gameDataInit();
				return;
				}
				/*if(pyNum === 21 && bkNum != 21){
				//玩家点数等于21，庄家不为21，玩家赢
					new pokerObject(bkerN0, canW/2-canH/6*128/191, canH/4);//bg
					pCountText(0);
					gameResultTxT("YOU WIN（21点你赢啦）");
					
					gameM.re += 2*gameM.bet;
					gameDataInit();
					return;
				}*/
				if(pyNum === 21 && bkNum === 21){
				//玩家庄家点数都为21，平局
					new pokerObject(bkerN0, canW/2-canH/6*128/191, canH/4);//bg
					gameResultTxT("PUSH（平）");
					gameM.re += gameM.bet;
					gameDataInit();
					return;
				}
		}
		if(flag === 31){
				if(pCount.banker > 21){
					//庄家点数大于21，庄家爆
					gameResultTxT("DEALER BUST（庄家爆）");
					gameM.re += 2*gameM.bet;//玩家获得2倍赌注
					gameDataInit();
					return false;
				}
				return true;
			}
		if(flag === 32){
				if(pyNum > bkNum && pyNum <= 21){
					//
					gameResultTxT("YOU WIN");
					
					gameM.re += 2*gameM.bet;
					gameDataInit();
					return;
				}
				if(bkNum > pyNum && bkNum <= 21){
					//庄家赢
					gameResultTxT("DEALER WIN YOU lose");
					gameDataInit();
					return;
				}
				if(pyNum === bkNum ){
					////玩家庄家点数相同
					gameResultTxT("PUSH(平)");
					gameM.re += gameM.bet;
					gameDataInit();
					return;
				}
			}
	}
	function gameDataInit(){
		//游戏过程中相关记录数据初始化
		//玩家hit，stand清除
		cxt_sgl.clearRect(hitxtX, hitxtY-10, hitxtW + standtxtW + 30, 60);
		if (idx_i === 1) {
			cxt_sgl.clearRect(canW*3/5, canH*1/8 - 10, hitxtW + standtxtW + 30, 60);
		};

		//对显示点数位置清除
		/*cxt_sgl.clearRect(canW/4, canH/2 - 53, cxt_sgl.measureText("玩家点数：200").width, 31);
		cxt_sgl.clearRect(canW/4, canH/2 + 21, cxt_sgl.measureText("玩家点数：200").width, 33);*/
		/*cxt_sgl.clearRect(canW/2-canH/6*128/191 - 5, canH/4 - 5, 3*canH/6*128/191 , canH/6+10);
		cxt_sgl.clearRect(canW/2-canH/6*128/191 - 5, canH*3/4 - 5, 3*canH/6*128/191, canH/6+10);*/
		dealText();
		dealFlag = false;
		hitBkClick = false;
		pCount.player = 0;
		pCount.banker = 0;
		hasANum.bker = 0;
		hasANum.pyer = 0;
		hitNum = 0;
		standNum = 0;
		gameM.time++;
		moneyText();
	}
	function gameResultTxT(txt){
		//游戏结束时输赢状态绘制
		cxt_sgl.fillStyle = "red";
    	cxt_sgl.font = "1.8em  'Times New Roman', Times, serif 900";
    	cxt_sgl.textAlign = 'start';
    	cxt_sgl.textBaseline = 'middle';
    	var gRsX = canW*3/4 + 20, gRsY = canH/2;
	
		var gRstxt = txt;
   		var gRstxtW=cxt_sgl.measureText(gRstxt).width;
    	cxt_sgl.clearRect(canW*3/4 + 2, canH/2 - 30,canW/4, 60);
    	cxt_sgl.fillText(gRstxt, gRsX, gRsY, canW*1/4 - 40);
	   
	}

	function handleEvent(cp, x, y, w, h){
		/**判断鼠标坐标位置是否在对象区域内部
		 **cp鼠标坐标位置,cp.x代表x坐标，cp.y代表y坐标
		 **x,y分别代表所求对象区域的x,y坐标
		 **w,h分别代表所求对象区域的宽高
		 */
		if(cp.x >= x && cp.x <= x + w && cp.y >= y && cp.y <= y + h){
			return true;
		}
		return false;
	}

	function dealPok(){
		//执行发牌
		/*var pokerPst = [[5,5],[143,5],[281,5],[419,5],//0-3 4个A
						[557,5],[695,5],[833,5],[971,5],[1109,5],[5,206],[143,206],[281,206],[419,206],
						[557,206],[695,206],[833,206],[971,206],[1109,206],[5,407],[143,407],//4-19  16个10-K
						[281,407],[419,407],[557,407],[695,407],[833,407],[971,407],[1109,407],[5,608],//20-27 第一幅的2-9
						[143,608],[281,608],[419,608],[557,608],[695,608],[833,608],[971,608],[1109,608],//28-35 第二幅的2-9
						[5,809],[143,809],[281,809],[419,809],[557,809],[695,809],[833,809],[971,809],//36-43 第三幅的2-9
						[1109,809],[5,1010],[143,1010],[281,1010],[419,407],[557,1010],[695,1010],[833,1010]//44-51 第四幅的2-9
						];
		var pokW = 128, pokH = 191;
		var pokDrW = canH/6*pokW/pokH, pokDrH = canH/6;*/
		//	清除上局结果
		cxt_sgl.clearRect(canW*3/4 + 2, canH/2 - 30,canW/4, 60);
		//清除上局庄家点数
		cxt_sgl.clearRect(canW/4, canH/2 - 53, cxt_sgl.measureText("庄家点数：200").width, 40);

		//每次发牌前对发牌区域进行清除操作
		cxt_sgl.clearRect(canW/2-canH/6*128/191 - 5, canH/4 - 5, canW, canH/6+10);
		cxt_sgl.clearRect(canW/2-canH/6*128/191 - 5, canH/2 + 20 - 5, canW, canH/6+10);


		var pokNum = 52;

		var pyerN0 = getRdmN(pokNum);
		new pokerObject(pyerN0, canW/2-canH/6*128/191, canH/2 + 20);
		pCount.player = getpCount(pCount.player, pyerN0, 1);
		
		var pyerN1 = getRdmN(pokNum);
		new pokerObject(pyerN1, canW/2, canH/2 + 20);
		pCount.player = getpCount(pCount.player, pyerN1, 1);

		pCountText(1);

		 bkerN0 = getRdmN(pokNum);
		new pokerObject(-1, canW/2-canH/6*128/191, canH/4, 'bg');//bg
		pCount.banker = getpCount(pCount.banker, bkerN0, 0);

		var bkerN1 = getRdmN(pokNum);
		new pokerObject(bkerN1, canW/2, canH/4);
		pCount.banker = getpCount(pCount.banker, bkerN1, 0);
		console.log(pCount.banker);
		
		
	}
	function pokerObject(i, pokDrX, pokDrY, bg){
		//绘制一个扑克对象
		var pokW = 128, pokH = 191;
		var pokDrW = canH/6*pokW/pokH, pokDrH = canH/6;

		if(i === -1 && bg === 'bg'){
			cxt_sgl.drawImage(img, 971, 1010, pokW, pokH, pokDrX, pokDrY, pokDrW, pokDrH);//bg
			return;
		}else if(i !=-1 && bg===undefined){
			var pokerPst = [[5,5],[143,5],[281,5],[419,5],//0-3 4个A
						[557,5],[695,5],[833,5],[971,5],[1109,5],[5,206],[143,206],[281,206],[419,206],
						[557,206],[695,206],[833,206],[971,206],[1109,206],[5,407],[143,407],//4-19  16个10-K
						[281,407],[419,407],[557,407],[695,407],[833,407],[971,407],[1109,407],[5,608],//20-27 第一幅的2-9
						[143,608],[281,608],[419,608],[557,608],[695,608],[833,608],[971,608],[1109,608],//28-35 第二幅的2-9
						[5,809],[143,809],[281,809],[419,809],[557,809],[695,809],[833,809],[971,809],//36-43 第三幅的2-9
						[1109,809],[5,1010],[143,1010],[281,1010],[419,407],[557,1010],[695,1010],[833,1010]//44-51 第四幅的2-9
						];
			cxt_sgl.drawImage(img, pokerPst[i][0], pokerPst[i][1], pokW, pokH, pokDrX, pokDrY, pokDrW, pokDrH);
		}
	}

	function getpCount(pct, rdm, role){
		//获取当前扑克牌总值
			pct += getPkN(rdm, pct, role);
			if (role === 0) {
				//console.log(hasANum.bker);
				if (hasANum.bker >= 1 && pct > 21){
					pct -= hasANum.bker*10;
					hasANum.bker = 0;
				}
			}else if (role === 1) {
				//console.log(hasANum.pyer);
				if (hasANum.pyer >= 1 && pct > 21){
					pct -= hasANum.pyer*10;
					hasANum.pyer = 0;
				}
			}
			
			return pct;
		}
	
	function getPkN(rdmNum, curNum, role){
		//根据随机数判断扑克牌数组对应的扑克牌的值
		if (getNum(rdmNum, 20, 27) != false) {
			return getNum(rdmNum, 20, 27);
		} 
		if (getNum(rdmNum, 28, 35) != false) {
			return getNum(rdmNum, 28, 35);
		}
		if (getNum(rdmNum, 36, 43) != false) {
			return getNum(rdmNum, 36, 43);
		}
		if (getNum(rdmNum, 44, 51) != false) {
			return getNum(rdmNum, 44, 51);
		}
		if (rdmNum >= 4 && rdmNum <= 19) {
			return 10;
		}
		if (rdmNum >= 0 && rdmNum <= 3) {
		//对尖A的情况进行判断，根据当前点值数+11是否bust
			
			if (curNum + 11 > 21) {
				return 1;
			}
			if (role === 0) {
				hasANum.bker++;
				//console.log(hasANum.bker);
			} else if (role === 1) {
				hasANum.pyer++;
				//console.log(hasANum.pyer);
			}
			return 11;
		}
		return rdmNum;

		function getNum(rdmNum, min, max){
			if(rdmNum >= min && rdmNum <= max){
				return rdmNum - min + 2;
			}
			return false;
		}
	}

	function getRdmN(totalNum){
		if(totalNum > 0){
			var pokRdmN = parseInt(Math.random()*totalNum);
		return pokRdmN;
		}
		return 0;
	}

	function pCountText(role){
		//余额和投注钱数文本绘制
		cxt_sgl.fillStyle = "#fff";
	    cxt_sgl.font = "30px Microsoft YaHei";
	    cxt_sgl.textAlign = 'start';
	    cxt_sgl.textBaseline = 'top';
	    var bkCX = canW/4, bkCY = canH/2 - 50;
		var pyCX = canW/4, pyCY = canH/2 + 20;
		if (role === 0) {
			var bkCtxt="庄家点数：";
	   		var bkCtxtW=cxt_sgl.measureText(bkCtxt+"200").width;
	    	cxt_sgl.clearRect(bkCX, bkCY, bkCtxtW, 31);
	    	cxt_sgl.fillText(bkCtxt + pCount.banker, bkCX, bkCY);
		} else if(role === 1){
			var pyCtxt="玩家点数：";
	    	var pyCtxtW=cxt_sgl.measureText(pyCtxt+"200").width;
	    	cxt_sgl.clearRect(pyCX, pyCX, pyCtxtW, 32);
	    	cxt_sgl.fillText(pyCtxt + pCount.player, pyCX, pyCX);
		}    
	}

	function moneyText(){
		//余额和投注钱数文本绘制
		cxt_sgl.fillStyle = "#fff";
	    cxt_sgl.font = "1.2em Microsoft YaHei";
	    cxt_sgl.textAlign = 'start';
	    cxt_sgl.textBaseline = 'top';
	    
		var bettxtX = betX + 15 - betR, bettxtY = canH/2 + betR + 30 + canW/16;
	    var reMX = betX + 15 - betR, reMY = canH/2 + betR + 60 + canW/16;
		var gmTmX = reMX, gmTmY = canH/2 + betR + 90 + canW/16;

		var bettxt="下注：";
	    var bettxtW=cxt_sgl.measureText(bettxt+"2000").width;
	    cxt_sgl.clearRect(bettxtX, bettxtY-1, bettxtW, 30);
	    cxt_sgl.fillText(bettxt + gameM.bet, bettxtX, bettxtY);

	    var reMtxt="余额：";
	    var reMtxtW=cxt_sgl.measureText(reMtxt+"2000").width;
	    cxt_sgl.clearRect(reMX, reMY-1, reMtxtW, 30);
	    cxt_sgl.fillText(reMtxt + gameM.re, reMX, reMY);
	    var gmTmtxt="游戏次数：";
	    var gmTmtxtW=cxt_sgl.measureText(gmTmtxt+"2000").width;
	    cxt_sgl.clearRect(gmTmX, gmTmY-1, gmTmtxtW, 30);
	    cxt_sgl.fillText(gmTmtxt + gameM.time, gmTmX, gmTmY);
	}
	
	function dealText(){
		//发牌文字绘制
		cxt_sgl.fillStyle = "#fff";
	    cxt_sgl.font = "30px Microsoft YaHei";
	    cxt_sgl.textAlign = 'start';
	    cxt_sgl.textBaseline = 'top';
	    var dealtxt="DEAL(发牌)";
	    dealtxtW=cxt_sgl.measureText(dealtxt);
	    cxt_sgl.fillText(dealtxt, canW*3/5, canH*7/8);
	    cxt_sgl.fillText(dealtxtW, canW*3/5+dealtxtW, canH*7/8+dealtxtW);
	}

	function controlText(visb1, visb2){
		//控制文字绘制
		var vis1 = 1;
		if (visb1 != undefined) {
			vis1 = visb1;
		}
		var vis2 = 1;
		if (visb2 != undefined) {
			vis2 = visb2;
		}
		if(vis1 < 1 || vis2 < 1){
			cxt_sgl.clearRect(hitxtX, hitxtY-10, hitxtW + standtxtW + 30, 60);
		}
		cxt_sgl.fillStyle = "rgba(255,255,255,"+vis1+")";
	    cxt_sgl.font = "30px Microsoft YaHei";
	    cxt_sgl.textAlign = 'start';
	    cxt_sgl.textBaseline = 'top';
	    var hitxt="HIT(要)";
	    var hitlength=cxt_sgl.measureText(hitxt);
	    hitxtW = hitlength.width;
	    cxt_sgl.fillText(hitxt, canW*3/5, canH*7/8);

	    cxt_sgl.fillStyle = "rgba(255,255,255,"+vis2+")";
	    var standtxt="STAND(停)";
	    var standlength=cxt_sgl.measureText(standtxt);
	    standtxtW = standlength.width;
	    standtxtX = canW*3/5 + hitlength.width + 30;
	    cxt_sgl.fillText(standtxt, canW*3/5 + hitlength.width + 30, canH*7/8);
	}
	function controlTextBk(visb1, visb2){
		//控制文字绘制
		var vis1 = 1;
		if (visb1 != undefined) {
			vis1 = visb1;
		};
		var vis2 = 1;
		if (visb2 != undefined) {
			vis2 = visb2;
		};
		if(vis1 < 1 || vis2 < 1){
			cxt_sgl.clearRect(canW*3/5, canH*1/8 - 10, hitxtW + standtxtW + 30, 60);
		}
		cxt_sgl.fillStyle = "rgba(255,255,255,"+vis1+")";
	    cxt_sgl.font = "30px Microsoft YaHei";
	    cxt_sgl.textAlign = 'start';
	    cxt_sgl.textBaseline = 'top';
	    var hitxt="HIT(要)";
	    var hitlength=cxt_sgl.measureText(hitxt);
	    hitxtBkW = hitlength.width;
	    cxt_sgl.fillText(hitxt, canW*3/5, canH*1/8);

	    cxt_sgl.fillStyle = "rgba(255,255,255,"+vis2+")";
	    var standtxt="STAND(停)";
	    var standlength=cxt_sgl.measureText(standtxt);
	    standtxtBkW = standlength.width;
	    //standtxtX = canW*3/5 + hitlength.width + 30;
	    cxt_sgl.fillText(standtxt, canW*3/5 + hitlength.width + 30, canH*1/8);
	}

}
}
	

    CanvasRenderingContext2D.prototype.dashLine = function dashLine(start, end, seclen, gap){
    	/**简单实现绘制虚线
    	 * start 起点坐标
    	 * end 终点坐标
    	 * seclen 线段长度,空值时为1
    	 * gap 间隔长度,空值时为1
    	 */
    	var self = this;
    	if(start.length !=2 && end.length != 2){
    		return;
    	}
    	if(seclen === undefined){
    		seclen = 1;
    	}
    	if(gap === undefined){
    		gap = seclen;
    	}
    	var x1 = start[0];
    	var y1 = start[1];
    	var x2 = end[0];
    	var y2 = end[1];

    	var linelen = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
    	var xlen = Math.abs(x2-x1);
    	var ylen = Math.abs(y2-y1);
    	var xsec = xlen*seclen/linelen;
    	var ysec = ylen*seclen/linelen;
    	var xgap = xlen*gap/linelen;
    	var ygap = ylen*gap/linelen;
    	for (var i = x1; i + xsec <= x2; i+=(xsec+xgap))   {
    		self.moveTo(i, y1);
    		self.lineTo(i + xsec, y2);
    		if(i+2*xsec+xgap > x2){
    			self.moveTo(i+xsec+xgap, y1);
    			self.moveTo(x2, y1);
    			return;
    		}
    	};
}

function getNodeIdx(parNode, chilNode){
	//子节点是父节点的第几个子孩子
		var idx = 0;
		while(chilNode = chilNode.previousSibling){
			if(chilNode.nodeType == 1){
				idx++;
			}
		}
		return idx;
	}
	function getIdxbyNode(parNode, idx){
		//根据孩子编号获取对应的孩子节点
		var nodes = parNode.childNodes;
		var nLen = nodes.length;
		for(var i= 0; i< nLen -1; i++){
			if(nodes[i].nodeType == 1){
				if(idx === 0){
					return nodes[i];
				}
				idx--;
			}
		}
	}