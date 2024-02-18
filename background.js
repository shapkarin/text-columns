/**
 * Background script for a Chrome extension using Manifest V3.
 * It listens for browser action clicks and context menu selections to send messages to content scripts.
 * 
 * Manifest V3 migration changes:
 * - Uses {@link chrome.action.onClicked} instead of `chrome.browserAction.onClicked`.
 * - Uses {@link chrome.scripting.executeScript} for script injection (not shown here).
 * - Replaces `chrome.tabs.sendRequest` with {@link chrome.tabs.sendMessage} for sending messages to content scripts.
 * 
 * @see {@link https://developer.chrome.com/docs/extensions/reference/action/|chrome.action}
 * @see {@link https://developer.chrome.com/docs/extensions/reference/tabs/#method-sendMessage|chrome.tabs.sendMessage}
 * @see {@link https://developer.chrome.com/docs/extensions/reference/contextMenus/|chrome.contextMenus}
 */
chrome.action.onClicked.addListener(function(tab) {
    /**
     * Sends a message to the content script in the active tab.
     * 
     * @param {number} tabId - The ID of the tab to send the message to.
     * @param {Object} message - The message to send, specifying the action for the content script.
     * @param {function} responseCallback - Optional callback to handle the response from the content script.
     * @see {@link https://developer.chrome.com/docs/extensions/reference/tabs/#method-sendMessage|chrome.tabs.sendMessage}
     */
    chrome.tabs.sendMessage(tab.id, {action: "split"}, function(response) {
        console.log("Message sent to content script:", response);
    });
    console.log("Browser action clicked.");
});

/**
 * Registers a context menu item for text selections in the browser using the Chrome Extensions API.
 * When the context menu item is clicked, a message is sent to the content script active in the tab.
 * 
 * @see {@link https://developer.chrome.com/docs/extensions/reference/contextMenus/#method-create|chrome.contextMenus.create}
 * @see {@link https://developer.chrome.com/docs/extensions/reference/tabs/#method-sendMessage|chrome.tabs.sendMessage}
 */
chrome.contextMenus.create({
    title: "Apply text columns", // Title of the context menu item.
    contexts: ["selection"], // Specifies the context where the menu item will appear.
    onclick: function(info, tab) {
        /**
         * This function is triggered when the context menu item is selected.
         * It sends a message to the content script for the current tab with the 'split' action.
         * 
         * @param {chrome.contextMenus.OnClickData} info - Contains information about the item clicked and the context where the click happened.
         * @param {chrome.tabs.Tab} tab - Details of the tab where the click occurred.
         */
        chrome.tabs.sendMessage(tab.id, {action: "split"}, function(response) {
            console.log("Context menu action sent to content script:", response);
        });
    }
});

