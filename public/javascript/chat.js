async function commentFormHandler(event) {
    event.preventDefault();
  
    const content = document.querySelector('textarea[name="message-body"]').value.trim();
    const conversation_id = 1;
    if (content) {
        const response = await fetch('/api/messages/', {
          method: 'POST',
        //   two properties. like in insomnia.
          body: JSON.stringify({
            conversation_id,
            content
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
  
  document.querySelector('#message-form').addEventListener('submit', commentFormHandler);