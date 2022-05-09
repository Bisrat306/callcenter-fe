import { data } from "autoprefixer";
import axios from "axios";
import axiosRetry from "axios-retry";
import { baseUrl } from '../utils/constants';

axiosRetry(axios, {retries: Number.MAX_SAFE_INTEGER});

const  Transport = {
    HTTP: {
        sampleGet: (id) =>
            axios({
                url: baseUrl + `sample/${id}`,
                method: "GET",
            }),
        samplePost: (data) =>
            axios({
                url: baseUrl + `sample`,
                method: "POST",
                data: data
            }),
        login: (data) =>
            axios({
                url: baseUrl + `auth/login`,
                method: "POST",
                data: data
            }),
        getCalls: (token) =>
            axios({
                url: baseUrl + `calls`,
                method: "GET",
                headers: {
                    authorization : "Bearer " + token
                }
        }),
        getUsers: (token) =>
            axios({
                url: baseUrl + `user`,
                method: "GET",
                headers: {
                    authorization : "Bearer " + token
                }
        }),
        getUser: (token,id) =>
            axios({
                url: baseUrl + `user/${id}`,
                method: "GET",
                headers: {
                    authorization : "Bearer " + token
                }
        }),
        updateUser: (token,id,data) =>
            axios({
                url: baseUrl + `user/${id}`,
                method: "PUT",
                data:data,
                headers: {
                    authorization : "Bearer " + token
                }
        }),
        addCalls: (data,token) =>
            axios({
                url: baseUrl + `calls/register`,
                method: "POST",
                data:data,
                headers: {
                    "authorization" : "Bearer " + token
                }
        }),
        addUser: (data,token) =>
            axios({
                url: baseUrl + `user`,
                method: "POST",
                data:data,
                headers: {
                    "authorization" : "Bearer " + token
                }
        }),
        removeUser: (id,token) =>
            axios({
                url: baseUrl + `user/${id}`,
                method: "POST",
                headers: {
                    "authorization" : "Bearer " + token
                }
        }),
        resetPassword: (token,data) =>
            axios({
                url: baseUrl + `password/reset`,
                method: "POST",
                data:data,
                headers: {
                    "authorization" : "Bearer " + token
                }
        }),
        getAgentReport: (token,id,params) =>
            axios({
                url: baseUrl + `report/${id}`,
                method: "GET",
                params:params,
                headers: {
                    authorization : "Bearer " + token
                }
        }),
        getAllCallReport: (token,params) =>
            axios({
                url: baseUrl + `report`,
                method: "GET",
                params:params,
                headers: {
                    authorization : "Bearer " + token
                }
        }),
        getFullCallReport: (token,params) =>
            axios({
                url: baseUrl + `report/full`,
                method: "GET",
                params:params,
                headers: {
                    authorization : "Bearer " + token
                }
        }),
        getAgentsReport: (token,params) =>
            axios({
                url: baseUrl + `report/counts?page=1&pageSize=100`,
                method: "GET",
                params,
                headers: {
                    authorization : "Bearer " + token
                }
        }),
        getPeriodicReport: (token) =>
            axios({
                url: baseUrl + `report/periodic`,
                method: "GET",
                headers: {
                    authorization : "Bearer " + token
                }
        }),
        getAllAgents: (token) =>
            axios({
                url: baseUrl + `user/all`,
                method: "GET",
                headers: {
                    authorization : "Bearer " + token
                }
        })
       
        
        }
    }
export default Transport;
