<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>

<button id="btn">Rec Start</button>
<div id="content"></div>


<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script type="text/javascript">

$(function(){

	$content = $("#content");
	var SpeechText = {};
	var recCnt = 0;
	$.get("speech.json", function(data){
	var jsondata = $.parseJSON(data);
	var keys = Object.keys(jsondata);
	for( var i=0, l=keys.length; i<l; i+=1) {
	  $content.append(jsondata[keys[i]]);
	  SpeechText["speech" + i] = jsondata[keys[i]];
	}
	});


	$('#btn').on('click', function() {
		function(){
			window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
			recognition = new webkitSpeechRecognition();
			recognition.lang = 'ja';
			recognition.continuous = true;
			this.setEvent();
			this.start();
			var self = this;
			recognition.addEventListener('result', function(event){
				var newRecText = event.results.item(recCnt).item(0).transcript;
				//self.speeeeeeeeeeeeech(newRecText);
			    //SpeechText.push(newRecText);
			    var randKey = Math.random().toString(36).slice(-8);
			    SpeechText[randKey] = newRecText;
			    self.saveJson();
			    // self.render();
			    recCnt++;
			}, false);
			var SpeechJson = JSON.stringify(SpeechText);
			$.ajax({
			    url: "save.php",
			    type: "POST",
			    dataType: 'json', 
			    data:SpeechJson, //JSON形式の送信データ
				success: function(data){
					console.log(data);
				},
				error: function(){
					console.log("error");
				}
			});
			var synthes = new SpeechSynthesisUtterance(aText);
			synthes.lang = "ja-JP"
			speechSynthesis.speak( synthes );
	});

});
</script>
</body>
</html>