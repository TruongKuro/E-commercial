const api= 'http://localhost:5000/';
export const apiLogin = api + 'user/login';
export const apiRegister = api + 'user/register';
export const apiLogout = api + 'user/logout';

export const apiShowProduct = api + 'product/show-product';
export const apiShowCategory = api + 'product/show-category';
export const apiDetailProduct = api + 'product/detail/';
export const apiReviewProduct = api + 'product/review/';
export const apiAddReviewProduct = api + 'product/add-review';
export const apiAddToCart = api + 'product/add-to-cart';
export const apiCart = api + 'cart';
export const apiUpdatePlusCart = api + 'cart/update/plus';
export const apiUpdateMinusCart = api + 'cart/update/minus';
export const apiDeleteItemCart = api + 'cart/delete';
export const apiCheckout= api + 'cart/checkout/';
export const apiPaying= api + 'cart/paying';

export const apiEditProfile= api + 'account/edit-profile';
export const apiAddAddress= api + 'account/add-address';
export const apiShowAddress= api + 'account/show-address';
export const apiDeleteAddress= api + 'account/delete-address';
export const apiChangePassword= api + 'account/change-password';
export const apiShowOrder= api + 'account/show-order';
export const apiCancelOrder= api + 'account/cancel-order';
export const apiShowProductReview= api + 'account/show-product-review';
export const apiRepurchase= api + 'account/repurchase';

export const apiSellerSelectCategory = api + 'seller/select-category';
export const apiSellerShowProduct = api + 'seller/show-product';
export const apiSellerAddProduct = api + 'seller/post/add-product';
export const apiUploadImage = api + 'upload/image';

export const apiListChat = api + 'chat/list-chat';
export const apiShowChat = api + 'chat/show';
export const apiAddChat = api + 'chat/add-chat';

export const apiAdminAddCategory = api + 'admin/post/add-category';
export const apiAdminShowProduct = api + 'admin/show-product';
export const apiAdminShowUser = api + 'admin/show-user';
export const apiAdminShowOrder = api + 'admin/show-order';
export const apiAdminEditStatus = api + 'admin/edit-status';