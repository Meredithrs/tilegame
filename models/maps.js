module.exports	=	(function(){
	function getJSON(x, y, viewport_radius){
		var maps	=	[];
		x	=	parseInt(x, 10);
		y	=	parseInt(y, 10);
		viewport_radius	=	parseInt(viewport_radius, 10);
		if(x > viewport_radius && y > viewport_radius && x + viewport_radius < 100 && y + viewport_radius < 100){
			var map 	=	require("./../maps/"+ normalize(x) + "," + normalize(y) + ".js");
			maps.push(map);
			maps.push({"foo": "foo"});
		}
		maps.push({"foo": "foo"});
		return JSON.stringify(maps);
	}

	function normalize(coord){
		return Math.floor(coord/100);
	}

	return {
		'getJSON': getJSON
	}
})();