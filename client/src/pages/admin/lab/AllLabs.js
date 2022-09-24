import React, {useEffect, useState} from "react";
import AdminNav from "../../../components/Navbar/AdminNav"
import { getLabsByCount } from "../../../functions/lab";
import AdminLabCard from "../../../components/cards/AdminLabCard"

const AllLabs = () => {
  const [labs, setLabs] = useState([])
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    loadAllLabs();
  }, []);

  const loadAllLabs = () => {
    setLoading(true);
    getLabsByCount(6)
    .then((response) => {
      //  console.log("RES =>", response)
        setLabs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        
        <div className="col">
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          <h4>All Labs</h4>
        )}
          <div className="row">
          {labs.map((lab) => (
          <div className="col-md-4" key={lab._id} >
            <AdminLabCard lab={lab} />
          </div>
        )
        )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AllLabs;
