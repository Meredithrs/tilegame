(function(canvas, mainInterface){

	var view	=	(function(canvas){
		var width	=	24;
		var context	=	canvas.getContext("2d");

		function setTileWidth(_width){
			width 	=	_width;
		}

		function drawTile(x, y, tile){
			if(tile && tile.color){
				context.fillStyle	=	tile.color();
			}else{
				context.fillStyle	=	"black";
			}
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
			drawTile(11, 7, {color: function(){
				return "white";
			}});
		}

		function Spellbook(){
			var spells 			=	[];
			var magicInterface 	=	mainInterface.querySelector("#magic");

			function addSpell(spell){
				spells.push(spell);
				var spellButton 			=	document.createElement("button");
				spellButton.setAttribute('title', spell.getName());
				spellButton.style.backgroundImage 	=	"url('images/spells/"+spell.getImage()+"')";
				spellButton.addEventListener("click", function(event){
					spell.cast();
				});
				magicInterface.appendChild(spellButton);
			}

			return {
				'addSpell': addSpell
			}
		}

		(function Tabs(){
			var tabElements 	=	mainInterface.querySelectorAll(".tab");
			for(var i = 0; i < tabElements.length; ++i){
				tabElements[i].addEventListener("click", function(){
					if(!this.classList.contains("active")){
						var tabs = this.parentNode.parentNode.querySelectorAll(".tab");
						var content = this.parentNode.parentNode.querySelectorAll(".tab-content");
						var j;

						for(var i = 0; i < tabs.length; ++i){
							tabs[i].classList.remove("active");
							content[i].classList.remove("shown");
							if(tabs[i] === this){
								j = i;
							}
						}

						this.classList.add("active");
						content[j].classList.add("shown")
					}
				})
			}
			tabElements[6].click();
		})();



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
			'drawPlayer': drawPlayer,
			'spellbook': Spellbook()
		};
	})(canvas, mainInterface);

	var model	=	(function(view){
		view.setTileWidth(24);
		
		var mapData 	=	[];

		function setMapData(_mapData, x, y){
			x 	=	Math.floor(x/64);
			y 	=	Math.floor(y/64);
			_mapData.forEach(
				function(outer_element, outer_index, outer_array){
					outer_element.forEach(
						function(inner_element, inner_index, inner_array){
							if(!mapData[64*y + outer_index]){
								mapData[64*y + outer_index]	=	[];
							}
							if(tiles[inner_element].color){
								mapData[64 * y + outer_index][64 * x + inner_index]	=	tiles[inner_element];
							}else{
								mapData[64 * y + outer_index][64 * x + inner_index]	=	new tiles[inner_element]();
							}							
						}
					);
				}
			);
		}

		var tiles 	=	(function Tiles(){
			function empty(){
				function color(){
					return "black";
				}

				function walkable(){
					return false;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function grass(){
				var colorValue	=	Math.floor(Math.random()*10+510)/10;

				function color(){
					return "hsl(101.6,45.6%,"+colorValue+"%)";
				}

				function walkable(){
					return true;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function floor(){
				var colorValue	=	Math.floor(Math.random()*2+58);

				function color(){
					return "hsl(38.3,39%,"+colorValue+"%)";
				}

				function walkable(){
					return true;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function woodpath(){
				var colorValue	=	Math.floor(Math.random()*2+61);

				function color(){
					return "hsl(38.4,33%,"+colorValue+"%)";
				}

				function walkable(){
					return true;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function stonepath(){
				var colorValue	=	Math.floor(Math.random()*3+81);

				function color(){
					return "hsl(0,0%,"+colorValue+"%)";
				}

				function walkable(){
					return true;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function stonewall(){
				var colorValue	=	Math.floor(Math.random()*2+62);

				function color(){
					return "hsl(0,0%,"+colorValue+"%)";
				}

				function walkable(){
					return false;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function saltwater(){
				var offset 		=	Math.floor(Math.random()*(5));
				var colorValue	=	Math.floor(Math.random()*10+30);
				var count 		=	0;

				function color(){
					var date 	=	new Date();
					var seconds =	date.getSeconds();

					if((seconds + offset)%2 === 0){
						if(count === 0){
							colorValue 	=	Math.floor(Math.random()*10+30);
							count++;							
						}
					}else{
						count 	=	0;
					}
					return "hsl(203.2,48.4%," + colorValue + "%)";
				}

				function walkable(){
					return false;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function freshwater(){
				var offset 		=	Math.floor(Math.random()*(5));
				var colorValue	=	Math.floor(Math.random()*10+50);
				var count 		=	0;

				function color(){
					var date 	=	new Date();
					var seconds =	date.getSeconds();

					if((seconds + offset)%2 === 0){
						if(count === 0){
							colorValue 	=	Math.floor(Math.random()*10+50);
							count++;							
						}
					}else{
						count 	=	0;
					}
					return "hsl(203.1,48.1%," + colorValue + "%)";
				}

				function walkable(){
					return false;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function mud(){
				var colorValue	=	Math.floor(Math.random()*30+220)/10;

				function color(){
					return "hsl(23.5,39%,"+colorValue+"%)";
				}

				function walkable(){
					return true;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function swampwater(){
				var offset 		=	Math.floor(Math.random()*(5));
				var colorValue	=	Math.floor(Math.random()*5+35);
				var count 		=	0;

				function color(){
					var date 	=	new Date();
					var seconds =	date.getSeconds();

					if((seconds + offset)%6 === 0){
						if(count === 0){
							colorValue 	=	Math.floor(Math.random()*5+35);
							count++;							
						}
					}else{
						count 	=	0;
					}
					return "hsl(133.2,49.2%," + colorValue + "%)";
				}

				function walkable(){
					return false;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function dirtpath(){
				var colorValue	=	Math.floor(Math.random()*30+100)/10;

				function color(){
					return "hsl(64.7,65.5%,"+colorValue+"%)";
				}

				function walkable(){
					return true;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function swampgrass(){
				var colorValue	=	Math.floor(Math.random()*10+280)/10;

				function color(){
					return "hsl(133.5,49%,"+colorValue+"%)";
				}

				function walkable(){
					return true;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function dirt(){
				var colorValue	=	Math.floor(Math.random()*30+70)/10;

				function color(){
					return "hsl(24,38.5%,"+colorValue+"%)";
				}

				function walkable(){
					return true;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function sand(){
				var colorValue	=	Math.floor(Math.random()*30+740)/10;

				function color(){
					return "hsl(65.5,68.5%,"+colorValue+"%)";
				}

				function walkable(){
					return true;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function blacktile(){
				function color(){
					return "black";
				}

				function walkable(){
					return true;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function whitetile(){
				function color(){
					return "white";
				}

				function walkable(){
					return true;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			function sandstone(){
				var colorValue	=	Math.floor(Math.random()*20+660)/10;

				function color(){
					return "hsl(55.8,41.5%,"+colorValue+"%)";
				}

				function walkable(){
					return false;
				}

				return {
					"color": color,
					"walkable": walkable
				}
			}

			return [empty(), grass, floor(), woodpath(), stonepath(), stonewall(), saltwater, freshwater, mud, swampwater, dirtpath, swampgrass, dirt, sand, blacktile(), whitetile(), sandstone];
		})();

		function mapToViewport(x, y, width, height){
			var result	=	[];

			x 	=	Math.floor(x);
			y 	=	Math.floor(y);

			for(var i = y - Math.floor(height/2); i < y + Math.ceil(height/2); i++){
				var result_layer	=	[];
				for(var j = x - Math.floor(width/2); j < x + Math.ceil(width/2); j++){
					if(mapData && mapData[i]){
						result_layer.push(mapData[i][j]);
					}else{
						result_layer.push(tiles[0]);
					}
				}
				result.push(result_layer);
			}

			return result;
		}

		function loadMap(x, y){
			$.getJSON("/api/maps/" + x + "/" + y, function(data){
				setMapData(data, x, y);
			});
		}

		function Spellbook(player){
			function TeleportToLumbridge(_player){
				var player = _player;
				function cast(){
					player.teleport(35, 27);
				}

				function getName(){
					return "Teleport to Lumbridge";
				}

				function getImage(){
					return "teleporttolumbridge.png";
				}

				return {
					'cast': cast,
					'getName': getName,
					'getImage': getImage
				}
			}

			function TeleportToAlKharid(_player){
				var player = _player;
				function cast(){
					player.teleport(97, 87);
				}

				function getName(){
					return "Teleport to Al Kharid";
				}

				function getImage(){
					return "teleporttoalkharid.png";
				}

				return {
					'cast': cast,
					'getName': getName,
					'getImage': getImage
				}
			}

			function TeleportToDraynorVillage(_player){
				var player = _player;
				function cast(){
					player.teleport(-88, -3);
				}

				function getName(){
					return "Teleport to Draynor Village";
				}

				function getImage(){
					return "teleporttodraynorvillage.png";
				}

				return {
					'cast': cast,
					'getName': getName,
					'getImage': getImage
				}
			}

			return {
				'teleportToLumbridge': TeleportToLumbridge(player),
				'teleportToAlKharid': TeleportToAlKharid(player),
				'teleportToDraynorVillage': TeleportToDraynorVillage(player)
			}
		}

		var player 	=	(function(){
			var x, y;
			var movex = [], movey = [];
			var spellbook;

			function getX(){
				return x;
			}

			function getY(){
				return y;
			}

			function teleport(_x, _y){
				x 	=	_x;
				y 	=	_y;
				loadMap(x, y);
				move(x, y);
			}

			function addSpellbook(_spellbook){
				spellbook = _spellbook;
			}

			function getSpellbook(){
				return spellbook;
			}

			function move(_x, _y){
				clearInterval(movex[0]);
				clearInterval(movey[0]);

				var loadMapTable	=	[Math.floor((_x + 11)/64), Math.floor((_x - 11)/64), Math.floor(getX()/64),
										 Math.floor((_y + 7)/64), Math.floor((_y - 7)/64), Math.floor(getY()/64)];
			
				if(loadMapTable[0] !== loadMapTable[2]){
					loadMap(_x + 11, Math.floor(getY()));
				}

				if(loadMapTable[1] !== loadMapTable[2]){
					loadMap(_x - 11, Math.floor(getY()));
				}

				if(loadMapTable[3] !== loadMapTable[5]){
					loadMap(Math.floor(getX()), _y + 7);
				}

				if(loadMapTable[4] !== loadMapTable[5]){
					loadMap(Math.floor(getX()), _y - 7);
				}
				
				if(loadMapTable[0] !== loadMapTable[2] && loadMapTable[3] !== loadMapTable[5]){
					loadMap(_x + 11, _y + 7);
				}

				if(loadMapTable[1] !== loadMapTable[2] && loadMapTable[3] !== loadMapTable[5]){
					loadMap(_x - 11, _y + 7);
				}
				
				if(loadMapTable[0] !== loadMapTable[2] && loadMapTable[4] !== loadMapTable[5]){
					loadMap(_x + 11, _y - 7);
				}
				
				if(loadMapTable[1] !== loadMapTable[2] && loadMapTable[4] !== loadMapTable[5]){
					loadMap(_x - 11, _y - 7);
				}

				var delta		=	{};
				delta.x 		=	_x - Math.floor(getX());
				delta.y 		=	_y - Math.floor(getY());

				var distance	=	Math.sqrt(delta.x * delta.x + delta.y * delta.y);

				movex 	=	[setInterval(function(){
					movex[1]++;
					if(isLegalMove(getX() + delta.x/distance, getY())){
						x 	=	getX() + delta.x/distance;
					}

					if(Math.floor(getX()) === _x || movex[1] > 22){
						clearInterval(movex[0]);
					}
				}, 300), 0];

				movey 	=	[setInterval(function(){
					movey[1]++;
					if(model.isLegalMove(getX(), getY() + delta.y/distance)){
						y 	=	(getY() + delta.y/distance);
					}
					
					if(Math.floor(getY()) === _y || movey[1] > 14){
						clearInterval(movey[0]);
					}
				}, 300), 0];
			}

			return {
				'x': getX,
				'y': getY,
				'move': move,
				'teleport': teleport,
				'addSpellbook': addSpellbook,
				'getSpellbook': getSpellbook
			}
		})();

		function isLegalMove(x, y){
			if(!mapData[Math.floor(y)] || !mapData[Math.floor(y)][Math.floor(x)]){
				return false;
			}
			return mapData[Math.floor(y)][Math.floor(x)].walkable();
		}

		function update(){
			if(mapData && mapData[Math.floor(player.y())]){
				view.drawTerrain(mapToViewport(player.x(), player.y(), 22, 14));
				view.drawPlayer();
			}
			window.requestAnimationFrame(update);
		}

		window.requestAnimationFrame(update);

		player.addSpellbook(new Spellbook(player));
		var spellbook 	=	player.getSpellbook()
		for(var i in spellbook){
			view.spellbook.addSpell(spellbook[i]);
		}

		return {
			'setMapData': setMapData,
			'mapToViewport': mapToViewport,
			'player': player,
			'isLegalMove': isLegalMove
		};
	})(view);

	var controller	=	(function(model, canvas){
		canvas.addEventListener("click", function(event){
			var coords 	=	canvas.relMouseCoords(event);

			model.player.move(Math.floor(model.player.x()) + Math.floor(coords.x/24) - 11, Math.floor(model.player.y()) + Math.floor(coords.y/24) - 7);
		})

		return {
			'player': model.player
		};
	})(model, canvas);

	controller.player.getSpellbook().teleportToLumbridge.cast();
})(
	document.querySelector("canvas#game-window"),
	document.querySelector("div#main-interface")
);