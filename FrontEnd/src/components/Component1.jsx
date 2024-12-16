import { useCallback } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Component1.module.css";

const Component1 = ({
  className = "",
  variant = 1,
  text = "Create account",
}) => {
  const navigate = useNavigate();

  const onComponent5ContainerClick = useCallback(() => {
    navigate("/create-account");
  }, [navigate]);

  return (
    <Box
      className={[styles.component5, className].join(" ")}
      onClick={onComponent5ContainerClick}
      data-variant={variant}
    >
      <Box className={styles.text}>{text}</Box>
    </Box>
  );
};

Component1.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,

  /** Variant props */
  variant: PropTypes.number,
};

export default Component1;
