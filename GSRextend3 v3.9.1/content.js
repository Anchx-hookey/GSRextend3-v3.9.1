// Function to add a new div with text from result-stats
function addResultStatsDiv() {
    var resultStats = document.getElementById('result-stats');
    if (resultStats) {
        // Create the new div
        var newDiv = document.createElement('div');
        newDiv.className = 'container';
        newDiv.textContent = resultStats.textContent;

        // Find the reference node
        var referenceNode = document.querySelector('div[jscontroller="xdV1C"].SF7xd[role="listitem"]');
        if (referenceNode) {
            // Insert the new div after the reference node
            referenceNode.parentNode.insertBefore(newDiv, referenceNode.nextSibling);
        }
    }
}

// Wait for the page to fully load before running the script
window.addEventListener('load', function() {
    chrome.storage.sync.get(['extensionEnabled'], function(result) {
        if (result.extensionEnabled) {
            addResultStatsDiv();
        }
    });
});
