import apiModel from './apiModel'
import projectModel from './projectModel'
import proxyModel from './proxyModel'
import menuModal from "./menuModel";

class HaProxy {
    instance = null
    project = projectModel
    api = apiModel
    proxy = proxyModel
    menu = menuModal

    static getInstance() {
        if (!this.instance) {
            this.instance = new HaProxy()
        }
        return this.instance
    }

    init() {
        (async () => {
            this.menu.init();
            const [, , proxyStatus] = await Promise.all([this.project.init(), this.api.init(), this.proxy.init()])
            if (proxyStatus) {
                await this.proxy.setCurrentStatus(1)
            } else {
                await this.proxy.setCurrentStatus(0)
            }
        })()
        return this
    }

    listen() {
        chrome.runtime.onMessage.addListener(
            (request, sender, sendResponse) => {
                if (request.type === "ADD_PROJECT") {
                    (async () => {
                        await this.project.handleAddProject(request.payload, sendResponse)
                    })()
                }

                if (request.type == "SELECT_PROJECT") {
                    (async () => {
                        await this.project.handleSelectProject(request.payload, sendResponse)
                    })()
                }

                if (request.type == "ADD_API") {
                    (async () => {
                        const projectId = await this.project.getCurrentProjectId()
                        await this.api.handleAddApi({
                            ...request.payload,
                            projectId
                        }, sendResponse)
                    })()
                }

                if (request.type == "UPDATE_API") {
                    (async () => {
                        await this.api.handleUpdateApi(request.payload, sendResponse)
                    })()
                }

                if (request.type === 'OPEN_PROXY') {
                    (async () => {
                        // await this.proxy.openProxy()
                        const projectId = await this.project.getCurrentProjectId()
                        await this.api.enabelRulesByApiList(projectId)
                        await this.proxy.setCurrentStatus(1, sendResponse)
                    })()
                }

                if (request.type === 'CLOSE_PROXY') {
                    (async () => {
                        // await this.proxy.closeProxy()
                        await this.api.unenabelRulesByApiList()
                        await this.proxy.setCurrentStatus(0, sendResponse)
                    })()
                }

                return true
            }
        )

        // 监听提取信息事件
        chrome.contextMenus.onClicked.addListener(
            this.menu.executeScriptInCurrentPage
        )

        chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(
            args => {
                console.log(args.request, args.rule)
            },
        )
    }
}

HaProxy.getInstance().init().listen()
