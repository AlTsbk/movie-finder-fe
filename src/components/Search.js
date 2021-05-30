import { useState } from "react" 
import { NavLink } from "react-router-dom";

export const Search = () => {

    const [searchText, setSearchText] = useState("");

    const onSearchChange = Event => {
        setSearchText(Event.target.value);
    }

    return (
        <div className="search">
            <div className="input-field">
                <input value={searchText} onChange={onSearchChange} className="search-input" placeholder="Search" id="search-input" type="text"/>
            </div>
            <div className="search-btn">
                <NavLink to={"/findMovie/" + searchText}><i class="material-icons">search</i></NavLink>
                
            </div>
        </div>
    )
}