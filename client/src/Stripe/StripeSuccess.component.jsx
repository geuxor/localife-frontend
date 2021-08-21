import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { LoadingOutlined } from '@ant-design/icons'

const StripeSuccess = ({ match, history }) => {
  useEffect(() => {
    //   fetch xp id from match.params.experienceId
    console.log('StripeSuccess: ', match.params.id)
    const okres = false
    // apiStripe
    // .stripeSuccessRequest({experienceId: match.params.experienceId})
    // .then((res) => {

    if (okres) {
      // console.log("StripeSuccess: res.data.success : stripe success response", res.data);
      toast.success('Your purchase has been successfull!')
      setTimeout(() => {
        history.push('/bookings')
      }, 2000)
    } else {
      toast.error(
        'Your purchase was declined - You will be reported to authorities!',
      )
      setTimeout(() => {
        //redirect to experience details page
        history.push(`/result-details/${match.params.id}`)
      }, 3000)
    }
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
