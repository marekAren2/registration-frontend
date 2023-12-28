import './Select.css';
//wartosc, 2 zmiana na wartosci, 3 obecnie wybrany element,4 spread syntax - reszta par
const Select = ({values, onValueChange, selectedValue, ...rest}) => {
//const Select = (values, onValueChange, selectedValue, ...rest) => {
  return( 
  <select name="" id="" 
    value={selectedValue}
    onChange={onValueChange}
    {...rest}
  >
    
{/* {console.log('values w select in Select'+values)} */}

    {values.map(([value, text]) => (
        // console.log('value, text',value, text)
        <option key={value} value={value} >
          {text} 
        </option>
      ))
    }
  </select>
  )
};
export default Select ;