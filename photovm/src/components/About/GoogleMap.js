import React from 'react';

const GoogleMap = () => {

    return (
        <div className="map-wrapper">
            <embed className="map"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=kpi&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                frameBorder="0" 
                scrolling="no" 
                title="google-map"/>
    </div>
    );
}

export default GoogleMap;