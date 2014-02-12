inlets = 1;
outlets = 5;
//outlet
//1:type
//2:first MIDI note of triad
//3:first MIDI note of triad
//4:first MIDI note of triad
var basenote = 0;
var secondnote = 0;
var thirdnote = 0;

var note_can_be_played = [];
var LENOFARRAY = 9;

//settings
var vacancy_prob = 0.1;
function set_vacancy_prob(value) {
	vacancy_prob = value/100.0;
	post("vacancy_prob value changed to "+vacancy_prob+"\n");
}

function msg_int(id) {
	
	// 0: major
	// 1: minor
	// 2: dim
	// 3: aug
	// 4: sus
	
	var chordtype = id%5;
	basenote = 60 + (id-chordtype)/5;
	
	//another way to get the basenote.
	//var section = parseInt(id/5);
	//var basenote = 60 + section;
	
	if (chordtype == 0){
		//major
		secondnote = basenote + 4;
	    thirdnote = basenote + 7;
	}
	else if (chordtype == 1){
		//minor
		secondnote = basenote + 3;
	    thirdnote = basenote + 7;
	}
	else if (chordtype == 2){
		//dim
		secondnote = basenote + 3;
	    thirdnote = basenote + 6;
	}
	else if (chordtype == 3){
		//aug
		secondnote = basenote + 4;
	    thirdnote = basenote + 8;
	}
	else if (chordtype == 4){
		//sus
		secondnote = basenote + 5;
	    thirdnote = basenote + 7;
	}
	
	note_can_be_played = [basenote-24,basenote,basenote-12,secondnote-12,secondnote,secondnote-24,thirdnote-12,thirdnote,thirdnote-24];

	outlet(0,chordtype);
	outlet(1,basenote);
	outlet(2,secondnote);
	outlet(3,thirdnote);
	}
	
function playnote(generatebang)
{
	var r = parseInt(Math.random()*LENOFARRAY); // 9 is the length of note
	//post(note_can_be_played[r]+'\n');
	if (Math.random()>vacancy_prob){//can be a slider
	outlet(4,note_can_be_played[r]);}
	
}