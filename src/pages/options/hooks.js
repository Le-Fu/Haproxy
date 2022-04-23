import { useState } from 'react'
function isDifferentInDeep(a, b) {
    try {
        return JSON.stringify(a) !== JSON.stringify(b)
    } catch (error) {
        console.log(error);
        return false
    }
}

export const useSelector = (selector = null) => {
    const [state, setState] = useState()
    if (state === undefined) {
        chrome.storage.local.get(selector, (result) => {
            const data = result[selector] || {}
            if (isDifferentInDeep(data, state)) {
                setState(data)
            }
        })
    }

    chrome.storage.onChanged.addListener((changes, areaName) => {
        console.log(selector, 'change', changes);
        if (areaName === 'local') {
            const { newValue, oldValue } = changes[selector] || {}
            if (isDifferentInDeep(newValue, oldValue)) {
                console.log('different');
                setState(newValue)
            }
        }
    })

    return state
}

export const useDispatch = () => {
    return (action) => new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(action, (res) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(res)
        })
    })
}