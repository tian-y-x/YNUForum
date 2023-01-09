import React, {useContext} from 'react';
import Frame from "../SecondDegreeComponents/Frame";
import Topic from "../SecondDegreeComponents/Topic";
import {GlobalContext} from "../routers/AppRouters";

function HotTopic(props) {
    const value = useContext(GlobalContext)
    return (
        <Frame type={'2'}>
            <div
                className="site-layout-content"
                style={{
                    background: 'white',
                }}
            >
                <Topic></Topic>
            </div>
        </Frame>

    );
}

export default HotTopic;