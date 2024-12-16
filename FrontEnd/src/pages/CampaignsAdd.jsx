import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SidenavItem from "../components/SidenavItem";
import Badge from "../components/Badge";
import styles from "./CampaignsAdd.module.css";

const CampaignsEdit = () => {
  const navigate = useNavigate();

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
        Add Campaigns
      </Typography>
      <Box className={styles.subjectParent}>
        <Box className={styles.subject}>Subject</Box>
        <Box className={styles.emailBody}>Email Body</Box>
        <Box className={styles.fieldContent}>
          <input
            className={styles.textInput}
            type="text"
          />
        </Box>
        <Box className={styles.fieldContent1}>
          <input
            className={styles.textInput}
            type="text"
          />
        </Box>
      </Box>
      <Box className={styles.depth5Frame1}>
        <Box className={styles.depth6Frame0} onClick={() => navigate("/campaigns")}>
          <Box className={styles.save}>Send</Box>
        </Box>
      </Box>
      <Box className={styles.depth5Frame2}>
        <Box className={styles.depth6Frame0} onClick={() => navigate("/campaigns")}>
          <Box className={styles.save}>Cancel</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CampaignsEdit;