import { Box, Typography } from "@mui/material";
import SidenavItem from "../components/SidenavItem";
import Badge from "../components/Badge";
import styles from "./CampaignsEdit.module.css";

const CampaignsEdit = () => {
  return (
    <Box className={styles.campaignsEdit}>
      <Box className={styles.sideNavigation}>
        <Box className={styles.divider} />
        <Box className={styles.sections}>
          <SidenavItem
            property="Overview_off"
            cash="/home.svg"
            title="Dashboard"
          />
          <SidenavItem property="Mails_off" cash="/cash.svg" title="Mails" />
          <SidenavItem
            property="Customers_off"
            cash="/user-circle1.svg"
            title="Customers"
          />
          <SidenavItem
            property="Templates_off"
            cash="/clipboard-check.svg"
            title="Templates"
          />
          <SidenavItem
            property="Analytics_on"
            cash="/frame1.svg"
            title="Campaigns"
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
      <Typography
        className={styles.viewCampaigns}
        variant="inherit"
        component="b"
        sx={{
          fontSize: "var(--headings-heading-36-bold-size)",
          lineHeight: "48px",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        }}
      >
        Add Campaigns
      </Typography>
      <Box className={styles.subjectParent}>
        <Box className={styles.subject}>Subject</Box>
        <Box className={styles.statistic}>Statistic</Box>
        <Box className={styles.emailBody}>Email Body</Box>
        <Box className={styles.rowParent}>
          <Box className={styles.row}>
            <Box className={styles.cellBadge}>
              <Box className={styles.divider1} />
              <Box className={styles.value1}>status</Box>
            </Box>
            <Box className={styles.cellText}>
              <Box className={styles.value2}>count</Box>
              <Box className={styles.divider1} />
            </Box>
            <Box className={styles.cellText}>
              <Box className={styles.value2}>percentage</Box>
              <Box className={styles.divider1} />
            </Box>
          </Box>
          <Box className={styles.row}>
            <Box className={styles.cellBadge}>
              <Box className={styles.divider1} />
              <Badge property="Successed" title="Total" />
            </Box>
            <Box className={styles.cellText}>
              <Box className={styles.value2}>10</Box>
              <Box className={styles.divider1} />
            </Box>
            <Box className={styles.cellText}>
              <Box className={styles.value2}>100%</Box>
              <Box className={styles.divider1} />
            </Box>
          </Box>
          <Box className={styles.row}>
            <Box className={styles.cellBadge}>
              <Box className={styles.divider1} />
              <Badge
                property="Successed"
                title="Succeeded"
                badgeTop="calc(50% - 12px)"
                badgeLeft="calc(50% - 58px)"
              />
            </Box>
            <Box className={styles.cellText}>
              <Box className={styles.value2}>9</Box>
              <Box className={styles.divider1} />
            </Box>
            <Box className={styles.cellText}>
              <Box className={styles.value2}>90%</Box>
              <Box className={styles.divider1} />
            </Box>
          </Box>
          <Box className={styles.row}>
            <Box className={styles.cellBadge}>
              <Box className={styles.divider1} />
              <Badge
                property="Pending"
                title="Pending"
                badgeTop="calc(50% - 12px)"
                badgeLeft="calc(50% - 58px)"
              />
            </Box>
            <Box className={styles.cellText}>
              <Box className={styles.value2}>1</Box>
              <Box className={styles.divider1} />
            </Box>
            <Box className={styles.cellText}>
              <Box className={styles.value2}>10%</Box>
              <Box className={styles.divider1} />
            </Box>
          </Box>
          <Box className={styles.row}>
            <Box className={styles.cellBadge}>
              <Box className={styles.divider1} />
              <Badge
                property="Failed"
                title="Failed"
                badgeTop="calc(50% - 12px)"
                badgeLeft="calc(50% - 58px)"
              />
            </Box>
            <Box className={styles.cellText}>
              <Box className={styles.value2}>0</Box>
              <Box className={styles.divider1} />
            </Box>
            <Box className={styles.cellText}>
              <Box className={styles.value2}>0%</Box>
              <Box className={styles.divider1} />
            </Box>
          </Box>
        </Box>
        <Box className={styles.fieldContent}>
          <input
            className={styles.textInput}
            type="text"
          />
        </Box>
        <Box className={styles.fieldContent1}>
          <Box className={styles.placeholder1}>Placeholder</Box>
        </Box>
      </Box>
      <Box className={styles.depth5Frame1}>
        <Box className={styles.depth6Frame0}>
          <Box className={styles.close}>Close</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CampaignsEdit;
