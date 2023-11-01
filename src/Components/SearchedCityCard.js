import React from 'react'
import './SearchedCityCard.css'
import { useStateValue } from '../StateProvider'
import Ripples from 'react-ripples';
import {ReactComponent as ArrowLeft} from '../Assets/ArrowLeft.svg';
import WBG from '../Assets/WBG.png'
import humidity from '../Assets/humidity.png'

export default function SearchedCityCard(props) {
  const [state, dispatch] = useStateValue()

  const hangdleNavigation = () => {
    props.setViewMore(false)
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
      <div className='searchedCityCard-content' style={{ backgroundImage: `url(${WBG})`, backgroundColor: state.themeHue.primary_light}}>
          <div>
            <div className='cityCardContent-header'>
                <span>11: 25 pm</span>
                <div className='content-temp'>
                  <p>24<sup>0</sup>C</p>
                  <p>Sunny</p>
                </div>
                <span>2023-11-23</span>
            </div>

            <div className="content-bottom">
              <div className='content-cityName'>
                  <p>New York, </p>
                  <span>USA</span>
              </div>
              <div className='content-weather'>

              </div>
            </div>
          </div>
      </div>
    </div>
  )
}
