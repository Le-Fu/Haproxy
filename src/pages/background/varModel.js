import BaseModel from "./baseModel";

class VarModel extends BaseModel {

    dataKey = 'varData';

    async init() {
        let data = await this.getData(this.dataKey)
        if (data === undefined) {
            data = {
                "varName": "环境",
                "varValue": "domain",
                "currentValue": 'https://hapi.69corp.com',
                "options": [
                    {
                        "label": "MOCK",
                        "value": "https://hapi.69corp.com"
                    },
                    {
                        "label": "测试一",
                        "value": "https://test1.69corp.com"
                    },
                ]
            }
            await this.setData(this.dataKey, data)
        }
        return data
    }

    async getCurrentVar() {
        let data = await this.getData(this.dataKey)
        return data?.currentValue
    }

    async updateVarData(data, sendResponse = data => data) {
        let oldData = await this.getData(this.dataKey)
        let newData = {
            ...oldData,
            ...data
        }
        await this.setData(this.dataKey, newData)
        return sendResponse({ code: 0, newData })
    }

}

export default new VarModel()