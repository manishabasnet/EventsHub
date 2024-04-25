import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import InteractionDetailCSS from "./InteractionDetail.module.css";
import { supabase } from '../SupabaseConnection';
import {useState} from "react";

const InteractionDetail = (props) => {

    const [likes, setLikes] = useState(props.upvotes);
    const [liked, setLiked] = useState(false);

    const handleClick = async () => {
        try {
            const { data, error } = await supabase
                .from("Events")
                .update({ upvotes: likes + 1 }) 
                .eq('id', props.eventID)
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

    return (
        <>
        <div className={InteractionDetailCSS["interaction-detail"]}>
            <div className={InteractionDetailCSS["upvotes"]}>
                <button className={`${InteractionDetailCSS["heart-button"]} ${liked ? InteractionDetailCSS["liked"] : ''}`} onClick={handleClick}>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
                <div className={InteractionDetailCSS["upvote-count"]}>{likes}</div>
            </div>
            <div className={InteractionDetailCSS["comment"]}>
                <FontAwesomeIcon icon={faComment} />
                <div className={InteractionDetailCSS["upvote-count"]}>{props.comments}</div>
                </div>
        </div>
        </>
    )
}

export default InteractionDetail;