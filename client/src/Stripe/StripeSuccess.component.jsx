import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { LoadingOutlined } from '@ant-design/icons'

const StripeSuccess = ({ match, history }) => {
  useEffect(() => {
    //   fetch prod id from match.params.experienceId
    console.log('StripeSuccess: ', match.path)
    const okres = true
    // apiStripe
    // .stripeSuccessRequest({experienceId: match.params.experienceId})
    // .then((res) => {

    if (okres) {
      // console.log("StripeSuccess: res.data.success : stripe success response", res.data);
      toast.success('Your purchase has been successfull!')
      setTimeout(() => {
        history.push('/dashboard')
      }, 2000)
    } else {
      // console.log("stripe payment failure", res.data);
      toast.error('Your purchase was declined - Please retry!')
      setTimeout(() => {
        history.push('/')
        // history.push("/stripe/failure");
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
