module.exports	=	(function(){
	function getJSON(x, y, viewport_radius){
		var maps	=	[];
		if(x > viewport_radius && y > viewport_radius && x + viewport_radius < 100 && y + viewport_radius < 100){
			maps.push(require("./../maps/"+ normalize(x) + "," + normalize(y) + ".js"));
		}
		return JSON.stringify(maps);
	}

	function normalize(coord){
		return Math.floor(coord/100);
	}

	return {
		'getJSON': getJSON
	}
})();