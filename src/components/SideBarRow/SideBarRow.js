import React from 'react';
import './SideBarRow.css';


const SideBarRow = ({selected, Icon, title,liked}) => {
    console.log(liked, "likedbdatafd");

    return (
        <div className={`sidebarrow ${selected ? 'selected':liked?"liked": ''}`}>
            <Icon className='sidebarrow__icon'/>
            <h2 className='sidebarrow__title'>{title}</h2>
        </div>
    )
}

export default SideBarRow;
