import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import InteractionDetailCSS from "./InteractionDetail.module.css";
import { supabase } from '../SupabaseConnection';
import {useState} from "react";

const InteractionDetail = (props) => {

    const [likes, setLikes] = useState(props.upvotes);
    const [liked, setLiked] = useState(false);

    const handleLikes = async () => {
        try {
            const { data, error } = await supabase
                .from("Events")
                .update({ upvotes: likes + 1 }) 
                .eq('id', props.eventid)
                .single();

            if (error) {
                throw error;
            }
            // Update the local state with the new upvotes count
            setLikes(likes + 1);
            setLiked(true);
        } catch (error) {
            console.error('Error updating upvotes:', error.message);
        }
    };

    const handleComments = () => {
        window.location = `/event-detail/${props.eventid}`;
    };

    return (
        <>
        <div className={InteractionDetailCSS["interaction-detail"]}>
            <div className={InteractionDetailCSS["interactions"]}>
            <div className={InteractionDetailCSS["upvotes"]}>
                <button className={`${InteractionDetailCSS["heart-button"]} ${liked ? InteractionDetailCSS["liked"] : ''}`} onClick={handleLikes}>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
                <div className={InteractionDetailCSS["upvote-count"]}>{likes}</div>
            </div>
            <div className={InteractionDetailCSS["comment"]}>
                <button className={`${InteractionDetailCSS["comment-button"]} ${liked ? InteractionDetailCSS["liked"] : ''}`} onClick={handleComments}>
                    <FontAwesomeIcon icon={faComment} />
                </button> 
            </div>
            </div>
            <div className={InteractionDetailCSS["edit"]}>
            <div className={InteractionDetailCSS["edit-delete"]}>
                <button onClick={props.onClick}><FontAwesomeIcon icon={faPenToSquare} /></button>
            </div>
            </div>
        </div>
        </>
    )
}

export default InteractionDetail;