async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  // get the id
//   array with all characters separated by forward slash and the index there id in nested in [] brackets.
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    // the post id from the URL and the value of the <textarea> element.
    if (comment_text) {
        const response = await fetch('/api/comments', {
          method: 'POST',
        //   two properties. like in insomnia.
          body: JSON.stringify({
            post_id,
            comment_text
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
            // to refresh the page
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  
  document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);