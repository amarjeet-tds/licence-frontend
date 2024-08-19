import { useMutation, useQuery } from "@tanstack/react-query"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

export const useHitRequest = () => {
    const Locker = useSelector(state=> state.locker)
    return useMutation({
        retry: false,
        mutationFn: async ()=> {
            try {
                const config = {
                    method: 'get', // Specify the request method
                    url: BACKEND_URL+'/hit_api', // The URL for the request
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Locker['jwt_token']}` // Add any required headers
                    },
                    // params: { 
                    //     userId: 1 // Query parameters
                    // }
                    // signal: signal
                };
                
                let res = await axios(config)
                return res.data

            } catch (error) {
                let message = ''
                if (error.response) {
                    message =  error.response.data?.message
                } else if (error.request) {
                    message = error.request
                } else {
                    message = error.message
                }
                toast.error(message)
            }
        }
    })
}


export const useGetAvailablePlans = () => {
    return useQuery({
        retry: false,
        refetchOnWindowFocus: false,
        queryFn: async ()=> {
            try {
                const config = {
                    method: 'get', // Specify the request method
                    url: BACKEND_URL+'/list_plans', // The URL for the request
                    headers: { 
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer YOUR_TOKEN_HERE' // Add any required headers
                    },
                    // params: { 
                    //     userId: 1 // Query parameters
                    // }
                    // signal: signal
                };
                
                let res = await axios(config)
                return res.data

            } catch (error) {
                let message = ''
                if (error.response) {
                    message =  error.response.data?.message
                } else if (error.request) {
                    message = error.request
                } else {
                    message = error.message
                }
                toast.error(message)
            }
        }
    })
}


export const useActivatePlan = () => {
    return useMutation({
        retry: false,
        mutationFn: async (body)=> {
            try {
                const config = {
                    method: 'get', // Specify the request method
                    url: BACKEND_URL+'/activate_plan', // The URL for the request
                    headers: { 
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer YOUR_TOKEN_HERE' // Add any required headers
                    },
                    params: body
                    // signal: signal
                };
                
                let res = await axios(config)
                return res.data

            } catch (error) {
                let message = ''
                if (error.response) {
                    message =  error.response.data?.message
                } else if (error.request) {
                    message = error.request
                } else {
                    message = error.message
                }
                toast.error(message)
            }
        }
    })
}

export const useRefillQuota = () => {
    const Locker = useSelector(state=> state.locker)
    return useMutation({
        retry: false,
        mutationFn: async ()=> {
            try {
                const config = {
                    method: 'get', // Specify the request method
                    url: BACKEND_URL+'/reset_quota', // The URL for the request
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Locker['jwt_token']}` // Add any required headers
                    },
                    // params: body
                    // signal: signal
                };
                
                let res = await axios(config)
                return res.data

            } catch (error) {
                let message = ''
                if (error.response) {
                    message =  error.response.data?.message
                } else if (error.request) {
                    message = error.request
                } else {
                    message = error.message
                }
                toast.error(message)
            }
        }
    })
}

export const useGetUserDashboard = () => {
    const Locker = useSelector(state=> state.locker)
    return useQuery({
        queryKey: 'dashboard',
        retry: false,
        refetchOnWindowFocus: false,
        queryFn: async ()=> {
            try {
                const config = {
                    method: 'get', // Specify the request method
                    url: BACKEND_URL+'/user_dashboard', // The URL for the request
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Locker['jwt_token']}` // Add any required headers
                    },
                    // params: { 
                    //     userId: 1 // Query parameters
                    // }
                    // signal: signal
                };
                
                let res = await axios(config)
                return res.data

            } catch (error) {
                let message = ''
                if (error.response) {
                    message =  error.response.data?.message
                } else if (error.request) {
                    message = error.request
                } else {
                    message = error.message
                }
                
                // toast.error(message)
            }
        }
    })
}
