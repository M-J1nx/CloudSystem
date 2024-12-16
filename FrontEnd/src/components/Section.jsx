import { Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./Section.module.css";

const Section = ({ className = "" }) => {
  return (
    <Box className={[styles.section, className].join(" ")}>
      <Typography
        className={styles.heading2}
        variant="inherit"
        component="b"
        sx={{
          fontSize: "var(--headings-heading-36-bold-size)",
          lineHeight: "40px",
          fontWeight: "700",
        }}
      >
        Putting privacy first
      </Typography>
      <Box className={styles.container}>
        <Box className={styles.weTakeYourContainer}>
          <Typography className={styles.weTakeYour} variant="inherit">
            We take your privacy seriously. That's why we
          </Typography>
          <Typography className={styles.weTakeYour} variant="inherit">
            host, store, and process all of your data in the EU.
          </Typography>
        </Box>
      </Box>
      <img className={styles.component1Icon} alt="" src="/component-1.svg" />
      <Box className={styles.openSource}>Open-Source</Box>
      <Box className={styles.seeWhatWereContainer}>
        <span className={styles.seeWhatWereContainer1}>
          <Typography className={styles.weTakeYour} variant="inherit">
            See what we're doing
          </Typography>
          <Typography className={styles.weTakeYour} variant="inherit">
            under the hood.
          </Typography>
        </span>
      </Box>
      <img className={styles.component1Icon1} alt="" src="/component-11.svg" />
      <Box className={styles.transparency}>Transparency</Box>
      <Box className={styles.wereOpenAboutContainer}>
        <span className={styles.seeWhatWereContainer1}>
          <Typography className={styles.weTakeYour} variant="inherit">
            We're open about what
          </Typography>
          <Typography className={styles.weTakeYour} variant="inherit">
            we do and how we do it.
          </Typography>
        </span>
      </Box>
      <img className={styles.component1Icon2} alt="" src="/component-12.svg" />
      <Box className={styles.privacy}>Privacy</Box>
      <Box className={styles.yourDataIsContainer}>
        <span className={styles.seeWhatWereContainer1}>
          <Typography className={styles.weTakeYour} variant="inherit">
            Your data is yours. We
          </Typography>
          <Typography className={styles.weTakeYour} variant="inherit">
            don't give it to anyone.
          </Typography>
        </span>
      </Box>
    </Box>
  );
};

Section.propTypes = {
  className: PropTypes.string,
};

export default Section;
