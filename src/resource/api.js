import http from './http'
import serivce from './service'

let t
export const getUserList = (callback, callerr,force)=> {
  http.$get(serivce.user, callback, callerr,force)
}

export const createUser = (data, callback, callerr)=> {
  http.$post(serivce.user, data, callback, callerr)
}

export const updateUser = (id, data, callback, callerr)=> {
  http.$put(serivce.user + '/' + id, data, callback, callerr)
}

export const deleteUser = (id, callback, callerr)=> {
  http.$delete(serivce.user + '/' + id, callback, callerr)
}

export const syncStateUser = (state)=> {
  clearTimeout(t)
  t=setTimeout(()=>{
    getUserList((data)=> {
      state.user = data
    }, (rsp)=> {
      console.log('error',rsp)
    },true)
  },500)
}