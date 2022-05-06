
import SearchBar from '@/components/BorrowBooks/SearchBar'
import { useState } from 'react'
import SearchBookList from '../../../components/BorrowBooks/SearchBookList'

const SearchBooks = () => {
  const [keyword, setKeyword] = useState('')
  return (
    <>
      <div>
       <SearchBar setKeyword={(k) => {
         setKeyword(k);
       }}/>
      </div>
      <div>
      <SearchBookList keyword={keyword}  />
      </div>
    </>
    
  )
}

export default SearchBooks