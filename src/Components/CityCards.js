import React from 'react'
import './CityCards.css'
import testBG from  '../../src/Assets/testBG.jpg'
import sunny from '../../src/Assets/sunny.png'

export default function CityCards() {
  return (
      <div className='cityCards' style={{backgroundImage: `url(${testBG})`}}>
        <div>
          <div className='cityCardsHeader'>
            <span>10:45 pm</span>
            <div>
              <img src={sunny} alt="sunny"/>
              <span>sunny</span>
            </div>
          </div>
          <div className='cityCardsHeaderWeather'>

          </div>
        </div>
      </div>
  )
}
