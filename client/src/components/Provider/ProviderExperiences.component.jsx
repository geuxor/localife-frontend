import React from 'react'
import { Card, Image, Avatar } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import experienceApi from '../../apiServices/experiencesApi'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
const { Meta } = Card

function ProviderExperiences({ myExperience, updateXps }) {
  const handleExperienceDelete = async () => {
    if (!window.confirm('Are you sure?')) return
    // const res = experienceApi.deleteExperience(myExperience.id)
    // if (res.data) {
    updateXps(myExperience.id)
    toast.success(' Deleted')
    // }
  }

  return (
    <>
      <div className="p-2">
        <Card
          hoverable
          bordered="true"
          style={{ width: 364 }}
          actions={[
            <SettingOutlined key="setting" />,
            <Link to={`/experience/edit/${myExperience.id}`}>
              <EditOutlined key="edit" />
            </Link>,
            <DeleteOutlined
              onClick={() => handleExperienceDelete()}
              className="text-danger"
            />,
          ]}
        >
          <Meta
            avatar={
              <Avatar
                bordered="true"
                shape="square"
                size={64}
                src={<Image src={myExperience.image} />}
              />
            }
            title={myExperience.title}
            description={`${myExperience.price} Eur.`}
          />
        </Card>
      </div>
    </>
  )
}

export default ProviderExperiences
