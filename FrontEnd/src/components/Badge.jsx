import { useMemo } from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./Badge.module.css";

const Badge = ({
  className = "",
  property = "Succeeded",
  title = property,
  badgeTop = "calc(50% - 12px)",
  badgeLeft = "calc(50% - 58px)",
}) => {
  const badgeStyle = useMemo(() => {
    return {
      top: badgeTop,
      left: badgeLeft,
    };
  }, [badgeTop, badgeLeft]);

  return (
    <Box
      className={[styles.root, className].join(" ")}
      data-property={property}
      style={badgeStyle}
    >
      <Box className={styles.badgeChild} />
      <Box className={styles.title1}>
        <Box className={styles.title}>{title}</Box>
      </Box>
    </Box>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  property: PropTypes.string,
  badgeTop: PropTypes.string,
  badgeLeft: PropTypes.string,
};

export default Badge;
