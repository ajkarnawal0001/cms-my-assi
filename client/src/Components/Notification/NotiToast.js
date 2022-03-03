import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
   
import React from 'react'

toast.configure()

export const NotiToast = (type,mssg)=>{
    if(type==='success'){
        toast.success(mssg)
    }else{
        
    type==='error' && (
        toast.error(mssg)
    )}

}
