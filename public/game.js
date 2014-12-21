(function(canvas){

	var view	=	(function(canvas){
		var width	=	24;
		var context	=	canvas.getContext("2d");

		function setTileWidth(_width){
			width 	=	_width;
		}

		function drawTile(x, y, tile){
			context.fillStyle	=	tile.color || "black";
			context.fillRect(x * width, y * width, width, width);
			context.fill();
		}

		function drawTerrain(map){
			if(!map){
				return false;
			}
			map.forEach(
				function(outer_element, outer_index, outer_array){
					outer_element.forEach(
						function(inner_element, inner_index, inner_array){
							drawTile(inner_index, outer_index, inner_element);
						}
					);
				}
			);
		}

		function drawPlayer(){
			drawTile(13, 10, {color: "white"});
		}


		function relMouseCoords(event){
		    var totalOffsetX = 0;
		    var totalOffsetY = 0;
		    var canvasX = 0;
		    var canvasY = 0;
		    var currentElement = this;

		    do{
		        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
		        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
		    }
		    while(currentElement = currentElement.offsetParent)

		    canvasX = event.pageX - totalOffsetX;
		    canvasY = event.pageY - totalOffsetY;

		    return {x:canvasX, y:canvasY};
		}

		HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

		return {
			'setTileWidth': setTileWidth,
			'drawTerrain': drawTerrain,
			'drawPlayer': drawPlayer
		};
	})(canvas);

	var model	=	(function(view){
		view.setTileWidth(24);
		
		var tileColors	=	[, "#5e984c", "#90c8c9", "#b9b18e", "#b9b7b2", "#fff0a9", "#78a7a8"];
		var mapData;

		function setMapData(_mapData){
			mapData 	=	_mapData;
		}

		function mapToViewport(x, y, width, height){
			var result	=	[];

			x 	=	Math.floor(x);
			y 	=	Math.floor(y);

			for(var i = y - Math.floor(height/2); i < y + Math.ceil(height/2); i++){
				var result_layer	=	[];
				for(var j = x - Math.floor(width/2); j < x + Math.ceil(width/2); j++){
					if(i > 0 && i < 100){
						result_layer.push({'color': tileColors[mapData[i][j]]});
					}else{
						result_layer.push({});
					}
				}
				result.push(result_layer);
			}

			return result;
		}

		var player 	=	(function(){
			var x, y;

			function getX(_x){
				if(!_x){
					return x;
				}else{
					x 	=	_x;
				}
			}

			function getY(_y){
				if(!_y){
					return y;
				}else{
					y 	=	_y;
				}
			}

			return {
				'x': getX,
				'y': getY
			}
		})();

		function update(){
			if(mapData){
				view.drawTerrain(mapToViewport(player.x(), player.y(), 26, 20));
				view.drawPlayer();
			}
			window.requestAnimationFrame(update);
		}

		window.requestAnimationFrame(update);

		return {
			'setMapData': setMapData,
			'mapToViewport': mapToViewport,
			'player': player
		};
	})(view);

	var controller	=	(function(model, canvas){
		function loadMap(x, y){
			$.getJSON("/api/maps/" + x + "/" + y, function(data){
				model.setMapData(data);
			});
		}

		var movex, movey;

		canvas.addEventListener("click", function(event){
			var coords 	=	canvas.relMouseCoords(event);

			clearInterval(movex);
			clearInterval(movey);

			var destination	=	{};
			destination.x 	=	model.player.x() + Math.floor(coords.x/24) - 13;
			destination.y 	=	model.player.y() + Math.floor(coords.y/24) - 10;

			var delta		=	{};
			delta.x 		=	Math.floor(coords.x/24) - 13;
			delta.y 		=	Math.floor(coords.y/24) - 10;

			var distance	=	Math.sqrt(delta.x * delta.x + delta.y * delta.y);
			console.log(distance, destination, delta);

			movex 	=	setInterval(function() {
				model.player.x(model.player.x() + delta.x/distance);

				if(model.player.x() === destination.x){
					clearInterval(movex);
				}
			}, 300);

			movey 	=	setInterval(function() {
				model.player.y(model.player.y() + delta.y/distance);

				if(model.player.y() === destination.y){
					clearInterval(movey);
				}
			}, 300);
		})

		return {
			'loadMap': loadMap,
			'player': model.player
		};
	})(model, canvas);

	controller.player.x(50);
	controller.player.y(66);
	controller.loadMap(controller.player.x(), controller.player.y());
})(
	document.querySelector("canvas#game-window")
);