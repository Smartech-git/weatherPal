import React, {useEffect,useState } from 'react';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import './Home.css';
import { actionTypes } from './Reducer';
import { getSettings, setSettings } from './APIs';
import { useThemeDetector } from './CustomHooks/useThemeDetector';
import ThemeSetMobile from './Components/ThemeSetMobile/ThemeSetMobile';
import { useStateValue } from './StateProvider';
import CityCards from './Components/CityCards';
import cancel_dark from '../src/Assets/cancel_dark.png'
import cancel_light from '../src/Assets/cancel_light.png'
import SearchedCityCard from './Components/SearchedCityCard';
import axios from "axios"

//localStorage.clear()
function Home(props) {
    const [state, dispatch] = useStateValue();
    const isDarkTheme = useThemeDetector();
    const [fav, setFav] = useState([])
    const [highlights, setHighlights] = useState([])
    const [viewMore, setViewMore] = useState(false)
    const [viewMoreDetails, setViewMoreDetails] = useState(undefined)

    useEffect(() => {
        if(getSettings('highlights') === null) {
            return
        }

        let arr = getSettings('highlights').highlights
        arr.sort((a, b) => {
            const A = a.request.query.toUpperCase();
            const B = b.request.query.toUpperCase();
          
            if (A < B) {
              return -1;
            }
            if (A > B) {
              return 1;
            }
            return 0;
          });     
        console.log(arr)
          setHighlights(arr)
    }, [])

    useEffect(()=> {
        if(localStorage.getItem("favourites") === null ){
            let favourites = []
            setSettings("favourites", favourites);
        } else {
             let data = getSettings('favourites')
             console.log(data)
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

    const handleAPIcall = (value) => {
        setViewMore(true)
        const params = {
            key: process.env.REACT_APP_WEATHERSTACK_API_KEY,
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

              setViewMoreDetails(data)

            }).catch(error => {
                setViewMoreDetails("ERROR")
            })
    }

    const handleFavouriteDeletion = (city) => {
        let arr = fav.filter((item) => item !== city )
        setFav(arr)
        setSettings("favourites", arr)
    }

    const handleClearAllFavourites = () => {
        setFav([])
        setSettings("favourites", [])
    }

    const handleViewMore = () => {

    }

    return (
        <div style={{backgroundColor: state.themeHue.primary, width: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Header/>
            <SearchBar setData ={setViewMoreDetails} setViewMore={setViewMore} setViewMoreDetails={setViewMoreDetails}/>
            <div className='homeInnerContent'>
                <div style={{backgroundColor: state.themeHue.primary_light}} className="homeInnerContent-favourite">
                    <div>
                        <div style={{backgroundColor: state.themeHue.primary}} className='favourite-header'>
                            <span style={{color: state.themeHue.base}}>Favourite Cities</span>
                            <span>&#129505;</span>
                        </div>
                        <div className="favouriteCities-remove" onClick={handleClearAllFavourites}  style={{backgroundColor: state.themeHue.primary}}>
                            {state.theme === 'Light' ? (
                                <img src={cancel_light} alt="icon"/>
                            ) : (
                                <img src={cancel_dark} alt="icon"/>
                            )}
                        </div>
                    </div>
                   
                    <div className='favourite-content'>
                        {
                            fav.length > 0 && (
                            fav.map((item, index) => {
                                return (
                                   <div className='favouriteCities' key ={index}>
                                        <div onClick={() => {handleAPIcall(item)}} className="favouriteCities-lookup">
                                            <span style={{color: state.themeHue.base}}>{item}</span>
                                        </div> 
                                        <div className="favouriteCities-remove" onClick={() => handleFavouriteDeletion(item)} style={{backgroundColor: state.themeHue.primary}}>
                                            {state.theme === 'Light' ? (
                                                <img src={cancel_light} alt="icon"/>
                                            ) : (
                                                <img src={cancel_dark} alt="icon"/>
                                            )}
                                        </div>
                                    </div> 
                                )
                            })
                            )
                        }
                        
                    </div>
                </div>
                { !viewMore ? (
                    <div className='highlights' style={{borderColor: state.themeHue.secondary_light}}>
                        <div className = "highlightsHeader" style={{backgroundColor: state.themeHue.primary_light}}>
                            <span style={{color: state.themeHue.base}}>Highlights</span>
                            <span>&#127775;</span>
                        </div>
                        <div>
                            { highlights.map((item, index) => {
                                return (
                                    <CityCards setViewMoreDetails={setViewMoreDetails} setViewMore={setViewMore} key={index} fav = {fav} setFav={setFav} data={item}/>
                                )
                            })}
                        </div>
                    </div> 
                    ) : 
                       (viewMoreDetails === undefined || viewMoreDetails === "ERROR") ? (
                            <SearchedCityCard error ={true} data={viewMoreDetails} fav = {fav} setFav={setFav} setViewMore={setViewMore}/> 

                        ) : (
                            <SearchedCityCard error={false} data={viewMoreDetails} fav = {fav} setFav={setFav} setViewMore={setViewMore}/> 
                        )
                }
            </div>
            <ThemeSetMobile/>
        </div>
        </div>
    );
}

export default Home;