(function(canvas){

	var view	=	(function(canvas){
		var width	=	24;
		var context	=	canvas.getContext("2d");

		function setTileWidth(_width){
			width 	=	_width;
		}

		function drawTile(x, y, tile){
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
		view.drawTerrain();
		
		return {

		};
	})(view);

	var controller	=	(function(model){

		return {

		};
	})(model);

})(
	document.querySelector("canvas#game-window")
);