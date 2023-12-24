import './Form.css';
const Form = () => {

  return( 
  <form action="#">
    <div className="wrapper">
        <label htmlFor="name">Imie i nazwisko</label>
        <input type="text" name="" id="name" />
    </div>
    <div className="wrapper"></div>
        <label htmlFor="event">Wydarzenie</label>
    <div className="wrapper"></div>
        <label htmlFor="city">Miasto</label>
    <div className="wrapper">
        <button type="submit" className='btn btn-primary'>Zapisz na szkolenie</button>
    </div>
  </form>
  )
};

export default Form ;
