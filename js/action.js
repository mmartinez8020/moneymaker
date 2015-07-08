  $(function() {

  // Table/sequencer creation
  $body = $('<div class="container"></div>');

  $header = $('<div class="header"></div>');
  $playbackContainer = $('<div class="playback-container"></div>');
  $stop = $('<div><i class="fa fa-stop fa-3x"></i></div>').addClass('stop');
  $play = $('<div><i class="fa fa-play-circle fa-3x"></i></div>').addClass('play');
  $title = $('<h1 class="header-title"></h1>').text('Money Maker 9000');
  $header.append($title);
  $playbackContainer.append($stop);
  $playbackContainer.append($play);
  $header.append($playbackContainer);
  $body.append($header);
  $seq = $("<table></table>")

  var createSample = function() {
  for (var j = 0; j < 6; j++) {	
    $sample = $("<tr></tr>",{ class: 'instrument' })
    $seq.append($sample)

  for(var i = 0; i < 16; i++){
    $hit = $('<td></td>');
    $check = $("<div ></div>",{shape:"rectangle", value:"None", class: "beat" + i, name:"check", id:j});
    $interiorCircle = $("<div></div>").attr('shape','None');
    $check.append($interiorCircle);
    $hit.append($check);
    $sample.append($hit);
      }
    }
  }

  createSample()
  $body.append($seq)
  $('body').append($body)


  $("div[name='check']").click(function(){
    if ($(this).attr('value') === 'None') {
      $(this).attr('value', 'hit')
      $(this).children().attr('shape','circle')
    }
    else {
      $(this).attr('value', 'None')
      $(this).children().attr('shape',"none")
    }
  });

  var timerId, setInt, terminate;
  var stopped = true;
  var sequenceTimeouts = [];
  
  $('.play').click(playSequencer);

  $('.stop').click(stopSequencer);




  $(window).keypress(function (e) {
    if (e.keyCode == 32 && stopped == false) {
      e.preventDefault()
      stopSequencer();
    } else if (e.keyCode == 32) {
      e.preventDefault()
      playSequencer();
    }
  })



  var loadedInstruments = loadInstruments();

  function blinker(element){
    if (stopped) {
      return;
    } 
    if (element.attr('value') === 'hit') {
      var sample = element.attr('id');
      instrument(sample);
    }
    element.fadeOut(200);
    element.fadeIn(200);
  };

  function sequencerRun() { 
    var currentTime = 0;
    var incrementTime = 200;
    var startTime = 0;
    for (var k = 0; k < 16; k++) {
      $(".instrument td .beat" + k).each(function() {
        sequenceTimeouts.push(setTimeout(blinker, currentTime, $(this)));
      })
      currentTime += incrementTime;
    }
  }

  function playSequencer() {
    if (stopped) {
      stopped = false;
      sequencerRun();
      runSeq();
    }
  }

  function stopSequencer() {
    clearInterval(setInt);
    $.each(sequenceTimeouts, function(index, timeout) {
      clearTimeout(timeout);
    });
    stopped = true;
  }


  function runSeq() {
    setInt = setInterval(sequencerRun,3200);
  };

  function instrument(sample) {
    return loadInstruments()[sample].play();
  }

  function loadInstruments() {
    var loaded = [];
    var sampleMapping = {
      '0': 'bass.wav',
      '1': 'clap(2).wav',
      '2': 'hihat(4).wav',
      '3': 'tom(9).WAV',
      '4': 'hihat.wav',
      '5': 'ArpEC1.wav'
    };
    for (var i = 0; i < 6; i++) {
      loaded.push(new Wad({source : '/drums/' + sampleMapping[i], volume : 1}))
    }
    return loaded;
  };  
});




