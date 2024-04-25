import react from 'react';
import {useState, useEffect} from 'react';
import { supabase } from '../SupabaseConnection';
import InteractionDetail from "../components/InteractionDetail";
import EventGalleryCSS from "./EventGallery.module.css";

const EventGallery = () => {

    const [events, setEvents] = useState([]);

    useEffect (() => {
        const fetchEvents = async () => {
            try{
                const {data, error} = await supabase.from("Events").select().order('created_at', {ascending: false});

                if (error){
                    throw error;
                }
                setEvents(data)
            }
            catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        }
        fetchEvents();
    }, [])

    return (
        <>
        <div className={EventGalleryCSS["events-container"]}> 
        {
            events && events.length > 0 ?
            events.map((event,index) => 

            <div className={EventGalleryCSS["all-events"]} key={event.id}>

                <div className={EventGalleryCSS["event"]}>
                        <p><b>{event.eventTitle}</b></p>
                        <p>{event.eventContent}</p>
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