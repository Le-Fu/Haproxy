import React from 'react'
import { useSelector } from '../../utils/hooks'

function ApiList() {
    const data = useSelector(['apiData'])
    console.log(data);
    return (
        <div></div>
    )
}

export default ApiList