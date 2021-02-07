import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const DATA = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football',
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball',
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball',
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch',
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5',
  },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' },
];

const SPORTS = 'Sporting Goods';
const ELECTS = 'Electronics';

class ProductCategoryRow extends React.Component {
  render() {
    const text = this.props.category === SPORTS ? SPORTS : ELECTS;
    return (
      <thead>
        <tr>
          <th colSpan="2">{text}</th>
        </tr>
      </thead>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    let items = DATA.filter((i) => i.category === this.props.category)
      .filter((i) => {
        if (this.props.filterText === '') return true;
        else {
          return i.name
            .toLowerCase()
            .includes(this.props.filterText.toLowerCase());
        }
      })
      .filter((i) => {
        if (this.props.inStockOnly) {
          return i.stocked;
        } else {
          return true;
        }
      })
      .map((i) => (
        <tr key={i.name}>
          <td>{i.name}</td>
          <td>{i.price}</td>
        </tr>
      ));
    return <tbody>{items}</tbody>;
  }
}

class ProductTable extends React.Component {
  render() {
    return (
      <div>
        <b> Name Price </b>
        <table>
          <ProductCategoryRow category={SPORTS} />
          <ProductRow
            category={SPORTS}
            filterText={this.props.filterText}
            inStockOnly={this.props.inStockOnly}
          />
        </table>
        <table>
          <ProductCategoryRow category={ELECTS} />
          <ProductRow
            category={ELECTS}
            filterText={this.props.filterText}
            inStockOnly={this.props.inStockOnly}
          />
        </table>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="search"
            placeholder="Search..."
            onChange={(e) => this.props.handleTextChange(e)}
          />
          <br />
          <label>
            <input
              id="filter"
              type="checkbox"
              onChange={(e) => this.props.handleCheckBoxChange(e)}
            ></input>
            Only show products in stock
          </label>
        </form>
      </div>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
    };
  }

  handleTextChange(event) {
    this.setState({
      filterText: event.target.value,
    });
    console.log(event.target.value);
  }

  handleCheckBoxChange(event) {
    this.setState({
      inStockOnly: event.target.checked,
    });
    console.log(event.target.checked);
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          handleTextChange={(e) => this.handleTextChange(e)}
          handleCheckBoxChange={(e) => this.handleCheckBoxChange(e)}
        />
        <ProductTable
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <FilterableProductTable />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
