import React, { useState } from "react";

const ReadMore = ({ text }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div>
      <p className="testimonials__quote__text">
        {isReadMore ? text.slice(0, 150) : text}
      </p>

      {text.length > 150 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              borderRadius: "20px",
              backgroundColor: "#00a8e8",
              color: "#ffffff",
              padding: "8px 16px ",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
            }}
            onClick={toggleReadMore}
          >
            {isReadMore ? "Hiển thị thêm" : "Rút gọn"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadMore;
