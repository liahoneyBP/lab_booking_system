import React from 'react'
import {Card} from 'antd'
import LabImgDefault from "../../images/LabUtcc_Default.jpg"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"

const {Meta} = Card;


const AdminLabCard = ({lab, handleRemove}) => {
    // destructure
    const {labName, details, images, slug } = lab;
    return (
        <Card cover={
            <img src={images && images.length ? images[0].url : LabImgDefault} 
            style={{height: "150px", objectFit: 'cover'}}
            className="p-1"
            />
        }
        actions={[
                <Link to={`/admin/lab/${slug}`}>
                  <EditOutlined className="text-warning"/>
                </Link>, 
                <DeleteOutlined onClick={() => handleRemove(slug)} className='text-danger'/>
            ]}
        >
            <Meta 
            title={labName}
            description={`${details && details.substring(0, 40)}...`}

             />
        </Card>
    )
}

export default AdminLabCard;