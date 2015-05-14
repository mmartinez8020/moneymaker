$(function() {

//STRUCTURE
	$body = $('body')
	$header = $('<h1></h1>').text('$The Money Maker$')
	$seq = $("<table></table>")
	$container = $("<div></div>").addClass('container')
	$body.append($header)
	$header.append($container)
	$container.append($seq)

	var createSample = function(){
	for(var j = 0; j < 6; j++){	
		$sample = $("<tr></tr>",{class:'instrument'})
		$seq.append($sample)
		for(var i = 0; i < 16; i++){
			$hit = $('<td></td>')
			$check = $("<div></div>",{shape:"rectangle",
            									  value:"None",
            									  class: "instrument" + i,
            									  name:"check",
            									  id:j});
			$interiorCircle = $("<div></div>").attr('shape','None');
			$check.append($interiorCircle);
			$hit.append($check);
			$sample.append($hit);

		}
	}
		
	}
	createSample()
	$playbutton = $('<button>Play</button>').addClass('play')
	$stopbutton = $('<button>Stop</button>').addClass('stop')
	$('body').append($playbutton).append($stopbutton)
	
//PLAY SOUND

	$("div").click(function(){
		if($(this).attr('value') === 'None'){
			$(this).attr('value', 'hit')
			$(this).children().attr('shape',"circle")
		}
		else{
			$(this).attr('value', 'None')
			$(this).children().attr('shape',"none")
		}

	})


	var blinker = function(element){
    var sampleMapping = {'0': 'bass.wav',
                         '1': 'clap(2).wav',
                         '2': 'hihat(4).wav',
                         '3': 'tom(9).wav',
                         '4': 'hihat.wav',
                         '5': 'ArpEC1.wav'}
	 	
    if (element.attr('value') === 'hit'){
	 		var sample = sampleMapping[element.attr('id')];
      instrument(sample)
	 	}
	    element.fadeOut(200);
	    element.fadeIn(200);
	}
	 
	var currentTime = 0;
 	var starting = 200;
 	var sequencerRun = function(){	
 	for(var k = 0; k < 16; k++){
		$(".instrument td .instrument" + k).each(function(){
				
				setTimeout(blinker, currentTime,$(this));
				
			})
		currentTime += starting

		}
		
	}
	
	var timerId 
	$('.play').click(function(){
			timerId = setInterval(sequencerRun,0)

	})
	$('.stop').click(function(){
			console.log(timerId)
			clearInterval(timerId);	
	})

	var instrument = function(path){ 
		 soundManager.onready(function() {
		   			soundManager.url = '/path/to/swf-files/';
		   			
		   			var Url = '/drums/' + path
		   			console.log(Url)
		        	soundManager.createSound({
		            	id: path,
		            	url: Url
		        	});

        		return soundManager.play(path);
    	});	

    }
    
    

 });

	


