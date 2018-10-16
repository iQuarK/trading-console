import Trades from './component';
import { connect } from 'react-redux';
import { addTrade, clearTrades } from '../../actions/trades';

// receives the data from the reducer to make the list of orders
const mapStateToProps = state => ({
    trades: state.trades
});
  
// maps the action into a function inside the component
const mapDispatchToProps = dispatch => ({
    onNewData: data => {
        dispatch(addTrade(data))
    },
    clearData: data => {
        dispatch(clearTrades())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Trades);