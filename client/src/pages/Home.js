import React, {useEffect, useState} from "react";
import { getLabsByCount } from "../functions/lab";
import LabCard from "../components/cards/LabCard"

const Home = () => {
    const [labs, setLabs] = useState([])
    const [loading, setLoading ] = useState(false);

    useEffect(() => {
        loadAllLabs()
    }, [])

    const loadAllLabs = () => {
        setLoading(true)
        getLabsByCount(3)
        .then(res => {
            setLabs(res.data);
            setLoading(false);
        })
    }


    return (
        <>
        <div className="jumbotron">
            {loading ? (<h4>Loading...</h4>) : <h4>All Labs</h4>}
        </div>

        <div className="container">
            <div className="row">
               {labs.map((lab) => (
                <div key={lab._id} className="col-md-4">
                    <LabCard lab={lab} />
                </div>
               ))}
            </div>
        </div>
        </>
    
    )
}

export default Home;