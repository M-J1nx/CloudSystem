import { Box } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./Template.module.css";

import { useNavigate } from "react-router-dom";

const Template = ({ className = "", heading, heading1, templateName }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    // 템플릿 수정 페이지로 이동
    navigate(`/templates/${heading}/edit`);  // 템플릿 이름을 URL에 전달
  };

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
          <Box className={styles.edit} onClick={handleEditClick}>Edit</Box>
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
