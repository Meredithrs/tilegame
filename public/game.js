(function(canvas){

	var view	=	(function(canvas){
		var width	=	24;
		var context	=	canvas.getContext("2d");

		function setTileWidth(_width){
			width 	=	_width;
		}

		function drawTile(x, y, tile){
			console.log(tile);
			context.fillStyle	=	tile.color;
			context.fillRect(x * width, y * width, width, width);
			context.fill();
		}

		function drawTerrain(map){
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

		return {
			'setTileWidth': setTileWidth,
			'drawTerrain': drawTerrain
		};
	})(canvas);

	var model	=	(function(view){
		view.setTileWidth(36);
		
		var tileColors	=	[, "#5e984c", "#90c8c9", "#b9b18e", "#b9b7b2", "#fff0a9", "#78a7a8"];

		function setMapData(_mapData){
			mapData 	=	_mapData;
			view.drawTerrain(mapData);
		}

		function mapToViewPort(_mapData, x, y, width, height){
			var result	=	[];
			for(var i = y - Math.floor(height/2); i < y + Math.ceil(height/2); i++){
				var result_layer	=	[];
				for(var j = x - Math.floor(width/2); j < x + Math.ceil(width/2); j++){
					result_layer.push({'color': tileColors[_mapData[i][j]]});
				}
				result.push(result_layer);
			}
			return result;
		}

		return {
			'setMapData': setMapData,
			'mapToViewPort': mapToViewPort
		};
	})(view);

	var controller	=	(function(model){
		function loadMap(x, y){
			$.getJSON("/api/maps/" + x + "/" + y, function(data){
				model.setMapData(model.mapToViewPort(data, x, y, 17, 13));

			});
		}

		return {
			'loadMap': loadMap
		};
	})(model);

	controller.loadMap(50, 66);
})(
	document.querySelector("canvas#game-window")
);