
import ajax from './ajax'
import serivce from './service'

export const getUserList=(callback,callerr)=>{
  ajax.$get(serivce.user,callback,callerr)
}