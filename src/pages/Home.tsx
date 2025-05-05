import "../styles/Home.css";
import { useEffect, useState } from "react";
import { getProducts, ProductInfo } from "../apis/ProductApi";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import HomeHeader from "../components/HomeHeader";
export default function Home() {
  const [results, setResults] = useState<ProductInfo[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();
  const handleResultClick = (id: number | undefined) => {
    if (!id) return;
    navigate(`/result/${id}`);
  };
  const fetchProducts = async (page = 1, pageSize = 10) => {
    const res = await getProducts({ page, pageSize });
    setResults(res.items);
    setPagination({
      current: page,
      pageSize: pageSize,
      total: res.totalCount,
    });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <>
      <HomeHeader />
      <div className="main-container">
        <div className="search-results">
          {results.map((result) => (
            <div
              key={result.id}
              className="result-item"
              onClick={() => handleResultClick(result.id)}
              role="button"
              tabIndex={0}
            >
              <h3>{result.description}</h3>
              <p>
                {result.brand} {result.model} {result.name}
              </p>
            </div>
          ))}

          <div className="pagination">
            <Pagination
              align="center"
              current={pagination.current}
              total={pagination.total}
              pageSize={pagination.pageSize}
            />
          </div>
        </div>

        {/* <div className="top-list">
          <h2>HOT</h2>
          <ul>
            {topList.map((item) => (
              <li key={item.id}>
                <span className="rank-number">{item.id}</span>
                <span className="rank-title">{item.title}</span>
                <span className="view-count">{item.views}</span>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </>
  );
}
