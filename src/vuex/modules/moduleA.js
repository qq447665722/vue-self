//储存模块A的state和mutations


import * as type from '../types'
import { getUserList, createUser, updateUser,deleteUser,syncStateUser } from '../../resource/api'
import http from '../../resource/http'

//属性
const state     = {
  count: 0,
  user: []
}

//Controller层
const actions ={
  [type.INCREMENT]: ({commit}) => commit(type.INCREMENT),
  [type.REDUCE]: ({commit}) => commit(type.REDUCE),
  incrementIfOdd2 ({commit, state}) {
    if ((state.count + 1) % 2 === 0) {
      commit(type.INCREMENT)
    }
  },
  incrementAsync2 ({commit}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit(type.INCREMENT)
        resolve()
      }, 1000)
    })
  }
}

//逻辑层
const mutations = {
  [type.INCREMENT](state){
    state.count++
  },
  [type.REDUCE](state){
    state.count--
  },
  [type.USER_LIST](state){
    getUserList((data)=> {
      state.user = data
    }, (rsp)=> {
      console.log(rsp)
    });
    // http.$resource('user','get',(data)=>{
    //   state.user=data
    // },(rsp)=>{
    //   console.log(rsp)
    // });
  },
  [type.USER_INFO](state){
    http.$resource('user', {'get': 1}, (data)=> {
      console.log(data)
    }, (rsp)=> {
      console.log(rsp)
    });
  },
  [type.USER_CREATE](state){
    createUser({name: Math.random(), email: Math.random(), password: Math.random()}, (data)=> {
      console.log(data);
    }, (rsp)=> {
      console.log(rsp)
    });
    // http.$resource('user',{'post':{name:Math.random(),email:Math.random(),password:Math.random()}},(data)=>{
    //   console.log(data);
    // },(rsp)=> {
    //   console.log(rsp)
    // });
    syncStateUser(state);
  },
  [type.USER_UPDATE](state){
    updateUser(1, {name: Math.random(), email: Math.random(), password: Math.random()}, (data)=> {
      console.log(data);
    }, (rsp)=> {
      console.log(rsp)
    });
    // http.$resource('user', {'put': {id:1,data:{name: Math.random(), email: Math.random(), password: Math.random()}}}, (data)=> {
    //   console.log(data);
    // }, (rsp)=> {
    //   console.log(rsp)
    // });
    syncStateUser(state);
  },
  [type.USER_DELETE](state){
    deleteUser(1, (data)=> {
      console.log(data);
    }, (rsp)=> {
      console.log(rsp)
    });
    // http.$resource('user', {'delete': 1}, (data)=> {
    //   console.log(data);
    // }, (rsp)=> {
    //   console.log(rsp)
    // });
    syncStateUser(state);
  },
}

export default {
  state,
  actions,
  mutations
}