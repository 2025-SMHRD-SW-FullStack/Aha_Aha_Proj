import React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./Mypage.module.css";

const menus = [
  { to: "user_info", label: "회원 정보" },
  { to: "com_info", label: "회사 정보" },
  { to: "favorite_item", label: "즐겨찾기" },
  { to: "product_list", label: "내 상품 리스트" },
];

const MyPage = () => {
  const location = useLocation();

  return (
    <MainLayout>
      <div className={styles.pageWrapper}>
        <nav className={styles.sideNav}>
          {menus.map((menu) => (
            <Link
              key={menu.to}
              to={menu.to}
              className={location.pathname.includes(menu.to) ? styles.active : ""}
            >
              {menu.label}
            </Link>
          ))}
        </nav>
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
};


export default MyPage;
