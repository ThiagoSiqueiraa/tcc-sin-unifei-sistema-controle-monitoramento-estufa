import types from './types'

const INITIAL_STATE = {
  devices: []
}
function devices(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.ADD_DEVICE: {
      const existingDeviceIndex = state.devices.findIndex(
        device => device.id === action.payload.id
      )
      const existingDevice = state.devices[existingDeviceIndex]
      let updatedDevices
      if (existingDevice) {
        let updatedItem = {
          ...existingDevice,
          ...action.payload
        }

        updatedDevices = [...state.devices]
        updatedDevices[existingDeviceIndex] = updatedItem
      } else {
        updatedDevices = state.devices.concat(action.payload)
      }
      return {
        ...state,
        devices: updatedDevices
      }
    }
    case types.CHANGE_STATUS: {
      const existingDeviceIndex = state.devices.findIndex(
        device => device.id === action.payload.id
      )
      const existingDevice = state.devices[existingDeviceIndex]
      let updatedDevices
      if (existingDevice) {
        let updatedItem = {
          ...existingDevice,
          ...action.payload
        }

        updatedDevices = [...state.devices]
        updatedDevices[existingDeviceIndex] = updatedItem
      } else {
        return {
          ...state
        }
      }
      return {
        ...state,
        devices: updatedDevices
      }
    }
    default: {
      return state
      break
    }
  }
}

export default devices
