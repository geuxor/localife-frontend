import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { LoadingOutlined } from '@ant-design/icons'
import bookingsApi from '../apiServices/bookingsApi'

const StripeSuccess = ({ match, history }) => {
  useEffect(() => {
    const res = bookingsApi.bookingSuccessRequest({
      experienceId: match.params.experienceId,
    })
    const okres = true

    if (okres) {
      toast.success('Your purchase has been successful!')
      setTimeout(() => {
        history.push('/bookings')
      }, 2000)
    } else {
      toast.error(
        'Your purchase was declined - You will be reported to authorities!',
      )
      setTimeout(() => {
        history.push(`/result-details/${match.params.id}`)
      }, 3000)
    }
  }, [match.params.experienceId])

  return (
    <div className="container">
      <div className="d-flex justify-content-center p-5">
        <LoadingOutlined className="display-1 text-danger p-5" />
      </div>
    </div>
  )
}

export default StripeSuccess
