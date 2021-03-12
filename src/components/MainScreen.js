import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {IoChevronUpOutline, IoChevronDownOutline, IoEllipsisHorizontal, IoLocationSharp, IoChatbubblesOutline} from 'react-icons/io5';

function MainScreen() {

    // Array of messages of a selected Channel
    const [messages, setMessages] = useState([]);
    // Array that holds channels
    const [channels, setChannels] = useState([]);
    // Array that holds locations
    const [locations, setLocations] = useState([]);

    // Holds the current selected Channel, by default "@Main"
    const [selectedChannel, setSelectedChannel] = useState('@Main');
    const [selChannelId, setChanId] = useState(1);
    const [selectedLoc, setSelectedLoc] = useState('Finland');

    // Options panel for message
    const [options, setOptions] = useState(false);
    const [id, setId] = useState(0);

  /*  function filterByLocation() {
        setLocationFilter(
            messages.filter(msg => msg.messageLocation.location === selectedLoc)
        );
    } */

    // Fetch messages by channelname
    async function fetchMessages() {
        const response = await fetch('http://localhost:8080/channelbyname/'+selectedChannel);
        const json = await response.json();
        setMessages(json.messages);
        setSelectedChannel(json.channelName);
        setChanId(json.channelId);
        console.log("Fetched messages from " + selectedChannel + " and filtered by " + selectedLoc);
    }

    // Fetch Channels
    async function fetchChannels() {
        const response = await fetch('http://localhost:8080/channels');
        const json = await response.json();
        setChannels(json);
        console.log("fetched Channels");
    }
    // Fetch Locations
    async function fetchLocations() {
        const response = await fetch('http://localhost:8080/locations');
        const json = await response.json();
        setLocations(json);
        console.log("fetched Locations");
    } 

    const postDelete = (msgId) => {
        console.log("Deleting message (ID) " + id);
        axios.delete("http://localhost:8080/message/delete/"+id)
            .then(res => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleOptionsOpen = (id) => {
        setOptions(true);
        console.log("Options for message with ID: " + id);
        setId(id);
    }
    const handleOptionsClose = () => {
        setOptions(false);
    }

    const onChannelChange = (e) => {
        setSelectedChannel(e.target.value);
    }
    const onLocationChange = (e) => {
        setSelectedLoc(e.target.value);  
    }

    const onUpvote = (id, text, color, ht, loc, likes) => {
        const msgData = {
            messageId: id,
            messageText: text,
            messageColor: color,
            messageHashtag: ht,
            messageLocation: {
                locationId: loc
            },
            messageLikes: likes+1,
            messageChannel: {
                channelId: selChannelId
            }
        }
        axios.put('http://localhost:8080/upvote', msgData)
        .then(response => {
            if (response.status === 200) {
                console.log("upvoted message " + id);
            } else {
                console.log("Upvote failed");
            }
        })
    }

    const onDownvote = (id, text, color, ht, loc, likes) => {
        const msgData = {
            messageId: id,
            messageText: text,
            messageColor: color,
            messageHashtag: ht,
            messageLocation: {
                locationId: loc
            },
            messageLikes: likes-1,
            messageChannel: {
                channelId: selChannelId
            }
        }
        axios.put('http://localhost:8080/upvote', msgData)
        .then(response => {
            if (response.status === 200) {
                console.log("Downvoted message " + id);
            } else {
                console.log("Downvote failed");
            }
        })
    }

    useEffect(() => {fetchMessages()}, [selectedChannel, selectedLoc]);
    useEffect(() => {fetchChannels()}, []);
    useEffect(() => {fetchLocations()}, []);

    
    if (options === true) {
        return(
            <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'orange', alignItems: 'center'}}>
                <h1>Message settings</h1>
                <p>MessageID: {id}</p>
                <div className='op_btns' style={{display: 'flex', flexDirection: 'column', width: 200, alignItems: 'center', margin: 20}}>
                    <button style={{display: 'flex', height: 40, width: 150, fontSize: 24}} onClick={postDelete}>Delete</button>
                    <button style={{display: 'flex', height: 40, width: 150, fontSize: 24}}>Share</button>
                    <button style={{display: 'flex', height: 40, width: 150, fontSize: 24}}>Save</button>
                    <button style={{display: 'flex', height: 40, width: 150, fontSize: 24}} onClick={handleOptionsClose}>Close</button>
                </div>
            </div>
        )
    }
    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', backgroundColor: '#d7d9db', alignItems: 'center', justifyContent: 'center', padding: 10}}>
                <div style={{display: 'flex', marginRight: 20, backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center', borderRadius: 50, paddingLeft: 30, paddingRight: 30}}>
                    <IoChatbubblesOutline style={{fontSize: 28, color: '#fff', margin: 10}} />
                <select onChange={onChannelChange} style={{width: 200, height: 40, fontSize: 24, display: 'flex', BackgroundColor: '#fff'}}>
                    {channels.map(chan =>
                       <option 
                       key={chan.channelId} 
                       value={chan.channelName}
                       >{chan.channelName}</option> 
                    )}
                </select>
                </div>
                <div style={{display: 'flex', marginRight: 20, backgroundColor: 'orange', alignItems: 'center', justifyContent: 'center', borderRadius: 50, paddingLeft: 30, paddingRight: 30}}>
                    <IoLocationSharp style={{fontSize: 28, color: "#fff", margin: 10}}/>
                        <select style={{display: 'flex', backgroundColor: '#fff', height: 40, width: 200, padding: 15, fontSize: 20}} onChange={onLocationChange}>
                                {
                                    locations.map((loc) => (
                                        <option key={loc.locationId}>{loc.location}</option>
                                    ))
                                }
                                <option value="" selected disabled hidden>Choose Location</option>
                        </select>
                </div>
            </div>
            { 
            messages.filter(msg => msg.messageLocation.location === selectedLoc).map((msg) => (
            <div key={msg.messageId} style={{backgroundColor: msg.messageColor}}>
            <div id='jodelContainer' style={{margin: 10}}>
                <div id='topBar' style={{display: 'flex', flexDirection: 'row'}}>
                    <IoLocationSharp style={{color: "#fff", fontSize: 20, marginTop: 10, opacity: 0.7}}/>
                    <p style={{color: "#fff", fontSize: 14, marginTop: 10, marginRight: 15, opacity: 0.7}}>{msg.messageLocation.location}</p>
                    <p style={{color: "#fff", fontSize: 14, marginRight: 10}}><b>{selectedChannel}</b></p>
                    <p style={{color: "#fff", fontSize: 14, opacity: 0.7}}>0s</p>
                </div>
                <div id='jodling' style={{display: 'flex'}}>
                    <div id='textContent' style={{flex: 10}}>
                        <p style={{color: "#fff", fontSize: 18}}>{msg.messageText}</p>
                        <br />
                        <p style={{color: "#fff", fontSize: 18}}><b>{msg.messageHashtag}</b></p>
                        <p>{msg.messageId}</p>
                    </div>
                    <div id='rightControls' style={{flex: 1}}>
                        <div id='likes' style={{display: 'flex', flexDirection: 'column'}}>
                            <IoChevronUpOutline style={{color: "#fff", fontSize: 25}} 
                            onClick={() => 
                                onUpvote(msg.messageId, msg.messageText, msg.messageColor, msg.messageHashtag, msg.messageLocation.locationId, msg.messageLikes)
                            }/>
                            <p style={{color: "#fff", fontSize: 25, paddingLeft: 5}}>{msg.messageLikes}</p>
                            <IoChevronDownOutline style={{color: "#fff", fontSize: 25}}
                            onClick={() =>
                            onDownvote(msg.messageId, msg.messageText, msg.messageColor, msg.messageHashtag, msg.messageLocation.locationId, msg.messageLikes)}/>
                        </div>
                    </div>
                </div>
                <div id='threeDots' style={{display: 'flex'}}>
                    <IoEllipsisHorizontal style={{color: "#fff", fontSize: 30, flex: 1}}
                    onClick={() => handleOptionsOpen(msg.messageId)} id={msg.messageId}/>
                </div>
            </div>
            </div>
            ))
            }
        </div>
    )
}

export default MainScreen;