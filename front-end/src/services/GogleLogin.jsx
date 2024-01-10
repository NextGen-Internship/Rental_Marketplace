import axios from 'axios';


try {
  const backendResponse = await axios.post("http://localhost:8080/rentify/google-login", {
    credential: response.credential,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Access the response data using backendResponse.data

} catch (error) {
  console.error("Error sending user data to backend:", error);
}






// try {
//   const backendResponse = await fetch("http://localhost:8080/rentify/google-login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(response.credential),
//   });

// } catch (error) {
//   console.error("Error sending user data to backend:", error);
// }