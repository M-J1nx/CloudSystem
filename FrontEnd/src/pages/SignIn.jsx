import { useCallback } from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";

const SignIn = () => {
  const navigate = useNavigate();

  // Create Account 버튼 클릭 핸들러
  const onCreateAccountClick = useCallback(() => {
    navigate("/dashboard"); // Main 페이지로 이동
  }, [navigate]);

  const onLinkContainerClick = useCallback(() => {
    navigate("/create-account");
  }, [navigate]);

  return (
    <Box className={styles.signIn}>
      <Box className={styles.margin}>
        <Box className={styles.container}>
          <Box className={styles.heading2margin}>
            <Box className={styles.heading2}>
              <Typography
                className={styles.signInTo}
                variant="inherit"
                component="b"
                sx={{ lineHeight: "36px", fontWeight: "700" }}
              >
                Sign in to your account
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.margin1}>
        <Box className={styles.container1}>
          <Box className={styles.backgroundborder}>
            <Box className={styles.form}>
              {/* Email Input */}
              <Box className={styles.container2}>
                <Box className={styles.label}>
                  <Box className={styles.email}>Email</Box>
                </Box>
                <Box className={styles.input}>
                  <input
                    className={styles.textInput} // 추가된 클래스
                    type="email"
                  />
                </Box>
              </Box>
              {/* Password Input */}
              <Box className={styles.container4}>
                <Box className={styles.label}>
                  <Box className={styles.password}>Password</Box>
                </Box>
                <Box className={styles.input}>
                  <input
                    className={styles.textInput} // 추가된 클래스
                    type="password"
                  />
                </Box>
              </Box>
              {/* Sign In Button */}
              <Box 
                className={styles.button}
                onClick={onCreateAccountClick} // 클릭 이벤트 핸들러 추가
              >
                <Box className={styles.signIn1}>Sign in</Box>
              </Box>
            </Box>
          </Box>
          {/* Create Account Link */}
          <Box className={styles.container8}>
            <Box className={styles.link} onClick={onLinkContainerClick}>
              <Box className={styles.wantToCreate}>
                Want to create an account instead?
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
