// nowy sposob?! nie,to pomylka.
import axios from 'axios';
import config from '../config';
// im./om "react-dom";
import Select from './Select';
import {useState} from "react";
import './Form.css';
import Table from './Table';

// const Form = () => {
const Form = (props) => {
  const [name, setName] = useState('');
  const [event, setEvent] = useState({key:'',val:''});
  const [city, setCity] = useState({key: '', val: ''});
  const [errors, setErrors] = useState([]);
  // console.log("🚀 ~ file: Form.js:14 ~ Form ~ errors:", errors)


  // tablica w tablicy, deklarowanie, ogarnij temat.to chyba wartosci dla pol w select?!
  const choicesEvents = [
  // pierwsze nie ma key wiec bedzie domyslnie wyswietlane "---"
  ['','---' ],
  ['front-end', 'front End'],
  ['back-end', 'Back End'],
]

const choicesCities = [
  // pierwsze nie ma key wiec bedzie domyslnie wyswietlane "---"
  ['','---' ],
  ['warsaw', 'Warszawa'],
  ['cracow', 'Kraków'],
]
const handleChangeName = (e) => {
  // setName({ name: e.target.value })
  setName(e.target.value);
}
  const handleChangeEvent = (e) => {
    setEvent({
      key: e.target.value,
      //blad innerText
      // val: e.target.options[e.target.selectedValue].innerText
      val: e.target.options[e.target.selectedIndex].innerText

    })
  }

  const handleChangeCity = (e) => {
    setCity({
      key: e.target.value,
      //blad innerText
      // val: e.target.options[e.target.selectedValue].innerText
      val: e.target.options[e.target.selectedIndex].innerText

    })
  }

  const saveEvent = (eventObj) => {
    // console.log('eventObj',eventObj);
    // axios request zrobimy v26 1:33
    axios.post(config.api.url+'/events/add', eventObj, {mode: 'cors'})
    .then((res) => {
      // jeśli sukces zamieniamy consol.log na funkcje przekazana przez props
      props.getEvents();
      console.log('res',res.data);
    })
    .catch((err) => {
      /// obsługa błędów za pomocą funkcji anonimowej (err to parameter funkcji)
      console.warn(err);
      
    });

    
  }

  const resetForm = () => {
      setName('');
      setEvent({ key: '', val: '' });
      setCity({ key: '', val: '' });
      setErrors([]);
  }
                         /* Funkcja Walidacja */



// const [errors, setErrors] = useState([]);
const validateForm = (e) => {
    e.preventDefault();


    let errorsValidate = [];

    if (name.trim() === "") {
      errorsValidate.push('Wpisz imie i nazwisko')
      // console.log("🚀 ~ file: Form.js:73 ~ validateForm ~ errorsValidate:", errorsValidate)
    }
    
    //event.key, bo event jest obiektem zlozonym z key: i value:
    if (event.key.trim() === "") {
      errorsValidate.push('Wybierz szkolenie')
      // console.log("🚀 ~ file: Form.js:73 ~ validateForm ~ errorsValidate:", errorsValidate)
    }
    // console.log("🚀 ~ file: Form.js:103 ~ validateForm ~ city.value:", city.value)
    if (city.key.trim() === "") {
      errorsValidate.push('Wybierz miasto')
      // console.log("🚀 ~ file: Form.js:73 ~ validateForm ~ errorsValidate:", errorsValidate)
    }
    // console.log("🚀 ~ file: Form.js:77 ~ validateForm ~ errorsValidate.length:", errorsValidate.length)

    if (errorsValidate.length > 0) {
      // console.log('ustawiam setErrors w if ');
      
      setErrors(errorsValidate.map((errorTxt, index) => {
        // console.log("🚀 ~ file: Form.js:82 ~ errorsValidate.map ~ errorTxt:", errorTxt)
        // console.log('errorTxt,index',errorTxt,index)
        return <li key={index}> {errorTxt} </li>
      })
      // console.log("🚀 ~ file: Form.js:88 ~ a ~ a:", a)
      // setErrors(() => errorsValidate.map((errorTxt, index) => <li key={index}>{errorTxt}</li>));
      )
      // console.log("🚀 ~ file: Form.js:14 ~ Form ~ errors:", errors)
      console.log('errors',errors);
      // nie przeszła walidacji to zwracamy false dla funkcji validateForm
      // walidacja sie nie udala: false do funkcji ,do not send form, wychodzimy z funkcji!
      return false ;
    }
    // walidacja sie udala to:
    const newEvent = {
      name: name,
      event: event,
      city: city
    }
    // test
    const newEvent2 = {
      city: name,
      event: event,
      name: city
    }
    // saveEvent(testowy_obj); 
    // saveEvent(let eventObj={}); 
    // saveEvent('klikniete'); 
    saveEvent(newEvent); 
    //test usun
    saveEvent(newEvent2); 
    // dla uncomment resetForm() kasuje sie wpis imienia what the fuck?!
    resetForm();
    // console.log('nie klikniete tylko zmiana 1 z 4-ech stanow useState przez ');
    // o co chodzi o nie przejsciu walidacji return ? co to za sposób?
    // return false; 
  }
  
  return( 
    <div className="formWrapper">
      <form action="#" onSubmit={validateForm}>
        <div className="wrapper">
            <label htmlFor="name">Imie i nazwisko</label>
            <input type="text" name="" id="name" 
            value={name}
            onChange={handleChangeName}/>
        </div>
        <div className="wrapper">
            <label htmlFor="event">Wydarzenie</label>
            {/* {console.log('choicesEvents', choicesEvents)} */}
            <Select values={choicesEvents} 
            selectedValue={event.key}
            onValueChange={handleChangeEvent}
            id='event'
            />
        </div>
        <div className="wrapper">
            <label htmlFor="city">Miasto</label>
            {console.log('choicesCities w renderze',choicesCities)}
            <Select values={choicesCities} 
            selectedValue={city.key}
            onValueChange={handleChangeCity}
            id='city'
            />
        </div>
       {/*  <div className="wrapper">
            <label htmlFor="idKtore">Miasto</label>
            {console.log('choicesCities',choicesCities)}
            <Select values={'choicesCities'} 
            selectedValue={'city.key'}
            onValueChange={'handleChangeCity'}
            id='idKtore'
            />
        </div> */}
        <div className="wrapper">
            <button type="submit" className='btn btn-primary submit'
            // to bylo nie potrzebne obsluga zmiany jest na Form i kazdym polu input i select
            // onClick={validateForm}
            >Zapisz na szkolenie</button>
        </div>
      </form>
      <div className="errorsWrapper">
        <ul className="errors">
          
          {errors}

          
        </ul>
      </div>
    </div>
  )
};

export default Form ;
