import React, {useState, useEffect} from "react";
import { getLabsByCount, fetchLabsbyFilter } from "../functions/lab";
import {useSelector, useDispatch} from "react-redux";
import LabCard from "../components/cards/LabCard";

import Search from "../components/forms/Search";
import Jumbotron from "../components/cards/Jumbotron";


const Lab = () => {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(false);

    let {search} = useSelector((state) => ({...state}));
    const {text} = search;


    useEffect(() => {
        loadAllLabs()
    }, [])

    // 1. load labs by fedault on page load
    const loadAllLabs = () => {
        getLabsByCount(6).then(lab => {
            setLabs(lab.data);
            setLoading(false);
        });
    };

    // 2. load labs on user search input
    useEffect(() => {
       // console.log('load labs on user search input', text);
       const delayed = setTimeout(() => {
        fetchLabs({query: text});
       }, 300)
       return () => clearTimeout(delayed);
       
    }, [text])

    const fetchLabs = (arg) => {
        fetchLabsbyFilter(arg).then((res) => {
            setLabs(res.data);
        });
    }

    return (
        <>
          <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <h4 className="text-dark p-3">Search/Filter</h4>
                    <Search />
                </div>

                <div className="col-md-9 mt-3">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4 className="text-dark">Labs</h4>
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