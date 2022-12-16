import types from './types'
export function addConditional(payload) {
  return { type: types.ADD_CONDITIONAL, payload }
}

export function changeStatus(payload) {
  return { type: types.CHANGE_STATUS, payload }
}
