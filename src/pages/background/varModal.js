import BaseModel from "./baseModel";

class VarModel extends BaseModel {

    dataKey = 'varData';

    async init() {
        let data = await this.getData(this.dataKey)
        if (data === undefined) {
            data = {
                
            }
            await this.setData(this.dataKey, data)
        }
        return data
    }

    async getCurrentStatus(sendResponse = data => data) {
        let data = await this.getData(this.dataKey)
        return sendResponse({ code: 0, data })
    }

    async setCurrentStatus(data, sendResponse = data => data) {
        await this.setData(this.dataKey, data)
        return sendResponse({ code: 0, data })
    }

    async openProxy(sendResponse = data => data) {
        await chrome.declarativeNetRequest.updateEnabledRulesets({
            "enableRulesetIds": ["ruleset_1"]
        });
        return sendResponse({ code: 0 })
    }

    async closeProxy(sendResponse = data => data) {
        await chrome.declarativeNetRequest.updateEnabledRulesets({
            "disableRulesetIds": ["ruleset_1"]
        });
        return sendResponse({ code: 0 })
    }

}

export default new VarModel()