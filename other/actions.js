// actions.js
// import shop from '../api/shop'

const getProducts = (products) => {
  console.log('products received', products)
}



export const getAllProducts = ({ commit }) => {
  commit('REQUEST_PRODUCTS')
  shop.getProducts(products => {
    commit('RECEIVE_PRODUCTS', products)
  })
}
