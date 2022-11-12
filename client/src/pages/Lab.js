import React, { useState, useEffect } from "react";
import { getLabsByCount, fetchLabsbyFilter } from "../functions/lab";
import { useSelector, useDispatch } from "react-redux";
import LabCard from "../components/cards/LabCard";

import Search from "../components/forms/Search";

import { Menu, Slider, Radio } from "antd"
import { DesktopOutlined, DownSquareOutlined } from "@ant-design/icons";
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const { SubMenu } = Menu;


const Lab = () => {
    const [labs, setLabs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [capacity, setCapacity] = useState([0, 0]);
    const [ok, setOk] = useState(false);

    const [buildings, setBuildings] = useState([
        "1",
        "15",
    ]);
    const [building, setBuilding] = useState('')

    const [floors, setFloors] = useState([
        "2",
        "3",
    ])
    const [floor, setFloor] = useState("");

    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;


    useEffect(() => {
        loadAllLabs()
        // console.log("Hello");
    }, [])


    // 1. load labs by fedault on page load
    const loadAllLabs = () => {
        getLabsByCount(6).then(lab => {
            setLabs(lab.data);
            setLoading(false);
        });
    };

    const fetchLabs = (arg) => {
        fetchLabsbyFilter(arg).then((res) => {
            setLabs(res.data);
        });
    }

    // 2. load labs on user search input
    useEffect(() => {
        // console.log('load labs on user search input', text);
        const delayed = setTimeout(() => {
            if (!text) {
                return loadAllLabs();
            }
            fetchLabs({ query: text });
        }, 300)
        return () => clearTimeout(delayed);

    }, [text])


    // 3. load labs based on capacity range
    useEffect(() => {
        console.log('ok to request')
        fetchLabs({ capacity });
    }, [ok])

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setCapacity(value);
        setBuilding("");
        setTimeout(() => {
            setOk(!ok);
        }, 300)
    }

    // 4. load labs based on building
    const showBuildings = () =>
        buildings.map((b) => (
            <Radio
                value={b}
                name={b}
                checked={b === building}
                onChange={handleBuilding}
                className="pb-1 pl-4 pr-4"
            >
                {b}
            </Radio>
        ))

    const handleBuilding = (e) => {
        setCapacity([0, 0]);
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setBuilding(e.target.value)
        fetchLabs({ building: e.target.value });
    }

    // 5. load labs based on floor
    const showFloors = () =>
        floors.map((f) => (
            <Radio
                value={f}
                name={f}
                checked={f === floor}
                onChange={handleFloor}
                className="pb-1 pl-4 pr-4"
            >
                {f}
            </Radio>
        ))

    const handleFloor = (e) => {
        setCapacity([0, 0]);
        setBuilding("");
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setFloor(e.target.value)
        fetchLabs({ floor: e.target.value });
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 m-1">
                        <Box sx={{ fontFamily: 'Roboto', fontSize: 'h6.fontSize', m: 1, color: 'black' }}>
                            Search / Filter

                        </Box>
                        <Search />
                        <hr />

                        <Menu defaultOpenKeys={['1', '2', '3']} mode="inline">
                            <SubMenu key="1" title={<span className="h6"><DesktopOutlined /> Capacity</span>}>
                                <div className="">
                                    <Slider
                                        className="ml-4 mr-4"
                                        tipFormatter={(v) => `${v} ที่นั่ง`}
                                        range
                                        value={capacity}
                                        onChange={handleSlider}

                                    />

                                </div>
                            </SubMenu>

                            <SubMenu
                                key="2"
                                title={
                                    <span className="h6"><DownSquareOutlined /> Building
                                    </span>}>
                                <div style={{ maringTop: "-10px" }} className="pr-5">
                                    {showBuildings()}
                                </div>
                            </SubMenu>

                            <SubMenu
                                key="3"
                                title={
                                    <span className="h6"><DownSquareOutlined /> Floor
                                    </span>}>
                                <div className="pl-4 pr-4">
                                    {showFloors()}
                                </div>
                            </SubMenu>
                        </Menu>
                    </div>

                    <div className="col-md-9 mt-3">
                        {loading ? (
                            <>
                                <span></span>

                            </>
                        ) : (
                            <h2 className="m-1">Labs</h2>
                        )}

                        {labs.length < 1 && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                            <LinearProgress color="secondary" />
                            <LinearProgress color="success" />
                            <LinearProgress color="inherit" />
                        </Stack>}

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