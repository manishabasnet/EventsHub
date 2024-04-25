import React from "react";
import HeaderModuleCSS from './HeaderModule.module.css';

const Header = () => {
    return (
        <>
            <header>
                <h1>EventsHub</h1>
                <div className={HeaderModuleCSS["search-bar"]}>
                    <input type="text" placeholder="search......."></input>
                    <span className={HeaderModuleCSS["search-icon"]}>🔍</span>
                </div>
                <div className={HeaderModuleCSS["home-create"]}>
                    <p><b>Home</b></p>
                    <p><b>CreateEvent</b></p>
                </div>
            </header>
        </>
    )
}

export default Header;
