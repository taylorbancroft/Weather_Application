import React from 'react';
import './App.css';
import Weather from './components/weather.component'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Form from '../src/components/form.component';


const API_key = "bcd386816c20eb7122768d5ad42f72d5";

class App extends React.Component {
  constructor (){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      fahrenheit: undefined,
      temp_high: undefined,
      temp_low: undefined,
      description: "",
      error: false
    };

    this.weatherIcon= {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-rain",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  convertFahrenheit(temp){
    let fa = Math.floor(9/5*(temp - 273) + 32);
    return fa;
  }

  get_icon(icons, rangeID){
    switch(true){
      case rangeID >= 200 && rangeID <=232: this.setState({icon:this.weatherIcon.Thunderstorm});
      break;
      case rangeID >= 300 && rangeID <=321: this.setState({icon:this.weatherIcon.Drizzle});
      break;
      case rangeID >= 500 && rangeID <=531: this.setState({icon:this.weatherIcon.Rain});
      break;
      case rangeID >= 600 && rangeID <=622: this.setState({icon:this.weatherIcon.Snow});
      break;
      case rangeID >= 700 && rangeID <=781: this.setState({icon:this.weatherIcon.Atmosphere});
      break;
      case rangeID ==800: this.setState({icon:this.weatherIcon.Clear});
      break;
      case rangeID >= 801 && rangeID <=804: this.setState({icon:this.weatherIcon.Clouds});    
      break;
      default:
        this.setState({icon:this.weatherIcon.Clouds});
    }
  }

  getWeather = async(e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city&&country){
      const API_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}k&appid=${API_key}`);
    

    const response = await API_call.json();
    console.log(response);
    this.setState({
      city: `${response.name},${response.sys.country}`,
      fahrenheit: this.convertFahrenheit(response.main.temp),
      temp_high: this.convertFahrenheit(response.main.temp_max),
      temp_low: this.convertFahrenheit(response.main.temp_min),
      description: response.weather[0].description,
    });
    this.get_icon(this.weatherIcon, response.weather[0].id)
  }else{
    this.setState({error:true});
  }
  
  };
  
  render () {
    return (
      <div className="App">
      <Form loadweather={this.getWeather} error={this.state.error}/>
      <Weather city={this.state.city} 
              country={this.state.country} 
              temp_fahrenheit={this.state.fahrenheit} 
              temp_max={this.state.temp_high}
              temp_min={this.state.temp_low}
              description={this.state.description}
              weatherIcon={this.state.icon}
              />
      </div>
    );
  }
}


export default App;
