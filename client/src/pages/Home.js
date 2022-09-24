import React, {useEffect, useState} from "react";
import { getLabsByCount } from "../functions/lab";

const Home = () => {
    const [labs, setLabs] = useState([])
    const [loading, setLoading ] = useState(false);

    useEffect(() => {
        loadAllLabs()
    }, [])

    const loadAllLabs = () => {
        getLabsByCount(3)
        .then(res => {
            setLabs(res.data);
        })
    }


    return (
        <div>
            <p>React Home</p>
            {JSON.stringify(labs)}
        </div>
    );
}

export default Home;