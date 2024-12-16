import { Box } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./Template.module.css";

const Template = ({ className = "", heading, heading1 }) => {
  return (
    <Box className={[styles.template, className].join(" ")}>
      <Box className={styles.iconParent}>
        <img className={styles.icon} alt="" src="/icon1.svg" />
        <Box className={styles.headingAndNumber}>
          <Box className={styles.heading}>{heading}</Box>
        </Box>
      </Box>
      <Box className={styles.headingAndNumber1}>
        <Box className={styles.heading1}>{heading1}</Box>
      </Box>
      <Box className={styles.depth5Frame1}>
        <Box className={styles.depth6Frame0}>
          <Box className={styles.edit}>Edit</Box>
        </Box>
      </Box>
    </Box>
  );
};

Template.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string,
  heading1: PropTypes.string,
};

export default Template;
