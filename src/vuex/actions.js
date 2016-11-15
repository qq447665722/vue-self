import * as type from './types'
import * as api from '../resource/api'
import http from '../resource/http'

export const incrementCounter = function ({dispatch, state}) {
  dispatch(type.INCREMENT, 1)
}

export const reduceCounter = function ({dispatch, state}) {
  dispatch(type.REDUCE, 1)
}

export function getUserList({dispatch}) {
  // http.$resource('user','get',(data)=> {
  //   dispatch(type.USER_LIST, data)
  // })
  api.getUserList((data)=> {
    dispatch(type.USER_LIST, data)
  })
}