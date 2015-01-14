/*
	This file uses the Snapdragon game engine to create a two-dimensional reproduction of RuneScape
*/

var terrain 	=	(function Terrain(){
	function empty(){
		function color(){
			return "black";
		}

		function isWalkable(){
			return false;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	function grass(){
		var colorValue	=	Math.floor(Math.random()*10+510)/10;

		function color(){
			return "hsl(101.6,45.6%,"+colorValue+"%)";
		}

		function isWalkable(){
			return true;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	function floor(){
		var colorValue	=	Math.floor(Math.random()*2+58);

		function color(){
			return "hsl(38.3,39%,"+colorValue+"%)";
		}

		function isWalkable(){
			return true;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	function woodpath(){
		var colorValue	=	Math.floor(Math.random()*2+61);

		function color(){
			return "hsl(38.4,33%,"+colorValue+"%)";
		}

		function isWalkable(){
			return true;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	function stonepath(){
		var colorValue	=	Math.floor(Math.random()*3+81);

		function color(){
			return "hsl(0,0%,"+colorValue+"%)";
		}

		function isWalkable(){
			return true;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	function stonewall(){
		var colorValue	=	Math.floor(Math.random()*2+62);

		function color(){
			return "hsl(0,0%,"+colorValue+"%)";
		}

		function isWalkable(){
			return false;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
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

		function isWalkable(){
			return false;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
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

		function isWalkable(){
			return false;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	function mud(){
		var colorValue	=	Math.floor(Math.random()*30+220)/10;

		function color(){
			return "hsl(23.5,39%,"+colorValue+"%)";
		}

		function isWalkable(){
			return true;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
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

		function isWalkable(){
			return false;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	function dirtpath(){
		var colorValue	=	Math.floor(Math.random()*30+100)/10;

		function color(){
			return "hsl(64.7,65.5%,"+colorValue+"%)";
		}

		function isWalkable(){
			return true;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	function swampgrass(){
		var colorValue	=	Math.floor(Math.random()*10+280)/10;

		function color(){
			return "hsl(133.5,49%,"+colorValue+"%)";
		}

		function isWalkable(){
			return true;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	function dirt(){
		var colorValue	=	Math.floor(Math.random()*30+70)/10;

		function color(){
			return "hsl(24,38.5%,"+colorValue+"%)";
		}

		function isWalkable(){
			return true;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	function sand(){
		var colorValue	=	Math.floor(Math.random()*30+740)/10;

		function color(){
			return "hsl(65.5,68.5%,"+colorValue+"%)";
		}

		function isWalkable(){
			return true;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	function blacktile(){
		function color(){
			return "black";
		}

		function isWalkable(){
			return true;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	function whitetile(){
		function color(){
			return "white";
		}

		function isWalkable(){
			return true;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	function sandstone(){
		var colorValue	=	Math.floor(Math.random()*20+660)/10;

		function color(){
			return "hsl(55.8,41.5%,"+colorValue+"%)";
		}

		function isWalkable(){
			return false;
		}

		return {
			"color": color,
			"isWalkable": isWalkable
		}
	}

	return [empty(), grass, floor(), woodpath(), stonepath(), stonewall(), saltwater, freshwater, mud, swampwater, dirtpath, swampgrass, dirt, sand, blacktile(), whitetile(), sandstone];
})();

var objects 	=	(function Objects(){
	function FreshwaterFish(){
		function click(){
			Snapdragon.interface.chat.send("This is a freshwater fishing spot");
		}

		function isWalkable(){
			return false;
		}

		function getPosition(){
			return 0;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"getPosition": getPosition
		}
	}

	function SaltwaterFish(){
		function click(){
			Snapdragon.interface.chat.send("This is a saltwater fishing spot");
		}

		function isWalkable(){
			return false;
		}

		function getPosition(){
			return 1;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"getPosition": getPosition
		}
	}

	function RoundTree(){
		var cutDown 	=	false;
		function click(){
			if(!cutDown){
				var logs 	=	Snapdragon.interface.inventory.getItems().logs();
				Snapdragon.interface.chat.send("You swing your axe at the tree.");
				setTimeout(function(){
					try{
						Snapdragon.interface.inventory.addItem(logs);
						cutDown 	=	true;
						Snapdragon.interface.chat.send("You get some logs.");

						setTimeout(function(){
							cutDown	=	false;
						}, 600 * 50);
					}catch(exception){
						Snapdragon.interface.chat.send(exception);
					}
				}, 600 * 4);				
			}
		}

		function isWalkable(){
			return false;
		}

		function getPosition(){
			return cutDown ? 6 : 2;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"getPosition": getPosition
		}
	}

	function PointyTree(){
		var cutDown 	=	false;
		function click(){
			if(!cutDown){
				var logs 	=	Snapdragon.interface.inventory.getItems().logs();
				Snapdragon.interface.chat.send("You swing your axe at the tree.");
				setTimeout(function(){
					try{
						Snapdragon.interface.inventory.addItem(logs);
						cutDown 	=	true;
						Snapdragon.interface.chat.send("You get some logs.");

						setTimeout(function(){
							cutDown	=	false;
						}, 600 * 50);
					}catch(exception){
						Snapdragon.interface.chat.send(exception);
					}
				}, 600 * 4);				
			}
		}

		function isWalkable(){
			return false;
		}

		function getPosition(){
			return cutDown ? 6 : 3;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"getPosition": getPosition
		}
	}

	function Oak(){
		var cutDown 	=	false;
		function click(){
			if(!cutDown){
				var logs 	=	Snapdragon.interface.inventory.getItems().oaklogs();
				Snapdragon.interface.chat.send("You swing your axe at the tree.");
				setTimeout(function(){
					try{
						var success 	=	Math.random() > .4;
						if(success){
							Snapdragon.interface.inventory.addItem(logs);
							Snapdragon.interface.chat.send("You get some oak logs.");

							var cut 	=	Math.random() > .7;
							if(cut){
								Snapdragon.interface.chat.send("The tree falls down.");
								cutDown 	=	true;
								setTimeout(function(){
									cutDown	=	false;
								}, 600 * 22);
							}else{
								click();
							}							
						}else{
							Snapdragon.interface.chat.send("You don't get any oak logs.");
							click();
						}
					}catch(exception){
						Snapdragon.interface.chat.send(exception);
					}
				}, 600 * 4);				
			}
		}

		function isWalkable(){
			return false;
		}

		function getPosition(){
			return cutDown ? 6 : 4;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"getPosition": getPosition
		}
	}

	function DeadTree(){
		var cutDown 	=	false;
		function click(){
			if(!cutDown){
				var logs 	=	Snapdragon.interface.inventory.getItems().logs();
				Snapdragon.interface.chat.send("You swing your axe at the tree.");
				setTimeout(function(){
					try{
						Snapdragon.interface.inventory.addItem(logs);
						cutDown 	=	true;
						Snapdragon.interface.chat.send("You get some logs.");

						setTimeout(function(){
							cutDown	=	false;
						}, 600 * 50);
					}catch(exception){
						Snapdragon.interface.chat.send(exception);
					}
				}, 600 * 4);				
			}
		}

		function isWalkable(){
			return false;
		}

		function getPosition(){
			return cutDown ? 6 : 5;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"getPosition": getPosition
		}
	}

	function Stump(){
		function click(){
			Snapdragon.interface.chat.send("This is a stump");
		}

		function isWalkable(){
			return false;
		}

		function getPosition(){
			return 6;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"getPosition": getPosition
		}
	}

	function Willow(){
		var cutDown 	=	false;
		function click(){
			if(!cutDown){
				var logs 	=	Snapdragon.interface.inventory.getItems().willowlogs();
				Snapdragon.interface.chat.send("You swing your axe at the tree.");
				setTimeout(function(){
					try{
						var success 	=	Math.random() > .3;
						console.log(success);
						if(success){
							Snapdragon.interface.inventory.addItem(logs);
							Snapdragon.interface.chat.send("You get some willow logs.");

							var cut 	=	Math.random() > .9;
							if(cut){
								Snapdragon.interface.chat.send("The tree falls down.");
								cutDown 	=	true;
								setTimeout(function(){
									cutDown	=	false;
								}, 600 * 22);
							}else{
								click();
							}							
						}else{
							Snapdragon.interface.chat.send("You don't get any willow logs.");
							click();
						}
					}catch(exception){
						Snapdragon.interface.chat.send(exception);
					}
				}, 600 * 4);				
			}
		}

		function isWalkable(){
			return false;
		}

		function getPosition(){
			return cutDown ? 8 : 7;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"getPosition": getPosition
		}
	}

	function WillowStump(){
		function click(){
			Snapdragon.interface.chat.send("This is a willow stump");
		}

		function isWalkable(){
			return false;
		}

		function getPosition(){
			return 8;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"getPosition": getPosition
		}
	}

	function Cactus(){
		function click(){
			Snapdragon.interface.chat.send("This is a cactus");
		}

		function isWalkable(){
			return false;
		}

		function getPosition(){
			return 9;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"getPosition": getPosition
		}
	}

	function Palm(){
		function click(){
			Snapdragon.interface.chat.send("This is a palm");
		}

		function isWalkable(){
			return false;
		}

		function getPosition(){
			return 10;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"getPosition": getPosition
		}
	}

	function Rockslide(){
		function click(){
			Snapdragon.interface.chat.send("This is a rockslide");
		}

		function isWalkable(){
			return false;
		}

		function getPosition(){
			return 11;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"getPosition": getPosition
		}
	}
	return [FreshwaterFish, SaltwaterFish, RoundTree, PointyTree, Oak, DeadTree, Stump, Willow, WillowStump, Cactus, Palm, Rockslide];
})();

var spellbook 	=	(function Spellbook(){
	function TeleportToLumbridge(){
		function cast(){
			Snapdragon.player.teleport(35, 27, Snapdragon.map);
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

	function TeleportToAlKharid(){
		function cast(){
			Snapdragon.player.teleport(97, 87, Snapdragon.map);
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

	function TeleportToDraynorVillage(){
		function cast(){
			Snapdragon.player.teleport(-88, -3, Snapdragon.map);
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

	return [
		TeleportToLumbridge(),
		TeleportToAlKharid(),
		TeleportToDraynorVillage()
	];
})();

var items		=	(function Items(){
	function Logs(){
		function _getName(){
			return "Logs";
		}

		function _getImage(){
			return "logs.png";
		}

		return {
			"getName": _getName,
			"getImage": _getImage
		}
	}

	function OakLogs(){
		function _getName(){
			return "Oak logs";
		}

		function _getImage(){
			return "oaklogs.png";
		}

		return {
			"getName": _getName,
			"getImage": _getImage
		}
	}

	function WillowLogs(){
		function _getName(){
			return "Willow logs";
		}

		function _getImage(){
			return "willowlogs.png";
		}

		return {
			"getName": _getName,
			"getImage": _getImage
		}
	}

	return {
		"logs": Logs,
		"oaklogs": OakLogs,
		"willowlogs": WillowLogs
	};

})();

(function(){
	Snapdragon.player.teleport(35, 27, Snapdragon.map); // Start the player off in Lumbridge

	Snapdragon.addTerrain(terrain); // Add the terrain tiles to the game
	Snapdragon.addObjects(objects); // Add the object tiles to the game
	Snapdragon.interface.spellbook.fill(spellbook); // Fill the spellbook with spells
	Snapdragon.addItems(items);

	Snapdragon.initialize(); // Initialize the game
	Snapdragon.interface.chat.send("Welcome to TileScape.");	
})();