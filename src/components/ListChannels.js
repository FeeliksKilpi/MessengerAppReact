import React, {useState, useEffect} from 'react';
import {IoPeopleOutline} from 'react-icons/io5';

function ListChannels() {
    const [channels, setChannels] = useState([]);

    async function fetchJodels() {
        const response = await fetch('http://localhost:8080/channels');
        const json = await response.json();
        setChannels(json);
    }

    useEffect(() => {fetchJodels()}, []);
    //console.log(channels);

    const styles = {
        channel: {
            width: 350,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        OuterContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: '#e6e7e8',
        },
        InnerContainer: {
            display: 'flex',
            border: '1px solid #bbbdbf',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: '#e6e7e8',
        }
    }


    return(
        <div style={styles.OuterContainer}>
            {
                channels.map((chan) => (
                    <div key={chan.channelId} style={styles.InnerContainer}>
                        <p style={{fontSize: 32, color: 'grey', display: 'flex'}}>@</p>
                        <h2 style={styles.channel}>{chan.channelName}</h2>
                        <IoPeopleOutline style={{fontSize: 30, color: 'grey', display: 'flex'}}/>
                    </div>
                ))
            }
        </div>
    )
}

export default ListChannels;