import Button from '@mui/material/Button';

export const ApiPortal = ()=> {

    return (
        <div className="m-2">
            <div className="text-center font-bold font-mono text-4xl">API simulation</div>
            <div className="flex gap-4 border-[1px] p-2">
            <div className="font-light text-lg">Active Plan: <span className="font-bold text-lg">Basic</span></div>
            <div className="font-light text-lg grow">Quota Left: <span className="font-bold text-lg" >5 requests</span></div>
            <div className='mr-4'><Button variant="outlined" color='success' >Hit Request</Button></div>
            </div>
            
            <div className="font-light text-lg">Response from server:</div>
            <div className="font-mono ">this is a response from server</div>

        </div>
    )
}