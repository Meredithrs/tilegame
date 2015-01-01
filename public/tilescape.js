/*
	This file uses the TileScape game engine to create a two-dimensional reproduction of RuneScape
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
			TileScape.interface.chat.send("This is a freshwater fishing spot");
		}

		function isWalkable(){
			return false;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"position": 0
		}
	}

	function SaltwaterFish(){
		function click(){
			TileScape.interface.chat.send("This is a saltwater fishing spot");
		}

		function isWalkable(){
			return false;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"position": 1
		}
	}

	function RoundTree(){
		function click(){
			TileScape.interface.chat.send("This is a round tree");
		}

		function isWalkable(){
			return false;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"position": 2
		}
	}

	function PointyTree(){
		function click(){
			TileScape.interface.chat.send("This is a pointy tree");
		}

		function isWalkable(){
			return false;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"position": 3
		}
	}

	function Oak(){
		function click(){
			TileScape.interface.chat.send("This is an oak tree");
		}

		function isWalkable(){
			return false;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"position": 4
		}
	}

	function DeadTree(){
		function click(){
			TileScape.interface.chat.send("This is a dead tree");
		}

		function isWalkable(){
			return false;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"position": 5
		}
	}

	function Stump(){
		function click(){
			TileScape.interface.chat.send("This is a stump");
		}

		function isWalkable(){
			return false;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"position": 6
		}
	}

	function Willow(){
		function click(){
			TileScape.interface.chat.send("This is a willow");
		}

		function isWalkable(){
			return false;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"position": 7
		}
	}

	function WillowStump(){
		function click(){
			TileScape.interface.chat.send("This is a willow stump");
		}

		function isWalkable(){
			return false;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"position": 8
		}
	}

	function Cactus(){
		function click(){
			TileScape.interface.chat.send("This is a cactus");
		}

		function isWalkable(){
			return false;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"position": 9
		}
	}

	function Palm(){
		function click(){
			TileScape.interface.chat.send("This is a palm");
		}

		function isWalkable(){
			return false;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"position": 10
		}
	}

	function Rockslide(){
		function click(){
			TileScape.interface.chat.send("This is a rockslide");
		}

		function isWalkable(){
			return false;
		}

		return {
			"click": click,
			"isWalkable": isWalkable,
			"position": 11
		}
	}
	return [FreshwaterFish, SaltwaterFish, RoundTree, PointyTree, Oak, DeadTree, Stump, Willow, WillowStump, Cactus, Palm, Rockslide];
})();

var spellbook 	=	(function Spellbook(player){
	function TeleportToLumbridge(){
		function cast(){
			TileScape.player.teleport(35, 27, TileScape.map);
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
			TileScape.player.teleport(97, 87, TileScape.map);
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
			TileScape.player.teleport(-88, -3, TileScape.map);
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
		TeleportToLumbridge(player),
		TeleportToAlKharid(player),
		TeleportToDraynorVillage(player)
	];
})();

(function(){
	TileScape.player.teleport(35, 27, TileScape.map); // Start the player off in Lumbridge

	TileScape.addTerrain(terrain); // Add the terrain tiles to the game
	TileScape.addObjects(objects); // Add the object tiles to the game
	TileScape.interface.spellbook.fill(spellbook); // Fill the spellbook with spells

	TileScape.initialize(); // Initialize the game
	TileScape.interface.chat.send("Welcome to TileScape.");
})();