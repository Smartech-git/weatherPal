import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const defaultSettings = {
  theme : 'Light',
  highlights: [],
  favourites: []
}

// if(localStorage.getItem("settings") === null){
//   localStorage.setItem("settings", JSON.stringify(defaultSettings));
// }

const firebaseConfig = {
  apiKey: "AIzaSyDviET9nQEE6yyuyATiiYeBxEhWlEpZF7o",
  authDomain: "urbandictionary-clone.firebaseapp.com",
  projectId: "urbandictionary-clone",
  storageBucket: "urbandictionary-clone.appspot.com",
  messagingSenderId: "809068862605",
  appId: "1:809068862605:web:149d6ba7e44244de0356c4",
  measurementId: "G-NQ8Q9Y87VK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const cities = [
  "Beijing",
  "Buenos Aires",
  "Cairo",
  "Chongqing",
  "Delhi",
  "Dhaka",
  "Istanbul",
  "Karachi",
  "Kolkata",
  "Mexico City",
  "Mumbai",
  "Osaka",
  "São Paulo",
  "Shanghai",
  "Tokyo"
]



export const setSettings = (param) => {
  localStorage.setItem("settings", JSON.stringify(param));
  let data = getSettings() 
}


export const getSettings = () => {
  let settings =  localStorage.getItem("settings")
  return JSON.parse(settings);
  
}

export const getLocationdata = () => {
  
    if(1 ){
      let citiesData = []
      cities.forEach((city) => {
        const params = {
          key: 'e724a77e072d428ea6a21539233010',
          q: city,
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
            citiesData.push(data)
          }).catch(error => {
            console.log(error);
          })
      })
      let prevSettings =  getSettings()
      prevSettings['highlights'] = citiesData
      let newSettings = Object.assign(prevSettings)
      console.log(newSettings)
      setSettings(newSettings)
     
    }

}