import React from 'react'
import Box from '@mui/material/Box';

const LabListItems = ({lab}) => {
    const { details, building, floor, capacity} = lab;
    
   
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
                     <Box sx={{ fontWeight: 'bold', m: 1 , fontSize: 'h6.fontSize'}}>  {floor}</Box>
                </span>
            </li>
            <li className='list-group-item'>
            <Box sx={{ fontWeight: 'bold', m: 1 }}> Capacity </Box>
                <span className='label label-default label-pill pull-xs-right'>
                     <Box sx={{ fontWeight: 'bold', m: 1 , fontSize: 'h6.fontSize'}}> {capacity}</Box>
                </span>
            </li>
            <li className='list-group-item'>
                 <span className='label label-default label-pill pull-xs-right'>
                    
                     
                   
                </span>
            </li>
        </ul>
        </>
    )
}

export default LabListItems;