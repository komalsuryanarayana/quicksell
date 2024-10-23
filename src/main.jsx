import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import { FaChevronDown, FaFilter } from 'react-icons/fa'; // For icons (like in the image)
import './main.css'; // Include a CSS file to style the display button 

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

// Lazy load components
const UserGroup = lazy(() => import("./UserGroup"));
const StatusGroup = lazy(() => import("./statusGroup"));
const PriorityGroup = lazy(() => import("./PriorityGroup"));

const KanbanBoards = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(
    localStorage.getItem("groupBy") || "status"
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("sortBy") || "priority"
  );
  const [menuOpen, setMenuOpen] = useState(false); // State to handle menu visibility

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Save view state to local storage
  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  // Toggle display menu
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div>
      <h1>Kanban Board</h1>

      <div className="display-button-container">
        <button className="display-button" onClick={toggleMenu}>
          <FaFilter />
          Display <FaChevronDown />
        </button>
        {menuOpen && (
          <div className="menu">
            <div className="menu-item">
              <label htmlFor="groupBy">Group by:</label>
              <select
                id="groupBy"
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="menu-item">
              <label htmlFor="sortBy">Sort by:</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {groupBy === "status" && (
          <StatusGroup tickets={tickets} sortBy={sortBy} />
        )}
        {groupBy === "user" && (
          <UserGroup tickets={tickets} users={users} sortBy={sortBy} />
        )}
        {groupBy === "priority" && (
          <PriorityGroup tickets={tickets} users={users} sortBy={sortBy} />
        )}
      </Suspense>
    </div>
  );
};

export default KanbanBoards;
