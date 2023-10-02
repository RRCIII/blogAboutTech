const hpNewPost = async (event) => {
  event.preventDefault();

  const title = document.getElementById("hp-post-title").value.trim();
  const content = document.getElementById("hp-post-content").value.trim();

  if (title && content) {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        alert(`Post could not be created.`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert(`An error occured while creating the post.`);
    }
  } else {
    alert("Please enter a title and content for the post.");
  }
};

document.getElementById("hp-newpost-btn").addEventListener("click", hpNewPost);