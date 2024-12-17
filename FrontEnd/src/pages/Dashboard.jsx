import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import SideNavigation from "../components/SideNavigation";
import Table from "../components/Table";
import Template from "../components/Template";
import Stats from "../components/Stats";
import styles from "./Dashboard.module.css";
import axios from "axios";


const Dashboard = () => {
  const tableData = [
    {
      property: "Succeeded",
      title: "Discover our new app",
      email: "manhhachkt08@gmail.com",
      date: "Dec 30, 09:42 PM",
    },
    {
      property: "Succeeded",
      title: "Discover our new app",
      email: "manhhachkt08@gmail.com",
      date: "Dec 30, 09:42 PM",
    },
    {
      property: "Failed",
      title: "Discover our new app",
      email: "manhhachkt08@gmail.com",
      date: "Dec 30, 09:42 PM",
    },
    {
      property: "Pending",
      title: "Discover our new app",
      email: "manhhachkt08@gmail.com",
      date: "Dec 30, 09:42 PM",
    },
  ];

  // template 불러오기 
  const [templates, setTemplates] = useState([]);
  const fetchTemplates = async () => {
    try {
      const response = await axios.get("http://localhost:3000/template/list/result");  
      setTemplates(response.data);  
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();  
  }, []);

  return (
    <Box className={styles.dashboard}>
      <SideNavigation />
      <Typography
        className={styles.dashboard1}
        variant="inherit"
        component="b"
        sx={{ lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }}
      >
        Dashboard
      </Typography>
      <Stats />
      <Box className={styles.templateParent}>
        {templates.map((template) => (
          <Template
            key={template.id}  
            heading={template.templateName}  
            heading1={template.mailContent}  
          />
        ))}
      </Box>
      <Typography
        className={styles.recentTemplates}
        variant="inherit"
        component="b"
        sx={{ lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }}
      >
        Recent Templates
      </Typography>
      <Typography
        className={styles.lastMails}
        variant="inherit"
        component="b"
        sx={{ lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }}
      >
        Last Mails
      </Typography>
      <Table data={tableData} />
    </Box>
  );
};

export default Dashboard;
