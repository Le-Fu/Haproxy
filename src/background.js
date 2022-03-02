// function toggleState(currentState) {
//     return currentState === "on" ? "off" : "on";
// }

// function reset(currentState) {
//     if (currentState === "on") {
//         chrome.action.setIcon({ path: "on.png" });
//         chrome.action.setTitle({ title: "Status: ON" });

//         chrome.declarativeNetRequest.updateEnabledRulesets({
//             "enableRulesetIds": ["ruleset_1"]
//         });
//     } else {
//         chrome.action.setIcon({ path: "off.png" });
//         chrome.action.setTitle({ title: "Status: OFF" });

//         chrome.declarativeNetRequest.updateEnabledRulesets({
//             "disableRulesetIds": ["ruleset_1"]
//         });
//     }

//     chrome.storage.local.set({ currentState: currentState });
// }

// init state
// chrome.runtime.onStartup.addListener(() => {
//     chrome.storage.local.get("currentState", result => {
//         if (result.currentState === undefined) {
//             result.currentState = "on"; // default to "on"
//         }
//         reset(result.currentState); // reset state
//     });
// });

// chrome.action.onClicked.addListener(tab => {
//     chrome.storage.local.get("currentState", result => {
//         const currentState = toggleState(result.currentState);
//         reset(currentState);
//     });
// });
// function getText() {
//     let text = document.querySelector('#app > div.router-main > div > div.project-content > div > div.interface-content > div > div.ant-tabs.ant-tabs-top.ant-tabs-line > div.ant-tabs-content.ant-tabs-content-animated.ant-tabs-top-content > div.ant-tabs-tabpane.ant-tabs-tabpane-active > div.preview-content > div > div.base-info > div:nth-child(6) > span:nth-child(2) > span')
//     alert(text&&text.innerText)
// }

// chrome.contextMenus.create({
//     title: "测试右键菜单",
//     onclick: function (...args) {
//         chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
//             chrome.scripting.executeScript({
//                 target: { tabId: tab.id },
//                 function: getText,
//             });
//         });
//     }
// });


chrome.runtime.onInstalled.addListener(() => {
    chrome.webRequest.onBeforeRequest.addListener(
        function (detail) {
            return { cancel: details.url.indexOf("baidu.com") != -1 };;
        },
        { urls: ["<all_urls>"] },
        ["blocking"]
    );
});