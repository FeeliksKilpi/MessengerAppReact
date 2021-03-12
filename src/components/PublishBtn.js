import React, { useState, useEffect } from 'react';

function PublishBtn() {
    const [write, setWrite] = useState(false);
    const [channels, setChannels] = useState([]);
    const [locations, setLocations] = useState([]);

    // Message Object proterties
    const [selChannelId, setChanId] = useState(6);
    const [text, setText] = useState('');
    const [ht, setHt] = useState('#');
    const [loc, setLoc] = useState('1');
    const [color, setColor] = useState('#f26d50');

    async function fetchChannels() {
        const response = await fetch('http://localhost:8080/channels');
        const json = await response.json();
        setChannels(json);
    }

    async function getLocations() {
        const response = await fetch('http://localhost:8080/locations');
        const json = await response.json();
        setLocations(json);
    }
    
    const handleWrite = () => {
        setWrite(true);
    }
    const handleCancel = () => {
        setWrite(false);
    }

    const printObj = () => {
        console.log({
            'messageText': text,
            'messageColor': color,
            'messageHashtag': ht,
            'messageLocation': {
                'locationId': loc,
            },
            'messageLikes': 0,
            'messageChannel': {
                'channelId': selChannelId
            }
        });
    }

    const createMsgObj = () => {
        const msg = {
            'messageText': text,
            'messageColor': color,
            'messageHashtag': ht,
            'messageLocation': {
                'locationId': loc,
            },
            'messageLikes': 0,
            'messageChannel': {
                'channelId': selChannelId
            }
        }
        return msg;
    }

    const clearValues = () => {
        setChanId(1);
        setText('');
        setHt('#');
        setLoc('Helsinki');
        setColor('#f26d50');
    }

    const postMessage = () => {
        const msgObj = createMsgObj();
        fetch('http://localhost:8080/publish', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(msgObj),
        });
        console.log("Message posted!");
    }

    useEffect(() => {getLocations()}, []);
    useEffect(() => {fetchChannels()}, []);

    const styles = 
    {
        hashtag: {
            width: 200,
            fontSize: 24,
            borderRadius: 50,
            padding: 10
        },
        text: {
            height: 100,
            width: 300,
            borderRadius: 50,
            padding: 10,
            fontSize: 20
        },
        select: {
            fontSize: 20,
            width: 200,
            margin: 5
        },
        btn: {
            fontSize: 24,
            width: 200,
            height: 40,
            margin: 5,
            padding: 5,
            borderRadius: 30,
            backgroundColor: '#f26d50',
            color: '#fff'
        },
        header: {
            fontSize: 20
        }
    }


    /* CONDITIONAL RENDERING */

    if (write === true) {
        return(
            <div style={{backgroundColor: "#f26d50", textAlign: 'center', display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <h1>Publish Message</h1>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor:'orange', padding: 30, borderRadius: 80}}>
                    <p style={styles.header}>Channel:</p>
                    <select name='messageChannel' value={selChannelId} onChange={(e) => setChanId(e.target.value)} style={styles.select}>
                    {channels.map(chan =>
                       <option 
                       key={chan.channelId} 
                       value={chan.channelId}
                       >{chan.channelName}</option> 
                    )}
                    </select>
                    <p style={styles.header}>Location:</p>
                    <select name='messageLocation' value={loc} onChange={(e) => setLoc(e.target.value)} style={styles.select}>
                    {
                        locations.map((loc) => (
                            <option key={loc.locationId} value={loc.locationId}>{loc.location}</option>
                        ))
                    }
                    </select>
                    <p style={styles.header}>Text:</p>
                    <input name='messageText' value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={styles.text}></input>
                    <p style={styles.header}>Hashtag:</p>
                    <input name='messageHashtag' value={ht} 
                    onChange={(e) => setHt(e.target.value)} 
                    style={styles.hashtag}></input>
                    <p style={styles.header}>Color:</p>
                    <select name='messageColor' value={color} onChange={(e) => setColor(e.target.value)} style={styles.select}>
                        <option value='#f26d50'>Tomato Red</option>
                        <option value='#0f8518'>Cucumber Green</option>
                        <option value='#ffc61c'>Sunrise Yellow</option>
                        <option value='#3e9cbf'>Skyline Blue</option>
                        <option value='#f5aa5f'>Chatty Orange</option>
                    </select>
                    <div className='palette'>
                    </div>
                    <button style={styles.btn} onClick={handleCancel}>takaisin</button>
                    <button style={styles.btn} onClick={postMessage}>Lähetä</button>
                    <button style={styles.btn} onClick={printObj}>LOG</button>
                    <button style={styles.btn} onClick={clearValues}>Tyhjennä</button>
                </div> 
            </div>
        )
    }

    return(
           <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.7}}>
            <button 
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 100, 
                borderRadius: 100, 
                height: 200, 
                width: 200, 
                borderWidth: 4,
                paddingBottom: 20,
                borderColor: 'white', 
                color: 'grey'}} 
                onClick={handleWrite}>+</button>
            </div>
    )
}

export default PublishBtn;