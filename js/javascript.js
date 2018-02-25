$( document ).ready(function() {
	var $canvas = $('#word_cloud');

	// Get top 10 tweets from each list

	// var list = (function () {
	//   var string = 'Grumpy wizards make toxic brew for the evil Queen and Jack';

	//   var list = [];
	//   string.split(' ').forEach(function(word) {
	//     list.push([word, word.length * 5]);
	//   });

	//   return list;
	// })();
	// console.log(WordCloud.isSupported);
	// WordCloud.minFontSize = "15px";
	// WordCloud($canvas[0], { list: list });

	//Temp solution since Twitter uses async for embeded links.
	generateWordCloud();
});

//Edited https://stackoverflow.com/questions/30906807/word-frequency-in-javascript
function wordFreq(string) {
    var words = string.replace(/[.]/g, '').split(/\s/);
    var freqMap = {};
    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });

    return freqMap;
}

function generateWordCloud(){
	setTimeout(
	    function() {
	    	//Set up variables, get document values from iframes loaded asyncronously
	    	var count = [];
	    	var liberal = document.getElementById('twitter-widget-0').contentWindow.document;
	    	var moderate = document.getElementById('twitter-widget-1').contentWindow.document;
	    	var conservative = document.getElementById('twitter-widget-2').contentWindow.document;
	    	// console.log(liberal)

	    	//Get Tweets from each iframe
	    	liberalTweetsHTML = $(liberal).find(".timeline-Tweet-text");
	    	count.push(liberalTweetsHTML.length);
	    	moderateTweetsHTML = $(moderate).find(".timeline-Tweet-text");
	    	count.push(moderateTweetsHTML.length);
	    	conservativeTweetsHTML = $(conservative).find(".timeline-Tweet-text");
	    	count.push(conservativeTweetsHTML.length);

	    	// console.log(count);
	    	//If there are less than 10 tweets for any of the feeds, recursively run this function until there are 10 tweets.
	    	if(count[0] < 10 || count[1] < 10 || count[2] < 10)
	    	{
	    		generateWordCloud();
	    		return;
	    	}
	    	
	    	//Extract text from Tweets
	    	var liberalTweets =[];
	    	for(var i = 0; i<liberalTweetsHTML.length; i++){
	    		liberalTweets.push(liberalTweetsHTML[i].innerText);
	    	}
	    	var moderateTweets =[];
	    	for(var i = 0; i<moderateTweetsHTML.length; i++){
	    		moderateTweets.push(moderateTweetsHTML[i].innerText);
	    	}
	    	var conservativeTweets =[];
	    	for(var i = 0; i<conservativeTweetsHTML.length; i++){
	    		conservativeTweets.push(conservativeTweetsHTML[i].innerText);
	    	}
	    	// console.log(liberalTweets);
	    	// console.log(moderateTweets);
	    	// console.log(conservativeTweets);

	    	//Generate Word Clouds
	    	//Regex to elimate tags, etc. + join words into one coherent group
	    	liberalTweets = liberalTweets.join(' ');
	    	moderateTweets = moderateTweets.join(' ');
	    	conservativeTweets = conservativeTweets.join(' ');

	    	// console.log(liberalTweets);
	    	//Get rid of @ mentions
	    	liberalTweets = liberalTweets.replace(/\S*@\S*\s?/g, "");
	    	//Get rid of links
	    	liberalTweets = liberalTweets.replace(/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g,"");
	    	// console.log(liberalTweets);
	    	//Get rid of punctionation + spaces
	    	var punctuationless = liberalTweets.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
			liberalTweets = punctuationless.replace(/\s{2,}/g," ");
			//Get rid of articles of speech
			regex = /(?:(the|a|an|and|of|what|to|for|about) +)/g; 
			liberalTweets = liberalTweets.replace(regex, "");
	    	// liberalTweets = liberalTweets.split(" ");
	    	// console.log(liberalTweets);
	    	listA = wordFreq(liberalTweets);
	    	var list = [];
	    	for (var key in listA)
	    	{
	    		list.push([key, listA[key]*5]);
	    	}
	    	console.log(list);
			console.log(WordCloud.isSupported);
			WordCloud.minFontSize = "15px";
			WordCloud($('#liberal_word_cloud')[0], { list: list });

			moderateTweets = moderateTweets.replace(/\S*@\S*\s?/g, "");
	    	//Get rid of links
	    	moderateTweets = moderateTweets.replace(/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g,"");
	    	// console.log(liberalTweets);
	    	//Get rid of punctionation + spaces
	    	var punctuationless = moderateTweets.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
			moderateTweets = punctuationless.replace(/\s{2,}/g," ");
			//Get rid of articles of speech
			regex = /(?:(the|a|an|of|and|what|to|for|about) +)/g; 
			moderateTweets = moderateTweets.replace(regex, "");
	    	// liberalTweets = liberalTweets.split(" ");
	    	// console.log(liberalTweets);
	    	listA = wordFreq(moderateTweets);
	    	var list = [];
	    	for (var key in listA)
	    	{
	    		list.push([key, listA[key]*5]);
	    	}
	    	console.log(list);
			console.log(WordCloud.isSupported);
			WordCloud.minFontSize = "15px";
			WordCloud($('#moderate_word_cloud')[0], { list: list });

			conservativeTweets = conservativeTweets.replace(/\S*@\S*\s?/g, "");
	    	//Get rid of links
	    	conservativeTweets = conservativeTweets.replace(/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g,"");
	    	// console.log(liberalTweets);
	    	//Get rid of punctionation + spaces
	    	var punctuationless = conservativeTweets.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
			conservativeTweets = punctuationless.replace(/\s{2,}/g," ");
			//Get rid of articles of speech
			regex = /(?:(the|a|an|and|of|what|to|for|about) +)/g; 
			conservativeTweets = conservativeTweets.replace(regex, "");
	    	// liberalTweets = liberalTweets.split(" ");
	    	// console.log(liberalTweets);
	    	listA = wordFreq(conservativeTweets);
	    	var list = [];
	    	for (var key in listA)
	    	{
	    		list.push([key, listA[key]*5]);
	    	}
	    	console.log(list);
			console.log(WordCloud.isSupported);
			WordCloud.minFontSize = "15px";
			WordCloud($('#conservative_word_cloud')[0], { list: list });





	    	// var allLiberal = liberalTweets.split(" ");
	    	// var allModerate = moderateTweets.split(" ");
	    	// var allConservative = conservativeTweets.split(" ");

	    	
	    }, 250);
}

// $('#liberal').bind('load', function() {
// 	 console.log(document.getElementById('twitter-widget-0').contentWindow.document);
// });
// function resolveAfter2Seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved');
//     }, 2000);
//   });
// }

// async function asyncCall() {
//   console.log('calling');
//   var result = await resolveAfter2Seconds();
//   console.log(result);
//   var libtweets = $(".timeline-Tweet-text")
// 	console.log(libtweets);
// 	console.log(document.getElementById('twitter-widget-0').contentWindow.document);
//   // expected output: "resolved"
// }

