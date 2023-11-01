import React from 'react'
import './CityCards.css'
import testBG from  '../../src/Assets/testBG.jpg'
import sunny from '../../src/Assets/sunny.png'
import { useStateValue } from '../StateProvider'
import { useInView } from 'react-intersection-observer';
import heart_dark from '../Assets/heart_dark.png'
import heart_light from '../Assets/heart_light.png'
import heart from '../Assets/heart.png'
import { getSettings, setSettings } from '../APIs'

export default function CityCards(props) {
  const [state, dispatch] = useStateValue()
  const { ref, inView, entry } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const handleCheckForFavourites = () => {
      if(props.fav.includes(props.city)){
        return true
      } else {
        return false
      }
  }

  const handleAddToFavourite = () => {
    props.setFav((prev) => {
      return [
        ...prev,
        props.city
      ]
    })
    let data = getSettings("favourites")
    let newData =[
      ...data,
      props.city
    ]
    setSettings("favourites", newData)
  }
  return (
      <div ref={ref} className={`cityCards cityCards_${inView}`} style={{backgroundColor: state.themeHue.primary_light}}>
        <div>
          <div className='cityCardsHeader'>
            <span style={{color: state.theme === "Light" ? 'rgba(0,0,0, 80%)' : 'rgba(225, 225, 225, 70%)'}}>10:45 pm</span>
            <div>
              <div className='cityCardsWeatherIcon' style={{backgroundColor: 'rgba(0, 0, 0, 40%)'}}>
                <img src={sunny} alt="sunny"/>
              </div>
              
              <span style={{color: state.theme === "Light" ? 'rgba(0,0,0, 80%)' : 'rgba(225, 225, 225, 70%)'}}>sunny</span>
            </div>
          </div>
          <div className='cityCardsBottom'>
            <div className='cityCardsHeaderWeather' style={{backgroundColor:  'rgba(0,0,0, 15%)'}} >
              <p style={{color: state.themeHue.base}}>24<sup>0</sup>C</p>
              <h1 style={{color: state.themeHue.base}}>New York,</h1>
              <h2 style={{color: state.theme === "Light" ? 'rgba(0,0,0, 70%)' : 'rgba(225, 225, 225, 70%)'}}>USA</h2>
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
