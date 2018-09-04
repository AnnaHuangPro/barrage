/*function init(){
	var screenHeight = window.innerHeight,
		send = document.querySelector("#footer").innerHeight;
	console.log(screenHeight);
	console.log(send);
	console.log(window.innerHeight);
}
init();*/

var PopText = function(){
	this.value = "";
	this.color = "";
	this.topPx = "";
	this.leftPx = "";
};

function queryEle(selector){ 
	var method = selector.substr(0,1) == "#" ? "getElementById":"getElementsByClassName";
	return document[method](selector.substr(1));
}

/*初始化弹幕发送弹幕*/
function sendPop(){
	var popText = new PopText();
	popText.value = queryEle("#text").value;
	initPop(popText);
	queryEle("#text").value ="";
}

/*为输入框添加键盘事件*/
queryEle("#text").onkeydown = function(e){
	var keyNum = window.event ? e.keyCode :e.which;
	if(keyNum == 13){
		sendPop();
	}
};

queryEle("#popText").addEventListener("hover",function(){

})

/*为button添加click事件监听*/
queryEle("#spanButton").addEventListener("click",sendPop);

/*初始化弹幕属性，并让其出现在屏幕上*/
function initPop(pop){
	pop.leftPx = queryEle("#container").clientWidth + "px";
	pop.topPx = randomTop();
	pop.color = randomColor();
	creatPop(pop);
}

/*生成弹幕*/
function creatPop(pop){
	var popText = document.createElement("span");
	var container = queryEle("#container");
	var speed = 2;/*每次减少1px，移动速率*/
	popText.style.color = pop.color;
	popText.textContent = pop.value;
	popText.style.top = pop.topPx;
	popText.style.left = pop.leftPx;
	popText.className = "popText";
	popText.id = "popText";
	container.appendChild(popText);
	movePop(popText,queryEle("#container").clientWidth,speed);
}


function movePop(popText,left,speed){
	// var speed = 1;/*每次减少1px，移动速率*/
	left = left - speed;
	popText.style.left = left +"px";
	if(left >= -1000){
		requestAnimationFrame(function(){
			movePop(popText,left,speed);
		});/*参数是function，运用的是浏览器自带的渲染速率，完全可以替代setInteval*/
	}else{
		queryEle("#container").removeChild(popText);
	}
}

/*取得随机top值*/
function randomTop(){
	var t1 = queryEle("#container");
	return Math.round((Math.random())*(t1.clientHeight-30)) + "px";
}

/*取得随机颜色*/
function randomColor(){
	// low的写法
	/*var str = "#";
	for(var i = 0; i < 6; i++){
		str += Math.round(Math.random() * 16).toString(16);
	}
	return str;*/

	// 一行代码解决随机颜色
	return "#" + Math.random().toString(16).slice(-6);
}

function init(){
	for(let i = 0 ; i < 5; i++){
		setTimeout(function (){
			var pop = new PopText();
			pop.value = "这是一个漂亮的弹幕";
			pop.color = randomColor();
			pop.topPx = randomTop();
			creatPop(pop);
		},i*2000)
	}
}
init();