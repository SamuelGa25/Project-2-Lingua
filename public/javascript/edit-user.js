async function editUserHandler(event) {
    event.preventDefault();
    // get how we getting input information

    const username = document.querySelector('input[name="account-username"]').value.trim();
    const email = document.querySelector('input[name="account-email"]').value.trim();
    const native_language = document.querySelector('input[name="account-native_language"]').value.trim();
    const target_language = document.querySelector('input[name="account-target_language"]').value.trim();


    // get the id
    //   array with all characters separated by forward slash and the index there id in nested in [] brackets.
    const user_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    // the post id from the URL and the value of the <textarea> element.
    if (username && email && native_language && target_language) {
        const response = await fetch('/api/users/' + user_id, {
            method: 'PUT',
            //    property like in insomnia.
            body: JSON.stringify({
                username,
                email,
                native_language,
                target_language
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // to replace  the page to go to the dashboard
            document.location.replace('/account');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#edit-account-form').addEventListener('submit', editUserHandler);