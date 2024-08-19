import { useEffect, useState, useMemo } from "react"
import { useActivatePlan, useGetAvailablePlans, useGetUserDashboard, useRefillQuota } from "./apis"
import { toast } from "react-toastify"
import { useOutletContext } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { resetState } from "../reduxStore"
import { activatePlan, getPlanName } from "./utils"


export const Home = () => {

    const [availablePlans, setavailablePlans] = useState([])
    const hook = useGetAvailablePlans()
    const activate_plan_hook = useActivatePlan()
    const refill_quota_hook = useRefillQuota()
    const user_dashboard_hook = useGetUserDashboard()
    const Locker = useSelector(state => state.locker)
    const dispatch = useDispatch()
    const [matrix, setmatrix] = useState(null)

    useEffect(() => {
        if (hook.fetchStatus == 'idle' && hook.status == 'success') {
            if (hook.data?.data) {
                setavailablePlans([...hook.data.data])
            }
        }
    }, [hook.status, hook.fetchStatus])


    useEffect(() => {
        let resetMatrix = null
        if (user_dashboard_hook.fetchStatus == 'idle' && user_dashboard_hook.status == 'success') {
            let res = user_dashboard_hook.data
            resetMatrix = res?.data ? res.data : null
        }
        setmatrix(resetMatrix)
    }, [user_dashboard_hook.status, user_dashboard_hook.fetchStatus])


    useEffect(() => {
        if (refill_quota_hook.status == 'success') {
            toast.success(refill_quota_hook.data?.message)
            dispatch(resetState({ "quota_left": refill_quota_hook.data?.quota_left }))
        }
    }, [refill_quota_hook.status])


    useEffect(() => {
        if (activate_plan_hook.status == 'success') {
            let res = activate_plan_hook.data
            let newState = {
                jwt_token: res['jwt_token'],
                active_plan_id: res['plan_id'],
                quota_left: res['quota_left'],
            }
            dispatch(resetState(newState))
        }
    }, [activate_plan_hook.status])

    
    useEffect(() => {
        user_dashboard_hook.refetch()

    }, [Locker.jwt_token])






    return (
        <div className="m-2">
            <div className="text-center font-bold font-mono text-4xl">Available Plans</div>
            <div className="flex justify-center gap-10 mt-6">
                {availablePlans.map(plan => {
                    let isActive = Locker['active_plan_id'] == plan.id
                    return (
                        <div key={plan.id} className="h-[7rem] w-[20rem] border-[1px] shadow-md rounded-lg text-center">
                            <div className="font-bold font-mono text-2xl">{plan.name}</div>
                            <div className="font-light text-sm">(Quota of {plan.quota} requests)</div>
                            <div className="flex justify-around mt-6">
                                <button disabled={!isActive} onClick={() => refill_quota_hook.mutate()} className="disabled:bg-gray-200 border-[1px] w-28 rounder-sm shadow-sm hover:shadow-md disabled:hover:shadow-none">Refil Quota</button>
                                <button onClick={() => activatePlan(activate_plan_hook,plan.id, Locker['user_name'])} className={`${isActive ? 'bg-green-600 text-white' : ''} border-[1px] w-28 rounder-sm shadow-sm hover:shadow-md `}>{isActive ? 'Activated plan' : 'Activate Plan'}</button>
                            </div>
                        </div>
                    )
                })}



            </div>
            <div className="text-center font-medium text-lg mt-3" >{Locker['quota_left']} Requests remains in Active plan</div>
            <div className="border-b-2 w-full h-1 mt-10" />
            <div>
                <div className="text-center font-bold font-mono text-4xl mt-1">API usage Matrix</div>

                <div className="h-[35rem] overflow-y-scroll">
                {user_dashboard_hook.isFetching ? <div>Loading...</div> :
                   
                        <>
                             {matrix === null ? <div>No Data Found</div> :
                                <table className=" min-w-full bg-white border border-gray-300 mt-4">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 bg-gray-200 border-b border-gray-300">Plan Used</th>
                                            <th className="py-2 px-4 bg-gray-200 border-b border-gray-300">Total Hits</th>
                                            <th className="py-2 px-4 bg-gray-200 border-b border-gray-300">Success Hits</th>
                                            <th className="py-2 px-4 bg-gray-200 border-b border-gray-300">Error Hits</th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody >

                                        <tr>
                                            <td className="py-2 px-4 border-b border-gray-300 text-center border-r-[1px] rounded-sm">{getPlanName(matrix.plan_id)}</td>
                                            <td className="py-2 px-4 border-b border-gray-300 text-center border-r-[1px] rounded-sm">{matrix.total_hits}</td>
                                            <td className="py-2 px-4 border-b border-gray-300 text-center border-r-[1px] rounded-sm">{matrix.success_hits}</td>
                                            <td className="py-2 px-4 border-b border-gray-300 text-center border-r-[1px] rounded-sm">{matrix.error_hits}</td>
                                           
                                        </tr>


                                    </tbody>
                                </table>}
                        </>
                    }
                </div>

            </div>
        </div>
    )
}