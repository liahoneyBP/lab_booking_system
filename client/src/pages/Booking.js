import React, { useEffect, useState } from "react";
import { getLab } from "../functions/lab";
import SingleBookingCard from "../components/cards/LabSingleBookingCard";
import { useParams } from 'react-router-dom';
import LabBookingForm from "../components/forms/LabBookingForm";
import { Card } from "antd";
import { useSelector } from "react-redux";



const LabSingleBooking = () => {
  const [lab, setLabs] = useState({});
  const { slug } = useParams()


  //const { slug } = match.params;

  useEffect(() => {
    loadSingleLab();
    console.log("slug ==>", slug)
  }, [slug]);

  const loadSingleLab = () =>
  getLab(slug).then((res) => setLabs(res.data));

  return (
  
  <div className="container-fluid">
    <div className="row pt-4">
        <SingleBookingCard 
        lab={lab} 
        />
    </div>
  </div>
  )
  ;
};

export default LabSingleBooking;
