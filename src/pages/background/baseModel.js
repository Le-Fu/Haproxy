import store from '../../utils/store'

class BaseModel {
    async getData(dataKey) {
        const result = await store.get(dataKey)
        return result[dataKey]
    }

    async setData(dataKey, data) {
        await store.set({ [dataKey]: data })
        console.log(`set ${dataKey} data:`, data);
    }
}

export default BaseModel