import { genId } from '../../utils'
import BaseModel from './baseModel'
import ApiModel from './apiModel';

class Project extends BaseModel {

    dataKey = 'projectData';

    init_id = 'init_project_id';

    typeVal = 'project';

    async init() {
        let data = await this.getData(this.dataKey)
        if (data === undefined) {
            data = {
                "currentValue": this.init_id,
                "list": [{
                    "id": this.init_id,
                    "name": '示例项目'
                }]
            }
            await this.setData(this.dataKey, data)
        }
        return data
    }

    async getCurrentProjectId() {
        let { currentValue } = await this.getData(this.dataKey)
        return currentValue
    }

    async handleAddProject(projectName, sendResponse = data => data) {
        let data = await this.getData(this.dataKey);

        data = {
            "currentValue": data.currentValue,
            "list": data.list.concat([{
                id: genId(this.typeVal),
                name: projectName
            }])
        }

        await this.setData(this.dataKey, data)

        return sendResponse({ code: 0, data })
    }

    async handleSelectProject(projectId, sendResponse = data => data) {

        let data = await this.getData(this.dataKey)

        data = {
            ...data,
            "currentValue": projectId,
        }

        await this.setData(this.dataKey, data)

        return sendResponse({ code: 0, data })
    }

    /**
     * 删除项目
     * @param {*} projectId 项目id
     */
    async handleDelectProject(projectId, sendResponse = data => data) {
        let data = await this.getData(this.dataKey);
        const { currentValue, list } = data;
        let newCurrentValue = currentValue;

        if (currentValue === projectId) {   // 如果删除项目为当前所选择项目，则将接口转发规则也删除
            let sessionRulesAll = await chrome.declarativeNetRequest.getSessionRules();
            await chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: sessionRulesAll.map(item => item.id) })
            newCurrentValue = "";
        }

        data = {
            "currentValue": newCurrentValue,
            "list": list.filter((item) => item.id !== projectId)
        }

        await ApiModel.handleBatchDeleteApi(projectId);
        await this.setData(this.dataKey, data)
        return sendResponse({ code: 0, data })
    }
}

export default new Project()