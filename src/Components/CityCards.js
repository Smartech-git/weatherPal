import React from 'react'
import './CityCards.css'
import { useStateValue } from '../StateProvider'
import { useInView } from 'react-intersection-observer';
import heart_dark from '../Assets/heart_dark.png'
import heart_light from '../Assets/heart_light.png'
import heart from '../Assets/heart.png'
import { getSettings, setSettings } from '../APIs'
import {useNavigate} from 'react-router-dom'

export default function CityCards(props) {
  const [state, dispatch] = useStateValue()
  const {current_condition, request, weather} = props.data
  let navigate = useNavigate();
  const { ref, inView, entry } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

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

  const handleNavigation = () => {
    props.setViewMore(true)
  }


  return (
      <div ref={ref} className={`cityCards cityCards_${inView}`} style={{backgroundColor: state.themeHue.primary_light}}>
        <div>
          <div className='cityCardsHeader'>
            <span style={{color: state.theme === "Light" ? 'rgba(0,0,0, 80%)' : 'rgba(225, 225, 225, 70%)'}}>{current_condition.observation_time}</span>
            <div>
              <div className='cityCardsWeatherIcon' style={{backgroundColor: 'rgba(0, 0, 0, 0%)'}}>
                <img src={`${current_condition.weatherIconUrl[0].value}`} alt="sunny"/>
              </div>
              
              <span style={{color: state.theme === "Light" ? 'rgba(0,0,0, 80%)' : 'rgba(225, 225, 225, 70%)'}}>{current_condition.weatherDesc[0].value}</span>
            </div>
          </div>
          <div  className='cityCardsBottom'>
            <div onClick={handleNavigation} className='cityCardsHeaderWeather' style={{backgroundColor:  'rgba(0,0,0, 10%)'}} >
              <p style={{color: state.themeHue.base}}>{current_condition.temp_C}<sup>0</sup>C</p>
              <h1 style={{color: state.themeHue.base}}>{request.query.split(' ')[0]}</h1>
              <h2 style={{color: state.theme === "Light" ? 'rgba(0,0,0, 70%)' : 'rgba(225, 225, 225, 70%)'}}>{request.query.split(' ')[1]}</h2>
            </div>
            
            {
              handleCheckForFavourites() ? (
                <img src={heart} alt ="heart"/>
              ) : state.theme === 'Light' ? (
                <img src={heart_light} alt ="heart" onClick={handleAddToFavourite}/>
              ) : (
                <img src={heart_dark} alt ="heart" onClick={handleAddToFavourite}/>
              )
            }
          </div>
        </div>
      </div>
  )
}
