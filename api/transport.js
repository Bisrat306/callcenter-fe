import axios from "axios";
import axiosRetry from "axios-retry";
import { baseUrl } from '../utils/constants';

axiosRetry(axios, {retries: Number.MAX_SAFE_INTEGER});

const Transport = {
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
            })
        }
    }