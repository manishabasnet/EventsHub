import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../SupabaseConnection';
import InteractionDetail from '../components/InteractionDetail';
import PostDetailCSS from "./PostDetail.module.css";

const PostDetail = () => {
    const [eventDetails, setEventDetails] = useState({ comments: [] });
    const [commentInput, setCommentInput] = useState("");

    // Get the event ID from the URL parameter
    const { id } = useParams();

    // Fetch the event details using the event ID
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const { data, error } = await supabase
                    .from('Events')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    throw error;
                }
                
                // If comments is null or undefined, set it to an empty array
                const comments = data.comments || [];
                setEventDetails({ ...data, comments });
            } catch (error) {
                console.error('Error fetching event details:', error.message);
            }
        };

        fetchEventDetails();
    }, [id]);

    // Function to handle comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Update the comments array in the state
            const updatedComments = [...eventDetails.comments, { id: eventDetails.comments.length + 1, comment: commentInput }];
            setEventDetails((prevDetails) => ({ ...prevDetails, comments: updatedComments }));
            
            // Update the comments array in the database
            await supabase
                .from('Events')
                .update({ comments: updatedComments })
                .eq('id', id);
            
            // Clear the comment input field
            setCommentInput('');
        } catch (error) {
            console.error('Error adding comment:', error.message);
        }
    };

    return (
        <div className={PostDetailCSS.details}>
            {eventDetails && eventDetails.eventTitle && (
                <>
                    <div className={PostDetailCSS["event"]}>
                        <div className={PostDetailCSS["event-title-description"]}>
                            <p><b>{eventDetails.eventTitle}</b></p>
                            <p>{eventDetails.eventContent}</p>
                        </div>
                        <InteractionDetail upvotes={eventDetails.upvotes} eventid={eventDetails.id} />
                    </div>

                    <div className={PostDetailCSS.comments}>
                        <div className="input-comment">
                            <form onSubmit={handleCommentSubmit}>
                                <input
                                    type="text"
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    placeholder="Add a comment..."
                                />
                            </form>
                        </div>

                        <div className={PostDetailCSS["comments"]}>
                            {eventDetails.comments && eventDetails.comments.map(comment => (
                                <div key={comment.id}>
                                    <p>{comment.comment}</p>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </>
            )}
        </div>
    );
};

export default PostDetail;
