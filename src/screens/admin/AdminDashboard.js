import React,{useEffect} from 'react'
import {useSelector} from 'react-redux'

const AdminDashboard = ({history}) => {
    const userState = useSelector(({user}) => user)
    const {loading, user} = userState

    useEffect(()=>{
        if(!loading && !user.isAdmin){
history.push('/')
        }
    },[])
    return (
        <div>
            test Admin
        </div>
    )
}

export default AdminDashboard
