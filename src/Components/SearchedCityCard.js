import React from 'react'
import './SearchedCityCard.css'
import { useStateValue } from '../StateProvider'
import Ripples from 'react-ripples';
import {ReactComponent as ArrowLeft} from '../Assets/ArrowLeft.svg';
import WBG from '../Assets/WBG.png'
import humidity from '../Assets/humidity.png'
import wind from '../Assets/wind.png'
import uv from '../Assets/uv.png'
import cloud from '../Assets/cloud.png'
import heart_dark from '../Assets/heart_dark.png'
import heart_light from '../Assets/heart_light.png'
import heart from '../Assets/heart.png'
import { getSettings, setSettings } from '../APIs';

export default function SearchedCityCard(props) {
  const [state, dispatch] = useStateValue()
  const current_condition = props.data ? props.data.current_condition : ''
  const request = props.data ? props.data.request : ''
  const weather = props.data ? props.data.weather : ''

  const hangdleNavigation = () => {
    props.setViewMore(false)
  }

  const handleCheckForFavourites = () => {
    if(props.fav.includes(request.query)){
     return true
   } else {
     return false
   }
  
}

const handleAddToFavourite = () => {
 props.setFav((prev) => {
   let arr = [...prev, request.query]
   arr.sort()
   return arr
 })
 let data = getSettings("favourites")
 console.log(data)
 let newData =[
   ...data,
   request.query
 ]
 newData.sort()
 setSettings("favourites", newData)
}

  return (
    <div className='searchedCityCard'>
      <div className='searchedCityCard-header'>
        <div className={`ArrowRipple`}>
            <Ripples onClick={hangdleNavigation} color={'rgba(0,0,0, 0.15)'}>
                <div style={{backgroundColor: state.themeHue.primary_light}} className={`ArrowLeftPadding ArrowIcons-${state.theme}`}>
                    <ArrowLeft width ='18'/>
                </div>
            </Ripples>
        </div>
      </div>
      {
        (props.error || props.data === undefined)? (
          <div className='searchedCityCard' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: state.themeHue.primary_light}}>{props.data === undefined ? <h1 style ={{ color: state.themeHue.primary }} className='viewMoreLoading'>Loading . . .</h1> : <h1 style ={{ color: state.themeHue.primary }} className='viewMoreLoading'>Can't fetch data at the moment &#129402;</h1>}</div>
        ) : (
          <div className='searchedCityCard-content' style={{ backgroundImage: `url(${WBG})`, backgroundColor: state.themeHue.primary_light}}>
              <div>
                <div className='cityCardContent-header'>
                    <span>{current_condition.observation_time}</span>
                    <div className='content-temp'>
                      <p>{current_condition.temp_C}<sup>0</sup>C</p>
                      <p>{current_condition.weatherDesc[0].value}</p>
                    </div>
                    <span>{weather.date}</span>
                </div>

                <div className="content-bottom">
                  <div className='content-cityName'>
                      <p>{request.query.split(' ')[0]}</p>
                      <span>{request.query.split(' ')[1]}</span>
                  </div>
                  <div className='content-weather'>
                    <div>
                      <span>Humidity</span>
                      <img src={humidity}></img>
                      <span>{`${current_condition.humidity}%`}</span>
                    </div>
                    <div>
                    <span>Wind Speed</span>
                      <img src={wind}></img>
                      <span>{`${current_condition.windspeedKmph}Kmph`}</span>
                    </div>
                    <div>
                      <span>UV index</span>
                      <img src={uv}></img>
                      <span>{current_condition.uvIndex}</span>
                    </div>
                    <div>
                      <span>Cloud Cover</span>
                      <img src={cloud}></img>
                      <span>{`${current_condition.cloudcover}%`}</span>
                    </div>
                  </div>
                </div>

                {
                  handleCheckForFavourites() ? (
                    <img className='contentViewMore-heart' src={heart} alt ="heart"/>
                  ) : (
                    <img className='contentViewMore-heart' src={heart_dark} alt ="heart" onClick={handleAddToFavourite}/>
                  )
                }
              </div>
          </div>
        )
      }
    </div>
  )
}
