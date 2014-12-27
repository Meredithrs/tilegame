module.exports	=	(function(){
	function getJSON(x, y){
		var maps	=	[];

		try{
			var map 	=	require("./../maps/"+ normalize(x) + "," + 1*normalize(y) + ".js");
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
		}catch(exception){
			return [];
		}
	}

	function normalize(coord){
		return Math.floor(coord/64);
	}

	return {
		'getJSON': getJSON
	}
})();