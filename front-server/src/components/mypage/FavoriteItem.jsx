import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import styles from "./FavoriteItem.module.css";
import jsonData from "../../assets/data/favorite_items.json";
import favoriteIcon from "../../assets/images/favorite_on.png";

const FavoriteItem = () => {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState({ product: "전체", country: "전체" });

  // ✅ 로컬 테스트용
  useEffect(() => {
    setFavorites(jsonData);

    const productList = Array.from(new Set(jsonData.map((item) => item.productName)));
    const countryList = Array.from(new Set(jsonData.map((item) => item.countryName)));

    setProducts(productList);
    setCountries(countryList);
  }, []);

  // ✅ 선택된 품목에 따른 국가 옵션 필터링
  const filteredCountries = useMemo(() => {
    if (selected.product === "전체") return countries;
    const related = favorites
      .filter((item) => item.productName === selected.product)
      .map((item) => item.countryName);
    return Array.from(new Set(related));
  }, [selected.product, countries, favorites]);

  // ✅ 필터링 + 정렬
  const filteredItems = useMemo(() => {
    return favorites
      .filter(
        (item) =>
          (selected.product === "전체" || item.productName === selected.product) &&
          (selected.country === "전체" || item.countryName === selected.country)
      )
      .sort((a, b) => b.successRate - a.successRate);
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
              <tr key={item.id}>
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
