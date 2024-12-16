import { Box } from "@mui/material";
import Card from "./Card";
import PropTypes from "prop-types";
import styles from "./Stats.module.css";

const Stats = ({ className = "" }) => {
  return (
    <Box className={[styles.stats, className].join(" ")}>
      <Card property="Email Sent" />
      <Box className={styles.card4}>
        <img className={styles.icon} alt="" src="/icon3.svg" />
        <Box className={styles.dotsVertical}>
          <img className={styles.dotsIcon} alt="" src="/dots.svg" />
        </Box>
        <Box className={styles.headingAndNumber}>
          <Box className={styles.heading}>Successful transmission</Box>
          <Box className={styles.numberAndBadge}>
            <Box className={styles.number}>5,024</Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.card4}>
        <Box className={styles.dotsVertical1}>
          <img className={styles.dotsIcon} alt="" src="/dots.svg" />
        </Box>
        <img className={styles.icon1} alt="" src="/icon4.svg" />
        <Box className={styles.headingAndNumber}>
          <Box className={styles.heading}>Clicks in emails</Box>
          <Box className={styles.numberAndBadge}>
            <Box className={styles.number}>5,671</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Stats.propTypes = {
  className: PropTypes.string,
};

export default Stats;
