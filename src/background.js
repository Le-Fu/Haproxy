// chrome.runtime.onStartup.addListener(() => {
// initSwitch();
// });
/** ——————起—————— 事件系统 —————起————— */
// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log(request, sender, sendResponse);
//         if (request.type === "toggle") {
//             reset(toggleState(request.value), sendResponse);
//             return true;
//         }

//         // if (request.action == "getProjectList") {
//         //     getProjectListFromLocal(sendResponse)
//         //     return true
//         // }

//         // if (request.action == "saveProjectList") {
//         //     return true
//         // }

//         // if (request.action == "add") {
//         //     return true
//         // }

//         return true
//     }
// );

/** ——————止—————— 事件系统 —————止————— */


/** ——————起—————— 开关相关 —————起————— */
// function toggleState(currentState) {
//     return currentState === "on" ? "off" : "on";
// }

// function reset(currentState, cb) {
//     if (currentState === "on") {
//         chrome.declarativeNetRequest.updateEnabledRulesets({
//             "enableRulesetIds": ["ruleset_1"]
//         }, cb);
//     } else {
//         chrome.declarativeNetRequest.updateEnabledRulesets({
//             "disableRulesetIds": ["ruleset_1"]
//         }, cb);
//     }

//     chrome.storage.local.set({ currentState: currentState });
//     return true
// }

// function initSwitch() {
//     chrome.storage.local.get("currentState", result => {
//         if (result.currentState === undefined) {
//             result.currentState = "on"; // default to "on"
//         }
//         reset(result.currentState); // reset state
//     });
// }

/** ——————止—————— 开关相关 —————止————— */



/** ——————起—————— 开关相关 —————起————— */


/** ——————止—————— 开关相关 —————止————— */
// chrome.storage.local.get("currentState", result => {
//     const currentState = toggleState(result.currentState);
//     reset(currentState);
// });

class HaProxy {
    constructor(prefix) {
        this.prefix = prefix;
        this.init()
    }
    init() {
        console.log("init");
        chrome.storage.local.get("currentState", result => {
            
        });
    }
    genId(type) {
        return `${this.prefix}_${type}_${Date.now()}`;
    }
    saveDataList(items, cb) {

        // chrome.storage.local.set({ruleData: }, cb);
    }
    // getRuleData
    // gen
    listen() {
        chrome.runtime.onMessage.addListener(
            function (request, sender, sendResponse) {
                console.log(request, sender, sendResponse);
                if (request.type === "toggle") {
                    console.log(request);
                    // reset(toggleState(request.value), sendResponse);
                    return true;
                }

                // if (request.action == "getProjectList") {
                //     getProjectListFromLocal(sendResponse)
                //     return true
                // }

                // if (request.action == "saveProjectList") {
                //     return true
                // }

                // if (request.action == "add") {
                //     return true
                // }

                return true
            }
        );
    }
}


new HaProxy("haproxy").listen();