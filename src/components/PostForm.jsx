import { useState } from "react";

function PostForm({ onPost }) {
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("select image");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    formData.append("comment", comment);

    // ここでバックエンドAPIにPOSTする（後ほどFlask側も準備する）
    try {
      const res = await fetch("http://127.0.0.1:5000/post", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      alert("UPLOAD");

      setImage(null);
      setComment("");
      if (onPost) onPost(data);
    } catch (err) {
      alert("communication error :" + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files[0])}
      />
      <input
        type="text"
        placeholder="comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default PostForm;
