import React, {useEffect,useState, img} from 'react';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import './Home.css';
import { actionTypes } from './Reducer';
import { getLocationdata, getSettings, setSettings } from './APIs';
import { useThemeDetector } from './CustomHooks/useThemeDetector';
import ThemeSetMobile from './Components/ThemeSetMobile/ThemeSetMobile';
import { useStateValue } from './StateProvider';
import CityCards from './Components/CityCards';
import axios from 'axios';
import { cities } from './APIs';
import cancel_dark from '../src/Assets/cancel_dark.png'
import cancel_light from '../src/Assets/cancel_light.png'

// localStorage.clear()
function Home(props) {
    const [state, dispatch] = useStateValue();
    const isDarkTheme = useThemeDetector();
    const [data, setData] = useState(undefined)
    const [fav, setFav] = useState([...Array(10)].map((a, b) => b))

    useEffect(()=> {
        // let citiesData = []
        // cities.forEach((city) => {
        //     let data = {}
        //     const params = {
        //     key: 'e724a77e072d428ea6a21539233010',
        //     q: city,
        //     format: 'json'
        //     }
            
        //     axios.get(' https://api.worldweatheronline.com/premium/v1/weather.ashx', {params})
        //     .then(response => {
        //         const apiResponse = response.data.data;
        //         data = {
        //         current_condition: apiResponse.current_condition[0],
        //         request: apiResponse.request[0],
        //         weather: apiResponse.weather[0]
        //         }
        //         citiesData.push(data)
        //     }).catch(error => {
        //         console.log(error);
        //     })
        // })

        // setData(citiesData)
        let x =  localStorage.getItem("favourites")
        console.log(x)
        if(localStorage.getItem("favourites") === null ){
            let param = {
                favourites: []
            }
            setSettings("favourites", param);
        } else {
             let data = getSettings('favourites')
            setFav(data);
        }
    }, [])

    useEffect(() => {
        const prepare = async () => {
            let settings = getSettings("settings")
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

    const handleFavouriteDeletion = (city) => {
        let arr = fav.filter((item) => item !== city )
        setFav(arr)
        setSettings("favourites", arr)
    }

    const handleClearAllFavourites = () => {
        setFav([])
        setSettings("favourites", [])
    }

    return (
        <div style={{backgroundColor: state.themeHue.primary, width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Header/>
            <SearchBar/>
            <div className='homeInnerContent'>
                <div style={{backgroundColor: state.themeHue.primary_light}} className="homeInnerContent-favourite">
                    <div>
                        <div style={{backgroundColor: state.themeHue.primary}} className='favourite-header'>
                            <span style={{color: state.themeHue.base}}>Favourite Cities</span>
                            <span>&#129505;</span>
                        </div>
                        <div className="favouriteCities-remove" onClick={handleClearAllFavourites}  style={{backgroundColor: state.themeHue.primary}}>
                            {state.theme === 'Light' ? (
                                <img src={cancel_light}/>
                            ) : (
                                <img src={cancel_dark}/>
                            )}
                        </div>
                     </div>
                   
                    <div className='favourite-content'>
                        {
                            fav.map((item, index) => {
                                return (
                                   <div className='favouriteCities' key ={index}>
                                        <div className="favouriteCities-lookup">
                                            <span style={{color: state.themeHue.base}}>{item}</span>
                                        </div> 
                                        <div className="favouriteCities-remove" onClick={() => handleFavouriteDeletion(item)} style={{backgroundColor: state.themeHue.primary}}>
                                            {state.theme === 'Light' ? (
                                                <img src={cancel_light}/>
                                            ) : (
                                                <img src={cancel_dark}/>
                                            )}
                                        </div>
                                    </div> 
                                )
                            })
                        }
                        
                    </div>
                </div>
                <div className='highlights' style={{borderColor: state.themeHue.secondary_light}}>
                    <div className = "highlightsHeader" style={{backgroundColor: state.themeHue.primary_light}}>
                        <span style={{color: state.themeHue.base}}>Highlights</span>
                        <span>&#127775;</span>
                    </div>
                    <div>
                        {/* {
                           data === undefined ?
                            (
                                <div></div>
                            ):(
                                data.map((city, index) => {
                                    console.log(city)
                                    return (
                                        <CityCards/>
                                    )
                                })
                            )
                        } */}
                        <CityCards fav = {fav} city="Tokyo" setFav={setFav}/>
                        <CityCards fav = {fav} city="Beijing" setFav={setFav}/>
                        <CityCards fav = {fav} city ="Paris" setFav={setFav}/>
                        <CityCards fav = {fav} city = "New york" setFav={setFav}/>
                        <CityCards fav = {fav} city="Owerri" setFav={setFav}/>
                        <CityCards fav = {fav} city="London" setFav={setFav}/>
                        <CityCards fav = {fav} city="France" setFav={setFav}/>
                    </div>
                </div>
            </div>
            <ThemeSetMobile/>
        </div>
        </div>
    );
}

export default Home;