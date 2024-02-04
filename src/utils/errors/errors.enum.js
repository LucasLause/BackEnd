export const ErrorsName ={
    //products
    GET_PRODUCTS_ERROR: 'Could not get',
    GET_PRODUCT_ID_ERROR: 'Could not get',
    ADD_PRODUCT_ERROR: 'Could not add',
    UPDATE_PRODUCT_ERROR: 'Could not update',
    DELETE_PRODUCT_ERROR: 'Could not delete',
    //cart
    GET_CART_ID_ERROR : 'Could not get',
    ADD_CART_ERROR: 'Could not add',
    ADD_PROD_TO_CART_ERROR: 'Could not add',
    UPDATE_CART_ID_ERROR: 'Could not update',
    UPDATE_PRODS_QUANTITY_ERROR: 'Could not update',
    DEL_PROD_FROM_CART_ERROR: 'Could not delete',
    EMPTY_CART_ERROR: 'Could not empty',
    //purchases
    PURCHASE_CART_ERROR: 'Could not purchase',
    //users
    SIGNUP_USER_ERROR: 'Could not singup',
    SIGNUP_USER_PASSPORT_ERROR: 'Could not singup',
    LOGIN_USER_ERROR: 'Could not login',
    LOGIN_USER_PASSPORT_ERROR: 'Could not login',
    GET_GITHUB_ERROR: 'Could not login',
    LOGOUT_USER_ERROR: 'Could not logout',
}

export const ErrorsMessage ={
    //products
    GET_PRODUCTS_ERROR: 'Could not get products',
    GET_PRODUCT_ID_ERROR: 'Could not get product by Id.',
    ADD_PRODUCT_ERROR: 'Product could not be added.',
    UPDATE_PRODUCT_ERROR: 'Product could not be updated',
    DELETE_PRODUCT_ERROR: 'Product could not be deleted',
    //cart
    GET_CART_ID_ERROR : 'Could not get cart by Id.',
    ADD_CART_ERROR: 'Cart could not be added.',
    ADD_PROD_TO_CART_ERROR: 'Product could not be added to the cart.',
    UPDATE_CART_ID_ERROR: 'Cart could not be updated',
    UPDATE_PRODS_QUANTITY_ERROR: "Product's quantity could not be updated",
    DEL_PROD_FROM_CART_ERROR: 'Product could not be deleted from cart',
    EMPTY_CART_ERROR: 'Cart could not be emptied',
    //purchases
    PURCHASE_CART_ERROR: 'Cart could not be purchased',
    //users
    SIGNUP_USER_ERROR: 'User could not be signed up',
    SIGNUP_USER_PASSPORT_ERROR: 'User could not be signed up using passport',
    LOGIN_USER_ERROR: 'User could not be logged in',
    LOGIN_USER_PASSPORT_ERROR: 'User could not be logged in using passport',
    GET_GITHUB_ERROR: 'Could not use GitHub to login or singup',
    LOGOUT_USER_ERROR: 'User could not be logged out',
}

export const ErrorsCause ={
    //products
    GET_PRODUCTS_ERROR: 'Error caused in the products.controller.js, function getAllProducts. Please check.',
    GET_PRODUCT_ID_ERROR: 'Error caused in the products.controller.js, function getProductByID. Please check.',
    ADD_PRODUCT_ERROR: 'Error caused in the products.controller.js, function AddOneProduct. Please check.',
    UPDATE_PRODUCT_ERROR: 'Error caused in the products.controller.js, function updateProductById. Please check.',
    DELETE_PRODUCT_ERROR: 'Error caused in the products.controller.js, function deleteProd. Please check.',
    //cart
    GET_CART_ID_ERROR : 'Error caused in the carts.controller.js, function getCartByID. Please check.',
    ADD_CART_ERROR: 'Error caused in the carts.controller.js, function AddOneCart. Please check.',
    ADD_PROD_TO_CART_ERROR: 'Error caused in the carts.controller.js, function addProdToCart. Please check.',
    UPDATE_CART_ID_ERROR: 'Error caused in the carts.controller.js, function updateCartById. Please check.',
    UPDATE_PRODS_QUANTITY_ERROR: 'Error caused in the carts.controller.js, function updateProductQuantity. Please check.',
    DEL_PROD_FROM_CART_ERROR: 'Error caused in the carts.controller.js, function deleteProdFromCart. Please check.',
    EMPTY_CART_ERROR: 'Error caused in the carts.controller.js, function emptyOneCart. Please check.',
    //purchases
    PURCHASE_CART_ERROR: 'Error caused in the purchases.controller.js, function purchaseCart. Please check.',
    //users
    SIGNUP_USER_ERROR: 'Error caused in the users.controller.js, function signupUser. Please check.',
    SIGNUP_USER_PASSPORT_ERROR: 'Error caused in the users.controller.js, function signUpUserPassport. Please check.',
    LOGIN_USER_ERROR: 'Error caused in the users.controller.js, function loginUser. Please check.',
    LOGIN_USER_PASSPORT_ERROR: 'Error caused in the users.controller.js, function loginUserPassport. Please check.',
    GET_GITHUB_ERROR: 'Error caused in the users.controller.js, function getGithub. Please check.',
    LOGOUT_USER_ERROR: 'Error caused in the users.controller.js, function logoutUser. Please check.',
}