import { Box } from "@mui/material";
import styles from "./CustomerRow.module.css";

const CustomerRow = ({ email, name, position }) => {
  return (
    <Box className={styles.row1}>
      <Box className={styles.cellCheckbox}>
        <Box className={styles.checkbox} />
        <Box className={styles.divider2} />
      </Box>
      <Box className={styles.cellBadge}>
        <Box className={styles.divider2} />
      </Box>
      <Box className={styles.cellText}>
        <Box className={styles.value4}>{email}</Box>
        <Box className={styles.divider2} />
      </Box>
      <Box className={styles.cellText}>
        <Box className={styles.value4}>{name}</Box>
        <Box className={styles.divider2} />
      </Box>
      <Box className={styles.cellText2}>
        <Box className={styles.value4}>{position}</Box>
        <Box className={styles.divider2} />
      </Box>
      <Box className={styles.cellButton}>
        <Box className={styles.divider2} />
        <img className={styles.iconButton} alt="" src="/icon-button.svg" />
      </Box>
    </Box>
  );
};

export default CustomerRow;
