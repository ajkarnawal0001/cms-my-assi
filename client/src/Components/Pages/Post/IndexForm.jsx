import React, { useEffect, useState } from 'react'
import { GetData } from '../../../Utils/LocalStorage'
import  VlogForm  from './VlogForm'

export const IndexForm = () => {
    const [userid,setUserId] = useState("")

    useEffect(()=>{
        let data = GetData('loggedInData')
        // data = JSON.parse(data.data)
        setUserId(data.user)
    },[])
  return (
            <>
                <VlogForm userid={userid} />
            </>
    )
}
