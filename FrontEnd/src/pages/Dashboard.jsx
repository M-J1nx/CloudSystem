import { Typography, Box } from "@mui/material";
import SideNavigation from "../components/SideNavigation";
import Table from "../components/Table";
import Template from "../components/Template";
import Stats from "../components/Stats";
import styles from "./Dashboard.module.css";

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
        <Template
          heading="Discover our new app"
          heading1="Hello, this is a cloud system class project."
        />
        <Template heading="Hello" heading1="hello" />
        <Template heading="Bye" heading1="bye" />
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
