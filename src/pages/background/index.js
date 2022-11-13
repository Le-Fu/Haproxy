import apiModel from './apiModel'
import projectModel from './projectModel'
import proxyModel from './proxyModel'
import menuModal from "./menuModel";
import varModel from "./varModel";

class HaProxy {
    instance = null
    project = projectModel
    api = apiModel
    proxy = proxyModel
    menu = menuModal
    var = varModel

    static getInstance() {
        if (!this.instance) {
            this.instance = new HaProxy()
        }
        return this.instance
    }

    init() {
        (async () => {
            this.menu.init();
            const [, , proxyStatus] = await Promise.all([this.project.init(), this.api.init(), this.proxy.init(), this.var.init()])
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
                console.log(request);
                if (request.type === "ADD_PROJECT") {
                    (async () => {
                        await this.project.handleAddProject(request.payload, sendResponse)
                    })()
                }

                if (request.type == "SELECT_PROJECT") {
                    (async () => {
                        await this.project.handleSelectProject(request.payload, sendResponse)
                        // 切换项目时，如果总开关是关闭状态，则不生成规则
                        const projectId = await this.project.getCurrentProjectId()
                        let proxyStatus = await this.proxy.getCurrentStatus()
                        if (proxyStatus === 1) {
                            const curVar = await this.var.getCurVar()
                            await this.api.enabelRulesByApiList(projectId, curVar);
                        }
                    })()
                }

                if (request.type == "DELETE_PROJECT") {
                    (async () => {
                        await this.project.handleDelectProject(request.payload, sendResponse)
                    })()
                }

                if (request.type == "ADD_API") {
                    (async () => {
                        const projectId = await this.project.getCurrentProjectId()
                        const curVar = await this.var.getCurrentVar()
                        await this.api.handleAddApi(curVar, {
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
                        const curVar = await this.var.getCurrentVar()
                        await this.api.enabelRulesByApiList(projectId, curVar)
                        await this.proxy.setCurrentStatus(1, sendResponse)
                    })()
                }

                if (request.type === 'DELETE_API') {
                    (async () => {
                        await this.api.handleDeleteApi({ ...request.payload, }, sendResponse);
                    })()
                }

                if (request.type === 'SWITCH_API_STATUS') {
                    (async () => {
                        const curVar = await this.var.getCurrentVar()
                        await this.api.handleSwitchApiStatus(curVar, { ...request.payload, }, sendResponse);
                    })()
                }

                if (request.type === 'CLOSE_PROXY') {
                    (async () => {
                        // await this.proxy.closeProxy()
                        await this.api.unenabelRulesByApiList()
                        await this.proxy.setCurrentStatus(0, sendResponse)
                    })()
                }

                if (request.type === 'CHANGE_VAR') {
                    (async () => {
                        const projectId = await this.project.getCurrentProjectId()
                        console.log(projectId);
                        await this.var.updateVarData(request.payload, sendResponse)
                        const curVar = await this.var.getCurrentVar()
                        await this.api.enabelRulesByApiList(projectId, curVar)
                    })()
                }

                if (request.type === 'UPDATE_VAR_DATA') {
                    (async () => {
                        // 更改枚举时,需要把当前生效session数据更新
                        console.log(request.payload);
                        await this.var.updateVarData(request.payload, sendResponse)
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
