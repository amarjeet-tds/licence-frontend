import { useEffect, useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import { useActivatePlan } from "./apis";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../reduxStore";

export const Navigation = () => {
    const Locker = useSelector(state => state.locker)
    const dispatch = useDispatch()
    const [userName , setuserName]= useState(Locker["user_name"])
    const [UserChanged,setUserChanged] = useState(false)
    const hook = useActivatePlan()

    function addNewUser(newname) {
        setuserName(newname)
    }
    function handleSaveUser() {
     
        setUserChanged(false)

        if (userName ==""){
            let newState = {
                user_name: "",
                quota_left : null,
                jwt_token: null,
                active_plan_id: null
            }
            dispatch(resetState(newState))
        }
        else{
            let newState = {
                user_name: userName,
                
            }
            dispatch(resetState(newState))
            let body = {
                user_name: userName,
                plan_id:Locker["plan_id"]
            }
            hook.mutate(body)
        }
        
    }
    useEffect(()=> {
        setUserChanged(userName !== Locker["user_name"])
    },[userName])

    useEffect(()=> {
        if (hook.status =='success'){
            let res = hook.data
            let newState = {
                jwt_token : res['jwt_token'],
                active_plan_id: res['plan_id'],
                quota_left: res['quota_left']
            }
            dispatch(resetState(newState))
        }
    },[hook.status])

    useEffect(() => {
        if (userName !==""){
            let body = {
                user_name: userName,
                plan_id:Locker["plan_id"]
            }
            hook.mutate(body)
        }
    }, [])
    

    return (
        <div className="flex grow h-full overflow-hidden">
            
            <div className=" h-full w-1/6 border-r-2 flex flex-col ">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'border-green-700 ' : '') + 'h-10 m-2 p-2 border-[2px] text-center block rounded-sm'}>
                    Home
                </NavLink>
                <NavLink to="apiPortal" className={({ isActive }) => (isActive ? 'border-green-700 ' : '') + 'h-10 m-2 p-2 border-[2px] text-center block rounded-sm'}>
                    API
                </NavLink>

                <div className="border-b-[1px] h-1 grow"></div>
                <div className="font-bold text-sm ml-2">User name</div>
                <div className='mb-10 h-10 m-2 p-2 border-[2px] text-center rounded-sm items-center flex justify-between'>
                    <input className="outline-none" type="text" name="user_name" id="user_name" value={userName} onChange={(e)=> addNewUser(e.target.value) } />
                    {UserChanged && <button onClick={()=> handleSaveUser()} className="border-[1px] rounded-sm border-green-600">Save</button>}
                </div>

            </div>
            <div className="h-full  grow ">
                <Outlet/>
            </div>

        </div>

    )
}