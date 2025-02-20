import request from './index'

export const getNumber = (params: any) =>
    request<any, { number: number }>({
        url: '/test/getNumber',
        method: 'get',
        params
    })
