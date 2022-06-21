async function deleteFormHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];

    if (post_id) {
        // or in fetch we can use `/api/posts/${post_id}` '/api/posts/' + post_id
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'DELETE',
            // headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        }
        else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#delete-post-btn').addEventListener('click', deleteFormHandler);