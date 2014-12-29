module.exports	=	(function(){
	var map;
	function setCoordinates(x, y){
		try{
			map 	=	require("./../maps/"+ normalize(x) + "," + 1*normalize(y) + ".js");
		}catch(exception){
			map 	=	undefined;
		}
	}

	function getTerrain(){
		var maps	=	[];

		if(map){
			maps.push(map);

			var output	=	[];
			maps.forEach(
				function(element, index, array){
					var map 		=	element.layers[0].data;
					var map_data	=	[], map_data_layer;

					for(var i = 0; i < 64; i++){
						map_data_layer	=	[];
						for(var j = 0; j < 64; j++){
							map_data_layer.push(map[i*64 + j]);
						}
						map_data.push(map_data_layer);
						map_data_layer 	=	[];
					}

					output	=	map_data;
				}
			);
			return output;
		}else{
			return [];
		}
	}

	function getObjects(){
		if(!map.tilesets || !map.tilesets[1]){
			return [];
		}
		var gidOffset 	=	map.tilesets[1].firstgid;
		if(map.layers[1] && map.layers[1].objects){
			var objects		=	map.layers[1].objects;
			var result 		=	{};

			for(var i = 0; i < objects.length; i++){
				var y 	=	objects[i].y/25 - 1;
				var x 	=	objects[i].x/25;
				var gid	=	objects[i].gid - gidOffset;

				if(!result[y]){
					result[y] 	=	{};
				}
				result[y][x] 	=	gid;
			}

			return result;
		}else{
			return [];
		}
	}

	function normalize(coord){
		return Math.floor(coord/64);
	}

	return {
		'getTerrain': getTerrain,
		'getObjects': getObjects,
		'setCoordinates': setCoordinates
	}
})();