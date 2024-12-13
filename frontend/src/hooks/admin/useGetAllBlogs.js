import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import {setBlogs} from '../../store/blogSlice.js'

const useGetAllBlogs = () => {
    const [loading, setloading] = useState(false)
 const dispatch =  useDispatch()
const getAllBlogs =async ()=>{
    try {

        setloading(true)
        const res = await fetch("/api/admin/getallblogs")
        const data = await res.json()
        if(!res.ok){
            toast.error(data.message)
            return
        }
      
        dispatch(setBlogs(data))
        
    } catch (error) {
        toast.error(error.message)
    }
    finally{
        setloading(false)
    }
}
return {loading,getAllBlogs}
}

export default useGetAllBlogs