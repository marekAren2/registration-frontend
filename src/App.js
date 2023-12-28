
import config from './config';
import {useEffect, useState} from 'react';
import Form from './components/Form';
import './App.css';
import axios from 'axios';
import Table from './components/Table';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
 },[])
  
 const getEvents = () => {
      axios
      .get(config.api.url + '/events')
      .then((res) => {
        // jeśli sukces
        setEvents(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        /// obsługa błędów za pomocą funkcji anonimowej (err to parameter funkcji)
        console.warn(err);
        
      });
  };

  const deleteEvent = (rowId) => {
    if (window.confirm('Usunąć ten event? Uwaga: Operacja nieodwracalna !')) {
      
      console.log('Zrezygnowałeś z usuniecia', rowId);

      // axios.post(config.api.url+'/events/delete/'+rowId)
      axios.delete(config.api.url+'/events/delete/'+rowId)
      .then((result) => {
        // jeśli sukces
        console.log(result);
      })
      .catch((err) => {
        /// obsługa błędów za pomocą funkcji anonimowej (err to parameter funkcji)
        console.warn(err);
      });
      
    } else {
       console.log('Event usuniety', rowId);
    }
  };

  return (
    <div className="App">
      {console.log('Start time: ' + new Date().toLocaleString())}
      {/* //wracamy: poprawa poprawy: pomylka nie get tylko set! */}
      <div className="formContainer">
        <Form getEvents={getEvents} />
        {/* <Form setEvents={setEvents}/> */}
      </div>
      <div className="tableContainer">
        <Table className="tableContainer" events={events} deleteEvent={deleteEvent} />
      </div>
    </div>
  );
}

export default App;
