import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { FormOutlined  } from "@ant-design/icons";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import LabImgDefault from "../../images/LabUtcc_Default.jpg"


const { Meta } = Card;

const SingleLabCard = ({ lab }) => {
    const { images, labName, details, slug, capacity } = lab;

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (<Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => 
            <img
            src={i.url} 
            key={i.public_id}/>)} 
        </Carousel> ): (
          <Card cover={<img src={LabImgDefault} className="mb-3"/>}></Card>
        )}
      </div>

      <div className="col-md-5">
        <Card
          actions={[,
            <Link to="/">
              <FormOutlined className="text-info" /> <br /> BOOK
            </Link>,
          ]}
        >
          <Meta title={labName} description={details} />
          <p>
            TEST
            
            TEST
            
            TEST
          </p>
        </Card>
      </div>
    </>
  );
};

export default SingleLabCard;
