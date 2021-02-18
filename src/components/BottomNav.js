import React, { useState, useEffect } from 'react';
import {MdExplore, MdTrackChanges, MdPersonPin} from 'react-icons/md';

import ListView from './ListView';
import ListChannels from './ListChannels';

function BottomNav() {
    const [selection, setSelection] = useState('feed');

    const handleFeed = () => {
        setSelection('feed');
    }
    const handleChannels = () => {
        setSelection('channels');
    }
    const handleOptions = () => {
        setSelection('options');
    }

    if (selection === 'feed') {
    return(
    <div className='OuterContainer'>
    <ListView />
        <div className='NavContainer' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange'}}>
            <div className='Channels' style={{display: 'flex'}}>
                <button style={{width: 150, height: 100, backgroundColor: '#fff', fontSize: 42}}
                onClick={handleChannels}><MdTrackChanges /></button>
            </div>
            <div className='Feed' style={{display: 'flex'}}>
                <button style={{width: 150, height: 100, backgroundColor: '#fff', fontSize: 42}}
                onClick={handleFeed}><MdExplore /></button>
            </div>
            <div className='Options' style={{display: 'flex'}}>
                <button style={{width: 150, height: 100, backgroundColor: '#fff', fontSize: 42}}
                onClick={handleOptions}><MdPersonPin /></button>
            </div>
        </div>
    </div>
    )
    }
    else if (selection === 'channels') {
        return(
        <div className='OuterContainer'>
            <h1>Channels</h1>
            <ListChannels />
            <div className='NavContainer' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange'}}>
            <div className='Channels' style={{display: 'flex'}}>
                <button style={{width: 150, height: 100, backgroundColor: '#fff', fontSize: 42}}
                onClick={handleChannels}><MdTrackChanges /></button>
            </div>
            <div className='Feed' style={{display: 'flex'}}>
                <button style={{width: 150, height: 100, backgroundColor: '#fff', fontSize: 42}}
                onClick={handleFeed}><MdExplore /></button>
            </div>
            <div className='Options' style={{display: 'flex'}}>
                <button style={{width: 150, height: 100, backgroundColor: '#fff', fontSize: 42}}
                onClick={handleOptions}><MdPersonPin /></button>
            </div>
        </div>
    </div>
        )
    }
    else if (selection === 'options') {
        return(
        <div className='OuterContainer'>
            <h1>Options</h1>
            <div className='NavContainer' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange'}}>
            <div className='Channels' style={{display: 'flex'}}>
                <button style={{width: 150, height: 100, backgroundColor: '#fff', fontSize: 42}}
                onClick={handleChannels}><MdTrackChanges /></button>
            </div>
            <div className='Feed' style={{display: 'flex'}}>
                <button style={{width: 150, height: 100, backgroundColor: '#fff', fontSize: 42}}
                onClick={handleFeed}><MdExplore /></button>
            </div>
            <div className='Options' style={{display: 'flex'}}>
                <button style={{width: 150, height: 100, backgroundColor: '#fff', fontSize: 42}}
                onClick={handleOptions}><MdPersonPin /></button>
            </div>
        </div>
    </div>
        )
    }
}

export default BottomNav;