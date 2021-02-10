import axios from 'axios'
import SInfo from 'react-native-sensitive-info'

import { FETCH_URL } from '../constants'


axios.interceptors.request.use(
    async config => {
        console.log("CONFIG: ", config)
        const token  = await SInfo.getItem('access_token', {})
        if (token && config.url !== `${FETCH_URL}/auth/login/`)
            config.headers['Authorization'] = 'Bearer ' + token
        config.headers['Content-Type'] = 'application/json'

        return config
    },
    err => {
        Promise.reject(err)
    }
)


axios.interceptors.response.use(
    res => res,
    async function (err) {
        const originalRequest = err.config
        console.log("ERROR CONGOF: ", originalRequest)
        if (err.response && err.response.status === 401 && !originalRequest._retry) {
            console.log("REFRESHING TOKEN!")
            originalRequest._retry = true
            return SInfo.getItem('refresh_token', {}).then(token => {
                const config = {
                    headers: 
                    {
                        'Content-type': 'application/json',
                    },
                    withCredentials: true
                }
        
        
                const body = JSON.stringify({ refresh: token })
                
                axios.post(`${FETCH_URL}/api/v1/token/refresh/`, body, config)
                    .then(res => {
                        SInfo.setItem('access_token', res.data.access, {}).then(token => {
                            console.log("resolved: ", token)

                            axios(originalRequest)
                        })
                        SInfo.setItem('refresh_token', res.data.refresh, {})
                    }).catch(err => {
                        console.log(err)
                    })
            })
        }
        return Promise.reject(err)
    }
)

