import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SidenavItem from "../components/SidenavItem";
import styles from "./TemplateEdit.module.css";

const TemplateEdit = () => {
  const navigate = useNavigate();

  return (
    <Box className={styles.templateEdit}>
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
            property="Templates_on"
            cash="/clipboard-check1.svg"
            title="Templates"
          />
          <SidenavItem
            property="Analytics_off"
            cash="/frame.svg"
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
          fontFamily: "var(--ui-ui-text-14-reg)",
          fontSize: "var(--headings-heading-36-bold-size)",
          lineHeight: "48px",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        }}
      >
        Add your template
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
          <Box className={styles.pictureWrapper}>
            <img className={styles.pictureIcon} alt="" src="/picture@2x.png" />
          </Box>
        </Box>
      </Box>
      <Box className={styles.depth5Frame1}>
        <Button
          variant="contained"
          className={styles.saveButton}
          onClick={() => navigate("/templates")}
          sx={{
            backgroundColor: "transparent",
            color: "white",
            border: "none",
          }}
        >
          Save
        </Button>
      </Box>
      <Box className={styles.depth5Frame2}>
        <Button
          variant="outlined"
          className={styles.cancelButton}
          onClick={() => navigate("/templates")}
          sx={{
            backgroundColor: "transparent",
            color: "black",
            border: "none",
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TemplateEdit;