import { supabase } from "../SupabaseConnection";
import CreateEventCSS from "./CreateEvent.module.css";
import  React, { useState } from 'react';

const CreateEvent = () => {

    const [post, setPost] = useState({title: "", description: ""})

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setPost((prev) => {
            console.log(`name: ${name}`);
            console.log(`value: ${value}`);
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const createNewEvent = async (event) => {

        event.preventDefault();

        await supabase
        .from("Events")
        .insert({eventTitle: post.title, eventContent: post.content})
        .select();

        window.location ="/";
    };


    return (
        <>
        <div className={CreateEventCSS["event-input"]}> 
            <form>
                <label htmlFor="title"><b>Title</b></label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="content"><b>Description</b></label><br />
                <input type="text" id="content" name="content" onChange={handleChange} /><br />
                <br/>

                {/* <label htmlFor="image">Image</label><br />
                <input type="image" id="image" name="image" onChange={handleChange} /><br />
                <br/> */}

                <button className={CreateEventCSS["post-button"]} type="submit" value="Submit" onClick={createNewEvent}>Post</button>
            </form>
        </div>
        </>
    )
}

export default CreateEvent;