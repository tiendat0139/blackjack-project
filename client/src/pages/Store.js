import React from "react";
import "../css/Store.css";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "../components/Item";

const Store = () => {
  const { id } = useParams();
  console.log(id);
  const [itemlist, setItemlist] = useState([]);
  const [categorylist, setCategorylist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    async function fetchData() {
      let result;
      if (!id) {
        result = await fetch("http://localhost:5000/store");
        result = await result.json();
        setItemlist(result);
      } else {
        result = await fetch(`http://localhost:5000/store/category/${id}`);
        result = await result.json();
        setItemlist(result);
      }
      result = await fetch("http://localhost:5000/category");
      result = await result.json();
      setCategorylist(result);
    }
    fetchData();
  }, []);

  //get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemlist.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="store">
      <div className="label">
        <h1>Store</h1>
      </div>
      <div className="selling">
        <div className="category">
          {categorylist.map((category) => (
            <a href={"/store/category/" + category.category_id}>
              {category.category_name}
            </a>
          ))}
        </div>

        <div className="itemlist">
          {currentItems?.map((item) => (
            <Item item={item} />
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
