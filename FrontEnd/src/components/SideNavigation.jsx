import { useCallback } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SidenavItem from "./SidenavItem";
import PropTypes from "prop-types";
import styles from "./SideNavigation.module.css";

const SideNavigation = ({ className = "" }) => {
  const navigate = useNavigate();

  const onSidenavItemContainerClick = useCallback(() => {
    navigate("/mails");
  }, [navigate]);

  const onSidenavItemContainerClick1 = useCallback(() => {
    navigate("/customers");
  }, [navigate]);

  const onSidenavItemContainerClick2 = useCallback(() => {
    navigate("/templates");
  }, [navigate]);

  const onSidenavItemContainerClick3 = useCallback(() => {
    navigate("/campaigns");
  }, [navigate]);

  return (
    <Box className={[styles.sideNavigation, className].join(" ")}>
      <Box className={styles.divider} />
      <Box className={styles.sections}>
        <SidenavItem
          property="Overview_on"
          cash="/home1.svg"
          title="Dashboard"
        />
        <SidenavItem
          property="Mails_off"
          cash="/cash.svg"
          title="Mails"
          onSidenavItemContainerClick={onSidenavItemContainerClick}
        />
        <SidenavItem
          property="Customers_off"
          cash="/user-circle1.svg"
          title="Customers"
          onSidenavItemContainerClick={onSidenavItemContainerClick1}
        />
        <SidenavItem
          property="Templates_off"
          cash="/clipboard-check.svg"
          title="Templates"
          onSidenavItemContainerClick={onSidenavItemContainerClick2}
        />
        <SidenavItem
          property="Analytics_off"
          cash="/frame.svg"
          title="Campaigns"
          onSidenavItemContainerClick={onSidenavItemContainerClick3}
        />
      </Box>
      <Box className={styles.sections1}>
        <Box className={styles.sidenavItem}>
          <img className={styles.userIcon} alt="" src="/user.svg" />
          <Box className={styles.title}>Logout</Box>
        </Box>
      </Box>
      <Box className={styles.dropdown}>
        <Box className={styles.valueIcon}>
          <Box className={styles.value}>CloudSystem</Box>
          <img className={styles.chevronIcon} alt="" src="/chevron.svg" />
        </Box>
      </Box>
    </Box>
  );
};

SideNavigation.propTypes = {
  className: PropTypes.string,
};

export default SideNavigation;
