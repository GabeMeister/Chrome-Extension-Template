var queryInfo = {
	active: true
}

/*
Handle Messages from Content Scripts
*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.message === "getRecentSortType")
	{
		
		

		sendResponse({"sortType": recentSortType});
	}
	else
	{
		// SOMETHING WENT WRONG
		console.log("BIG TIME ERROR HAPPENED");
	}

});

