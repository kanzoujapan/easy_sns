import {useEffect, useState} from "react";

function Timeline() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/posts")
        .then(res => res.json())
        .then(data => setPosts(data));
    }, []);

    return (
        <div>
            <h2>TIMELINE</h2>
            {posts.map((post, idx) => (
                <div key = {idx} style = {{border: '1px solid #ccc', margin: 8, padding:8}}>
                    <img src = {`http://127.0.0.1:5000${post.image_url}`} alt = 'post' style = {{maxWidth: 200}} />
                    <div>COMMENT : {post.comment}</div>
                    <div>DATE : {post.created_at}</div>
                </div>
            ))}
        </div>
    );
}

export default Timeline;