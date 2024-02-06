import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./ItemsList.css";
import { fetchData } from "../fetchData";
import noImage from "../../assets/no-image.avif";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const endpointItems = "items";

const ItemsList = ({ searchTerm }) => {
  const { id: categoryId } = useParams();
  const [likedItems, setLikedItems] = useState(new Set());
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await fetchData(
          `${endpointItems}${
            categoryId ? `/category/${categoryId}` : ""
          }?page=${currentPage}&sortDirection=${sortOrder}`
        );

        const pageSizeFromBackend = result.pageable.pageSize || 2;
        setItems(result.content);
        setTotalPages(result.totalPages);
        setPageSize(pageSizeFromBackend);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      }
    };

    const fetchLikedItemsFromDB = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.jti;

          const response = await fetch(
            `http://localhost:8080/rentify/favourites/userFavourites/${userId}`,
            {
              method: "GET",
            }
          );

          if (response.ok) {
            const likedItemsFromDB = await response.json();
            const likedItemsSet = new Set(likedItemsFromDB);
            setLikedItems(likedItemsSet);
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
      } catch (error) {
        console.error("Error fetching liked items:", error.message);
      }
    };

    fetchLikedItemsFromDB();
    fetchItems();
  }, [currentPage, categoryId, sortOrder]);

  const handleLikeClick = async (itemId) => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.jti;

    const updatedLikedItems = new Set(likedItems);
    if (likedItems.has(itemId)) {
      updatedLikedItems.delete(itemId);
    } else {
      updatedLikedItems.add(itemId);
    }

    const isLiked = !likedItems.has(itemId);
    setLikedItems(updatedLikedItems);

    try {
      const response = await fetch(
        "http://localhost:8080/rentify/favourites/liked",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId,
            userId: parseInt(userId, 10),
            isLiked,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error in handleLikeClick:", error.message);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes((searchTerm ?? "").toLowerCase())
  );

  useEffect(() => {
    const googleToken = localStorage.getItem("google_token");
    const regularToken = localStorage.getItem("token");

    const token = googleToken !== null ? googleToken : regularToken;
    if (token !== null) {
      const decoded = jwtDecode(token);
      setUserId(decoded.jti);
    }
  }, []);

  const handleViewClick = (itemId) => {
    if (userId === null) {
      return;
    }

    const url = "http://localhost:8080/rentify/views";
    const postData = {
      user: { id: userId },
      item: { id: itemId },
    };

    axios.post(url, postData).catch((error) => {
      console.error("Error making post request:", error);
    });
  };

  return (
    <div>
      <div className="btn-group" role="group">
        <button
          id="btnGroupDrop1"
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Order by price
        </button>
        <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setSortOrder("asc")}
            >
              Ascending
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => setSortOrder("desc")}
            >
              Descending
            </a>
          </li>
        </ul>
      </div>
      <div className="items-list">
        {items &&
          filteredItems.map((item) => (
            <div className="items-list-item" key={item.id}>
              <Link
                to={`/items/${item.id}`}
                onClick={() => handleViewClick(item.id)}
              >
                <div className="card">
                  <img
                    src={item.thumbnail || noImage}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h3 className="card-title">{item.name}</h3>
                    <p className="card-text">{"$" + item.price}</p>
                    <p className="card-text">{item.address}</p>
                  </div>
                </div>
              </Link>
              <button
                className={`like-button ${
                  likedItems.has(item.id) ? "clicked" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLikeClick(item.id);
                }}
              >
                <FavoriteIcon />
              </button>
            </div>
          ))}
      </div>
      <br /> <br />
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            >
              Previous
            </a>
          </li>
          {[...Array(totalPages).keys()].map((page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => setCurrentPage(page)}
              >
                {page + 1}
              </a>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages - 1 ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              href="#"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ItemsList;
