import { Box, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SidenavItem from "../components/SidenavItem";
import CustomerRow from "../components/CustomerRow";
import styles from "./Customers.module.css";

const Customers = () => {
  const navigate = useNavigate();

  const onSidenavItemContainerClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onSidenavItemContainerClick1 = useCallback(() => {
    navigate("/mails");
  }, [navigate]);

  const onSidenavItemContainerClick2 = useCallback(() => {
    navigate("/templates");
  }, [navigate]);

  const onSidenavItemContainerClick3 = useCallback(() => {
    navigate("/campaigns");
  }, [navigate]);

  const customerData = [
    {
      email: "nvt.isst.nute@gmail.com",
      name: "Harrison Jayden",
      position: "Student",
    },
    {
      email: "thuhang.nute@gmail.com",
      name: "Murphy Kenna",
      position: "Professor",
    },
    {
      email: "nvt.isst.nute@gmail.com",
      name: "Mahoney Candace",
      position: "Principal",
    },
  ];

  return (
    <Box className={styles.customers}>
      <Box className={styles.sideNavigation}>
        <Box className={styles.divider} />
        <Box className={styles.sections}>
          <SidenavItem
            property="Overview_off"
            cash="/home.svg"
            title="Dashboard"
            onSidenavItemContainerClick={onSidenavItemContainerClick}
          />
          <SidenavItem
            property="Mails_off"
            cash="/cash.svg"
            title="Mails"
            onSidenavItemContainerClick={onSidenavItemContainerClick1}
          />
          <SidenavItem
            property="Customers_on"
            cash="/user-circle.svg"
            title="Customers"
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
        <Box className={styles.dropdown}>
          <Box className={styles.valueIcon}>
            <Box className={styles.value}>CloudSystem</Box>
            <img className={styles.chevronIcon} alt="" src="/chevron.svg" />
          </Box>
        </Box>
        <Box className={styles.sections1}>
          <Box className={styles.sidenavItem}>
            <img className={styles.userIcon} alt="" src="/user.svg" />
            <Box className={styles.title}>Logout</Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.divider1} />
      <Typography
        className={styles.customers1}
        variant="inherit"
        component="b"
        sx={{
          fontSize: "var(--headings-heading-36-bold-size)",
          lineHeight: "48px",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        }}
      >
        Customers
      </Typography>
      <Box className={styles.button}>
        <Box className={styles.buttonTitle}>
          <img className={styles.addIcon} alt="" src="/add.svg" />
          <Box className={styles.buttonTitle1}>Add</Box>
        </Box>
      </Box>
      <Box className={styles.button1}>
        <Box className={styles.buttonTitle2}>
          <img className={styles.addIcon} alt="" src="/arrow-up.svg" />
          <Box className={styles.buttonTitle1}>Import</Box>
        </Box>
      </Box>

      <Box className={styles.mailCatalog}>
      <Box className={styles.row}>
          <Box className={styles.cellCheckbox}>
            <Box className={styles.checkbox} />
            <Box className={styles.divider2} />
          </Box>
          <Box className={styles.resizeableHeads}>
            <Box className={styles.cellHeader}>
              <Box className={styles.value1}>Customer</Box>
              <Box className={styles.divider2} />
            </Box>
            <Box className={styles.cellHeader1}>
              <Box className={styles.value1}>name</Box>
              <Box className={styles.divider2} />
            </Box>
            <Box className={styles.cellHeader2}>
              <Box className={styles.value1}>position</Box>
              <Box className={styles.divider2} />
            </Box>
          </Box>
        </Box>
        {customerData.map((customer, index) => (
          <CustomerRow
            key={index}
            email={customer.email}
            name={customer.name}
            position={customer.position}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Customers;
