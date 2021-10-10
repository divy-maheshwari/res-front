import * as actions from '../constants'
import axios from 'axios'

export const ProductList = () => (dispatch) => {
    dispatch({type:actions.PRODUCT_LIST_REQUEST});
    axios.get('https://res-backen.herokuapp.com/api/products')
               .then(data => {
                   dispatch({type:actions.PRODUCT_LIST_SUCCESS,payload:data.data});
               })
               .catch(err => {
                   dispatch({type:actions.PRODUCT_LIST_FAILURE,payload:err.message});
               });
}


export const ProductSave = (id,name,image,price,description,countInStock) => (dispatch,setState) => {
    const {userSignIn:{userInfo}} = setState();
    if(id) {
        axios.put(`https://res-backen.herokuapp.com/api/products/${id}`,{id,name,image,price,description,countInStock},
        {
            headers: {
                Authorization: 'Bearer '+ userInfo.token
            }
        })
        .then(data => {
            dispatch({type:actions.PRODUCT_SAVE_SUCCESS,payload:data.data});
        })
        .catch(err => {
            dispatch({type:actions.PRODUCT_SAVE_FAILURE,payload:err.message});
        });
    }
    else {
        axios.post(`https://res-backen.herokuapp.com/api/products`,{name,image,price,description,countInStock},
        {
            headers: {
                Authorization: 'Bearer '+ userInfo.token
            }
        })
        .then(data => {
            dispatch({type:actions.PRODUCT_SAVE_SUCCESS,payload:data.data});
        })
        .catch(err => {
            dispatch({type:actions.PRODUCT_SAVE_FAILURE,payload:err.message});
        });
    }
}

export const ProductDelete = (id) => (dispatch,setState) => {
    const {userSignIn:{userInfo}} = setState();
    axios.delete(`https://res-backen.herokuapp.com/api/products/${id}`,
    {
        headers: {
            Authorization: 'Bearer '+ userInfo.token
        }
    })
                            .then(data => {
                                dispatch({type:actions.PRODUCT_DELETE_SUCCESS,payload:data.data});
                            })
                            .catch(err => {
                                dispatch({type:actions.PRODUCT_DELETE_FAILURE,payload:err.message});
                            });
}

export const ProductSearch = (text) => (dispatch) => {
    dispatch({type:actions.SEARCH_PRODUCT,payload:text});
}
