import React from 'react';
import classes from './DataList.module.css';

const DataList = (props) => {
    let element = <div className={classes.DataList}>
        {props.cityList.map((city) => <p key={city.woeid} onClick={(event) => props.cityWeatherHandler(event, city) }>{city.title}</p>)}
    </div>;

    if(props.cityList.length === 0) {
        element=<p style={{color: 'red'}}>No information regarding this city</p>
    }

    return (<>
        {props.showDataList ? element: null}
    </>        
       
    );
}

export default DataList;