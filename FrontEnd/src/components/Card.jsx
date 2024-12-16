import { Box } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./Card.module.css";

const Card = ({ className = "", property = "Email Sent" }) => {
  return (
    <Box
      className={[styles.card2, className].join(" ")}
      data-property={property}
    >
      <img className={styles.icon} alt="" src="/icon2.svg" />
      <Box className={styles.dotsVertical}>
        <img className={styles.dotsIcon} alt="" src="/dots.svg" />
      </Box>
      <Box className={styles.headingAndNumber}>
        <Box className={styles.heading}>Emails sent</Box>
        <Box className={styles.numberAndBadge}>
          <Box className={styles.number}>5,189</Box>
          <Box className={styles.badgeWrap} />
        </Box>
      </Box>
    </Box>
  );
};

Card.propTypes = {
  className: PropTypes.string,

  /** Variant props */
  property: PropTypes.number,
};

export default Card;
