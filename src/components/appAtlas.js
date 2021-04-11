import React, { useRef, useState } from 'react';
import AOS from 'aos'
import '../aos.css';

import MapView from './MapView';

function AppAtlas(props){
  AOS.init();

let [country, setCountries] = useState();
let stateName = useRef(""); 
const navCountries = ["Thailand", "France", "Israel", "Usa"];

const doApiByName = (_country)=>{
  fetch("https://restcountries.eu/rest/v2/name/"+_country).
  then(resp=> (resp.json())).
  then(data => {
    setCountries(data[0]);
  })
}


  const doApi = ()=>{
    fetch("https://restcountries.eu/rest/v2/name/"+stateName.current.value).
    then(resp=> (resp.json())).
    then(data => {
      setCountries(data[0]);
    })

}

  const doApiByCode = (_code)=>{
    fetch("https://restcountries.eu/rest/v2/alpha/"+_code).
    then(resp=> (resp.json())).
    then(data => {
      setCountries(data);
    })
  }

  const searchEnter = (eve) => {
    if(eve.key == 'Enter'){
      doApi();
    }
  }

  return(
    <React.Fragment>
      <div className="container-fluid">
        <div className="countries">
          {(navCountries).map(item=>{
              return(
                <button onClick={()=>{
                  doApiByName(item);
                }}>{item}</button>
              )
          })}
          <button onClick={()=>{ doApiByName("United kingdom") }}>Uk</button>
        </div>
        <div className="searchBar">
          <label>Search for a country: </label>
          <div className="inSearch">
            <input ref={stateName} type="text" placeholder="type here..." onKeyUp={searchEnter}/>
            <button onClick={doApi}><img width="22" height="" src="/images/globe.png"/></button>
          </div>
        </div>
      </div>
      <div >

      {country ? <div className="col-lg-7 ps-3 pe-5"><div 
      data-aos="fade-right" 
      data-aos-offset="350"
      data-aos-easing="ease-in-sine" >
            <h2>{country.name}</h2>
            <h5>Region: {country.region}</h5>
            <h5>Capital: {country.capital}</h5>
            <h5>Population: {country.population.toLocaleString()}</h5>
            <h5>Languages: {country.languages[0].name}</h5>
            <h5>Coin: <a title={country.currencies[0].name} href={"https://en.wikipedia.org/wiki/{{country.currencies[0].code}}"} target="_blank"> {country.currencies[0].code}</a> <span style={{color:"goldenrod"}}>{country.currencies[0].symbol}</span></h5>
            <h5>States with borders: {(country.borders).map(item=>{
              return(
                <button onClick={()=>{
                  doApiByCode(String(item));
                }}>{item}</button>
              )
            })}</h5>
            </div>
            <MapView lat={country.latlng[0]} lng={country.latlng[1]}/>
      </div> : 
        <div className="intro col-lg-5">
          <h1>Wellcome to The Atlas!</h1>
          <br></br>
          <br></br>
          <h3 className="h3End">Search for any country you want <br></br> in the search box above</h3>
        </div>}
      </div>
    </React.Fragment>
  )
}

export default AppAtlas