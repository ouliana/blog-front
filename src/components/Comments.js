function Comments({ comments }) {
  return (
    <>
      <h3>comments</h3>
      <div>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </div>
    </>
  );
}

export default Comments;
