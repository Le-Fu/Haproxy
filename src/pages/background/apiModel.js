import BaseModel from './baseModel'
import varModel from './varModel'
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
                    "from": "path/to/api",
                    "to": "http://mock.com/path/to/api",
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

    async handleAddApi(curVar,config, sendResponse = data => data) {
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

        await this.addForwardingRule([this.genRule(curVar,config)]);
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

    /**
     * 批量删除接口
     */
    async handleBatchDeleteApi(projectId) {

        let data = await this.getData(this.dataKey);

        data = {
            "list": data.list.filter((item) => item.projectId !== projectId)
        }

        await this.setData(this.dataKey, data)
    }

    /**
     *  删除单个接口
     */
    async handleDeleteApi(config, sendResponse = data => data) {
        const id = config.id;
        const from = config.from;
        let data = await this.getData(this.dataKey);

        data = {
            "list": data.list.filter((item) => item.id !== id)
        }

        await this.setData(this.dataKey, data)
        await this.deleteForwardingRule([stringToId(from)]);
        return sendResponse({ code: 0, data })
    }

    /**
     * 单个接口开关
     * @param {*} config 接口数据
     */
    async handleSwitchApiStatus(curVar,config, sendResponse = data => data) {
        const { id, checked, from } = config;
        let data = await this.getData(this.dataKey)

        data = {
            "list": data.list.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        status: checked
                    }
                }
                return item
            })
        }
        await this.setData(this.dataKey, data);
        if (checked) {
            await this.addForwardingRule([this.genRule(curVar, config)]);
        } else {
            await this.deleteForwardingRule([stringToId(from)]);
        }
        return sendResponse({ code: 0, data })
    }

    /**
     * 添加规则
     * @param {*} addRules 参数必须为数组，规则对象
     */
    async addForwardingRule(addRules) {
        let proxyStatus = await this.getData('proxyStatus')
        if (proxyStatus === 1) {
            await chrome.declarativeNetRequest.updateSessionRules({ addRules })
        }
    }

    /**
     * 删除规则
     * @param {*} removeRuleIds 参数必须为数组，规则id
     */
    async deleteForwardingRule(removeRuleIds) {
        await chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds })
    }

    genRule(curVar,{
        id,
        from,
        to,
        mockId
    }) {
        console.log(curVar, from);
        return {
            "id": stringToId(from),
            "priority": 1,
            "condition": { "regexFilter": `(.*)(${from})(.*)` },
            "action": {
                "type": "redirect",
                "redirect": {
                    "regexSubstitution": to ? to : curVar === 'https://hapi.69corp.com' ? `${curVar}/mock/${mockId}` : `${curVar}${from}\\3`
                }
            }
        }
    }

    filterApiListByIdAndeStatus(projectId) {
        return apiItem => apiItem?.projectId === projectId && apiItem?.status
    }

    async enabelRulesByApiList(projectId, curVar) {
        if (!projectId) return false
        let data = await this.getData(this.dataKey)
        const apiList = data?.list

        const rules = apiList.filter(this.filterApiListByIdAndeStatus(projectId)).map(this.genRule.bind(this, curVar))

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