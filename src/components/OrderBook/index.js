import OrderBook from './component';
import { connect } from 'react-redux';
import { addBook, clearBooks } from '../../actions/book';

// receives the data from the reducer to make the list of orders
const mapStateToProps = state => ({
    books: state.books
});
  
// maps the action into a function inside the component
const mapDispatchToProps = dispatch => ({
    onNewData: data => {
        dispatch(addBook(data))
    },
    clearData: data => {
        dispatch(clearBooks())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);
