import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import './Intro.css';
import logo512 from './Assets/logo512.png'
import { settings, getSettings } from './APIs.js';
import { actionTypes } from './Reducer';
import { useStateValue } from './StateProvider';
import { useThemeDetector } from './CustomHooks/useThemeDetector';

function Intro() {

    const [state, dispatch]  = useStateValue();
    let navigate = useNavigate();
    const isDarkTheme = useThemeDetector();

    useEffect(() =>{
        let settings = getSettings()
        console.log(settings)

        if(settings.theme === "Auto"){

            if(isDarkTheme){
                const action = {
                    type: actionTypes.setTheme,
                    theme: 'Dark'
                }
                dispatch(action);
            } else{
                const action = {
                    type: actionTypes.setTheme,
                    theme: 'Light'
                }
                dispatch(action); 
            }

        } else {
             const action = {
                type: actionTypes.setTheme,
                theme: settings.theme
            }
            dispatch(action);
        }

       

        let ID = setTimeout(()=>{
            navigate('Home')
        }, 4000)

        return(()=> {
            clearTimeout(ID)
        })

    }, [])

    return (
        <div className='Intro'>
           <div className='Intro-Content'>
                <div className='Intro-Content_logo'>
                    <img src={logo512} alt="logo"/>
                </div>
                <div className='Intro-Content_text'>
                    <p>WeatherPal</p>
                </div>
           </div>
        </div>
    );
}

export default Intro;