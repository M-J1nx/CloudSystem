import { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SidenavItem from "../components/SidenavItem";
import Campaign from "../components/Campaign";
import styles from "./Campaigns.module.css";

const Campaigns = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
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

      const fetchEvents = async () => {
        try {
          // userObj.user_id가 제대로 전달되는지 확인을 위한 콘솔 로그
          console.log("Fetching events for user:", userObj.user_id);
          const response = await fetch(`http://localhost:3000/event?user_id=${userObj.user_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          if (!response.ok) {
            throw new Error('서버 응답 오류');
          }
          
          const data = await response.json();
          console.log("Received events:", data); // 받아온 데이터 확인
          setEvents(data.data || []);
        } catch (err) {
          setError("서버 연결에 실패했습니다.");
          console.error("Failed to fetch events:", err);
        }
      };

      fetchEvents();
    } catch (err) {
      console.error("Error parsing user data:", err);
      localStorage.removeItem('user');
      navigate('/sign-in', { replace: true });
    }
  }, [navigate]);

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
    navigate("/templates");
  }, [navigate]);

  const onButtonContainerClick = useCallback(() => {
    navigate("/campaigns-add");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    navigate('/sign-in', { replace: true });
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <Box className={styles.campaigns}>
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
            property="Templates_off"
            cash="/clipboard-check.svg"
            title="Templates"
            onSidenavItemContainerClick={onSidenavItemContainerClick3}
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
          <Box className={styles.sidenavItem} onClick={handleLogout}>
            <img className={styles.userIcon} alt="" src="/user.svg" />
            <Box className={styles.title}>Logout</Box>
          </Box>
        </Box>
      </Box>
      <Typography
        className={styles.campaigns1}
        variant="inherit"
        component="b"
        sx={{ fontSize: "var(--headings-heading-36-bold-size)", lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }}
      >
        Campaigns
      </Typography>
      <Box className={styles.button} onClick={onButtonContainerClick}>
        <Box className={styles.buttonTitle}>
          <img className={styles.addIcon} alt="" src="/add.svg" />
          <Box className={styles.buttonTitle1}>Add</Box>
        </Box>
      </Box>
      {error && (
        <Box sx={{ color: 'red', textAlign: 'center', mb: 2 }}>
          {error}
        </Box>
      )}
      <Box className={styles.campaignParent}>
        {events.length > 0 ? (
          events.map((event) => (
            <Campaign 
              key={event.EVENT_ID}
              event_id={event.EVENT_ID}
              event_name={event.EVENT_NAME}
              onDepth5FrameClick={() => navigate(`/campaigns-edit/${event.EVENT_ID}`)}
            />
          ))
        ) : (
          <Box sx={{ textAlign: 'center', width: '100%', py: 3 }}>
            등록된 이벤트가 없습니다.
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Campaigns;