/* eslint-disable no-sparse-arrays */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import LabImgDefault from "../../images/LabUtcc_Default.jpg"
import LabListItems from "./LabListItems";


const SingleLabCard = ({ lab }) => {
  const { images, labName, slug } = lab;

  return (
    <>

      <div className="col-md-7">

        {images && images.length ? (<Carousel showArrows={true} autoPlay infiniteLoop>
          {images && images.map((i) =>
            <img
              src={i.url}
              key={i.public_id} />)}
        </Carousel>) : (
          <Card cover={<img src={LabImgDefault} className="mb-3" />}></Card>
        )}
      </div>

      <div className="col-md-5">
        <h1 className="bg-dark p-3 text-white">{labName}</h1>
        <Card
          actions={[,
            <Link to={`/lab/booking/${slug}`}>
                  <button className="btn btn-outline-info text-center">BOOK</button>
            </Link>,
          ]}
        >
          <LabListItems lab={lab} />
        </Card>

      </div>
    </>
  );
};

export default SingleLabCard;
