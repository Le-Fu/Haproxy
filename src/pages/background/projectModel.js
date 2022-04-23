import { genId } from '../../utils'
import BaseModel from './baseModel'

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
}

export default new Project()