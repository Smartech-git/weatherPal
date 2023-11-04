import React, {useState, useEffect} from 'react';
import './SearchBar.css';
import {ReactComponent as Location} from '../Assets/location.svg';
import {ReactComponent as ArrowLeft} from '../Assets/ArrowLeft.svg';
import {ReactComponent as ArrowRight} from '../Assets/ArrowRight.svg';
import Ripples from 'react-ripples';
import {useStateValue} from '../StateProvider';
import {actionTypes} from '../Reducer'
import axios from "axios";

function SearchBar(props) {

    const [state, dispatch] = useStateValue();
    const [value, setValue] = useState('');
    const [leftArrowActive, setLeftArrowActive] = useState(false);
    const [rightArrowActive, setRightArrowActive] = useState(false);

    const handleAPIcall = () => {
        props.setViewMore(true)
        const params = {
            key: 'e724a77e072d428ea6a21539233010',
            q: value,
            format: 'json'
          }
          
          axios.get(' https://api.worldweatheronline.com/premium/v1/weather.ashx', {params})
            .then(response => {
              const apiResponse = response.data.data;
              let data = {
                current_condition: apiResponse.current_condition[0],
                request: apiResponse.request[0],
                weather: apiResponse.weather[0]
              }

              props.setViewMoreDetails(data)

            }).catch(error => {
                props.setViewMoreDetails("ERROR")
            })
    }


    const search = () => {
        if(value){
            handleAPIcall()
        }   
    }

    const enterKeyPressed = event => {
        if ( event.key === 'Enter' && value) {
            handleAPIcall()
        }
     }


    return (
            <div className="SearchBarContainer" style={{backgroundColor: state.themeHue.primary}}>
                <div className={`ArrowRipple`}>
                    <Ripples color={'rgba(0,0,0, 0.15)'}>
                        <div style={{backgroundColor: state.themeHue.primary_light}} className={`ArrowLeftPadding ArrowIcons-${state.theme}`}>
                            <ArrowLeft width ='18'/>
                        </div>
                    </Ripples>
                </div>
                <div style={{backgroundColor: state.themeHue.primary_light}}  className="SearchBar">
                    <input  style={{backgroundColor: state.themeHue.primary_light }}  className={`SearchInput PlaceHolder-${state.theme}`} onChange={(e)=> setValue(e.target.value)} value={value} onKeyDown={enterKeyPressed} placeholder="Search for your favourite city..."  spellCheck='false' type="text"/>
                    <div className='SearchRipple'>
                        <Ripples color={'rgba(0,0,0, 0.15)'}>
                            <div onClick={search}   className={`SearchButton SearchBarIcons-${state.theme}`} style={{backgroundColor: state.themeHue.primary}}>
                                <Location width="22px"/>
                                <span style={{color: state.themeHue.base}}>Search</span>
                            </div>
                        </Ripples>
                    </div>
                </div>
                <div className={`ArrowRipple`}>
                    <Ripples>
                        <div style={{backgroundColor: state.themeHue.primary_light}}  className={`ArrowRightPadding ArrowIcons-${state.theme}`}>
                            <ArrowRight width="18"/>
                        </div>
                    </Ripples>
                </div>
            </div>
    )
}

export default SearchBar; 
