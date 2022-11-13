//
import React, { useEffect, useState } from "react";
import { getLabsByCount } from "../functions/lab";
import LabCard from "../components/cards/LabCard";
import Jumbotron from "../components/cards/Jumbotron";

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import Box from '@mui/material/Box';



// Home Parent Component
const Home = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(false);




  useEffect(() => {
    loadAllLabs();
  }, []);

  const loadAllLabs = () => {
    setLoading(true);
    getLabsByCount(6).then((res) => {
      setLabs(res.data);
      setLoading(false);
    });
  };

  return (
    <>
    
    
      <div className="jumbotron text-primary h1 font-weight-bold text-center">
        <Jumbotron text={["UTCC LABS", "ห้องแล็บ", "มหาวิทยาลัยหอการค้าไทย"]} />
      </div>

      <div className="container">
        <div className="row">
          {loading ? (
            <>
              <Box sx={{ fontWeight: 'bold', m: 1, fontFamily: 'monospace' }}>Loading</Box>
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={3}>
                <LinearProgress color="secondary" />
                <LinearProgress color="secondary" />
                <LinearProgress color="secondary" />
              </Stack>
            </>
          ) : (
            <span></span>
          )}
          {labs.map((lab) => (
            <div key={lab._id} className="col-md-4">
              <LabCard lab={lab} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
