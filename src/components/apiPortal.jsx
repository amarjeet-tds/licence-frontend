import Button from '@mui/material/Button';
import { useHitRequest } from './apis';
import {useState , useEffect} from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { resetState } from '../reduxStore';
import { getPlanName } from './utils';

export const ApiPortal = ()=> {

    const hook = useHitRequest()
    const [apiResponse , setapiResponse] = useState([])
    const Locker = useSelector(state => state.locker)
    const dispatch = useDispatch()

    async function submitReq() {
        let res = await hook.mutateAsync()
        if (res?.data){
            setapiResponse(prev => [...prev,res.data])
            dispatch(resetState({"quota_left": res?.quota_left}))
        }
    }


    return (
        <div className="m-2">
            <div className="text-center font-bold font-mono text-4xl">API simulation</div>
            <div className="flex gap-4 border-[1px] p-2">
            {Locker['active_plan_id'] ? <div className="font-light text-lg">Active Plan: <span className="font-bold text-lg">{getPlanName(Locker['active_plan_id'])}</span></div>: 
            <div className="font-light text-lg"></div>}
            {Locker['quota_left'] ? <div className="font-light text-lg grow">Quota Left: <span className="font-bold text-lg" >{Locker['quota_left']+' requests'}</span></div> :
            <div className="font-light text-lg grow"></div>}
            <div className='mr-4'><Button disabled={Locker['quota_left']==null} onClick={submitReq} variant="outlined" color='success' >Hit Request</Button></div>
            </div>
            
            <div className="font-light text-lg">Response from server:</div>
            {apiResponse.map((itm,ind)=> {
                return (
                    <div key={`res_${ind}`}>
                        {itm}
                    </div>
                )
            })}

        </div>
    )
}