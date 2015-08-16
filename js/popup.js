$(document).ready(function() {
	var queryInfo = {
		active: true,
		currentWindow: true
	}
	
	$('input:radio[name=sortType]').change(function(e) {
		e.preventDefault();
		var clickedId = $('input[type=radio][name=sortType]:checked').attr('id');
		SetCurrentSortType(clickedId);

		// Let the content script know sort type changed
		chrome.tabs.query(queryInfo, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {"message": "sortTypeChanged", "sortType": clickedId});
		});
	});


	function SelectMostRecentSortType()
	{
		chrome.runtime.sendMessage({message: "sortTypeStorage"}, function(response) {
			SetCurrentSortType(response.sortType);

			if(response.sortType === "sortByViews")
			{
				$('#sortByViews').prop("checked", true);
			}
			else if(response.sortType === "sortByDate")
			{
				$('#sortByDate').prop("checked", true);
			}
			else if(response.sortType === "recentVids")
			{
				$('#recentVids').prop("checked", true);
			}
		});
	}

	function SetCurrentSortType(type)
	{
		if(type === "sortByViews")
		{
			$('#currentSortType').html("Views");
		}
		else if(type === "sortByDate")
		{
			$('#currentSortType').html("Date");
		}
		else if(type === "recentVids")
		{
			$('#currentSortType').html("Channel Vids");
		}
		else
		{
			$('#currentSortType').html("None Yet");
		}
	}

	SelectMostRecentSortType();
	
});