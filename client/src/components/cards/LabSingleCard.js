import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { FormOutlined  } from "@ant-design/icons";

const { Meta } = Card;

const SingleLabCard = ({ lab }) => {
    const { images, labName, details, slug, capacity } = lab;

  return (
    <>
      <div className="col-md-7">image carousel</div>

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
