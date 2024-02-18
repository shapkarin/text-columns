
chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, {action: "split"}, function(response) {
        console.log("Message sent to content script:", response);
    });
    console.log("Browser action clicked.");
});

chrome.contextMenus.create({
    title: "Apply text columns",
    contexts: ["selection"],
    onclick: function(info, tab) {
        chrome.tabs.sendMessage(tab.id, {action: "split"}, function(response) {
            console.log("Context menu action sent to content script:", response);
        });
    }
});
