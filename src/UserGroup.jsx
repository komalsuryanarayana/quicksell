import React from "react";
import DefaultUserImage from "./assessts/add.svg"; // Placeholder image
import "./usergroup.css";
import threedotmenu from "./assessts/3 dot menu.svg";
import plus from "./assessts/add.svg";
import noPriority from "./assessts/No-priority.svg";
import lowPriority from "./assessts/Img - Low Priority.svg";
import mediumPriority from "./assessts/Img - Medium Priority.svg";
import highPriority from "./assessts/Img - High Priority.svg";
import urgentPriority from "./assessts/SVG - Urgent Priority grey.svg";
import openStatus from "./assessts/To-do.svg";
import inProgressStatus from "./assessts/in-progress.svg";
import doneStatus from "./assessts/Done.svg";
import closedStatus from "./assessts/Cancelled.svg";

const UserGroup = ({ tickets, users, sortBy }) => {
  // Map of statuses to images
  const statusImages = {
    Todo: openStatus,
    "In Progress": inProgressStatus,
    Closed: closedStatus,
    Done: doneStatus,
  };

  // Map of priorities to images
  const priorityImages = {
    0: noPriority,
    1: lowPriority,
    2: mediumPriority,
    3: highPriority,
    4: urgentPriority,
  };

  const groupTicketsByUser = () => {
    return tickets.reduce((acc, ticket) => {
      const user = users.find((user) => user.id === ticket.userId);
      const userName = user ? user.name : "Unknown";
      acc[userName] = acc[userName] || {
        tickets: [],
        count: 0,
        userImage: user ? user.image : DefaultUserImage,
      };
      acc[userName].tickets.push(ticket);
      acc[userName].count++;
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

  const groupedTickets = groupTicketsByUser();

  return (
    <div className="box">
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} style={{ marginRight: "20px", width: "500px" }}>
          <div style={styles.groupHeader}>
            {/* Render the status image */}
            <div className="head">
              
                <h3>
                  {group}: {groupedTickets[group].count}
                </h3>
            
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
                {/* <span style={styles.cardPriority}>
                  {["No priority", "Low", "Medium", "High", "Urgent"][
                    ticket.priority
                  ]}
                </span> */}
              </div>
              {/* <p>Status: {ticket.status}</p> */}
              {/* Render the status image */}
              {/* <img
                src={statusImages[ticket.status]}
                alt={``}
                style={styles.statusImage}
              /> */}
              {/* Render the priority image */}
              <div className="down">
              <img
                src={priorityImages[ticket.priority]}
                alt={`Priority: ${ticket.priority}`}
                style={styles.priorityImage}
              />
              <div className="down2">
                <img src={openStatus}/>
                <p className="txt1">Feature request</p>
              </div>
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
  userImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  statusImage: {
    width: "20px",
    height: "20px",
    marginRight: "5px",
  },
  priorityImage: {
    width: "20px",
    height: "20px",
    marginLeft: "5px",
  },
};

export default UserGroup;
