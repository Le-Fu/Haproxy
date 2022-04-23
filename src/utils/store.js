const store = {
    get(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(key, (items) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve(items);
            });
        });
    },
    set(data) {
        return new Promise((resolve, reject) => {
            console.log(data,'set');
            chrome.storage.local.set(data, () => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                resolve(true);
            });
        });
    },
}

export default store