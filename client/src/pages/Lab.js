import React, {useState, useEffect} from "react";
import { getLabsByCount } from "../functions/lab";
import {useSelector, useDispatch} from "react-redux";
import LabCard from "../components/cards/LabCard";

import Search from "../components/forms/Search";
import Jumbotron from "../components/cards/Jumbotron";


const Lab = () => {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllLabs()
    }, [])
    
    const loadAllLabs = () => {
        getLabsByCount(6).then(lab => {
            setLabs(lab.data);
            setLoading(false);
        });
    };

    return (
        <>
          <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <h4 className="text-dark p-3">Search/Filter</h4>
                    <Search />
                </div>

                <div className="col-md-8 mt-3">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4 className="text-danger">Labs</h4>
                    )}

                    {labs.length < 1 && <p>No Products Found</p>}
                    
                    <div className="row pb-5">
                        {labs.map((lab) => (
                        <div key={lab._id} className="col-md-4 mt-3">
                            <LabCard lab={lab} />
                        </div>))}
                    </div>
                </div>
            </div>
          </div>
        </>
      );
}

export default Lab;