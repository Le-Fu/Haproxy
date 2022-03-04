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


// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         if (request.action == "getList") {
//             getCofingLocal(sendResponse)
//             return true
//         }
//         if (request.action == "setList") {
//             getCofingLocal(sendResponse)
//             return true
//         }

//         if (request.action == "remove") {
//             removeFromFramerList(request.value);
//             return true
//         }

//         if (request.action == "add") {
//             addToFramersList(request.value);
//             return true
//         }

//         console.log("How did we get here?!")
//     }
// );

// function saveFramersLocal(framers) {
//     chrome.storage.local.set({ 'framers': framers }, () => {
//     });
// }

// function loadFramersLocal(callback) {
//     chrome.storage.local.get(['framers'], (result) => {
//         callback(result.framers)
//     });
// }

// function addToFramersList(entry) {
//     chrome.storage.local.get(['framers'], (result) => {
//         let framersLoaded = result.framers
//         if (framersLoaded == undefined) framersLoaded = []
//         framersLoaded.push(entry)
//         updateUnblockRulesAdd(framersLoaded)
//         saveFramersLocal(framersLoaded)
//     });
// }

// function removeFromFramerList(entry) {
//     chrome.storage.local.get(['framers'], (result) => {
//         let framersLoaded = result.framers
//         framersLoaded = framersLoaded.filter((it) => {
//             return it != entry
//         })
//         saveFramersLocal(framersLoaded)
//     });
// }

// function addFramerRule(keyword) {
//     chrome.declarativeNetRequest.updateSessionRules(
//         { addRules: [generateUnblockRule(keyword)] }, () => {
//             if (chrome.runtime.lastError) {
//                 console.log(chrome.runtime.lastError.message);
//             }
//         }
//     )
// }

function genRules(configs) {
    let id = 0
    let res = []
    for (const { from, to } in configs) {
        res.push({
            "id": id++,
            "action": {
                "type": "redirect",
                "redirect": {
                    "transform": {
                        "host": to
                    }
                }
            },
            "condition": {
                "urlFilter": from,
                "excludedResourceTypes": ["other"],
                "isUrlFilterCaseSensitive": false
            }
        });
    }
    return res
}

let rules = []


chrome.storage.onChanged.addListener(
    function (changes, namespace) {
        console.log(changes, namespace);
        if (changes.proxyState) {
            if (changes.proxyState.newValue) {
                chrome.declarativeNetRequest.updateDynamicRules(
                    {
                        addRules: genRules(rules),
                        removeRules: ['ruleset_1']
                    },
                )
                chrome.declarativeNetRequest.updateEnabledRulesets({
                    "enableRulesetIds": ["ruleset_1"]
                });
            } else {
                chrome.declarativeNetRequest.updateEnabledRulesets({
                    "disableRulesetIds": ["ruleset_1"]
                });
            }
        }
        if (changes.configs) {
            rules = changes.configs.newValue.configs.map((it) => {
                return genRules(it)
            })
        }
    }
)