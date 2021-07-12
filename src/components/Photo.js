import React from 'react';

const Photo = (props) => {
    return (
        <section>
            <img src={props.url} width="290vw" height="300vh" alt="doggo photo"/>
        </section>
    );
}

export default Photo