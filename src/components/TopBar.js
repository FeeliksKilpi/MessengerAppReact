import React from 'react';
import {IoLocationSharp} from 'react-icons/io5';

function TopBar() {

    return(
       <div style={{backgroundColor: 'orange', height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
       <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 80, backgroundColor: "#fff", paddingLeft: 30, paddingRight: 30, borderRadius: 50}}>
            <IoLocationSharp style={{fontSize: 32, display: 'flex', color: "orange"}}/>
            <select style={{display: 'flex', backgroundColor: '#fff', height: 40, width: 250, padding: 15, borderRadius: 25, fontSize: 25}}>
                <option>Helsinki</option>
                <option>Pori</option>
                <option>Turku</option>
            </select>
        </div>
        </div>
    )
}

export default TopBar;