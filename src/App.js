import React, { useState, useEffect } from 'react'
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faDolly } from '@fortawesome/free-solid-svg-icons'

const url = 'https://my-json-server.typicode.com/drakulovski/dbplaceholder/products';

function App() {  

  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(0);
  const [sortType, setSortType] = useState('price');
  const [sortTypeA, setSortTypeA] = useState('title');

  const fetchProducts = async () => {
    const reponse = await fetch(url);
    const newProducts = await reponse.json();
    setProducts(newProducts);
    setLoading(false);
  }
  useEffect(() => {
    fetchProducts()
  }, []);

  useEffect(() => {
    const sortArray = type => {
      const types = {
        title: 'title',
        price: 'price',
      };
      const sortProperty = types[type];
      const sorted = [...products].sort((a, b) => b[sortProperty] - a[sortProperty]);
      setProducts(sorted);
    };

    sortArray(sortType);
  }, [sortType]); 

  useEffect(() => {
    const sortArray1 = type1 => {
      
     
      const sorted = [...products].sort((a, b) => a.title.localeCompare(b.title));
      setProducts(sorted);
    };

    sortArray1(sortTypeA);
  }, [sortTypeA]); 

  
  if (loading) {
    return (
      <section>
        <h1>Hello guys</h1>
      </section>
    )
  }

  const { title, price, picture, description } = products[value]
  return (
  
    <div className="container">
      <div className="header"><FontAwesomeIcon icon={faDolly} size = '2x' /></div>
      <div className="bars">
        <div className="bars-a">
        <FontAwesomeIcon icon={faBars} size = '2x'/>
        </div>
      </div>
      <div className="input">
        <select onChange={(e) => setSortType(e.target.value)} className="sort1">
          <option value="title">PriceSort</option>
          <option value="price">TitleSort</option>
        </select>
        <select onChange={(e) => setSortTypeA(e.target.value)} className="sort1">
          <option value="title">TitleSort</option>
          <option value="price">PriceSort</option>
        </select>
      </div>
      <div className="product">
        <h3 className="product-a"><FontAwesomeIcon icon={faPlusCircle} /> Add Product</h3>
      </div>

      {/* btn container */}
      <div className="menu">
        
          {products.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className={`btn ${index === value && 'active-btn'}`}
              >
                <div>{`Title: ${item.title}`}</div>
                <div>{`Price: ${item.price}`}</div>
              </button>


            )
          })}
      </div>

      {/* job info */}
      <div className="content">
          <h3>{title}</h3>
          <h4>{price}</h4>
          <img src={picture} alt={"img"} width="185" height="150"/>
          <p>{description}</p>

      </div>

      
    </div>
  );
}

export default App;
