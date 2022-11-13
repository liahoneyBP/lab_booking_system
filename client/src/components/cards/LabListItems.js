import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { integerPropType } from '@mui/utils';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

import WebAssetIcon from '@mui/icons-material/WebAsset';

const LabListItems = ({ lab }) => {
    const { details, building, floor, capacity, equipment } = lab;
    const [loading, setLoading] = useState(false);





    return (
        <>
            <h1 className='text-center'> <Box sx={{ fontWeight: 'bold', m: 1, fontFamily: 'Roboto' }}> Room Info </Box></h1>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <Box sx={{ fontWeight: 'bold', m: 1 }}> Details </Box>
                    <span className='label label-default label-pill pull-xs-right'>
                        <Box sx={{ fontWeight: 'bold', m: 1, fontSize: 'h6.fontSize' }}>{details} </Box>
                    </span>
                </li>
                <li className='list-group-item'>
                    <Box sx={{ fontWeight: 'bold', m: 1 }}> Building </Box>
                    <span className='label label-default label-pill pull-xs-right'>
                        <Box sx={{ fontWeight: 'bold', m: 1, fontSize: 'h6.fontSize' }}> {building}</Box>
                    </span>
                </li>
                <li className='list-group-item'>
                    <Box sx={{ fontWeight: 'bold', m: 1 }}> Floor </Box>
                    <span className='label label-default label-pill pull-xs-right'>
                        <Box sx={{ fontWeight: 'bold', m: 1, fontSize: 'h6.fontSize' }}>  {floor}</Box>
                    </span>
                </li>
                <li className='list-group-item'>
                    <Box sx={{ fontWeight: 'bold', m: 1 }}> Capacity </Box>
                    <span className='label label-default label-pill pull-xs-right'>
                        <Box sx={{ fontWeight: 'bold', m: 1, fontSize: 'h6.fontSize' }}> {capacity}</Box>
                    </span>
                </li>
                <li className='list-group-item'>
                    <Box sx={{ fontWeight: 'bold', m: 1 }}> EQUIPMENT </Box>
                    <span className='label label-default label-pill pull-xs-right'>
                       
                            {equipment?.map((data) => {
                                return <div key={data.value} class="d-inline p-3 bg-dark text-white">{data.value}</div>
                            })}
                    
                    </span>
                </li>
            </ul>
        </>
    )
}

export default LabListItems;