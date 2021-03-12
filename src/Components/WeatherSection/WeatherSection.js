import React from 'react';
import classes from './WeatherSection.module.css';

const WeatherSection = (props) => {
    const loader = (<div className={classes['lds-facebook']}><div></div><div></div><div></div></div>);
    let element = null;

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    if (props.weatherData.city) {
        element = (<><div className={classes.Heading}>
                <h2>{props.weatherData.city.title}</h2>
                <p>{props.weatherData.city.location_type}</p>
                <p>{today.toLocaleDateString("en-US", options)}</p>
            </div>
            <div className={classes.WeatherInfo}>
                <div className={classes.WeatherSection1}>
                    <div className={classes.WeatherState}>
                        <img alt={`props.weatherData.weather.weather_state_name icon`} src={`https://www.metaweather.com/static/img/weather/${props.weatherData.weather.weather_state_abbr}.svg`}></img>
                        <p>{props.weatherData.weather.weather_state_name}</p>
                    </div>
                    <div className={classes.Temperatures}>
                        <p className={classes.MainTemp}>Temperature: {(parseInt(props.weatherData.weather.the_temp).toFixed(0))}<span><sup>o</sup>C</span></p>
                        <p>Minimum: {(parseInt(props.weatherData.weather.min_temp).toFixed(0))}<span><sup>o</sup>C</span></p>
                        <p>Maximum: {(parseInt(props.weatherData.weather.max_temp).toFixed(0))}<span><sup>o</sup>C</span></p>
                    </div>                    
                </div>
                <div className={classes.WeatherSection2}>
                    <p >Humidity: {parseInt(props.weatherData.weather.humidity).toFixed(0)}<span>%</span></p>
                    <p>Wind: {parseInt(props.weatherData.weather.wind_speed).toFixed(0)}<span>mph</span></p>
                    <p>Visibility: {parseInt(props.weatherData.weather.visibility).toFixed(0)}<span>miles</span></p>
                </div>
            </div>
        </>);
    }
    
    return(<>
        
        {props.error ? <p style={{color:'red', textAlign: 'center'}}>{props.error}</p> : props.loading ? <div className={classes.LoaderContainer}>{loader}</div>: <div className={classes.WeatherBox}> {element}</div>}              
    
    </>);        
}

export default WeatherSection;
