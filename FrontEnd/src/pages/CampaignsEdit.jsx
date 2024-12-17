import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SidenavItem from "../components/SidenavItem";
import Badge from "../components/Badge";
import styles from "./CampaignsEdit.module.css";

const CampaignsEdit = () => {
  const navigate = useNavigate();
  const { event_id } = useParams();
  const [eventData, setEventData] = useState({
    EVENT_NAME: "",
    email_body: ""
  });
  const [error, setError] = useState("");
  const [gmailPassword, setGmailPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        navigate('/sign-in', { replace: true });
        return;
      }

      const userObj = JSON.parse(userStr);
      setUser(userObj);
    } catch (err) {
      console.error("Error parsing user data:", err);
      localStorage.removeItem('user');
      navigate('/sign-in', { replace: true });
    }
  }, [navigate]);

  // 이벤트 데이터 조회
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/event/${event_id}`);
        if (!response.ok) {
          throw new Error('이벤트 조회 실패');
        }
        const data = await response.json();
        setEventData(data.data);
      } catch (err) {
        setError("이벤트 조회에 실패했습니다.");
        console.error("Event fetch error:", err);
      }
    };

    if (event_id) {
      fetchEvent();
    }
  }, [event_id]);

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 수정 제출 핸들러
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/event/${event_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_name: eventData.EVENT_NAME,
          email_body: eventData.email_body
        }),
      });

      if (!response.ok) {
        throw new Error('이벤트 수정 실패');
      }

      navigate('/campaigns');
    } catch (err) {
      setError("이벤트 수정에 실패했습니다.");
      console.error("Event update error:", err);
    }
  };

  // 이메일 전송 핸들러
  const handleSendEmail = async () => {
    if (!user) {
      setError("로그인 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/address/sendemail/${event_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mailTitle: eventData.EVENT_NAME,
          mailContent: eventData.email_body,
          reserveTime: null,
          user_id: user.user_id, // 로그인한 사용자의 ID를 로컬 스토리지에서 가져옴
          gmailPassword: gmailPassword
        }),
      });

      if (!response.ok) {
        throw new Error('이메일 전송 실패');
      }

      alert("이메일이 성공적으로 전송되었습니다.");
    } catch (err) {
      setError("이메일 전송에 실패했습니다.");
      console.error("Email send error:", err);
    }
  };

  if (!user) {
    return null;
  }

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
        className={styles.viewCampaigns}
        variant="inherit"
        component="b"
        sx={{
          fontSize: "var(--headings-heading-36-bold-size)",
          lineHeight: "48px",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        }}
      >
        Edit Campaign
      </Typography>
      {error && (
        <Box sx={{ color: 'red', textAlign: 'center', mb: 2 }}>
          {error}
        </Box>
      )}
      <Box className={styles.subjectParent}>
        <Box className={styles.subject}>Subject</Box>
        <Box className={styles.fieldContent}>
          <input
            className={styles.textInput}
            type="text"
            name="EVENT_NAME"
            value={eventData.EVENT_NAME}
            onChange={handleInputChange}
          />
        </Box>
        <TextField
          label="Gmail Password"
          type="password"
          value={gmailPassword}
          onChange={(e) => setGmailPassword(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <Box className={styles.emailBody}>Email Body</Box>
        <Box className={styles.fieldContent1}>
          <input
            className={styles.textInput}
            type="text"
            name="email_body"
            value={eventData.email_body || ""}
            onChange={handleInputChange}
          />
        </Box>
        <Box className={styles.rowParent}>
          {/* 통계 테이블은 그대로 유지 */}
        </Box>
      </Box>
      <Box className={styles.buttonContainer}>
        <Box className={styles.actionButton} onClick={handleSubmit}>
          <Box className={styles.buttonText}>Save</Box>
        </Box>
        <Box className={styles.actionButton} onClick={() => navigate('/campaigns')}>
          <Box className={styles.buttonText}>Close</Box>
        </Box>
        <Button variant="contained" onClick={handleSendEmail} sx={{ marginLeft: 2 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default CampaignsEdit;