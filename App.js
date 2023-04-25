import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function App() {
  
  const API_KEY = '599d5b6b5430d4b42f651a5bd65467a5';
  const [ location, setLocation ] = useState("");
  const [result, setResult ] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  

  

  const searchWeather = async(e) => {
    if(e.key === 'Enter'){
      try{
        const data= await axios({
          method:'get',
          url:url
        })
        console.log(data);
        setResult(data.data);
      }
      catch(err){
        alert(err);

      }
    }
  }

  return (
    <AppWrap>
      <div className='appContentWrap'>
        <input 
        placeholder='도시를 입력하세요'
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
        type='text'
        onKeyDown={searchWeather}/>
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
          <div className='city'>{result.name}</div>
          <div className='temp'>
            {Math.round((result.main.temp-273.15)*10)/10} ℃
            </div>
          <div className='sky'>{result.weather[0].main}</div>
        </ResultWrap>

        )}

        


      </div>
    
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
width: 100vw;
height:100vh;


.appContentWrap{
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  position: absolute;
  padding: 20px;
}
input{
  padding:16px;
  border: 2px solid black;
  border-radius: 16px;
}



`;

const ResultWrap = styled.div`
  margin-top:60px;
  padding:10px;
  border: 1px solid black;
  border-radius:10px;
  .city{
    font-size: 24px;
  }
  .temp{
    font-size: 60px;
    margin-top: 8px;
  }

  .sky{
    font-size: 20px;
    text-align: right;
    margin-top: 8px;
  }
`

