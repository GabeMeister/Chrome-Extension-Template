var queryInfo = {
	active: true
}

/*
Handle Messages from Content Scripts
*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.message === "getRecentSortType")
	{
		var recentSortType = localStorage.getItem("sortType");
		if(recentSortType === null)
		{
			recentSortType = "sortByViews";
		}

		sendResponse({"sortType": recentSortType});
	}
	else if(request.message === "setRecentSortType")
	{
		localStorage.setItem("sortType", request.sortType);
	}
	else if(request.message === "sortTypeStorage")
	{
		var recentSortType = localStorage.getItem("sortType");
		if(recentSortType === null)
		{
			recentSortType = "sortByViews";
		}

		sendResponse({"sortType": recentSortType});
	}
	else
	{
		// SOMETHING WENT WRONG
		console.log("BIG TIME ERROR HAPPENED");
	}

});


var recentDate = new Date();
chrome.webNavigation.onHistoryStateUpdated.addListener(function() {
	var currDate = new Date();
	if(Math.abs(currDate - recentDate) >= 1000)
	{
		console.log("Reached!");
		console.log(currDate);

		recentDate = currDate;
		var sortType = localStorage.getItem("sortType");
		setTimeout(function() {
			chrome.tabs.query(queryInfo, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {"message": "onPageLoad", "sortType": sortType});
			});
		}, 1000);	
		
	}

	

});