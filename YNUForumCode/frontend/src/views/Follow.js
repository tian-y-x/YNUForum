import React from 'react';
import Topic from "../SecondDegreeComponents/Topic";
import Frame from "../SecondDegreeComponents/Frame";
import Trends from "../components/Trends";

function Follow(props) {
    return (
        <Frame type={'1'}>
            <div
                className="site-layout-content"
                style={{
                    background: 'white',
                }}
            >
                <Trends></Trends>
            </div>
        </Frame>
    );
}

export default Follow;