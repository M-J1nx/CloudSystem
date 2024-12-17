import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SidenavItem from "../components/SidenavItem";
import styles from "./CampaignsAdd.module.css";

const CampaignsAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    EVENT_NAME: "",
    email_body: ""
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // localStorage에서 로그인한 사용자 정보 가져오기
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        navigate('/sign-in');
        return;
      }

      const user = JSON.parse(userStr);

      const response = await fetch('http://localhost:3000/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.user_id,
          event_name: formData.EVENT_NAME
        }),
      });

      if (!response.ok) {
        throw new Error('이벤트 생성 실패');
      }

      navigate('/campaigns');
    } catch (err) {
      setError("이벤트 생성에 실패했습니다.");
      console.error("Event creation error:", err);
    }
  };

  return (
    <Box className={styles.campaignsEdit}>
      <Box className={styles.sideNavigation}>
        <Box className={styles.divider} />
        <Box className={styles.sections}>
          <SidenavItem
            property="Overview_off"
            cash="/home.svg"
            title="Dashboard"
          />
          <SidenavItem property="Mails_off" cash="/cash.svg" title="Mails" />
          <SidenavItem
            property="Customers_off"
            cash="/user-circle1.svg"
            title="Customers"
          />
          <SidenavItem
            property="Templates_off"
            cash="/clipboard-check.svg"
            title="Templates"
          />
          <SidenavItem
            property="Analytics_on"
            cash="/frame1.svg"
            title="Campaigns"
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
        className={styles.addYourTemplate}
        variant="inherit"
        component="b"
        sx={{
          fontSize: "var(--headings-heading-36-bold-size)",
          lineHeight: "48px",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        }}
      >
        Add Campaign
      </Typography>
      {error && (
        <Box sx={{ color: 'red', textAlign: 'center', mb: 2 }}>
          {error}
        </Box>
      )}
      <Box className={styles.subjectParent}>
        <Box className={styles.subject}>Subject</Box>
        <Box className={styles.emailBody}>Email Body</Box>
        <Box className={styles.fieldContent}>
          <input
            className={styles.textInput}
            type="text"
            name="EVENT_NAME"
            value={formData.EVENT_NAME}
            onChange={handleInputChange}
            placeholder="Enter event name"
          />
        </Box>
        <Box className={styles.fieldContent1}>
          <input
            className={styles.textInput}
            type="text"
            name="email_body"
            value={formData.email_body}
            onChange={handleInputChange}
            placeholder="Enter email body"
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
        <Box className={styles.depth5Frame1}>
          <Box className={styles.depth6Frame0} onClick={handleSubmit}>
            <Box className={styles.save}>Send</Box>
          </Box>
        </Box>
        <Box className={styles.depth5Frame2}>
          <Box className={styles.depth6Frame0} onClick={() => navigate("/campaigns")}>
            <Box className={styles.save}>Cancel</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CampaignsAdd;