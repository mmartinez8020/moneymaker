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
    $check = $("<div></div>",{shape:"rectangle", value:"None", class: "beat" + i, name:"check", id:j});
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

  var stopped = false;
  var blinker = function(element){
  if(stopped){
    
    return;
  }
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

  var terminate;

  setCorrectingInterval = (function(func, delay) {
    var instance = { };

    function tick(func, delay) {
      if (!instance.started) {
        instance.func = func;
        instance.delay = delay;
        instance.startTime = new Date().valueOf();
        instance.target = delay;
        instance.started = true;

        setTimeout(tick, delay);
      } else {
        var elapsed = new Date().valueOf() - instance.startTime,
          adjust = instance.target - elapsed;

        instance.func();
        instance.target += instance.delay;

        setTimeout(tick, instance.delay + adjust);
      }
    };

    return tick(func, delay);
  });


          var sequencerRun = function(){	
          var currentTime = 0 
          var starting = 200;
          var startTime = 0;
          for(var k = 0; k < 16; k++){
            $(".instrument td .beat" + k).each(function(){
              console.log(new Date().valueOf() - startTime)
              setTimeout(blinker, currentTime,$(this));
            })
            currentTime += starting;
            }
          }

          var timerId, setInt;

          var runSeq = function(){
            setInt = setInterval(sequencerRun,3200);
          }

          $('.play').click(function(){
            stopped = false
            sequencerRun();
            runSeq();
          })

          $('.stop').click(function(){
            clearInterval(setInt);
            stopped = true;
          })

  var instrument = function(sample){
    var drumHit = new Wad({source : '/drums/' + sample, volume : 1})
    return drumHit.play()
  }



  });




