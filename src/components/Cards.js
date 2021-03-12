import React from 'react';
import '../cards.css';

function Cards() {

    return(
    <div className="body">
        <div className="container">
            <div className="card">
                <span></span>
                <div className="content">
                    <h2>Header Text</h2>
                    <p>Description or paragraph of the card.</p>
                    <a href="#">Read more</a>
                </div>
            </div>
            <div className="card">
                <span></span>
                <div className="content">
                    <h2>Header Text</h2>
                    <p>Description or paragraph of the card.</p>
                    <a href="#">Read more</a>
                </div>
            </div>
            <div className="card">
                <span></span>
                <div className="content">
                    <h2>Header Text</h2>
                    <p>Description or paragraph of the card.</p>
                    <a href="#">Read more</a>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Cards;