import axios from "axios";
export function fetchProducts(){
    return axios.get('https://backend-for-assesment.onrender.com/cart')
}

export function addItem(item){
    return axios.post('https://backend-for-assesment.onrender.com/cart',item)
}
export function updateItem(id, itemUpdate){
    return axios.patch(`https://backend-for-assesment.onrender.com/cart/${id}`,itemUpdate)
}
export function deleteItem(id){
    return axios.delete(`https://backend-for-assesment.onrender.com/cart/${id}`)
}