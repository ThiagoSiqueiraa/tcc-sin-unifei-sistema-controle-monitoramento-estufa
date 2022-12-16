import { useReducer } from 'react'

const initialInputState = {
  value: 0,
  isTouched: false
}
const inputStateReducer = (state, action) => {
  switch (action.type) {
    case '@input/INPUT_CHANGE': {
      return {
        value: action.value,
        isTouched: state.isTouched
      }
    }
    case '@input/INPUT_IS_TOUCHED': {
      return {
        isTouched: true,
        value: state.value
      }
    }
    case '@input/RESET': {
      return {
        isTouched: false,
        value: ''
      }
    }
    default: {
      return state
    }
  }
}
const useInput = validateValue => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  )

  const valueIsValid = validateValue(inputState.value)
  const hasError = !valueIsValid && inputState.isTouched

  const valueChangeHandler = event => {
    dispatch({ type: '@input/INPUT_CHANGE', value: event.target.value })
  }

  const inputBlurHandler = event => {
    dispatch({ type: '@input/INPUT_IS_TOUCHED' })
  }

  const reset = () => {
    dispatch({ type: '@input/RESET' })
  }
  return {
    value: inputState.value,
    hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset
  }
}

export default useInput
