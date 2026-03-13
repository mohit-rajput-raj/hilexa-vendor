import { axiosApi } from "@/lib/axios"

export const getInvoices=()=>{
    const res =  axiosApi.get('/vendors/invoices')
    return res
}