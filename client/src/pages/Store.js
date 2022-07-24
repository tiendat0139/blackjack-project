import React from "react";
import "../css/Store.css";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, Navigate } from 'react-router-dom';
import Item from "../components/Item";
import Axios from "axios";
import '../css/Tailwindcss.css';

function Store({user}){
  const { id } = useParams();
  console.log(id);
  const [itemlist, setItemlist] = useState([]);
  const [categorylist, setCategorylist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [money, setMoney] = useState(0);
  const [itemsPerPage] = useState(8);
  const url = window.location.pathname;

  async function fetchData() {
    let result;
    if (!id) {
      result = await fetch("http://localhost:5000/store");
      result = await result.json();
      console.log(result)
      setItemlist(result);
    } else {
      result = await fetch(`http://localhost:5000/store/category/${id}`);
      result = await result.json();
      console.log(result)
      setItemlist(result);
    }
    result = await fetch("http://localhost:5000/category");
    result = await result.json();
    setCategorylist(result);
    Axios.post("http://localhost:5000/my-casino", {
      params: {
        user_id: user.user_id,
      },
    }).then((response) => {
      console.log(response)
      let data = response.data[0];
      setMoney(data.money);
    });
  }
  
  useEffect(() => {
    fetchData();
  }, [url, money]);

  const Buy = async(item_id) => {
    console.log('buying')
    const url = 'http://localhost:5000/buy';
    return await Axios.post(url, {user_id:user.user_id, item_id:item_id});
  }
  const Balance = async(balance) => {
    const url = 'http://localhost:5000/coin';
    return await Axios.post(url, {user_id:user.user_id, user_money:balance});
  }

  const handleBuy = async (item) => {
    try{
      let balance = money - item.price;
      if (balance < 0){
        alert("Buy failed! Not enough money");
    }
    else{
      await Buy(item.item_id);
      await Balance(balance);
      setMoney(balance)
      alert("Buy success!");
    }
  } catch (err){}
  }

  //get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemlist.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="store">
      <div className="label">
        <h1>Store</h1>
        <h2>Your coin :{money}</h2>
      </div>
      <div className="selling">
        <div className="category">
          <Link to={"/store"}>
            <button className='noti-opt_acp' style={{width: 300}}>All</button>
          </Link>
          {categorylist.map((category) => (
            <Link to={"/store/category/" + category.category_id}>
              <button className='noti-opt_acp' style={{width: 300}}>{category.category_name}</button>
            </Link>
          ))}
        </div>

        <div className="itemlist">
          {currentItems?.map((item) => (
            <>
              <div className="item">
                <div className="itemimage">
                  <img src={item.image} alt="" />
                </div>
                <div className="iteminfo">
                  <p>{item.item_name}</p>
                  <p>{item.price}</p>
                </div>
                <button type="button" className="w-40 h-10 button-submit" onClick = {()=>handleBuy(item)}>Buy</button>
              </div>
            </>
          ))}
          {/* <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={itemlist.length}
            paginate={paginate}
          /> */}
        </div>
        <br />
        <div className="pagination">
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={itemlist.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};
export default Store;
