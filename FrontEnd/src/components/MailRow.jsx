import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Badge from "./Badge";
import styles from "./MailRow.module.css";

const MailRow = ({ property, title, customer, date }) => {
  return (
    <Box className={styles.row}>
      {/* Checkbox Cell */}
      <Box className={styles.cellCheckbox}>
        <Box className={styles.checkbox} />
        <Box className={styles.divider} />
      </Box>

      {/* Badge Cell */}
      <Box className={styles.cellBadge}>
        <Box className={styles.divider} />
        <Badge property={property} />
      </Box>

      {/* Title Cell */}
      <Box className={styles.cellText}>
        <Box className={styles.value3}>{title}</Box>
        <Box className={styles.divider} />
      </Box>

      {/* Customer Cell */}
      <Box className={styles.cellText}>
        <Box className={styles.value}>{customer}</Box>
        <Box className={styles.divider} />
      </Box>

      {/* Date Cell */}
      <Box className={styles.cellText2}>
        <Box className={styles.value}>{date}</Box>
        <Box className={styles.divider} />
      </Box>

      {/* Action Button Cell */}
      <Box className={styles.cellButton}>
        <Box className={styles.divider} />
        <img className={styles.iconButton} alt="" src="/icon-button.svg" />
      </Box>
    </Box>
  );
};

MailRow.propTypes = {
  property: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  customer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default MailRow;
