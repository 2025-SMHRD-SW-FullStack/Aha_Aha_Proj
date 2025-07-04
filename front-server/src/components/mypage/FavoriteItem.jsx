import React, { useEffect, useState, useMemo } from "react";
import axiosInstance from "../../config/axiosInstance";
import styles from "./FavoriteItem.module.css";
import favoriteIcon from "../../assets/images/favorite_on.png";

const FavoriteItem = () => {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState({ product: "전체", country: "전체" });

  // ✅ DB에서 데이터 가져오기
  useEffect(() => {
    console.log("uesEffect 실행됨");

    const fetchFavorites = async () => {
      try {
        const res = await axiosInstance.get("/api/favorites");
        console.log("🎯 응답 데이터 구조:", res.data);
        const data = res.data;

        if (!Array.isArray(data)) {
          console.warn("🚨 예상치 못한 응답 구조:", data);
          setFavorites([]); // 빈 배열로 초기화
          return;
        }

        setFavorites(data);

        // 제품명 리스트
        const productList = Array.from(new Set(data.map((item) => item.productName)));
        setProducts(productList);

        // 국가 리스트
        const countryList = Array.from(new Set(data.flatMap((item) => item.recommendedCountries.map((rc) => rc.country))));
        setCountries(countryList);
      } catch (error) {
        console.error("즐겨찾기 불러오기 실패:", error);
        setFavorites([]); // 네트워크 에러 시에도 빈 배열 처리
      }
    };

    fetchFavorites();
  }, []);

  // ✅ 선택된 품목에 따른 국가 옵션 필터링
  const filteredCountries = useMemo(() => {
    if (selected.product === "전체") return countries;

    const relatedCountries = favorites
      .filter((item) => item.productName === selected.product)
      .flatMap((item) => item.recommendedCountries.map((rc) => rc.country));

    return Array.from(new Set(relatedCountries));
  }, [selected.product, countries, favorites]);

  // ✅ 필터링 + 정렬
  const filteredItems = useMemo(() => {
    let items = [];

    favorites.forEach((item) => {
      item.recommendedCountries.forEach((rc) => {
        if (
          (selected.product === "전체" || item.productName === selected.product) &&
          (selected.country === "전체" || rc.country === selected.country)
        ) {
          items.push({
            id: item.favoriteId,
            productName: item.productName,
            description: item.productDescription,
            countryName: rc.country,
            successRate: rc.percent,
          });
        }
      });
    });

    return items.sort((a, b) => b.successRate - a.successRate);
  }, [favorites, selected]);
  

  const rankIcon = (index) => {
    if (index === 0) return "🥇 1위";
    if (index === 1) return "🥈 2위";
    if (index === 2) return "🥉 3위";
    return ` ${index + 1}위`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <img
          src={favoriteIcon}
          alt="favorite icon"
          style={{ width: "50px", height: "50px", marginRight: "10px", verticalAlign: "middle" }}
        />
        즐겨찾기
      </h2>

      <div className={styles.filterBar}>
        <button
          className={styles.filterButton}
          onClick={() => setSelected({ product: "전체", country: "전체" })}
        >
          전체
        </button>

        <select
          className={styles.select}
          value={selected.product}
          onChange={(e) => setSelected({ ...selected, product: e.target.value, country: "전체" })}
        >
          <option value="전체">품목 선택</option>
          {products.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <select
          className={styles.select}
          value={selected.country}
          onChange={(e) => setSelected({ ...selected, country: e.target.value })}
        >
          <option value="전체">국가 선택</option>
          {filteredCountries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>순위</th>
              <th>품목명</th>
              <th>국가</th>
              <th>예상성공률</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, idx) => (
              <tr key={`${item.id}-${item.countryName}`}>
                <td><span className={styles.rankIcon}>{rankIcon(idx)}</span></td>
                <td>
                  {item.productName}
                  <div className={styles.description}>{item.description}</div>
                </td>
                <td>{item.countryName}</td>
                <td>{item.successRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavoriteItem;
