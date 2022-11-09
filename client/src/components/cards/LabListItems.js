import React from 'react'
import {Link} from 'react-router-dom'

const LabListItems = ({lab}) => {
    const { details, building, floor, capacity, equipment} = lab;
    
   
    return (
        <>
        <h1 className='text-center'>Room Info</h1>
        <ul className='list-group'>
            <li className='list-group-item'>
                Details <span className='label label-default label-pill pull-xs-right'>
                    {details}
                </span>
            </li>
            <li className='list-group-item'>
                Building <span className='label label-default label-pill pull-xs-right'>
                    {building}
                </span>
            </li>
            <li className='list-group-item'>
                Floor <span className='label label-default label-pill pull-xs-right'>
                    {floor}
                </span>
            </li>
            <li className='list-group-item'>
                Capacity <span className='label label-default label-pill pull-xs-right'>
                    {capacity}
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