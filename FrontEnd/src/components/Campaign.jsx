import { useCallback } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Campaign.module.css";

const Campaign = ({ className = "", onDepth5FrameClick, event_name }) => {
  const navigate = useNavigate();

  const onDepth5FrameClick1 = useCallback(() => {
    navigate("/campaigns-edit");
  }, [navigate]);

  return (
    <Box className={[styles.campaign, className].join(" ")}>
      <Box className={styles.iconParent}>
        <img className={styles.icon} alt="" src="/icon.svg" />
        <Box className={styles.headingAndNumber}>
          <Box className={styles.heading}>{event_name}</Box>
        </Box>
      </Box>
      <Box className={styles.headingAndNumber1}>
        <Box className={styles.heading1}>Sending 100%</Box>
      </Box>
      <Box className={styles.depth5Frame1} onClick={onDepth5FrameClick}>
        <Box className={styles.depth6Frame0}>
          <Box className={styles.view}>View</Box>
        </Box>
      </Box>
    </Box>
  );
};

Campaign.propTypes = {
  className: PropTypes.string,
  event_name: PropTypes.string,
  /** Action props */
  onDepth5FrameClick: PropTypes.func,
};

export default Campaign;