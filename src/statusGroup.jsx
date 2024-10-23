import React from "react";
import "./usergroup.css";
import DefaultUserImage from "./assessts/add.svg";
import threedotmenu from "./assessts/3 dot menu.svg";
import plus from "./assessts/add.svg";
import noPriority from "./assessts/No-priority.svg";
import lowPriority from "./assessts/Img - Low Priority.svg";
import mediumPriority from "./assessts/Img - Medium Priority.svg";
import highPriority from "./assessts/Img - High Priority.svg";
import urgentPriority from "./assessts/SVG - Urgent Priority grey.svg";
import openStatus from "./assessts/To-do.svg";
import inProgressStatus from "./assessts/in-progress.svg";
import DoneStatus from "./assessts/Done.svg";
import closedStatus from "./assessts/Cancelled.svg";

const StatusGroup = ({ tickets, sortBy }) => {

  const statusImages = {
    Todo: openStatus,
    In_Progress: inProgressStatus,
    Closed: closedStatus,
    Done: DoneStatus,
  };

  const priorityImages = {
    0: noPriority,
    1: lowPriority,
    2: mediumPriority,
    3: highPriority,
    4: urgentPriority,
  };

  const groupTicketsByStatus = () => {
    return tickets.reduce((acc, ticket) => {
      acc[ticket.status] = acc[ticket.status] || { tickets: [], count: 0 };
      acc[ticket.status].tickets.push(ticket);
      acc[ticket.status].count++;
      return acc;
    }, {});
  };
  const sortedTickets = (group) => {
    return group.tickets.sort((a, b) => {
      if (sortBy === "priority") return b.priority - a.priority;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  };

  const groupedTickets = groupTicketsByStatus();

  return (
    <div className="box">
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} style={{ marginRight: "20px", width: "500px" }}>
          <div style={styles.groupHeader}>
            <div className="head">
              <div className="head2">
                <img
                  className="img2"
                  src={statusImages[group]}
                  alt={`${group} status`}
                  style={styles.statusImage}
                />
                <h3>
                  {group}: {groupedTickets[group].count}
                </h3>
              </div>
              <div>
                <img src={plus} alt="plus" />
                <img src={threedotmenu} alt="threedotmenu" />
              </div>
            </div>
          </div>
          {sortedTickets(groupedTickets[group]).map((ticket) => (
            <div key={ticket.id} style={styles.card}>
              <div className="img">
                <p>{ticket.id}</p>
                <img src={DefaultUserImage} alt="user image" />
              </div>
              <div style={styles.cardHeader}>
                <h4 style={styles.cardTitle}>{ticket.title}</h4>
              </div>
              <p>Status: {ticket.status}</p>
              <div style={styles.priorityImageWrapper}>
                <img
                  src={priorityImages[ticket.priority]}
                  alt={`Priority ${ticket.priority}`}
                  style={styles.priorityImage}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
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
  statusImage: {
    width: "15px",
    height: "15px",
    marginRight: "10px",
  },
  priorityImageWrapper: {
    textAlign: "right",
    marginTop: "10px",
  },
  priorityImage: {
    width: "20px",
    height: "20px",
  },
};

export default StatusGroup;
