import React, { useEffect, useState } from "react";
import axios from "axios";
import "./logic.css";
import ToDoIcon from "./assessts/To-do.svg";
import DoneIcon from "./assessts/Done.svg";
import InProgressIcon from "./assessts/in-progress.svg"
import BacklogIcon from "./assessts/Backlog.svg"


const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

const Kanban = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(
    localStorage.getItem("groupBy") || "status"
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("sortBy") || "priority"
  );

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

  // Group tickets by chosen option (status, user, priority)
  const groupTickets = () => {
    switch (groupBy) {
      case "status":
        return tickets.reduce((acc, ticket) => {
          acc[ticket.status] = acc[ticket.status] || { tickets: [], count: 0 };
          acc[ticket.status].tickets.push(ticket);
          acc[ticket.status].count++;
          return acc;
        }, {});
      case "user":
        return tickets.reduce((acc, ticket) => {
          const user = users.find((user) => user.id === ticket.userId);
          const userName = user ? user.name : "Unknown";
          acc[userName] = acc[userName] || { tickets: [], count: 0 };
          acc[userName].tickets.push(ticket);
          acc[userName].count++;
          return acc;
        }, {});
      case "priority":
        return tickets.reduce((acc, ticket) => {
          const priority = ["No priority", "Low", "Medium", "High", "Urgent"][
            ticket.priority
          ];
          acc[priority] = acc[priority] || { tickets: [], count: 0 };
          acc[priority].tickets.push(ticket);
          acc[priority].count++;
          return acc;
        }, {});
      default:
        return {};
    }
  };

  // Sort tickets based on selected sort criteria
  const sortedTickets = (group) => {
    return group.tickets.sort((a, b) => {
      if (sortBy === "priority") return b.priority - a.priority;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  };

  const groupedTickets = groupTickets();

  return (
    <div>
      <h1>Kanban Board</h1>

      <div>
        <label htmlFor="groupBy">Group by: </label>
        <select
          id="groupBy"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
        >
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>

        <label htmlFor="sortBy" style={{ marginLeft: "20px" }}>
          Sort by:{" "}
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div style={{ display: "flex", marginTop: "20px" }}>
        {Object.keys(groupedTickets).map((group) => (
          <div key={group} style={{ marginRight: "20px", minWidth: "200px" }}>
            <h3>
              {group}:{groupedTickets[group].count}
            </h3>
            {sortedTickets(groupedTickets[group]).map((ticket) => (
              <div key={ticket.id} style={styles.card}>
                <p>{ticket.id}</p>
                <div style={styles.cardHeader}>
                  <h4 style={styles.cardTitle}>{ticket.title}</h4>
                  <span style={styles.cardPriority}>
                    {["No priority", "Low", "Medium", "High", "Urgent"][
                      ticket.priority
                    ]}
                  </span>
                </div>
                <div style={styles.statusContainer}>
                  <img
                    src={
                      ticket.status === "Todo"
                        ? ToDoIcon
                        : ticket.status === "In progress"
                        ? InProgressIcon
                        : ticket.status === "Backlog"
                        ? BacklogIcon
                        : DoneIcon
                    }
                    alt={ticket.status}
                    style={styles.statusIcon}
                  />
                  <span>Status: {ticket.status}</span>
                </div>
                <p>
                  User:{" "}
                  {users.find((user) => user.id === ticket.userId)?.name ||
                    "Unknown"}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    margin: "10px 0",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    transition: "transform 0.2s",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    margin: "0",
  },
  cardPriority: {
    padding: "5px 10px",
    borderRadius: "5px",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  statusIcon: {
    width: "20px",
    height: "20px",
    marginRight: "5px",
  },
};

export default Kanban;