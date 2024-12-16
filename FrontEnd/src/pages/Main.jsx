import { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Component1 from "../components/Component1";
import Section from "../components/Section";
import styles from "./Main.module.css";

const Main = () => {
  const navigate = useNavigate();

  const onLinkSignClick = useCallback(() => {
    navigate("/sign-in");
  }, [navigate]);

  return (
    <Box className={styles.main}>
      <Box className={styles.nav}>
        <Box className={styles.linkSign} onClick={onLinkSignClick}>
          Sign in
        </Box>
        <Component1 variant={2} text="Create account" />
      </Box>
      <Box className={styles.nav} />
      <Box className={styles.section}>
        <Box className={styles.heading1Parent}>
          <Box className={styles.heading1}>
            <Typography
              className={styles.theOpenSourceEmailContainer}
              variant="inherit"
              component="b"
              sx={{
                lineHeight: "75px",
                letterSpacing: "-1.5px",
                fontWeight: "700",
              }}
            >
              <Typography className={styles.theOpenSource} variant="inherit">
                The Open-Source
              </Typography>
              <Typography className={styles.theOpenSource} variant="inherit">
                Email Platform
              </Typography>
            </Typography>
          </Box>
          <Box className={styles.container}>
            <Box className={styles.plunkIsTheContainer}>
              <Typography className={styles.theOpenSource} variant="inherit">
                Plunk is the open-source, affordable email platform
              </Typography>
              <Typography className={styles.theOpenSource} variant="inherit">
                that brings together marketing, transactional and
              </Typography>
              <Typography className={styles.theOpenSource} variant="inherit">
                broadcast emails into one single, complete solution
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.panding1} />
      <Section />
    </Box>
  );
};

export default Main;
