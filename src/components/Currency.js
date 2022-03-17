const Currency = ({ currency, changeCurrency }) => {

    if(currency === '€') {
        return(
            <button
            className="btn btn-outline-warning m-3"
                onClick={changeCurrency}
            >
                Convert in USD $
            </button>
        );
    } else {
        return(
            <button
            className="btn btn-outline-success m-3"
                onClick={changeCurrency}
            >
                Convert in EUR €
            </button>
        );
    }

}

export default Currency;