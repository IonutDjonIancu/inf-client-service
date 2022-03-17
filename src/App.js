import './App.css';
import React from 'react';
import Stock from './components/Stock';
import Panel from './components/Panel';
import Navbar from './components/Navbar';
import Currency from './components/Currency';

class App extends React.Component {
  
  constructor() {
    super();

    this.state = {
      stocksArray: [],
      updateKey: false,
      currency: '€'
    }
  }  
  
  addStock = (stockSymbol, stockName, stockPrice) => {
    
    const obj = {
      symbol: stockSymbol,
      name: stockName,
      price: stockPrice,
      portfolioid: 1 // currently hardcoded, due to missing login/logout functionality
    };

    fetch('https://inf-businesslogic-service.herokuapp.com/createstock', {
      method: 'POST',
      rejectUnhauthorized : false,
      body: JSON.stringify(obj),
      headers: { 'Content-Type': 'application/json' }})
      .then(res => res.json())
      .then((res) => {
        this.setState({
          updateKey: !this.state.updateKey
        });
      })
      .catch(err => console.log(err))
  }

  deleteStock = (stockGuid) => {

    const obj = {
      guid: stockGuid
    }

    fetch('https://inf-businesslogic-service.herokuapp.com/deletestock', {
        method: 'DELETE',
        rejectUnhauthorized : false,
        body: JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' }})
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  changeCurrency = () => {
    if(this.state.currency === '€') {

      this.setState({
        currency: '$'
      });
    } else {
      this.setState({
        currency: '€'
      });
    }
    

  }

  componentDidMount() {

    fetch('https://inf-businesslogic-service.herokuapp.com/getportfoliobyid/1') // currently hardcoded, due to missing login/logout functionality
      .then(res => res.json())
      .then(obj => {
        
        this.setState({
          stocksArray: obj.stocks
        });
      });
  };

  componentDidUpdate() {
    fetch('https://inf-businesslogic-service.herokuapp.com/getportfoliobyid/1') // currently hardcoded, due to missing login/logout functionality
      .then(res => res.json())
      .then(obj => {

        this.setState({
          stocksArray: obj.stocks
        });
      });
  }

  render() {
      return (
      <section className="App" data-testid="appid">
        <header className="App-header px-5">

          <Navbar />

          <table className='table table-hover text-light'>
            <thead>
              <tr>
                <th scope="col">Symbol</th>
                <th scope="col">Name</th>
                <th scope="col">Price {this.state.currency}</th>
                <th scope="col">Quantity</th>
                <th scope="col">Bought</th>
                <th scope="col">Current</th>
                <th scope="col">Yield</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.stocksArray?.map(e => {
                return(
                  <Stock
                    key={e.symbol}
                    guid={e.guid} 
                    symbol={e.symbol}
                    name={e.name}
                    price={e.price}
                    quantity={e.quantity}
                    bought={e.bought}
                    current={e.current}
                    yld={e.yield}
                    deleteStock={this.deleteStock}
                    currency={this.state.currency}
                  />
                  );
                }
              )
            }
            </tbody>
          </table>

          <Panel addStock={this.addStock} />

        <Currency 
          currency={this.state.currency}
          changeCurrency={this.changeCurrency}
        />
        </header>
      </section>

    );
  }
}

export default App;
