import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import HomeHeader from "../components/HomeHeader";
import "../styles/ResultView.css";
import {
  getProductById,
  ProductViewInfo,
  ProductAttr,
} from "../apis/ProductApi";

export default function ResultView() {
  const { id } = useParams();
  const [detail, setDetail] = useState<ProductViewInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const messages = ["1111111111"]
  useEffect(() => {

    const fetchDetail = async () => {
      try {
        const res = await getProductById(Number(id));
        setDetail(res);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!detail) {
    return <div className="error">Not Found</div>;
  }

  return (
    <>
      <HomeHeader />
      <div className="detail-container">
        <div className="detail-content">
          <h1>{detail.description}</h1>
          <div className="meta-info">
            <span className="author">{detail.brand}</span>
            <span className="time">{detail.model}</span>
          </div>
          <div className="content">
            <div className="attrs-table">
              {detail.productAttrs
                .reduce(
                  (rows: ProductAttr[][], attr: ProductAttr, index: number) => {
                    if (index % 2 === 0) {
                      rows.push([attr]);
                    } else {
                      rows[rows.length - 1].push(attr);
                    }
                    return rows;
                  },
                  []
                )
                .map((row, rowIndex) => (
                  <div key={rowIndex} className="attr-row">
                    {row.map((attr: ProductAttr, colIndex: number) => (
                      <div key={colIndex} className="attr-item">
                        <span className="attr-name">{attr.name}:</span>
                        <span className="attr-value">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className="message">
                {message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
