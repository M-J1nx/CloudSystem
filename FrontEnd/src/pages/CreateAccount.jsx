import { useCallback, useState } from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./CreateAccount.module.css";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    name: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:3000/account/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // 회원가입 성공
        navigate("/main");
      } else {
        // 회원가입 실패
        setError(data.message || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      setError("서버 연결에 실패했습니다.");
      console.error("Signup error:", error);
    }
  };

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
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* ID Input */}
              <Box className={styles.container2}>
                <Box className={styles.label}>
                  <Box className={styles.yourEmail}>ID</Box>
                </Box>
                <Box className={styles.input}>
                  <input
                    className={styles.textInput}
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    required
                  />
                </Box>
              </Box>
              {/* Name Input */}
              <Box className={styles.container2}>
                <Box className={styles.label}>
                  <Box className={styles.yourEmail}>Name</Box>
                </Box>
                <Box className={styles.input}>
                  <input
                    className={styles.textInput}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Box>
              </Box>
              {/* Email Input */}
              <Box className={styles.container2}>
                <Box className={styles.label}>
                  <Box className={styles.yourEmail}>Email</Box>
                </Box>
                <Box className={styles.input}>
                  <input
                    className={styles.textInput}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Box>
              </Box>
              {/* Password Input */}
              <Box className={styles.container4}>
                <Box className={styles.label}>
                  <Box className={styles.aStrongPassword}>
                    Password
                  </Box>
                </Box>
                <Box className={styles.container5}>
                  <Box className={styles.input}>
                    <input
                      className={styles.textInput}
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </Box>
                </Box>
              </Box>
              {/* Error Message */}
              {error && (
                <Box sx={{ color: 'red', textAlign: 'center', mb: 2 }}>
                  {error}
                </Box>
              )}
              {/* Submit Button */}
              <button 
                type="submit"
                className={styles.button}
              >
                <Box className={styles.createAccount1}>Create Account</Box>
              </button>
            </form>
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