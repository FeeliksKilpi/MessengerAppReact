import React, {useState, useEffect} from 'react';

function ListChannels() {
    const [channels, setChannels] = useState([]);

    async function fetchJodels() {
        const response = await fetch('http://localhost:8080/channels');
        const json = await response.json();
        setChannels(json);
    }

    useEffect(() => {fetchJodels()}, []);
    console.log(channels);


    return(
        <div style={{backgroundColor: 'orange', }}>
            {
                channels.map((chan) => (
                    <h1>{chan.channelName}</h1>
                ))
            }
        </div>
    )
}

export default ListChannels;