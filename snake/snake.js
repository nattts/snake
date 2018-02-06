var game = (function (){

	var ticker;

	var key = {
		LEFT :37,
		RIGHT:39,
		UP:38,
		DOWN:40
	};

	var canvas = document.getElementById("canvas");
	
	var settings = {
		canvas: canvas,
		ctx: canvas.getContext('2d'),
		width: 20,
		height:20,
		dirX :1,
		dirY :0,
		
		getRandomInt : function (min, max) {
  			return Math.floor(Math.random() * (max - min)) + min;
		}
		
	};
	
	var food = {
		
		rndX : settings.getRandomInt(1,settings.width),
		rndY : settings.getRandomInt(1,settings.height),
		
		colour: "#006400",
		
		dropApple: function(x,y){
			settings.ctx.fillStyle = food.colour;
			settings.ctx.fillRect(x*settings.width,y*settings.height,settings.width,settings.height);
		}
	};
	
	var snake = {
		bodyCollisionDetect: function(arr){
			var head = arr[arr.length-1];
			var body = arr.slice(0,arr.length-1);
			for (var i=0;i<body.length;i++){
				if (head.x === body[i].x && head.y === body[i].y){
				alert("gameover");
				}
			}
		},

		dir: function(x,y){
			settings.dirX = x;
			settings.dirY = y;
		},
		
		run:function(){
			body = [];	
			for (var i=0;i<3;i++){
				body.push({
					x:i,
					y:10
				});
			}
			
			
			function moving(){
				settings.ctx.clearRect(0,0,canvas.width, canvas.height);
				var head = {};
				var tail = {};
				body.shift();
				head.x = body[body.length-1].x + settings.dirX;
				head.y = body[body.length-1].y + settings.dirY;
			
				body.push(head);

				for (var j=0;j< body.length;j++){
					settings.ctx.strokeRect(body[j].x*settings.width,body[j].y*settings.height, settings.width, settings.height);
			
					if (body[j].x === food.rndX && body[j].y === food.rndY){
						food.rndX = settings.getRandomInt(1,settings.width);
						food.rndY = settings.getRandomInt(1,settings.height);
					} else {
						food.dropApple(food.rndX,food.rndY);
						if (head.x === food.rndX && head.y === food.rndY){
							tail.x = body[0].x -1;
							tail.y = body[0].y;
							body.unshift(tail);
							food.rndX = settings.getRandomInt(1,settings.width);
							food.rndY = settings.getRandomInt(1,settings.height);
						}
					}
				}
			
				snake.bodyCollisionDetect(body);

				if ((head.x === settings.height || head.x === settings.width || head.x < 0) ||
                    (head.y === settings.width || head.y === settings.height || head.y < 0)) {
                    clearInterval(ticker);
					alert("gameover");
				}
			}
			ticker = setInterval(moving,300);
		}
	};


	var init = function(){
		
		var btn = document.querySelector(".button");

		document.addEventListener('keypress', function(e){
            if (e.keyCode === key.DOWN){
                snake.dir(0,1);
            } else if (e.keyCode === key.RIGHT){
                snake.dir(1,0);
            } else if (e.keyCode === key.UP){
                snake.dir(0,-1);
            } else if (e.keyCode === key.LEFT){
                snake.dir(-1,0);
            }
        });

		btn.addEventListener("click",function(){
			snake.run();
		});
	};

	return {
		load: init
	};

}());

window.onload = function(){
	game.load();
};