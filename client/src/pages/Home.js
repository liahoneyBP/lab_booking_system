import React, { useEffect, useState } from "react";
import { getLabsByCount } from "../functions/lab";
import LabCard from "../components/cards/LabCard";
import Jumbotron from "../components/cards/Jumbotron";
import { Alert, Spin } from "antd";

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
              <Spin tip="Loading...">
                <Alert
                  message="Room Booking in University of the thai chamber of commerce"
                  type="info"
                />
              </Spin>
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
