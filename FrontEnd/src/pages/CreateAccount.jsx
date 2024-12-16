import { useCallback } from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./CreateAccount.module.css";

const CreateAccount = () => {
  const navigate = useNavigate();

  // Create Account 버튼 클릭 핸들러
  const onCreateAccountClick = useCallback(() => {
    navigate("/main"); // Main 페이지로 이동
  }, [navigate]);

  // Sign In 링크 클릭 핸들러
  const onLinkContainerClick = useCallback(() => {
    navigate("/sign-in");
  }, [navigate]);

  return (
    <Box className={styles.createAccount}>
      <Box className={styles.margin}>
        <Box className={styles.container}>
          <Box className={styles.heading2margin}>
            <Box className={styles.heading2}>
              <Typography
                className={styles.createAAccount}
                variant="inherit"
                component="b"
                sx={{ lineHeight: "36px", fontWeight: "700" }}
              >
                Create a account
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.margin1}>
        <Box className={styles.container1}>
          <Box className={styles.backgroundborder}>
            <Box className={styles.form}>
              <Box className={styles.container2}>
                <Box className={styles.label}>
                  <Box className={styles.yourEmail}>Your Email</Box>
                </Box>
                <Box className={styles.input}>
                  <input
                    className={styles.textInput}
                    type="email"
                  />
                </Box>
              </Box>
              <Box className={styles.container4}>
                <Box className={styles.label}>
                  <Box className={styles.aStrongPassword}>
                    A Strong Password
                  </Box>
                </Box>
                <Box className={styles.container5}>
                  <Box className={styles.input}>
                    <input
                      className={styles.textInput}
                      type="password"
                    />
                  </Box>
                </Box>
              </Box>
              {/* Create Account 버튼 */}
              <Box
                className={styles.button}
                onClick={onCreateAccountClick} // 클릭 이벤트 핸들러 추가
              >
                <Box className={styles.createAccount1}>Create Account</Box>
              </Box>
            </Box>
          </Box>
          <Box className={styles.container8}>
            <Box className={styles.link} onClick={onLinkContainerClick}>
              <Box className={styles.alreadyHaveAn}>
                Already have an account?
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAccount;
