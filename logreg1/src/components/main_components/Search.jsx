import './css/search.css'
import { FiSearch } from "react-icons/fi";
import { CgArrowRight } from "react-icons/cg";

const Search = () => {
    return <>
    {/* search-box */}
    <div className="search-box">
      <div className="searchwithicon">
      <i className='icon1'>
      <FiSearch/></i>
      <i className="icon2">
      <CgArrowRight/>
      </i>
      <input type="text" className="search" placeholder='Search....'/>
      </div>
    </div>

    </>;
  };
  
  export default Search;