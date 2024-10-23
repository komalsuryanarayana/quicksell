import React from "react";
import "./usergroup.css";

import threedotmenu from "./assessts/3 dot menu.svg";
import plus from "./assessts/add.svg";
import noPriority from "./assessts/No-priority.svg";
import lowPriority from "./assessts/Img - Low Priority.svg";
import mediumPriority from "./assessts/Img - Medium Priority.svg";
import highPriority from "./assessts/Img - High Priority.svg";
import urgentPriority from "./assessts/SVG - Urgent Priority grey.svg";
import DefaultUserImage from "./assessts/add.svg"; // Placeholder image
import openStatus from "./assessts/To-do.svg";
import inProgressStatus from "./assessts/in-progress.svg";
import DoneStatus from "./assessts/Done.svg";
import closedStatus from "./assessts/Cancelled.svg";

const PriorityGroup = ({ tickets, users = [], sortBy }) => {
  const priorityImages = {
    "No priority": noPriority,
    Low: lowPriority,
    Medium: mediumPriority,
    High: highPriority,
    Urgent: urgentPriority,
  };

  const statusImages = {
    active: openStatus,
    inprogress: inProgressStatus,
    completed: DoneStatus,
    closed:closedStatus,
  };
  let user;

  const groupTicketsByPriority = () => {
    return tickets.reduce((acc, ticket) => {
      const priority = ["No priority", "Low", "Medium", "High", "Urgent"][ticket.priority];
      console.log(users);
      user = users.find((user) => user.id === ticket.userId);
      acc[priority] = acc[priority] || { tickets: [], count: 0 };
      acc[priority].tickets.push({
        ...ticket,
        userImage: user ? user.image : DefaultUserImage, // Use user's image or placeholder
        userStatusImage: user ? statusImages[user.status] : statusImages.closed,
      });
      acc[priority].count++;
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

  const groupedTickets = groupTicketsByPriority();

  return (
    <div className="box">
      {Object.keys(groupedTickets).map((group) => (
        <div key={group} style={{ marginRight: "20px", width: "500px" }}>
          <div style={styles.groupHeader}>
            <div className="head">
              <div className="head2">
                <img
                  className="img2"
                  src={priorityImages[group]}
                  alt={`${group} priority`}
                  style={styles.priorityImage}
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
              <div className="x" style={styles.cardHeader}>
              <div className="z">
              <p>{ticket.id}</p>
                <img className="q"
                  src={plus}
                  alt="User Status"
                  style={styles.userStatusImage}
                />
              </div>
              <div className="y">
                {/* <img
                  src={openStatus}
                  alt="User"
                  // style={styles.userImage}
                /> */}
                <div style={styles.cardTitleContainer}>
                  <h4 style={styles.cardTitle}>{ticket.title}</h4> 
                </div>
                </div>
                <div className="down3">
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
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitleContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
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
  priorityImage: {
    width: "30px",
    height: "30px",
    marginRight: "10px",
  },
  userImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  userStatusImage: {
    width: "20px",
    height: "20px", // Adjust size as needed
    marginLeft: "10px", // Space between title and status image
  },
};

export default PriorityGroup;
