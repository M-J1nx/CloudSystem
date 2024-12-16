import { Box } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./SidenavItem.module.css";

const SidenavItem = ({
  className = "",
  property = "Mails_on",
  cash,
  title,
  onSidenavItemContainerClick,
}) => {
  return (
    <Box
      className={[styles.root, className].join(" ")}
      data-property={property}
      onClick={onSidenavItemContainerClick}
    >
      <img className={styles.cashIcon} alt="" src={cash} />
      <Box className={styles.title}>{title}</Box>
    </Box>
  );
};

SidenavItem.propTypes = {
  className: PropTypes.string,
  cash: PropTypes.string,
  title: PropTypes.string,

  /** Variant props */
  property: PropTypes.string,

  /** Action props */
  onSidenavItemContainerClick: PropTypes.func,
};

export default SidenavItem;
