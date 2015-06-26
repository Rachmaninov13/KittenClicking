var script = gamePage;

var opts = {
	interval : 5000,
	religion : 0,
	hunt : 1,
	festival : 0,
	build : 0,
	craft : 0,
	observe : 1,
	trade : 0
};

var flagStock = {
	catnip : {stock : 2000, priority : 0},
	wood : {stock : 0, priority : 0},
	minerals : {stock : 0, priority : 0},
	coal : {stock : 0, priority : 0},
	iron : {stock : 0, priority : 0},
	titanium : {stock : 0, priority : 0},
	gold : {stock : 0, priority : 0},
	oil : {stock : 0, priority : 0},
	uranium : {stock : 0, priority : 0},
	unobtainium : {stock : 0, priority : 0},
	
	manpower : {stock : 0, priority : 0},
	science : {stock : 0, priority : 0},
	culture : {stock : 0, priority : 0},
	faith : {stock : 0, priority : 0},
	starchart : {stock : 0, priority : 0},
	antimatter : {stock : 0, priority : 0},
	
	furs : {stock : 1000, priority : 0},
	ivory : {stock : 500, priority : 0},
	spice : {stock : 500, priority : 0},
	unicorns : {stock : 0, priority : 0},
	alicorn : {stock : 0, priority : 0},
	necrocorn : {stock : 0, priority : 0},
	tears : {stock : 0, priority : 0},
	timeCrystal : {stock : 0, priority : 0},
	sorrow : {stock : 0, priority : 0},
	
	beam : {stock : 0, priority : 0},
	slab : {stock : 0, priority : 0},
	concrate : {stock : 0, priority : 0},
	plate : {stock : 0, priority : 0},
	steel : {stock : 0, priority : 0},
	alloy : {stock : 0, priority : 0},
	eludium : {stock : 0, priority : 0},
	gear : {stock : 0, priority : 0},
	scaffold : {stock : 0, priority : 0},
	ship : {stock : 0, priority : 0},
	tanker : {stock : 0, priority : 0},
	parchment : {stock : 0, priority : 0},
	manuscript : {stock : 0, priority : 0},
	compedium : {stock : 0, priority : 0},
	blueprint : {stock : 0, priority : 0},
	megalith : {stock : 0, priority : 0}
};

var craftables = {
	wood: {autocraft: 1},
	beam: {autocraft: 1},
	slab: {autocraft: 1},
	steel: {autocraft: 1},
	plate: {autocraft: 1},
	alloy: {autocraft: 0},
	concrate: {autocraft: 0},
	gear: {autocraft: 0},
	scaffold: {autocraft: 0},
	ship: {autocraft: 0},
	tanker: {autocraft: 0},
	parchment: {autocraft: 1},
	manuscript: {autocraft: 1},
	compedium: {autocraft: 0},
	blueprint: {autocraft: 0},
	megalith: {autocraft: 0},
	eludium: {autocraft: 0}
};
	
var cycle = function () {};

cycle.prototype = {
	loop: undefined,
	start: function () {
		if(this.loop) return;
		this.loop = setInterval(this.iterate.bind(this),opts.interval);
	},
	stop: function () {
		if(!this.loop) return;
		clearInterval(this.loop);
		this.loop = undefined;
	},
	iterate: function () {
		if(opts.hunt) this.hunt();
		if(opts.observe) this.observe();
		if(opts.religion) this.religion();
		if(opts.festival) this.festival();
		if(opts.build) this.build();
		if(opts.craft) this.craft();
		if(opts.trade) this.trade();
		script.msg("Looped.");
	},
	//gaze to the heavens
	observe: function () {
		if(script.calendar.observeBtn) {
			script.calendar.observeHandler();
			script.msg("Observed.");
		}
	},
	//praise the sun
	religion: function () {
		if(flagStock.faith.stock === 0)	{
			script.religion.praise();
			script.msg("Praised.");
		}
	},
	//Use our power
	hunt: function () {
		do {
			script.villageTab.huntBtn.onClick();
		}
		while(script.resPool.get("manpower").value > script.resPool.get("manpower").maxValue/2);
		script.clearLog();
		script.msg("Hunted.");
		
	},
	//celebrate
	festival: function () {
		if(script.calendar.festivalDays === 0 && script.villageTab.festivalBtn.hasResources()){
			script.villageTab.festivalBtn.onClick();
			script.msg("Festivaled.");
		}
	},
	//build us up
	build: function () {
		
	},
	//craft the excess
	craft: function () {
		for (var name in craftables){
			var res = craftables[name];
			if(res.autocraft === 1){
				var crafts = Number.MAX_SAFE_INTEGER; //assume infinite crafts
				var costPer = script.workshop.getCraft(name).prices; //get price array
				for(var i = 0; i < costPer.length; i++){
					var free = script.resPool.get(costPer[i].name).value - flagStock[costPer[i].name].stock; //find how much of the given prereq is free
					crafts = Math.min(crafts,Math.floor(free/costPer[i].val)); //lower crafts to how many that's good for
				}
				script.workshop.craft(name,crafts);
			}
		}
	},
	//sharing is caring
	trade: function () {
		script.clearLog();
	}
};

var scriptCycle = new cycle();
