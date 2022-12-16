import types from './types'
export function addDevice(payload) {
  return { type: types.ADD_DEVICE, payload }
}

export function changeStatus(payload) {
  return { type: types.CHANGE_STATUS, payload }
}
