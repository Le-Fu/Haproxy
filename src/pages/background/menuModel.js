
class MenuModal {
    init() {
        //页面添加抓取按钮
        chrome.contextMenus.create(
            {
                contexts: ['page'],
                id: '123321qwe',
                title: '抓取',
                type: "normal"
            },
            () => { }
        )
    }

    executeScriptInCurrentPage() {
        chrome.tabs.query({ active: true, currentWindow: true }).then(res => {
            let [tab1] = res;
            //这里的this不是指向当前实例的
            chrome.scripting.executeScript({
                target: { tabId: tab1.id },
                func: extractApiInfo

            });
        })
    }

}

function extractApiInfo() {

    const nodeList = document.getElementsByClassName('base-item');

    let copyInfo = {
        desc: '',
        mockId: '',
        from: '',
        to: ''
    }

    if (nodeList.length >= 6) {
        copyInfo.desc = (nodeList[0].children[1].innerText).trim();
        copyInfo.mockId = (nodeList[1].children[0].children[1].innerText).trim();
        copyInfo.from = `(.*)(${(nodeList[5].children[1].children[1].innerText).trim()})(.*)`;
        copyInfo.to = `https://hapi.58corp.com/mock/${copyInfo.mockId}`;
    }

    chrome.runtime.sendMessage({
        type: "ADD_API",
        payload: copyInfo,
    }, (res) => { })

}

export default new MenuModal()