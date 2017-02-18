//35+3 training x3 for connectivity = 114 x 10s = 1140s = 19m
//28+2 training for matching = 30 x 30s = 900s = 15m
//5m for dense 7x5=35+3 = 380s = 6.3m

var modenum = 5;
var numberofquestions = 7;

function getintmode(mode){
	var intmode;
	if (mode == "nl") intmode = 0;
	else if (mode == "gt") intmode = 1;
	else if (mode == "mx") intmode = 2;
	else if (mode == "cn") intmode = 3;
	else if (mode == "cm") intmode = 4;
	return intmode;
}

function getnextmode(mode){
	var nextmode;
	if (mode == "nl") nextmode = "gt";
	else if (mode == "gt") nextmode = "mx";
	else if (mode == "mx") nextmode = "cn";
	else if (mode == "cn") nextmode = "cm";
	else if (mode == "cm") nextmode = "nl";
	return nextmode;
}

function getidxmode(mode){
	var imgidx;
	if (mode == "nl") imgidx = 2;
	else if (mode == "gt") imgidx = 1;
	else if (mode == "mx") imgidx = 3;
	else if (mode == "cn") imgidx = 4;
	else if (mode == "cm") imgidx = 5;
	else if (mode == "cg") imgidx = 1;
	return imgidx;
}

//-----------------------

var mmodenum = 4;

//var matchingQuestions = [[1,1,2,12],[2,10,7,21],[3,8,9,3],[4,4,10,71],[6,6,11,5],[10,72,91,101],[9,22,61,92]];
//var matchingCQuestions = [[7,9,7,10],[8,3,11,8],[11,12,11,6],[5,4,5,31],[12,71,121,2],[3,32,81,71],[6,61,101,33]];
//var matchingAnswers = [1,21,3,4,6,101,92];
//var matchingCAnswers = [7,8,11,5,121,32,61];

//var matchingQuestions = [[1,1,2,12],[2,10,7,21],[3,8,9,3],[4,4,10,71],[5,4,5,31],[10,72,91,101],[9,22,61,92]];
//var matchingAnswers = [1,21,3,4,5,101,92];
//before final pilot
//var matchingQuestions = [[11,11,13,71],[2,10,3,21],[3,101,7,31],[6,13,6,8],[12,121,51,41],[7,72,102,32],[9,91,22,52]];
//var matchingAnswers = [11,21,31,6,121,72,91];
//added 3 more
var matchingQuestions = [[11,11,13,71],[2,10,3,21],[3,101,7,31],[6,13,6,8],[12,121,51,41],[7,72,102,32],[9,91,22,52],[4,42,23,73],[8,43,81,61],[10,111,53,103]];
var matchingAnswers = [11,21,31,6,121,72,91,42,81,103];

function getmidx(mode){
	var midx;
	if (mode == "gt") midx = 0;
	else if (mode == "mx") midx = 1;
	//else if (mode == "cg") midx = 2;
	else if (mode == "cm") midx = 2;
	return midx;
}

function getnextmmode(mode){
	var nextmode;
	if (mode == "gt") nextmode = "mx";
	else if (mode == "mx") nextmode = "cm";
	//else if (mode == "cg") nextmode = "cm";
	else if (mode == "cm") nextmode = "gt";
	return nextmode;
	
}

//-------------------------------------

//var denseQuestions = [[7,8],[6,10],[3,6],[4,5],[2,12],[5,7],[1,10]];
//var denseLinks = [19,22,26,34,42,25,23,32,23,22,28,24];
//var denseAnswers = [8,6,3,5,12,5,10];


///**/ is the demo
var denseQuestions = [[7,9],[6,10],[3,11],[4,5],[2,12],[2,13],[1,10],[4,12],[2,8],[10,11]];
var denseLinks = [19,22,26,34,42,25,23,32,33,23,22,28,24];
var denseAnswers = [9,6,3,5,12,13,10,4,8,10];