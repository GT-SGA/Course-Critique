import React from "react";
import Photo from "./Photo";

const PhotoContainer = props => {
    const displayPhotos = () => {
        return props.photos.map(photo => {
            return <Photo url={photo.url} />;
        });
    };

    return (
        <>
        <section style={{ marginTop: '1em' }}>{displayPhotos()}</section>
        </>
    );
};

export default PhotoContainer;