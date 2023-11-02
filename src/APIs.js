import axios from "axios";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBZpm3Qm8MsDEK02clu2iZZmnBAyKiGP1s",
  authDomain: "weatherpal-beta.firebaseapp.com",
  projectId: "weatherpal-beta",
  storageBucket: "weatherpal-beta.appspot.com",
  messagingSenderId: "416902606898",
  appId: "1:416902606898:web:9cd96e186016500e414c2b",
  measurementId: "G-VLCLC1FHEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const defaultSettings = {
  theme : 'Auto',
}

if(localStorage.getItem("settings") === null){
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}



export const cities = [
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



export const setSettings = (param, data) => {
  localStorage.setItem(param, JSON.stringify(data));
}


export const getSettings = (param) => {
  let settings =  localStorage.getItem(param)
  return JSON.parse(settings);
  
}

export const citiesData = []
// export const getHighlightsWeatherData = async (param) => {

  if(getSettings("highlights") === null ){
    console.log("active") 
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
          if(getSettings("highlights") === null){
            let newSetting = {
              highlights: [data]
            };
            setSettings("highlights", newSetting)
          }else {
            console.log("adding")
            let x = getSettings("highlights")
            let newSetting = {
              highlights: [ ...x.highlights, data]
            }
            setSettings("highlights", newSetting)
          }
        }).catch(error => {
          console.log(error);
        })
    })
    // console.log(citiesData)
    // param(citiesData)
    // let data = {
    //   highlights: citiesData 
    // }
    // setSettings('highlights', data)
  } else {
    // let data = getSettings("highlights")
    // param(data.highlights)
  }

// export const getLocationdata = async (param) => {
  
//   let citiesData = []
//   cities.forEach((city) => {
//     let data = {}
//     const params = {
//       key: 'e724a77e072d428ea6a21539233010',
//       q: city,
//       format: 'json'
//     }
    
//     axios.get(' https://api.worldweatheronline.com/premium/v1/weather.ashx', {params})
//       .then(response => {
//         const apiResponse = response.data.data;
//         data = {
//           current_condition: apiResponse.current_condition[0],
//           request: apiResponse.request[0],
//           weather: apiResponse.weather[0]
//         }
//         citiesData.push(data)
//       }).catch(error => {
//         console.log(error);
//       })
//   })

//   param(citiesData)
     

// }