module.exports	=	(function(){
	function getJSON(x, y, viewport_radius){
		var maps	=	[];

		var map 	=	require("./../maps/"+ normalize(x) + "," + normalize(y) + ".js");
		maps.push(map);

		var output	=	[];
		maps.forEach(
			function(element, index, array){
				var map 		=	element.layers[0].data;
				var map_data	=	[], map_data_layer;

				for(var i = 0; i < 100; i++){
					map_data_layer	=	[];
					for(var j = 0; j < 100; j++){
						map_data_layer.push(map[i*100 + j]);
					}
					map_data.push(map_data_layer);
					map_data 	=	[];
				}

				output	=	map_data;
			}
		);
		return JSON.stringify(output);
	}

	function normalize(coord){
		return Math.floor(coord/100);
	}

	return {
		'getJSON': getJSON
	}
})();