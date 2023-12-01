// add a blogpost

const addPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#blog-title").value.trim();
  const content = document
    .querySelector('textarea[name="blog-content"]')
    .value.trim();

  if (title && content) {
    const response = await fetch("/api/blogposts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to post blog...");
    }
  }
};

document.querySelector(".blog-form").addEventListener("submit", addPost);

//edit a blogpost

//delete a blogpost
//this doesn't work :PP i give up

const deleteBtn = document.querySelector(".del-btn");

const deletePost = async () => {
  const blogPostId = this.document.querySelector(".blog-entries").id;
  const response = await fetch(`./api/blogposts/:${blogPostId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete blogpost!");
  }
};

deleteBtn.addEventListener("click", deletePost);
