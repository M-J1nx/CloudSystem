import { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SidenavItem from "../components/SidenavItem";
import Template from "../components/Template";
import styles from "./Templates.module.css";

import axios from "axios";
import { useState, useEffect } from "react";

const Templates = () => {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  // 템플릿 목록 불러오기
  const callTemplates = async () => {
    try {
      const response = await axios.get("http://localhost:3000/template/list/result");
      setTemplates(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    callTemplates(); 
  }, []);

  const onSidenavItemContainerClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onSidenavItemContainerClick1 = useCallback(() => {
    navigate("/mails");
  }, [navigate]);

  const onSidenavItemContainerClick2 = useCallback(() => {
    navigate("/customers");
  }, [navigate]);

  const onSidenavItemContainerClick3 = useCallback(() => {
    navigate("/campaigns");
  }, [navigate]);

  const onButtonContainerClick = useCallback(() => {
    navigate("/template-add");
  }, [navigate]);

  return (
    <Box className={styles.templates}>
      <Box className={styles.sideNavigation}>
        <Box className={styles.divider} />
        <Box className={styles.sections}>
          <SidenavItem
            property="Overview_off"
            cash="/home.svg"
            title="Dashboard"
            onSidenavItemContainerClick={onSidenavItemContainerClick}
          />
          <SidenavItem
            property="Mails_off"
            cash="/cash.svg"
            title="Mails"
            onSidenavItemContainerClick={onSidenavItemContainerClick1}
          />
          <SidenavItem
            property="Customers_off"
            cash="/user-circle1.svg"
            title="Customers"
            onSidenavItemContainerClick={onSidenavItemContainerClick2}
          />
          <SidenavItem
            property="Templates_on"
            cash="/clipboard-check1.svg"
            title="Templates"
          />
          <SidenavItem
            property="Analytics_off"
            cash="/frame.svg"
            title="Campaigns"
            onSidenavItemContainerClick={onSidenavItemContainerClick3}
          />
        </Box>
        <Box className={styles.dropdown}>
          <Box className={styles.valueIcon}>
            <Box className={styles.value}>CloudSystem</Box>
            <img className={styles.chevronIcon} alt="" src="/chevron.svg" />
          </Box>
        </Box>
        <Box className={styles.sections1}>
          <Box className={styles.sidenavItem}>
            <img className={styles.userIcon} alt="" src="/user.svg" />
            <Box className={styles.title}>Logout</Box>
          </Box>
        </Box>
      </Box>
      <Typography
        className={styles.templates1}
        variant="inherit"
        component="b"
        sx={{
          fontSize: "var(--headings-heading-36-bold-size)",
          lineHeight: "48px",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        }}
      >
        Templates
      </Typography>
      <Box className={styles.templateParent}>
        {templates.map((template) => ( 
            <Template
              key={template.id} 
              heading={template.templateName}
              heading1={template.mailContent}
            />
          ))
        }
      </Box>
      <Box className={styles.button} onClick={onButtonContainerClick}>
        <Box className={styles.buttonTitle}>
          <img className={styles.addIcon} alt="" src="/add.svg" />
          <Box className={styles.buttonTitle1}>Add</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Templates;
