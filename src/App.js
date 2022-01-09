import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from './components/ui/Header';
import CharacterGrid from './components/characters/CharacterGrid';
import Search from './components/ui/Search';
import Pagination from './components/Pagination';



const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);


  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(`https://www.breakingbadapi.com/api/characters?name=${query}`)

      console.log(result.data)

      setItems(result.data)
      setIsLoading(false)

    }
    fetchItems()
  }, [query])

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <Header />
      <Search getQuery={(q) => setQuery(q)} />

      <CharacterGrid isLoading={isLoading} items={currentItems} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        paginate={paginate}
      />

    </div>
  );
}

export default App;
