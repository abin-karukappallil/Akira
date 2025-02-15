import { ApiManage } from "./api";

export const userLogin = async data => {
    try{


        const res = await ApiManage("/login",{

            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            data:data
        });
        return res;

    }catch(e){
        return e.response.data;
    }
}