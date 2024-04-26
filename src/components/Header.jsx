import React from "react";
import HeaderModuleCSS from './HeaderModule.module.css';
import {Link} from "react-router-dom";
import { supabase } from '../SupabaseConnection';

const Header = (props) => {

    return (
        <>
            <header>
                <h1>EventsHub</h1>

                <div className={HeaderModuleCSS["home-create"]}>
                    <Link to= {"/"}><button className={HeaderModuleCSS["home-button"]}>Home</button></Link>
                    <Link to= {"/create-event"}><button className={HeaderModuleCSS["create-event-button"]}>CreateEvent</button></Link>
                </div>
            </header>
        </>
    )
}

export default Header;
