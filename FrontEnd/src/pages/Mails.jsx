import { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SidenavItem from "../components/SidenavItem";
import Badge from "../components/Badge";
import MailRow from "../components/MailRow";
import styles from "./Mails.module.css";
import axios from 'axios';

const Mails = () => {
  const navigate = useNavigate();

  const [mailsData, setMailsData] = useState([]);  // mailsData 상태를 추가
  const [loading, setLoading] = useState(true);    // 로딩 상태 추가
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchMails = async () => {
      try {
        // API 호출 (여기서는 "/send/result" 엔드포인트로 요청)
        const response = await axios.get('http://localhost:3000/address/send/result');  // 실제 API URL로 변경
        setMailsData(response.data.data);  // 데이터 상태 업데이트
      } catch (err) {
        setError('메일 데이터를 불러오는 데 실패했습니다.');  // 에러 처리
      } finally {
        setLoading(false);  // 로딩 상태 업데이트
      }
    };

    fetchMails();
  }, []);

  const onSidenavItemContainerClick = useCallback(() => {
    navigate("/dashboard");
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
    <Box className={styles.mails}>
      <Box className={styles.sideNavigation}>
        <Box className={styles.divider} />
        <Box className={styles.sections}>
          <SidenavItem
            property="Overview_off"
            cash="/home.svg"
            title="Dashboard"
            onSidenavItemContainerClick={onSidenavItemContainerClick}
          />
          <SidenavItem property="Mails_on" cash="/cash1.svg" title="Mails" />
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
      <Box className={styles.divider2} />
      <Typography
        className={styles.mails1}
        variant="inherit"
        component="b"
        sx={{
          fontSize: "var(--headings-heading-36-bold-size)",
          lineHeight: "48px",
          letterSpacing: "-0.02em",
          fontWeight: "700",
        }}
      >
        Mails
      </Typography>
      <Box className={styles.horizontalTabParent}>
        <Box className={styles.horizontalTab}>
          <Box className={styles.title1}>
            <Box className={styles.title2}>All</Box>
          </Box>
          <Box className={styles.underline} />
        </Box>
        <Box className={styles.horizontalTab1}>
          <Box className={styles.title3}>
            <Box className={styles.title4}>Succeeded</Box>
          </Box>
          <Box className={styles.underline1} />
        </Box>
        <Box className={styles.horizontalTab}>
          <Box className={styles.title1}>
            <Box className={styles.title4}>Pending</Box>
          </Box>
          <Box className={styles.underline2} />
        </Box>
        <Box className={styles.horizontalTab}>
          <Box className={styles.title1}>
            <Box className={styles.title4}>Failed</Box>
          </Box>
          <Box className={styles.underline2} />
        </Box>
      </Box>
      <Box className={styles.mailCatalog}>
        <Box className={styles.row}>
          <Box className={styles.cellCheckbox}>
            <Box className={styles.checkbox} />
            <Box className={styles.divider3} />
          </Box>
          
          <Box className={styles.resizeableHeads}>
            <Box className={styles.cellHeader}>
              <Box className={styles.value1}>title</Box>
              <Box className={styles.divider3} />
            </Box>
            <Box className={styles.cellHeader1}>
              <Box className={styles.value1}>Customer</Box>
              <Box className={styles.divider3} />
            </Box>
            <Box className={styles.cellHeader2}>
              <Box className={styles.value1}>Date</Box>
              <Box className={styles.divider3} />
            </Box>
          </Box>
        </Box>
        {/* Dynamic Mail Rows */}
        {mailsData.map((mail, index) => (
          <MailRow
            key={mail.event_id}
            property={mail.status}
            title={mail.event_name}
            customer={mail.address_email}
            date={mail.send_at}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Mails;
