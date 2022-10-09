import React, { useEffect, useState } from "react";
import { getLab } from "../functions/lab";
import SingleLabCard from "../components/cards/LabSingleCard";
import { useParams } from 'react-router-dom';

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

  return <div className="container-fluid">
    <div className="row pt-4">
        <SingleLabCard lab={lab} />
    </div>

    <div className="row">
        <div>MAKE A BOOKING</div>
    </div>

  </div>
  ;
};

export default LabSingleBooking;
