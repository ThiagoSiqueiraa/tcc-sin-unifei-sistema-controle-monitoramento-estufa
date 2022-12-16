import axios from 'axios'
import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.request({
        url: requestConfig.url,
        method: requestConfig.method ? requestConfig.method : 'GET',
        data: requestConfig.body ? requestConfig.body : null,
        headers: requestConfig.headers ? requestConfig.headers : {}
      })

      if(applyData && typeof applyData === 'function') {
        applyData(response)
      }

      return response
    } catch (error) {
      setError(
        error.response.data.message || error.message || 'Algo deu errado'
      )
      toast.error(
        error.response.data.message || error.message || 'Algo deu errado!',
        {
          position: toast.POSITION.TOP_RIGHT
        }
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    error,
    sendRequest
  }
}

export default useHttp
