import React, {useState, useEffect, useRef, forwardRef} from 'react';
import SearchField from '../../Components/SearchField/SearchField';
import WeatherSection from '../../Components/WeatherSection/WeatherSection';
import axios from 'axios';
import classes from './MainPage.module.css'

const MainPage = (props) => {
    const inputRef = useRef(null);
    let timer;
    const [loading, updateLoading] = useState(false);
    const [dataList, updateDataList] = useState([]);
    const [weatherData, updateWeatherData] = useState({
        weather: {},
        cityInfo: {}
    });
    const [error, updateError] = useState(null);
    const [showDataList, updateShowDataList] = useState(false);
    
    const searchHandler = (event) => {
        if (timer) {
            clearTimeout(timer);
        }

        let { value } = event.target;

        if ((value === null || value.match(/^ *$/) !== null)) {
            value = `''`;
        }

        timer = setTimeout(() => {
           
        if (value === event.target.value || value === `''`) {
            
                const response = axios.get(`https://www.metaweather.com/api/location/search/?query=${value}`).then(response => {
                updateDataList(
                   [...response.data]
                )
              if (value !== `''`) {
                 updateShowDataList(true);
                }
              else {
                updateShowDataList(false);
              }                
            }).catch(err => {updateError('Something went wrong. Please try again.')});;
            updateError(null);  
        }}, 300);
    }

    useEffect(() => {
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }
    }, [timer]);

    const cityWeatherHandler = async (event, city) => {
        updateLoading(true);

        inputRef.current.value = city.title;        
        updateShowDataList(false);
        try {
            const response= await fetch(`https://www.metaweather.com/api/location/${city.woeid}`);
            let weatherData = await response.json();
            weatherData = weatherData.consolidated_weather[0];
            updateWeatherData({
                weather: {...weatherData},
                city: {...city}
            });

            updateLoading(false);
            updateError(null);
        }
        catch {
            updateError('Something went wrong. Please try again');
        }
        
    }

    return(
        <div className={classes.mainPage}>
            <h1 className={classes.Heading}>Weather App</h1>
            <SearchField forwardRef={inputRef} showDataList={showDataList} searchHandler={searchHandler} cityWeatherHandler={cityWeatherHandler} cityList={dataList}/>
            <WeatherSection error={error} loading={loading} weatherData = {weatherData}/> 
        </div>      
    );
}

export default MainPage;
