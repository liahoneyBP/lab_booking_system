import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import SingleLabCard from "../components/cards/LabSingleCard";

import { getLab } from "../functions/lab";

const LabSingle = () => {
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
      <div></div>
    </div>

  </div>
    ;
};

export default LabSingle;
