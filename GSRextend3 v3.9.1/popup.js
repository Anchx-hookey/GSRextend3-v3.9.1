document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.getElementById('toggle');

    if (toggle) {
        // Load the current state of the extension
        chrome.storage.sync.get(['extensionEnabled'], function(result) {
            toggle.checked = result.extensionEnabled;
        });

        // Save the state when the toggle is changed
        toggle.addEventListener('change', function() {
            chrome.storage.sync.set({ extensionEnabled: toggle.checked }, function() {
                // Reload the content script to apply changes
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    var tabId = tabs[0].id;

                    if (chrome.scripting && chrome.scripting.executeScript) {
                        // For manifest v3
                        chrome.scripting.executeScript({
                            target: { tabId: tabId },
                            files: ['content.js']
                        });
                    } else {
                        // For manifest v2
                        chrome.tabs.executeScript(tabId, { file: 'content.js' });
                    }
                });
            });
        });
    } else {
        console.error('Toggle element not found');
    }
});
