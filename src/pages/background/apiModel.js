import BaseModel from './baseModel'
import { genId, stringToId } from '../../utils'
class ApiModel extends BaseModel {

    dataKey = 'apiData'

    typeVal = 'api'

    async init() {
        let data = await this.getData(this.dataKey)
        if (data === undefined) {
            data = {
                "list": [{
                    "id": genId(this.typeVal),
                    "projectId": 'init_project_id',
                    "mockId": "60e6a7bb977b160387572dac",
                    "desc": "根据id获取代持方",
                    "from": "(.*)(/dealerloanadmin/proxyholder/detail)(.*)",
                    "to": "https://hapi.hello.com/mock/60e6a7bb977b160387572dac",
                    "status": true,
                }]
            }
            await this.setData(this.dataKey, data)
        }
        return data
    }

    checkIsExistByMockId(mockId, list) {
        return list.filter(item => item.mockId === mockId).length > 0
    }

    async handleAddApi(config, sendResponse = data => data) {
        let data = await this.getData(this.dataKey)

        if (this.checkIsExistByMockId(config.mockId, data.list || [])) {
            return sendResponse({ code: 1, msg: '已存在' })
        }

        data = {
            "currentValue": data.currentValue,
            "list": [{
                id: genId(this.typeVal),
                status: true,
                ...config
            }].concat(data.list)
        }

        await this.setData(this.dataKey, data)

        return sendResponse({ code: 0, data })
    }

    async handleUpdateApi(config, sendResponse = data => data) {
        const id = config.id
        let data = await this.getData(this.dataKey)

        data = {
            "currentValue": data.currentValue,
            "list": data.list.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        ...config
                    }
                }
                return item
            })
        }

        await this.setData(this.dataKey, data)

        return sendResponse({ code: 0, data })
    }

    genRule({
        id,
        from,
        to,
        mockId
    }) {
        return {
            "id": stringToId(from),
            "priority": 1,
            "condition": { "regexFilter": from },
            "action": {
                "type": "redirect",
                "redirect": {
                    "regexSubstitution": to
                }
            }
        }
    }

    filterApiListByIdAndeStatus(projectId) {
        return apiItem => apiItem?.projectId === projectId && apiItem?.status
    }

    async enabelRulesByApiList(projectId) {
        if (!projectId) return false
        let data = await this.getData(this.dataKey)
        const apiList = data?.list

        const rules = apiList.filter(this.filterApiListByIdAndeStatus(projectId)).map(this.genRule)

        let sessionRulesAll = await chrome.declarativeNetRequest.getSessionRules()

        await chrome.declarativeNetRequest.updateSessionRules(
            { removeRuleIds: sessionRulesAll.map(item => item.id), addRules: rules, }
        )
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
            return false
        }
        return true
    }

    async unenabelRulesByApiList() {
        let sessionRulesAll = await chrome.declarativeNetRequest.getSessionRules()
        await chrome.declarativeNetRequest.updateSessionRules(
            { removeRuleIds: sessionRulesAll.map(item => item.id) }
        )
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
            return false
        }
        return true
    }



}

export default new ApiModel()