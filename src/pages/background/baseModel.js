import store from '../../utils/store'

class BaseModel {
    async getData(dataKey) {
        const result = await store.get(dataKey)
        return result[dataKey]
    }

    async setData(dataKey, data) {
        console.log(dataKey, data);
        await store.set({ [dataKey]: data })
    }
}

export default BaseModel