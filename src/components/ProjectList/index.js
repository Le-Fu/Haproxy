import React from 'react'
import { useSelector } from '../../utils/hooks'

function ProjectList() {
    const data = useSelector(['projectData'])
    console.log(data);
    return (
        <div>
            
        </div>
    )
}

export default ProjectList