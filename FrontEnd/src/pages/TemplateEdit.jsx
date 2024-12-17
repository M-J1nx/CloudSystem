import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";  // useParams 추가
import SidenavItem from "../components/SidenavItem";
import styles from "./TemplateEdit.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const TemplateEdit = () => {
  const navigate = useNavigate();
  const { templateName } = useParams();  // URL에서 템플릿 이름을 가져오기

  const [template, setTemplate] = useState({
    templateName: "",
    mailTitle: "",
    mailContent: "",
    mailImage: "",
  }); // 템플릿 정보 상태 초기화
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(""); // 오류 메시지 상태

  // 템플릿 데이터를 불러오는 함수
  useEffect(() => {
    const fetchTemplateData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/template/${templateName}`);
        setTemplate(response.data);  // 템플릿 상태에 데이터 설정
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("템플릿을 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchTemplateData();
  }, []);  // templateName이 변경될 때마다 실행되도록 설정

  // 템플릿 수정 함수
  const handleSave = async () => {
    if (!template.templateName || !template.mailContent) {
      setError("템플릿 이름과 이메일 내용은 필수입니다.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3000/template/${template.templateName}/edit`, {
        mailContent: template.mailContent,
        mailImage: template.mailImage,
      });
      setLoading(false);
      alert(response.data.message);  // 템플릿 수정 성공 알림
      navigate("/templates");  // 템플릿 목록 페이지로 이동
    } catch (err) {
      setLoading(false);
      setError("템플릿 수정 중 오류가 발생했습니다.");
    }
  };

  // 템플릿 필드 수정 함수
  const handleInputChange = (field) => (event) => {
    setTemplate((prevTemplate) => ({
      ...prevTemplate,
      [field]: event.target.value,  // 해당 필드만 업데이트
    }));
  };

  if (loading) {
    return <div>Loading...</div>;  // 로딩 중에는 'Loading...' 표시
  }

  if (error) {
    return <div>{error}</div>;  // 오류 발생 시 오류 메시지 표시
  }

  return (
    <Box className={styles.templateEdit}>
      <Box className={styles.sideNavigation}>
        <Box className={styles.divider} />
        <Box className={styles.sections}>
          <SidenavItem property="Overview_off" cash="/home.svg" title="Dashboard" />
          <SidenavItem property="Mails_off" cash="/cash.svg" title="Mails" />
          <SidenavItem property="Customers_off" cash="/user-circle1.svg" title="Customers" />
          <SidenavItem property="Templates_on" cash="/clipboard-check1.svg" title="Templates" />
          <SidenavItem property="Analytics_off" cash="/frame.svg" title="Campaigns" />
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
        className={styles.addYourTemplate}
        variant="inherit"
        component="b"
        sx={{
          fontFamily: "var(--ui-ui-text-14-reg)",
          fontSize: "var(--headings-heading-36-bold-size)",
          lineHeight: "48px",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        }}
      >
        Edit your template
      </Typography>
      <Box className={styles.subjectParent}>
        <Box className={styles.subject}>Subject</Box>
        <Box className={styles.emailBody}>Email Body</Box>
        <Box className={styles.fieldContent}>
          <input
            className={styles.textInput}
            type="text"
            value={template.templateName || ""}  // 템플릿 제목 표시
            onChange={handleInputChange('templateName')}  // 템플릿 제목 수정
          />
        </Box>
        <Box className={styles.fieldContent1}>
          <textarea
            className={styles.textInput}
            value={template.mailContent || ""}  // 이메일 내용 표시
            onChange={handleInputChange('mailContent')}  // 이메일 내용 수정
            rows={100}
          />
          <Box className={styles.pictureWrapper}>
            <img className={styles.pictureIcon} alt="" src="/picture@2x.png" />
          </Box>
        </Box>
      </Box>
      <Box className={styles.depth5Frame1}>
        <Button
          variant="contained"
          className={styles.saveButton}
          onClick={handleSave}  // 템플릿 수정 함수 호출
          sx={{
            backgroundColor: "transparent",
            color: "white",
            border: "none",
          }}
        >
          Save
        </Button>
      </Box>
      <Box className={styles.depth5Frame2}>
        <Button
          variant="outlined"
          className={styles.cancelButton}
          onClick={() => navigate("/templates")}
          sx={{
            backgroundColor: "transparent",
            color: "black",
            border: "none",
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TemplateEdit;
