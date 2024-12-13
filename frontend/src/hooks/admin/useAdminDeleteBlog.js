import React, { useState } from 'react'
import toast from 'react-hot-toast'

const useAdminDeleteBlog = () => {
    const [loading, setloading] = useState(false)
 const deleteBlog = async(blogId)=>{
    try {
        setloading(true)
        const res = await fetch (`/api/admin/delete/${blogId}`,{
            method:"DELETE"
        })
        const data = await res.json()
        if(!res.ok){
            toast.error(data.message)
            return
        }
        toast.success(data.message)
        
    } catch (error) {
        toast.error(error.message)
    }
    finally{
setloading(false)
    }
 }
 return {loading , deleteBlog}
}

export default useAdminDeleteBlog