// // api.js
// import { jwtDecode } from "jwt-decode";

// export async function fetchLikedItems(userId) {
//   try {
//     const response = await fetch(
//       `http://localhost:8080/rentify/favourites/userFavourites/${userId}`,
//       {
//         method: "GET",
//       }
//     );

//     if (response.ok) {
//       return await response.json();
//     } else {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error("Error fetching liked items:", error.message);
//     throw error;
//   }
// }

// export async function toggleLike(itemId, userId, isLiked) {
//   try {
//     const requestBody = {
//       itemId: itemId,
//       userId: parseInt(userId, 10),
//       isLiked: isLiked,
//     };

//     const response = await fetch(
//       "http://localhost:8080/rentify/favourites/liked",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestBody),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error("Error toggling like:", error.message);
//     throw error;
//   }
// }
