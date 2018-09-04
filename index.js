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


document.querySelector("#spanButton").addEventListener("click",function(){
	var popText = new PopText();
	popText.value = document.querySelector("#text").value;
	initPop(popText);
});

/*初始化弹幕属性，并让其出现在屏幕上*/
function initPop(pop){
	pop.leftPx = document.querySelector("#container").clientWidth + "px";
	pop.topPx = randomTop();
	pop.color = randomColor();
	creatPop(pop);
}

/*生成弹幕*/
function creatPop(pop){
	var popText = document.createElement("span");
	var container = document.querySelector("#container");
	popText.style.color = pop.color;
	popText.style.position = "absolute";
	popText.textContent = pop.value;
	popText.style.top = pop.topPx;
	popText.style.fontSize = "22px";
	popText.style.left = pop.leftPx;
	container.appendChild(popText);
	movePop(popText,document.querySelector("#container").clientWidth);
}


function movePop(popText,left){
	var speed = 1;/*每次减少1px，移动速率*/
	left = left - speed;
	popText.style.left = left +"px";
	if(left >= -20){
		requestAnimationFrame(function(){
			movePop(popText,left);
		});/*参数是function，运用的是浏览器自带的渲染速率，完全可以替代setInteval*/
	}else{
		document.querySelector("#container").removeChild(popText);
	}
}

/*取得随机top值*/
function randomTop(){
	var t1 = document.querySelector("#container");
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