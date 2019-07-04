$( document ).ready(function() {
	var $canvas = $('#word_cloud');

	//Temp solution since Twitter uses async for embeded links.
	generateWordCloud();
});

//Edited https://stackoverflow.com/questions/30906807/word-frequency-in-javascript
function wordFreq(string) {
		// get rid of urls, @ mentions, punctionation + spaces
		var no_url = string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').replace(/\S*@\S*\s?/g, "").replace(/(?:(the|a|an|and|of|what|to|for|about) +)/g, "").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    var words = no_url.replace(/[.]/g, '').split(/\s/);
    var freqMap = {};
    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });

    return freqMap;
}

function generateWordFreqs(raw_data, name) {
	var tweets = [];
	for(var i = 0; i<raw_data.length; i++){
		tweets.push(raw_data[i].innerText);
	}
	//Regex to elimate tags, etc. + join words into one coherent group
	tweets = tweets.join(' ');

	listA = wordFreq(tweets);
	var list = [];
	for (var key in listA)
	{
		list.push([key, listA[key]*5]);
	}
	WordCloud.minFontSize = "15px";
	WordCloud($('#' + name + '_word_cloud')[0], { list: list });
}

function generateWordCloud(){
	setTimeout(
	    function() {
	    	//Set up variables, get document values from iframes loaded asyncronously
				//Work around for not being able to explicitly call $("#twitter-widget-.....")
	    	var liberal = $(document.getElementById('twitter-widget-0').contentWindow.document).find(".timeline-Tweet-text");
	    	var moderate = $(document.getElementById('twitter-widget-1').contentWindow.document).find(".timeline-Tweet-text");
	    	var conservative = $(document.getElementById('twitter-widget-2').contentWindow.document).find(".timeline-Tweet-text");

	    	//Generate Word Clouds
				generateWordFreqs(liberal, "liberal");
				generateWordFreqs(moderate, "moderate");
				generateWordFreqs(conservative, "conservative");
	    }, 250);
}
