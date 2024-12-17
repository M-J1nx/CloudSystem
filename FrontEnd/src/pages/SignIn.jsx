import { useCallback, useState } from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // GET 요청에서 body를 보낼 수 없으므로 쿼리 파라미터로 전송
      const response = await fetch(`http://localhost:3000/account/login?id=${formData.id}&password=${formData.password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공
        navigate("/dashboard");
      } else {
        // 로그인 실패
        setError(data.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      setError("서버 연결에 실패했습니다.");
      console.error("Login error:", error);
    }
  };

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
            <form className={styles.form} onSubmit={handleSignIn}>
              {/* ID Input (이전 Email 대신) */}
              <Box className={styles.container2}>
                <Box className={styles.label}>
                  <Box className={styles.email}>ID</Box>
                </Box>
                <Box className={styles.input}>
                  <input
                    className={styles.textInput}
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
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
                    className={styles.textInput}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Box>
              </Box>
              {/* Error Message */}
              {error && (
                <Box sx={{ color: 'red', textAlign: 'center', mb: 2 }}>
                  {error}
                </Box>
              )}
              {/* Sign In Button */}
              <button 
                type="submit"
                className={styles.button}
              >
                <Box className={styles.signIn1}>Sign in</Box>
              </button>
            </form>
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