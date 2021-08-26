import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { setStripe } from '../../redux/actions/actions'
import { toast } from 'react-toastify'
import apiStripe from '../../apiServices/stripeApi'
import moment from 'moment'
import { Button, Card, Avatar, Image, Badge } from 'antd'
import {
  PlusCircleOutlined,
  DollarCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import './Dashboard.css'
const { Meta } = Card
const { Ribbon } = Badge

const DashboardBanner = () => {
  const store = useSelector((state) => state)
  const [, setLoading] = useState(false)
  const [, setBalance] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()

  const handleStripeBalance = async () => {
    console.log(
      'DashboardBanner: checking account balance for',
      store.user.firstname,
    )
    if (!store.stripe) {
      console.log('fetching balance info from backend')
      if (store.isLoggedIn & store.user.email) {
        let res = await apiStripe.getAccountBalance(store)
        console.log('DashboardBanner: Stripe accountBalance Api Response', res)
        dispatch(setStripe(res.data))
        // dispatch(
        //   setUser({ ...store.user, stripe_registration_complete: res.data }),
        // )

        setBalance({
          balance_pending_amount: res.data.balance_pending_amount,
          balance_pending_curr: res.data.balance_pending_curr,
        })
        console.log('DashboardBanner: ', {
          balance_pending_amount: res.data.balance_pending_amount,
          balance_pending_curr: res.data.balance_pending_curr,
        })
      }
    }
  }

  const handlePayoutSettings = async () => {
    setLoading(true)
    try {
      const res = await apiStripe.payoutSetting()
      console.log('DashboardBanner: stripePayoutSettings link res: ', res)
      window.location.href = res.data.url
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast('Unable to access settings. Try again')
    }
  }

  return (
    <div>
      <Ribbon text="Total Earnings" color="blue">
        <Card className="card p-0">
          <div className="d-flex justify-content-start p-0">
            <Meta
              avatar={<Avatar src={<Image src={store.user.avatar} />} />}
              title={`${store.user.firstname}'s Dashboard`}
              description={`Joined ${moment(store.user.createdAt).fromNow()}`}
            />
            <div className="d-flex col justify-content-center p-0">
              <div className="d-flex row p-0">
                <div>asdfx</div>
                <div>asdfx</div>
              </div>
            </div>
          </div>
        </Card>
      </Ribbon>
      <Ribbon text="Balance" color="blue">
        <Card className="card p-0">
          <div className="d-flex justify-content-center">
            {store.stripe.balance_pending_curr &&
            store.stripe.balance_pending_amount !== null ? (
              <>
                {apiStripe.currencyFormatter({
                  amount: store.stripe.balance_pending_amount,
                  currency: store.stripe.balance_pending_curr,
                })}
              </>
            ) : (
              'unavailable'
            )}
          </div>
        </Card>
      </Ribbon>
      <Ribbon text="Experiences" color="blue">
        <Card className="card p-0">
          <div className="d-flex justify-content-center">
            <b>You are ready to create Experiences and receive payment</b>
            <div className="d-flex row p-0">
              <div className="d-flex p-0">
                <div className="px-5"></div>
              </div>
            </div>
          </div>
        </Card>
      </Ribbon>

      <Card className="card p-0">
        <div className="d-flex justify-content-center">
          <div className="d-flex row p-0">
            <div className="d-flex p-0">
              <div className="px-2">
                <Button
                  onClick={() => handlePayoutSettings()}
                  type="primary"
                  shape="round"
                  icon={<SettingOutlined />}
                  size={10}
                >
                  Configure Account
                </Button>
              </div>
              <div className="px-2">
                <Button
                  onClick={() => handleStripeBalance()}
                  type="primary"
                  shape="round"
                  icon={<DollarCircleOutlined />}
                  size={10}
                >
                  Update Balance
                </Button>
              </div>
              <div className="px-2">
                <Button
                  onClick={() => history.push('/experience/new')}
                  type="primary"
                  shape="round"
                  icon={<PlusCircleOutlined />}
                >
                  Add New Experience
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default DashboardBanner
