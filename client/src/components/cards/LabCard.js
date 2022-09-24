import React from 'react'
import {Card} from 'antd'
import {EyeOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import LabImgDefault from "../../images/LabUtcc_Default.jpg"
import { Link } from "react-router-dom"

const { Meta } = Card;

const LabCard = ({ lab }) => {
    // destructure
    const { images, labName, details, slug } = lab;
    return (
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : LabImgDefault}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/lab/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Lab
          </Link>,
          
        ]}
      >
        <Meta
          title={labName}
          description={`${details && details.substring(0, 40)}...`}
        />
      </Card>
    );
  };

export default LabCard;