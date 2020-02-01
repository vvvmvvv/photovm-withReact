import React, { useState } from 'react';

const GoogleMap = () => {

    const [iFrameLoaded, setIFrameLoaded] = useState(false);

    return (
        <div className="map">
            {!iFrameLoaded 
            ?   (
                    <div className="processing">
                        <p>Request is being processed <span className="process"></span></p>
                        <div className="loader">Loading...</div>
                    </div>
                )
            : null}
            <iframe
                onLoad={() => setIFrameLoaded(true)}
                width="600"
                height="500"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0" />
        </div>
    );
}

export default GoogleMap;