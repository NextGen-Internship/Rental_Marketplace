// // utils.js
// import axios from "axios";

// export const fetchItems = async () => {
//     try {
//       const result = await fetchData(
//         `${endpointItems}${
//           categoryId ? `/category/${categoryId}` : ""
//         }?page=${currentPage}&sortDirection=${sortOrder}`
//       );

//       const pageSizeFromBackend = result.pageable.pageSize || 2;
//       setItems(result.content);
//       setTotalPages(result.totalPages);
//       setPageSize(pageSizeFromBackend);
//     } catch (error) {
//       console.error("Error fetching items:", error.message);
//     }
//   };
