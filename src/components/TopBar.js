import React, {useState, useEffect} from 'react';
import {IoLocationSharp} from 'react-icons/io5';

function TopBar() {

    const [locations, setLocations] = useState([]);

    async function getLocations() {
        const response = await fetch('http://localhost:8080/locations');
        const json = await response.json();
        setLocations(json);
    }

    useEffect(() => {getLocations()}, []);
    //console.log(locations);

    return(
       <div style={{backgroundColor: 'orange', height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
       <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 80, backgroundColor: "#e6e7e8", paddingLeft: 30, paddingRight: 30, borderRadius: 50}}>
            <IoLocationSharp style={{fontSize: 32, display: 'flex', color: "orange"}}/>
            <select style={{display: 'flex', backgroundColor: '#d7d9db', height: 40, width: 250, padding: 15, borderRadius: 25, fontSize: 25}}>
                {
                    locations.map((loc) => (
                        <option key={loc.locationId}>{loc.location}</option>
                    ))
                }
            </select>
        </div>
        </div>
    )
}

export default TopBar;