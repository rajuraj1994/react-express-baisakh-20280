import { API } from "../config";


// to add category
export const addcategory=(token,category)=>{
    return fetch(`${API}/postcategory`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}