// 之所以types用一个文件输出,因为type是全局公用的,
// 放在一个文件里,可以保证命名不重复,为了规范type命名,每个type都以所在的模块名称为前缀,比如USER_,CART_,PRODUCT_
export const INCREMENT   = 'INCREMENT'
export const REDUCE      = 'REDUCE'
export const USER_LIST   = 'USER_LIST'
export const USER_INFO   = 'USER_INFO'
export const USER_CREATE = 'USER_CREATE'
export const USER_UPDATE = 'USER_UPDATE'
export const USER_DELETE = 'USER_DELETE'
