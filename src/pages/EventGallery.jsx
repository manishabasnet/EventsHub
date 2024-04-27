import react from 'react';
import {useState, useEffect} from 'react';
import { supabase } from '../SupabaseConnection';
import InteractionDetail from "../components/InteractionDetail";
import Filters from "../components/Filters";
import EventGalleryCSS from "./EventGallery.module.css";

const EventGallery = () => {

    const [events, setEvents] = useState([]);
    const [originalEvents, setOriginalEvents] = useState([]);
    const [searchKeywork, setSearchKeyword] = useState("");

    useEffect (() => {
        const fetchEvents = async () => {
            try{
                const {data, error} = await supabase.from("Events").select().order('created_at', {ascending: false});

                if (error){
                    throw error;
                }
                setEvents(data);
                setOriginalEvents(data);
            }
            catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        }
        fetchEvents();
    }, [])

    const handleEdit = (id) => {
        window.location = `/edit-delete-event/${id}`;
    };

    const updateEvents = async () => {
        try {
            const { data, error } = await supabase.from("Events").select().order('created_at', { ascending: false });

            if (error) {
                throw error;
            }
            setOriginalEvents(data);
        } catch (error) {
            console.error('Error updating events:', error.message);
        }
    };

    const filterAll = () => {
        //Show all the events in order from recent to oldest based on date created
        setEvents(originalEvents);
    };

    const filterMostPopular = () => {
        const mostPopular = [...originalEvents].sort((a, b) => b.upvotes - a.upvotes);
        setEvents(mostPopular);
        return mostPopular;
    };
    
    const filterOldest = () => {
        const oldestFirst = [...originalEvents].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        setEvents(oldestFirst);
        return oldestFirst;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const keyword = e.target.elements.search.value.toLowerCase();
        setSearchKeyword(keyword);
        const filtered = originalEvents.filter((event) => event.eventTitle.toLowerCase().includes(keyword));
        setEvents(filtered);
    };

    const showDetails = (id) => {
        window.location = `/event-detail/${id}`;
    };
    

    return (
        <>
        <div className={EventGalleryCSS["filter-container"]}>
            <div className={EventGalleryCSS["filters"]}>
                <Filters feature="All" onClick={filterAll}/>
                <Filters feature="Most Popular" onClick={() => { filterMostPopular(); updateEvents(); }}/>
                <Filters feature="Oldest" onClick={() => { filterOldest(); updateEvents(); }} />
            </div>
             
            <div className={EventGalleryCSS["search-form"]}>
                <form onSubmit={handleSearch}>
                    <div className={EventGalleryCSS["search-bar"]}>
                        <input type="text" name="search" placeholder="search......." className={EventGalleryCSS["search-input"]}></input>
                    </div>    
                </form>
            </div>

        </div>

        <div className={EventGalleryCSS["events-container"]}> 
        {
            events && events.length > 0 ?
            events.map((event,index) => 

            <div className={EventGalleryCSS["all-events"]} key={event.id}>

                <div className={EventGalleryCSS["event"]}>
                    <div className="event-detail" onClick={() => showDetails(event.id)}>
                        <p><b>{event.eventTitle}</b></p>
                        <p>{event.eventContent}</p>
                    </div>
                    <InteractionDetail upvotes={event.upvotes} eventid={event.id} onClick={() => handleEdit(event.id)}/>
                </div>
            </div>
        ): <h2>{'No events found yet 😞'}</h2>
        }
        </div>
        </>
    )
}

export default  EventGallery;