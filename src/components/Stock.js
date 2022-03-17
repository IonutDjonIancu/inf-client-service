const Stock = ({ symbol, guid, name, price, quantity, bought, current, yld, deleteStock, currency}) => {

    if(symbol.split('.')[1] === 'NL') {
        return(
            <tr id={guid} className="table-dark text-success">
                <th scope="row">{symbol}</th>
                <td>{name}</td>
                <td>{ currency === '$' ? (price * 0.5).toFixed(2) : price }</td>
                <td>{quantity}</td>
                <td>{bought}</td>
                <td>{current}</td>
                <td>{yld} %</td>
                <td>
                    <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteStock(guid, symbol, name)}
                    >
                        X
                    </button>
                </td>
            </tr>
        );
    } else {
        return(
            <tr id={guid} className="table-dark text-warning">
                <th scope="row">{symbol}</th>
                <td>{name}</td>
                <td>{ currency === '$' ? (price * 0.5).toFixed(2) : price }</td>
                <td>{quantity}</td>
                <td>{bought}</td>
                <td>{current}</td>
                <td>{yld} %</td>
                <td>
                    <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteStock(guid, symbol, name)}
                    >
                        X
                    </button>
                </td>
            </tr>
        );
    }


}

export default Stock;