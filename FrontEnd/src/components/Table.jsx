import { Box } from "@mui/material";
import Badge from "./Badge";
import PropTypes from "prop-types";
import styles from "./Table.module.css";

const Table = ({ data = [], className = "" }) => {
  return (
    <Box className={[styles.table, className].join(" ")}>
      {data.map((row, index) => (
        <Box key={index} className={styles.row1}>
          {/* Property */}
          <Box className={styles.cellBadge}>
            <Box className={styles.divider} />
            <Badge property={row.property} />
          </Box>

          {/* Title */}
          <Box className={styles.cellText}>
            <Box className={styles.value3}>{row.title}</Box>
            <Box className={styles.divider} />
          </Box>

          {/* Email */}
          <Box className={styles.cellText2}>
            <Box className={styles.value3}>{row.email}</Box>
            <Box className={styles.divider} />
          </Box>

          {/* Date */}
          <Box className={styles.cellText2}>
            <Box className={styles.value3}>{row.date}</Box>
            <Box className={styles.divider} />
          </Box>

          {/* Action Button */}
          <Box className={styles.cellButton}>
            <Box className={styles.divider} />
            <img className={styles.iconButton} alt="" src="/icon-button.svg" />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      property: PropTypes.string.isRequired,
      campaignName: PropTypes.string.isRequired,
      rate: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
};

export default Table;
