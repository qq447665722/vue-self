import * as type from './types'

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
export default {
  // TODO: 放置我们的状态变更函数
  // mutation 的第一个参数是当前的 state
  // 你可以在函数里修改 state
  [type.INCREMENT](state, amount) {
    state.count  = state.count + amount
    state.sumnub = state.sumnub + amount
  },
  [type.REDUCE](state, amount) {
    state.count  = state.count - amount
    state.sumnub = state.sumnub + amount
  },
  [type.USER_LIST](state,data) {
    state.user=data
    console.log(data);
  },
}