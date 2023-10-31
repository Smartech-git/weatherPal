import React, {useEffect,useState, img} from 'react';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import './Home.css';
import { actionTypes } from './Reducer';
import { getLocationdata, getSettings } from './APIs';
import { useThemeDetector } from './CustomHooks/useThemeDetector';
import ThemeSetMobile from './Components/ThemeSetMobile/ThemeSetMobile';
import { useStateValue } from './StateProvider';
import CityCards from './Components/CityCards';

function Home(props) {
    const [state, dispatch] = useStateValue();
    const isDarkTheme = useThemeDetector();
    const [fav, setFav] = useState([...Array(10)].map((a, b) => b))

    useEffect(()=> {
        let settings = getSettings()
        console.log(settings)
    }, [])

    useEffect(() => {
        const prepare = async () => {
           //getLocationdata()
            let settings = getSettings()
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
        }
        prepare()   

    }, [])

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', boxSizing: 'border-box', backgroundColor: state.themeHue.primary}}>
            <Header/>
            <SearchBar/>
            <div className='homeInnerContent'>
                <div style={{backgroundColor: state.themeHue.primary_light}} className="homeInnerContent-favourite">
                    <div style={{backgroundColor: state.themeHue.primary}} className='favourite-header'>
                        <span style={{color: state.themeHue.base}}>Favourite Cities</span>
                        <span>&#129505;</span>
                    </div>
                    <div className='favourite-content'>
                        {
                            fav.map((item, index) => {
                                return (
                                   <div key ={index}>   
                                    </div> 
                                )
                            })
                        }
                        
                    </div>
                </div>
                <div className='highlights' style={{borderColor: state.themeHue.secondary_light}}>
                    <div className = "highlightsHeader" style={{backgroundColor: state.themeHue.primary_light}}>
                        <span>Highlights</span>
                    </div>
                    <div>
                        <CityCards/>
                    </div>
                </div>
            </div>
            <ThemeSetMobile/>
        </div>
    );
}

export default Home;