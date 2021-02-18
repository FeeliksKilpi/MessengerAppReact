import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {IoChevronUpOutline, IoChevronDownOutline, IoEllipsisHorizontal, IoLocationSharp} from 'react-icons/io5';

function ListView() {
    // Array of messages of a selected Channel
    const [messages, setMessages] = useState([]);
    // Array of channels
    const [channels, setChannels] = useState([]);
    // Holds the current selected Channel, by default "@Main"
    const [selectedChannel, setSelectedChannel] = useState('@Main');
    const [selChannelId, setChanId] = useState(1);
    const [likes, setLikes] = useState(0);
    // Options panel for message
    const [options, setOptions] = useState(false);
    const [id, setId] = useState(0);

    async function fetchMessages() {
        const response = await fetch('http://localhost:8080/channelbyname/'+selectedChannel);
        const json = await response.json();
        setMessages(json.messages);
        setSelectedChannel(json.channelName);
        setChanId(json.channelId);
    }
    
    async function fetchChannels() {
        const response = await fetch('http://localhost:8080/channels');
        const json = await response.json();
        setChannels(json);
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

   /* const handleUpvote = (msgId) => {
        console.log("Upvoted message (ID) " + id);
        axios.put("http://localhost:8080/upvote/" + id, {messageId: id})
        .then(res => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    } */

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

    const onUpvote = (id, text, color, ht, loc, likes) => {
        const msgData = {
            messageId: id,
            messageText: text,
            messageColor: color,
            messageHashtag: ht,
            messageLocation: loc,
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
        window.location.reload(false);
    }

    useEffect(() => {fetchMessages()}, [selectedChannel]);
    useEffect(() => {fetchChannels()}, []);

    console.log(channels);
    console.log(messages);
    console.log("Channel chosen: " + selectedChannel);
    
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
            <div style={{display: 'flex', backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center', padding: 10}}>
                <div style={{display: 'flex', marginRight: 20}}>
                    <h1>Channel: </h1>
                </div>
                <select onChange={onChannelChange} style={{width: 200, height: 50, fontSize: 24}}>
                    {channels.map(chan =>
                       <option 
                       key={chan.channelId} 
                       value={chan.channelName}
                       >{chan.channelName}</option> 
                    )}
                </select>
            </div>
            {
            messages.map((msg) => (
            <div key={msg.messageId} style={{backgroundColor: msg.messageColor}}>
            <div id='jodelContainer' style={{margin: 10}}>
                <div id='topBar' style={{display: 'flex', flexDirection: 'row'}}>
                    <IoLocationSharp style={{color: "#fff", fontSize: 20, marginTop: 10, opacity: 0.7}}/>
                    <p style={{color: "#fff", fontSize: 14, marginTop: 10, marginRight: 15, opacity: 0.7}}>{msg.messageLocation}</p>
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
                            <IoChevronUpOutline style={{color: "#fff", fontSize: 25}} />
                            <button 
                            onClick={() => 
                            onUpvote(msg.messageId, msg.messageText, msg.messageColor, msg.messageHashtag, msg.messageLocation, msg.messageLikes)
                            }>Testi upvote</button>
                            <p style={{color: "#fff", fontSize: 25}}>{msg.messageLikes}</p>
                            <IoChevronDownOutline style={{color: "#fff", fontSize: 25}}/>
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

export default ListView;