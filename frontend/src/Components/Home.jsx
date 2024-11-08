import React, { useEffect } from 'react'
import { getLoggedinUser, logoutUser } from '../services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedin, setUser } from '../redux/reducers/UserReducer'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { user } = useSelector(state => state.user)
    async function fetchLoggedinUser() {
        let fetchLoggedinUserRes = await getLoggedinUser()        
        if(fetchLoggedinUserRes.status === 200) {
            dispatch(setUser(fetchLoggedinUserRes.data))
        }
        else {
            console.log("Error fetching Logged in User")
        }
    }

    useEffect(() => {
        fetchLoggedinUser()
    },[])

    useEffect(() => {
        const cookie = document.cookie
        if(cookie) {
            return navigate("/home")
        }
        return navigate("/login")
    },[])

    async function handleLogout() {
        let handleLogoutRes = await logoutUser()
        if(handleLogoutRes.status === 200) {
            toast.success("Logout Success")
            dispatch(setLoggedin(false))
            dispatch(setUser(null))
            navigate("/login")
        }
        else if(handleLogoutRes.status === 500) {
            toast.error("Error Logging You Out")
        }
    }

    return (
        <div className='w-full h-screen bg-zinc-900 text-white p-10'>
            <div className='w-full flex justify-between'>
            <h1 className='text-3xl font-semibold mb-5'>Hello, {user && user.name}</h1>
            <span onClick={handleLogout} className='text-red-500 cursor-pointer'>
                Logout
            </span>
            </div>
        </div>
    )
}

export default Home