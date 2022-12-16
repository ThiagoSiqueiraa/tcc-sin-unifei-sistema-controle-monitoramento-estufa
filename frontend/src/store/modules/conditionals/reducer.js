import types from './types'

const INITIAL_STATE = {
  conditionals: []
}
function conditionals(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.ADD_CONDITIONAL: {
      const existingConditionalIndex = state.conditionals.findIndex(
        conditional => conditional.id === action.payload.id
      )
      const existingConditional = state.conditionals[existingConditionalIndex]
      let updatedConditionals
      if (existingConditional) {
        let updatedItem = {
          ...existingConditional,
          ...action.payload
        }

        updatedConditionals = [...state.conditionals]
        updatedConditionals[existingConditionalIndex] = updatedItem
      } else {
        updatedConditionals = state.conditionals.concat(action.payload)
      }
      return {
        ...state,
        conditionals: updatedConditionals
      }
    }
    case types.CHANGE_STATUS: {
    }
    default: {
      return state
      break
    }
  }
}

export default conditionals
