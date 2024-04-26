import react from 'react';
import {useState, useEffect} from 'react';
import { supabase } from '../SupabaseConnection';
import InteractionDetail from "../components/InteractionDetail";
import Filters from "../components/Filters";
import EventGalleryCSS from "./EventGallery.module.css";

const EventGallery = () => {

    const [events, setEvents] = useState([]);
    const [originalEvents, setOriginalEvents] = useState([]);

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

    const handleClick = (id) => {
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
    

    return (
        <>
        <div className={EventGalleryCSS["filter-container"]}>
            <Filters feature="All" onClick={filterAll}/>
            <Filters feature="Most Popular" onClick={() => { filterMostPopular(); updateEvents(); }}/>
            <Filters feature="Oldest" onClick={() => { filterOldest(); updateEvents(); }} />
        </div>
        <div className={EventGalleryCSS["events-container"]}> 
        {
            events && events.length > 0 ?
            events.map((event,index) => 

            <div className={EventGalleryCSS["all-events"]} key={event.id}>

                <div className={EventGalleryCSS["event"]}>
                    <div className="event-detail" onClick={() => handleClick(event.id)}>
                        <p><b>{event.eventTitle}</b></p>
                        <p>{event.eventContent}</p>
                    </div>
                    <InteractionDetail upvotes={event.upvotes} eventID={event.id}/>
                </div>
            </div>
        ): <h2>{'No events found yet 😞'}</h2>
        }
        </div>
        </>
    )
}

export default  EventGallery;