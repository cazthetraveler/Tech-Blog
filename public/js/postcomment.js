// add a comment

const addComment = async (event) => {
  event.preventDefault();

  const content = document
    .querySelector('textarea[name="comment"]')
    .value.trim();
  const blogId = document.querySelector(".blog-title").id;

  if (content) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/blogposts/${blogId}`);
    } else {
      alert("Failed to post blog...");
    }
  }
};

document.querySelector(".comment-form").addEventListener("submit", addComment);
