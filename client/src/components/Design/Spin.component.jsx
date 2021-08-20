import { Spin } from 'antd'

function SpinInco({ message }) {
  return (
    <div className="d-flex justify-content-center p-5">
      <Spin tip={message}></Spin>
    </div>
  )
}

export default SpinInco
