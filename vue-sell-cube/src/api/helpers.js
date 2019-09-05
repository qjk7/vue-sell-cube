import axios from 'axios'

const baseUrl = '/sellapi/'

const ERR_OR = 1

export function getRemove(url) {
    return function (params) {
        return axios.get(baseUrl + url, {
            params
        }).then((res) => {
            const { code, data } = res.data
            if (code === ERR_OR) {
                return data
            }
        }).catch((e) => {
        })
    }
}

export function get(url) {
    return function (params) {
        return axios.get(url).then((res) => {
            const { errno, data } = res.data
            if (errno === ERR_OR) {
                return data
            }
        }).catch((e) => {

        })
    }
}
