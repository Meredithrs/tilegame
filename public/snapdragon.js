/*
	This file contains an engine for complex 2D tile-based games
*/

/*
	requestAnimationFrame polyfill
*/
(function RequestAnimationFramePolyfill() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

/*
	Add relMouseCoords to canvas
*/
(function AddRelMouseCoords(){
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
})();

/*
	The game engine
*/
var Snapdragon 	=	(function Snapdragon(options){

	var config 	=	(function(){
		function _set(name, value, required){
			if(required && (!value || !name)){
				throw "This value is required";
			}
			this[name]	=	value;
		}

		return {
			"set": _set
		};
	})();

	config.set("gameWindow", options.gameWindow, true);
	config.set("objectSet", options.objectSet, true);
	config.set("mainInterface", options.mainInterface, true);
	config.set("chatWindow", options.chatWindow, true);

	/*
		map:
			at(x, y): Returns the items at a particular coordinate in the map
			tileset:
				addTerrain(terrain_tile): Adds a terrain tile to the terrain tileset
				addObject(object_tile): Adds an object tile to the object tileset
				getTerrain(): Returns an array containing the terrain tileset
				getObjects(): Returns an array containing the object tileset
			load(x, y): Loads the scene at the specified coordinates into the map
	*/
	var map 	=	(function(){
		/*
			_layers:
				at(x, y): Returns the items at a particular coordinate in the map
				setTerrain(terrain, tiles, x, y): Takes a terrain object and adds it to the map
				setObjects(objects, tiles, x, y): Takes an "objects object" (an object containing all of the objects in a scene) and adds it to the map
		*/
		var _layers 	=	(function(){
			var _terrain 	=	[];
			var _objects 	=	{};

			function _at(x, y){
				/*
					Returns the items at a particular coordinate in the map
				*/
				var _return_terrain	=	false;
				var _return_objects	=	false;

				if(_terrain[y] && _terrain[y][x]){
					_return_terrain 	=	_terrain[y][x];
				}
				if(_objects[y] && _objects[y][x]){
					_return_objects 	=	_objects[y][x];
				}

				return {
					"terrain": _return_terrain,
					"object": _return_objects
				}
			}

			function _setTerrain(terrain, tiles, x, y){
				/*
					Takes a terrain object and adds it to the map
				*/

				var x 	=	Math.floor(x/64)*64; // Calculate the top left coordinate of this section of the map
				var y 	=	Math.floor(y/64)*64;

				// Iterate through the terrain and add each tile to our map
				terrain.forEach(
					function(outer_element, outer_index, outer_array){
						outer_element.forEach(
							function(inner_element, inner_index, inner_array){
								if(!_terrain[y + outer_index]){
									_terrain[y + outer_index]	=	[];
								}

								// Static tiles are stored in the array pre-instantiated, so that one reference can be used for all tiles of that type
								// Dynamic tiles are stored uninstantiated, so we need to create a new instance for each tile, allowing us to have multiple tiles of the same type act independently
								if(typeof tiles[inner_element] === "object"){
									_terrain[y + outer_index][x + inner_index]	=	tiles[inner_element];
								}else{
									_terrain[y + outer_index][x + inner_index]	=	new tiles[inner_element]();
								}							
							}
						);
					}
				);
			}

			function _setObjects(objects, tiles, x, y){
				/*
					Takes an "objects object" (an object containing all of the objects in a scene) and adds it to the map
				*/

				var x 	=	Math.floor(x/64)*64; // Calculate the top left coordinate of this section of the map
				var y 	=	Math.floor(y/64)*64;

				for(var outer_index in objects){
					if(objects.hasOwnProperty(outer_index)){
						for(var inner_index in objects[outer_index]){
							if(objects[outer_index].hasOwnProperty(inner_index)){
								if(!_objects[outer_index]){
									_objects[outer_index]	=	{};
								}

								_objects[outer_index][inner_index]	=	new tiles[objects[outer_index][inner_index]]();
							}
						}
					}
				}
			}

			return {
				"at": _at,
				"setTerrain": _setTerrain,
				"setObjects": _setObjects
			};
		})();

		/*
			_tileset:
				addTerrain(terrain_tile): Adds a terrain tile to the terrain tileset
				addObject(object_tile): Adds an object tile to the object tileset
				getTerrain(): Returns an array containing the terrain tileset
				getObjects(): Returns an array containing the object tileset
		*/
		var _tileset 	=	(function(){
			var _terrain = [], _objects = [];

			function _addTerrain(terrain_tile){
				/*
					Adds a terrain tile to the terrain tileset
				*/
				_terrain.push(terrain_tile);
			}

			function _addObject(object_tile){
				/*
					Adds an object tile to the object tileset
				*/

				_objects.push(object_tile);
			}

			function _getTerrain(){
				return _terrain;
			}

			function _getObjects(){
				return _objects;
			}

			return {
				"getTerrain": _getTerrain,
				"getObjects": _getObjects,
				"addTerrain": _addTerrain,
				"addObject": _addObject
			};
		})();

		function _load(x, y){
			$.getJSON("/api/maps/" + x + "/" + y, function(data){
				_layers.setTerrain(data.terrain, _tileset.getTerrain(), x, y);
				_layers.setObjects(data.objects, _tileset.getObjects(), x, y);
			});
		}

		return {
			"at": _layers.at,
			"tileset": _tileset,
			"load": _load
		};
	})();

	/*
		player:
			getX(): Returns the x position of the player
			getY(): Returns the y position of the player
			teleport(x, y, map): Instantly moves the player to the specified location if it is a legal move
			isWithin(x, y, distance): Checks if the player is within a certain distance of the specified coordinates
			move(x, y, map, callback): Moves the player to the specified coordinates and then invokes a callback
	*/
	var player 	=	(function(){
		var _x, _y;
		var xInterval = {}, yInterval = {};

		function _getX(){
			/*
				Returns the x position of the player
			*/
			return _x;
		}

		function _getY(){
			/*
				Returns the y position of the player
			*/
			return _y;
		}

		function _teleport(x, y, map){
			/*
				Instantly moves the player to the specified location if it is a legal move
			*/
			var tile 	=	map.at(x, y);
			_x 	=	x;
			_y 	=	y;
			map.load(_x, _y);
			_stop();
			_load(_x, _y, map);
		}

		function _isWithin(x, y, distance){
			/*
				Checks if the player is within a certain distance of the specified coordinates
			*/
			return ((_getX() - x) * (_getX() - x) + (_getY() - y) * (_getY() - y)) <= (distance * distance);
		}

		function _load(x, y, map){
			// Load any scenes that are within view of the player
			var mapTable 	=	[Math.floor((x + 11)/64), Math.floor((x - 11)/64), Math.floor(_getX()/64),
								 Math.floor((y + 7)/64), Math.floor((y - 7)/64), Math.floor(_getY()/64)];

			if(mapTable[0] !== mapTable[2]){
				map.load(x + 11, Math.floor(_getY()));
			}

			if(mapTable[1] !== mapTable[2]){
				map.load(x - 11, Math.floor(_getY()));
			}

			if(mapTable[3] !== mapTable[5]){
				map.load(Math.floor(_getX()), y + 7);
			}

			if(mapTable[4] !== mapTable[5]){
				map.load(Math.floor(_getX()), y - 7);
			}
			
			if(mapTable[0] !== mapTable[2] && mapTable[3] !== mapTable[5]){
				map.load(x + 11, y + 7);
			}

			if(mapTable[1] !== mapTable[2] && mapTable[3] !== mapTable[5]){
				map.load(x - 11, y + 7);
			}
			
			if(mapTable[0] !== mapTable[2] && mapTable[4] !== mapTable[5]){
				map.load(x + 11, y - 7);
			}
			
			if(mapTable[1] !== mapTable[2] && mapTable[4] !== mapTable[5]){
				map.load(x - 11, y - 7);
			}
		}

		function _stop(){
			clearInterval(xInterval.id);
			clearInterval(yInterval.id);
		}

		function _move(x, y, map, callback){
			/*
				Moves the player to the specified coordinates and then invokes a callback
			*/

			clearInterval(xInterval.id); // ID of the interval that moves the player along the x-axis
			clearInterval(yInterval.id); // This cancels the player's current movement

			_load(x, y, map);

			// Compute the distance that the player will be moving
			var delta 		=	{
				"x": x - Math.floor(_getX()),
				"y": y - Math.floor(_getY())
			};
			var distance 	=	Math.sqrt(delta.x * delta.x + delta.y * delta.y);

			// Store the original position of the player
			var previousPosition 	=	{
				"x": _getX(),
				"y": _getY()
			};

			xInterval 	=	{
				"id": setInterval(function(){
					xInterval.count++;
					var tile 	=	map.at(Math.floor(_getX() + delta.x/distance), Math.floor(_getY()));

					if(tile.terrain.isWalkable() && !tile.object){
						_x 	=	_getX() + delta.x/distance;
					}

					if(_isWithin(previousPosition.x + delta.x, previousPosition.y + delta.y, 1.41) && callback){
						callback();
						callback 	=	false;
					}

					if(Math.floor(_getX()) === x || xInterval.count > 22){
						clearInterval(xInterval.id);
						xInterval.id 	=	false;
					}
				}, 300),
				"count": 0
			};

			yInterval 	=	{
				"id": setInterval(function(){
					yInterval.count++;
					
					var tile 	=	map.at(Math.floor(_getX()), Math.floor(_getY() + delta.y/distance));

					if(tile.terrain.isWalkable() && !tile.object){
						_y 	=	_getY() + delta.y/distance;
					}

					if(_isWithin(previousPosition.x + delta.x, previousPosition.y + delta.y, 1.41) && callback){
						callback();
						callback 	=	false;
					}

					if(Math.floor(_getY()) === y || yInterval.count > 14){
						clearInterval(yInterval.id);
						yInterval.id 	=	false;
					}
				}, 300),
				"count": 0
			};
		}

		return {
			"getX": _getX,
			"getY": _getY,
			"teleport": _teleport,
			"isWithin": _isWithin,
			"move": _move
		};
	})();

	/*
		view:
			drawTerrain(x, y, map): Draws the terrain in the current viewport
			drawObjects(x, y, map): Draws all objects within the viewport
			drawPlayer(): Draws the player in the middle of the viewport
	*/
	var view 	=	(function(canvas, objectsheet){
		var _canvas		= canvas, _objectsheet = objectsheet;
		var _context	=	_canvas.getContext("2d");
		var _width 		=	24;

		function _drawTile(x, y, tile){
			/*
				Draws a terrain tile at the specified coordinates
			*/
			if(tile && tile.color){
				_context.fillStyle	=	tile.color();
			}else{
				_context.fillStyle	=	"black";
			}

			_context.fillRect(x * _width, y * _width, _width, _width);
			_context.fill();
		}

		function _drawObject(x, y, object){
			/*
				Draws an object tile at the specified coordinates
			*/
			_context.drawImage(_objectsheet, object.getPosition() * 24, 0, 24, 48, x * _width, (y - 1) * _width, 24, 48);
		}

		function _drawTerrain(x, y, map){
			/*
				Draws the terrain in the current viewport
			*/
			if(!map){
				return false;
			}

			var height = 14, width = 22;

			x 	=	Math.floor(x);
			y 	=	Math.floor(y);

			for(var i = y - Math.floor(height/2); i < y + Math.ceil(height/2); i++){
				for(var j = x - Math.floor(width/2); j < x + Math.ceil(width/2); j++){
					_drawTile(j - (x - Math.floor(width/2)), i - (y - Math.floor(height/2)), map.at(j, i).terrain);
				}
			}
		}

		function _drawObjects(x, y, map){
			/*
				Draws all objects within the viewport
			*/
			var height = 14, width = 22;

			x 	=	Math.floor(x);
			y 	=	Math.floor(y);

			for(var i = y - Math.floor(height/2); i < y + Math.ceil(height/2); i++){
				for(var j = x - Math.floor(width/2); j < x + Math.ceil(width/2); j++){
					if(map.at(j, i).object){
						_drawObject(j - (x - Math.floor(width/2)), i - (y - Math.floor(height/2)), map.at(j, i).object);
					}
				}
			}
		}

		function _drawPlayer(){
			/*
				Draws the player in the middle of the viewport
			*/
			_drawTile(11, 7, {color: function(){
				return "white";
			}});
		}

		return {
			"drawTerrain": _drawTerrain,
			"drawObjects": _drawObjects,
			"drawPlayer": _drawPlayer
		}
	})(config.gameWindow, config.objectSet);

	/*
		interface:
			chat:
				send(message, color): Sends a message through the chat box
				getMessages(): Gets all messages
			spellbook:
				addSpell(spell): Adds a spell to the spellbook
				fill(spells): Adds an array of spells to the spellbook
	*/
	var interface 	=	(function(mainInterface, chatInterface){
		/*
			chat:
				send(message, color): Sends a message through the chat box
				getMessages: Gets all messages
		*/
		var _chat 	=	(function(){
			var _messages 	=	[];

			function _send(message, color){
				/*
					Sends a message through the chat box
				*/
				var messageElements	=	chatInterface.querySelectorAll(".message");
				if(messageElements.length > _messages.length){
					chatInterface.removeChild(messageElements[0]);
				}
				var msg 	=	document.createElement("div");
				msg.classList.add("message");
				msg.style.color 	=	color || "black";
				msg.textContent 	=	message;
				chatInterface.appendChild(msg);
				msg.scrollIntoView(true);

				_messages.push(message);
			}

			function _getMessages(){
				/*
					Gets all messages
				*/
				return _messages;
			}

			return {
				"send": _send,
				"getMessages": _getMessages
			};
		})();

		var _tabs 	=	(function Tabs(){
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

		/*
			spellbook:
				addSpell(spell): Adds a spell to the spellbook
				fill(spells): Adds an array of spells to the spellbook
		*/
		var _spellbook 	=	(function Spellbook(){
			var spells 			=	[];
			var magicInterface 	=	mainInterface.querySelector("#magic");

			function _addSpell(spell){
				/*
					Adds a spell to the spellbook
				*/
				spells.push(spell);
				var spellButton 			=	document.createElement("button");
				spellButton.setAttribute('title', spell.getName());
				spellButton.style.backgroundImage 	=	"url('images/spells/"+spell.getImage()+"')";
				spellButton.addEventListener("click", function(event){
					spell.cast();
				});
				magicInterface.appendChild(spellButton);
			}

			/*
				Adds an array of spells to the spellbook
			*/
			function _fill(spells){
				for(var i = 0; i < spells.length; i++){
					_addSpell(spells[i]);
				}
			}

			return {
				"addSpell": _addSpell,
				"fill": _fill
			};
		})();

		var _inventory	=	(function(){
			var _contents 	=	[];
			var _interface 	=	mainInterface.querySelector("#inventory");
			var _items 		=	{};

			function _setItems(items){
				_items 	=	items;
			}

			function _getItems(){
				return _items;
			}

			function _addItem(item){
				if(_contents.length < 28){
					_contents.push(item);
					var itemElement 	=	document.createElement("div");
					itemElement.setAttribute("title", item.getName());
					itemElement.style.backgroundImage	=	"url('images/items/"+item.getImage()+"')";

					_interface.appendChild(itemElement);
				}else{
					throw "Your inventory is full.";
				}
			}

			function _getItemByPosition(position){
				return _contents[position];
			}

			function _removeItemByPosition(position){
				delete _contents[position];
			}

			return {
				"addItem": _addItem,
				"setItems": _setItems,
				"getItems": _getItems
			};
		})();

		return {
			"chat": _chat,
			"spellbook": _spellbook,
			"inventory": _inventory
		};
	})(config.mainInterface, config.chatWindow);

	var objectClick	=	function(){
		return true;
	}

	var previousTimestamp;
	var update 	=	function(timestamp){
		/*
			Updates the view
		*/

		// Calculate the FPS
		if(!!previousTimestamp){
			fps 	=	Math.floor(1/(timestamp-previousTimestamp) * 10000)/10;
		}
		previousTimestamp = timestamp;

		view.drawTerrain(player.getX(), player.getY(), map);
		view.drawPlayer();
		view.drawObjects(player.getX(), player.getY(), map);
		window.requestAnimationFrame(update);
	};

	var initialize	=	function(){
		window.requestAnimationFrame(update);
	};

	var addTerrain 	=	function(tileset){
		for(var i = 0; i < tileset.length; i++){
			map.tileset.addTerrain(tileset[i]);
		}
	};

	var addObjects	=	function(tileset){
		objectClick 	=	tileset.click;
		for(var i = 0; i < tileset.objects.length; i++){
			map.tileset.addObject(tileset.objects[i]);
		}
	};

	var addItems 	=	function(items){
		interface.inventory.setItems(items);
	};

	config.gameWindow.addEventListener("click", function(event){
		if(objectClick()){
			var coords 	=	config.gameWindow.relMouseCoords(event);
			var x 		=	Math.floor(player.getX()) + Math.floor(coords.x/24) - 11;
			var y 		=	Math.floor(player.getY()) + Math.floor(coords.y/24) - 7;
			player.move(x, y, map, map.at(x, y).object.click);
		}
	});

	return {
		"map": map,
		"player": player,
		"interface": interface,
		"initialize": initialize,
		"addTerrain": addTerrain,
		"addObjects": addObjects,
		"addItems": addItems
	};
});