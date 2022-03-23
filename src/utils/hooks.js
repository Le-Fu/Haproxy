import { useState } from 'react'
export const useSelector = (selector = null) => {
    const [state, setState] = useState({})
    chrome.storage.local.get(selector, (data) => {
        console.log('selectorData', data);
        setState(data || {})
    })
    chrome.storage.onChanged.addListener((changes, areaName) => {
        console.log('useSelector', changes);
        console.log('useSelector', areaName);
        console.log('useSelector', selector);
    })
    return state || {}
}

export const useDispatch = () => {
    return (action) => new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(action, (res) => {
            resolve(res)
        })
    })
}