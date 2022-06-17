async function editPostHandler(event) {
    event.preventDefault();
  // get how we getting input information
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('input[name="post-content"]').value.trim();
  // get the id
//   array with all characters separated by forward slash and the index there id in nested in [] brackets.
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    // the post id from the URL and the value of the <textarea> element.
    if (title && content) {
        const response = await fetch('/api/posts/' + post_id, {
          method: 'PUT',
        //    property like in insomnia.
          body: JSON.stringify({
            title,
            content
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
            // to replace  the page to go to the dashboard
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      }
  }
  
  document.querySelector('#edit-post-form').addEventListener('submit', editPostHandler);