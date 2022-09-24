import React from 'react'
import {Card} from 'antd'

const {Meta} = Card;


const AdminLabCard = ({lab}) => {
    // destructure
    const {labName, details, images } = lab;
    return (
        <Card cover={
            <img src={images && images.length ? images[0].url : ""} 
            style={{height: "150px", objectFit: 'cover'}}
            className="p-1"
            />
        }>
            <Meta 
            title={labName}
            description={details}

             />
        </Card>
    )
}

export default AdminLabCard;