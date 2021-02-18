import React, { useState } from 'react';

function PublishBtn() {
    const [write, setWrite] = useState(false);
    const [msgObj, setMsgObj] = useState({
            messageText: '',
            messageColor: 'green',
            messageChannel:  {
                channelName: '',
                channelDesc: ''
            },
            messageHashtag: '',
            messageLocation: 'Helsinki',
            messageLikes: 0
    });
    const [channels, setChannels] = useState([]);
    
    const handleWrite = () => {
        setWrite(true);
    }
    const handleCancel = () => {
        setWrite(false);
    }

    const printObj = () => {
        console.log(msgObj);
    }
    const changeValues = (val) => {
        setMsgObj({
            ...msgObj,
            [val.target.name]: val.target.value
        });
    }

    const clearValues = () => {
        setMsgObj({
            messageText: '',
            messageColor: 'green',
            messageChannel:  {
                channelName: '',
                channelDesc: ''
            },
            messageHashtag: '',
            messageLocation: 'Helsinki',
            messageLikes: 0
        });
    }

    const postMessage = () => {
        fetch('http://localhost:8080/publish', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(msgObj)
        });
        console.log("Message posted!");
    }


    /* CONDITIONAL RENDERING */

    if (write === true) {
        return(
            <div style={{height: 400, backgroundColor: "#f26d50", textAlign: 'center'}}>
                <h1>Kirjoita</h1>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <p>Kanava:</p>
                    <select name='messageChannel' value={msgObj.messageChannel.channelName} onChange={changeValues} style={{display: 'flex', width: 150}}>
                        <option value='@Main'>@Main</option>
                        <option value='@Opiskelu'>@opiskelu</option>
                        <option value='@Menot'>@menot</option>
                        <option value='@Ruoka'>@ruoka</option>
                    </select>
                    <p>Teksti:</p>
                    <input name='messageText' value={msgObj.messageText}
                    onChange={changeValues}
                    style={{display: 'flex', height: 100, width: 350, fontSize: 18}}></input>
                    <p>Hashtag:</p>
                    <input name='messageHashtag' value={msgObj.messageHashtag} 
                    onChange={changeValues} 
                    style={{display: 'flex', width: 150}}></input>
                </div>
               
                <button onClick={handleCancel}>takaisin</button>
                <button onClick={postMessage}>Lähetä</button>
                <button onClick={printObj}>LOG</button>
                <button onClick={clearValues}>Tyhjennä</button>
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