import { useState } from "react";

let stocksList = [];

fetch('https://inf-businesslogic-service.herokuapp.com/getstocks')
    .then(res => res.json())
    .then(obj => {
        stocksList = obj;
    });

    
setInterval(() => {
    fetch('https://inf-businesslogic-service.herokuapp.com/getstocks')
    .then(res => res.json())
    .then(obj => {
        stocksList = obj;
    });
}, 5000);
    
    
const Panel = ({ addStock }) => {

        
    const [stocks, setStocks] = useState([]);
    const [stockSymbol, setSelectedStock] = useState('select a stock'); 
    const [stockName, setStockName] = useState('select a stock');
    const [stockPrice, setStockPrice] = useState('select a stock');


    const handleChange = (e) => {
        setSelectedStock(e.target.value);
        
        var currentStock = stocksList.find(s => s.symbol === e.target.value);
        
        setStockName(currentStock.name);
        setStockPrice(currentStock.price);
    };

    const handleClick = () => {
        setStocks([...stocksList]);
    }

    const handleSubmit = (e) => {

        addStock(stockSymbol, stockName, stockPrice);

        e.preventDefault();
    }

    return(
        <div className="border border-light p-3 rounded-3">
            <p>Add stock</p>
            <form
                onSubmit={handleSubmit}
            >
                <div className="row g-3 align-items-center d-flex justify-content-between">
                    <div className="col-auto">
                        <label className="col-form-label">Symbol</label>
                    </div>
                    <div className="col-auto">
                        <select 
                            onChange={(e) => handleChange(e)}
                            onClick={handleClick}
                        >
                            {
                                stocks.map(s => {
                                    return(
                                        <option key={s.symbol} value={s.symbol} title={s.name}>{s.symbol}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>

                <div className="row g-3 align-items-center d-flex justify-content-between">
                    <div className="col-auto">
                        <label className="col-form-label">Contracts</label>
                    </div>
                    <div className="col-auto">
                        <input id="contractsField" className="form-control" placeholder={stockName} disabled/>
                    </div>
                </div>

                <div className="row g-3 align-items-center d-flex justify-content-between">
                    <div className="col-auto">
                        <label className="col-form-label">Price</label>
                    </div>
                    <div className="col-auto">
                        <input id="priceField" className="form-control" placeholder={stockPrice} disabled/>
                    </div>
                </div>

                <button className="btn btn-sm btn-outline-light" onClick={handleSubmit}>Execute</button>
            </form>
        </div>
    );
}

export default Panel;