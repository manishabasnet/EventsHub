import { useParams } from "react-router-dom";
import { supabase } from "../SupabaseConnection";
import EditDeleteCSS from "./EditDeletePost.module.css"
import {useState} from "react";

const EditDeletePost = () => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", description: ""});

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    // DELETE post
    const deletePost = async (event) => {

        event.preventDefault();

        await supabase.from("Events")
        .delete()
        .eq("id", id)

        window.location = "/";

    };

    const editPost = async (event) => {
        event.preventDefault();
        await supabase.from("Events")
        .update({eventTitle: post.title, eventContent: post.content})
        .eq('id', id);

        window.location = "/";
    };

    return (
        <>
           <div className={EditDeleteCSS["event-input"]}> 
            <form>
                <label htmlFor="title"><b>Title</b></label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br/>

                <label htmlFor="content"><b>Description</b></label><br />
                <input type="text" id="content" name="content" onChange={handleChange} /><br />
                <br/>

                <div className={EditDeleteCSS["buttons"]}>
                    <button className={EditDeleteCSS["edit-button"]} type="submit" value="Submit" onClick={editPost}>Edit</button>
                    <button className={EditDeleteCSS["delete-button"]} type="submit" value="Submit" onClick={deletePost}>Delete</button>
                </div>
                
            </form>
        </div>
        </>
    )
}

export default EditDeletePost;