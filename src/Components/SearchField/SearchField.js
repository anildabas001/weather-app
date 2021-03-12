import React, {useState, useEffect} from 'react';
import DataList from '../DataList/DataList';
import classes from './SearchField.module.css';


const SearchField = (props) => { 
    return (
        <div className={classes.SearchBox}>
            <input placeholder='Please enter the city name.' ref={props.forwardRef} className={classes.Search} type='text' onChange={props.searchHandler }/>
            <DataList showDataList={props.showDataList} cityWeatherHandler={props.cityWeatherHandler} cityList={props.cityList}/> 
        </div>
    );
}

export default SearchField;