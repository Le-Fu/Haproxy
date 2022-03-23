import React from 'react'
import { Switch } from 'antd'
import './style.scss'

function Header() {
    
    const handleAllStatusChange = (checked) => {
        // chrome.runtime.sendMessage({ action: 'toggle', value: checked }, () => {

        // })
    }

    return (
        <div className='header'>
            <div className='header__left'>
            </div>
            <div className='header__right'>
                <Switch checkedChildren="开启" unCheckedChildren="关闭" onChange={handleAllStatusChange} />
            </div>
        </div>
    )
}

export default Header