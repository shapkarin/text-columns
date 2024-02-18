/**
 * Background script for a Chrome extension using Manifest V3.
 * It listens for browser action clicks and context menu selections to send messages to content scripts.
 * 
 * Manifest V3 migration changes:
 * - Uses `chrome.action.onClicked` instead of `chrome.browserAction.onClicked`.
 * - Uses `chrome.scripting.executeScript` for script injection (not shown here).
 * - Replaces `chrome.tabs.sendRequest` with `chrome.tabs.sendMessage` for sending messages to content scripts.
 * 
 * References:
 * - chrome.action: https://developer.chrome.com/docs/extensions/reference/action/
 * - chrome.tabs.sendMessage: https://developer.chrome.com/docs/extensions/reference/tabs/#method-sendMessage
 * - chrome.contextMenus: https://developer.chrome.com/docs/extensions/reference/contextMenus/
 */

// Listener for browser action clicks.
chrome.action.onClicked.addListener(function(tab) {
    /**
     * Sends a message to the content script in the active tab.
     * 
     * @param {number} tabId - The ID of the tab to send the message to.
     * @param {Object} message - The message to send, specifying the action for the content script.
     * @param {function} responseCallback - Optional callback to handle the response from the content script.
     */
    chrome.tabs.sendMessage(tab.id, {action: "split"}, function(response) {
        console.log("Message sent to content script:", response);
    });
    console.log("Browser action clicked.");
});

// Creation of a context menu item.
chrome.contextMenus.create({
    title: "Apply text columns", // The text for the context menu item.
    contexts: ["selection"], // Context where the menu item will appear.
    onclick: function(info, tab) {
        /**
         * Context menu item click handler.
         * Sends a message to the content script when the context menu item is clicked.
         * 
         * @param {Object} info - Information about the item clicked and the context where the click happened.
         * @param {Object} tab - Details of the tab where the click occurred.
         */
        chrome.tabs.sendMessage(tab.id, {action: "split"}, function(response) {
            console.log("Context menu action sent to content script:", response);
        });
    }
});

/**
 * --- Documentación por Chat GPT ---
 */
