// async function messageFormHandler(event) {
//     event.preventDefault();
  
//     const content = document.querySelector('textarea[name="content-body"]').value.trim();
//   // get the id
// //   array with all characters separated by forward slash and the index there id in nested in [] brackets.
//     // const conversation_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
//     const conversation_id = 1;
//     sessionStorage.getItem

//     // the post id from the URL and the value of the <textarea> element.
//     if (content) {
//         const response = await fetch('/api/messages', {
//           method: 'POST',
//         //   two properties. like in insomnia.
//           body: JSON.stringify({
//             content,
//             user_id,
//             conversation_id
//           }),
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });
      
//         if (response.ok) {
//             // to refresh the page
//           document.location.reload();
//         } else {
//           alert(response.statusText);
//         }
//       }
//   }
  
//   document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);