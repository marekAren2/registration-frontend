import './Table.css';

// const Table = ({events, deleteEvent, rest}) => {
const Table = ({events, deleteEvent, ...rest}) => {

  return( 
        <table {...rest}>
            <thead>
                {/* wiersz naglowka */}
                <tr>
                    {/* komorka wiersza -kolumna? */}
                    {/* th*5 */}
                    <th>#</th>
                    <th>Imie i Nazwisko</th>
                    <th>Wydarzenie</th>
                    <th>Miasto</th>
                    <th>Akcje</th>
                </tr>

            </thead>
            <tbody>
                {/* {events.map((index,row) => { */}
                {events.map((row,index) => {
                    console.log('index,row',index,row)
                  return(
                    // table row
                    <tr key={row._id}>
                        {/* dodajemy 5 kolumn */}
                        {/* td*5 */}
                        <td>{index}</td>
                        <td>{row.name}</td>
                        {/* <td eventKey={row.event.key}>{row.event.val}</td> */}
                        <td eventkey={row.event.key}>{row.event.val}</td>
                        <td citykey={row.city.key}>{row.city.val}</td>
                        <td><button className="btn btn-primary delete" onClick= {() => {
                            // console.log('row._id',row._id)
                            deleteEvent(row._id)
                            
                        }} >Usun</button></td>
                    </tr>
                  )  
                })}
            </tbody>
        </table>
    )
};

export default Table ;