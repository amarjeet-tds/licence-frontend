import { useEffect, useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";

export const Navigation = () => {
    const [userName , setuserName]= useState(()=> {
        if (localStorage.getItem("user_name") ==null){
            localStorage.setItem("user_name", "")
        }
        return localStorage.getItem("user_name")
    })
    const [UserChanged,setUserChanged] = useState(false)


    function addNewUser(newname) {
        setuserName(newname)
    }
    function handleSaveUser() {
        localStorage.setItem("user_name", userName)
        setUserChanged(false)
        
    }
    useEffect(()=> {
        setUserChanged(userName !== localStorage.getItem("user_name"))
    },[userName])

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
                <Outlet />
            </div>

        </div>

    )
}