//background.js
chrome.runtime.onInstalled.addListener(function () {
    // storage中设置值
    chrome.storage.sync.set({ color: "#3aa757" }, function () {
        console.log("storage init color value");
    });
    // 为特定的网址显示图标
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostEquals: "baidu.com" },
                    }),
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ]);
    });
});