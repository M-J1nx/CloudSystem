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
      const response = await axios.get("http://localhost:3000/template/list/result");  // API 엔드포인트 수정
      setTemplates(response.data);  // 템플릿 데이터를 상태로 저장
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();  // 컴포넌트가 마운트되면 템플릿 데이터를 불러옴
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
            key={template.id}  // 템플릿 고유의 id를 key로 사용
            heading={template.templateName}  // API에서 가져온 템플릿 이름
            heading1={template.mailContent}  // API에서 가져온 메일 내용
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
