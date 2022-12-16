import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useHttp from '../hooks/use-http'

function DeleteDevice() {
  const { isLoading, error, sendRequest } = useHttp()
  const navigate = useNavigate()

  const { id } = useParams()
  useEffect(() => {
    sendRequest(
      { url: `${process.env.REACT_APP_API_URL}/devices/delete/${id}`, method: 'delete' },
      () => {}
    )
    navigate('/devices')
  }, [])
  return <div>{id}</div>
}

export default DeleteDevice
