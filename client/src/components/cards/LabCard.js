import React from 'react'
import { Card, Typography } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import LabImgDefault from "../../images/LabUtcc_Default.jpg"
import { Link } from "react-router-dom"
import ButtonRB from 'react-bootstrap/Button';
import ButtonMUI from '@mui/material/Button';

import TypographyMUI from '@mui/material/Typography';
import Box from '@mui/material/Box';

import 'antd/dist/antd.css';

const { Meta } = Card;
const { Title } = Typography;

const LabCard = ({ lab }) => {
  // destructure
  const { images, labName, details, slug, capacity } = lab;
  return (
    <Card
      style={{ margin: 5 }}
      cover={
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          src={images && images.length ? images[0].url : LabImgDefault}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/lab/${slug}`}>
          <ButtonMUI variant="outlined" color="success">
            View Lab
          </ButtonMUI>
        </Link>,



      ]}
      title={<Box sx={{ fontFamily: 'sans-serif', fontSize: 'h5.fontSize', m: 1, color: 'white' }}>
        {labName} - {capacity} ที่นั่ง
      </Box>}

      headStyle={{ backgroundColor: 'rgb(9, 20, 40)', border: 0 }}
    >
      {/* <p style={{color: "white"}}>{details && details.substring(0, 40)}</p> */}
      <TypographyMUI component="div">
        <Box sx={{ fontFamily: 'Monospace', fontSize: 'h7.fontSize', m: 1, color: 'black' }}>
          {details && details.substring(0, 40)}
        </Box>
      </TypographyMUI>
      <Meta

      //  title={<Title leve={3} >{labName}</Title>}
      //  description={<Title leve={3} >{details && details.substring(0, 40)}</Title>}
      //   title={`${labName} - ${capacity} ที่นั่ง`}
      //   description={`${details && details.substring(0, 40)}`}

      />
    </Card>
  );
};

export default LabCard;