import { useState } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import useFetch from "./hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";

function PostCount({ count }) {
  return (
    <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1rem" }}>
      โพสต์ทั้งหมด: <strong>{count}</strong> รายการ
    </p>
  );
}

function PostSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "white",
          }}
        >
          <div
            style={{
              height: "20px",
              width: "60%",
              background: "#e2e8f0",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          ></div>
          <div
            style={{
              height: "14px",
              width: "90%",
              background: "#f1f5f9",
              borderRadius: "4px",
              marginBottom: "6px",
            }}
          ></div>
          <div
            style={{
              height: "14px",
              width: "40%",
              background: "#f1f5f9",
              borderRadius: "4px",
            }}
          ></div>
        </div>
      ))}
    </>
  );
}

function PostList({}) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const { favorites } = useFavorites();
  const postsPerPage = 10;

  const {
    data: posts,
    loading,
    error,
    refetch,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  // 1. กรองข้อมูล (Search)
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // 2. เรียงลำดับ (Sort)
  const sortedPosts = [...filtered].sort((a, b) => {
    return sortOrder === "desc" ? b.id - a.id : a.id - b.id;
  });

  // 3. แบ่งหน้า (Pagination) - ⭐ ต้องใช้ข้อมูลที่ Sort แล้วมาตัดแบ่ง
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  // if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div style={{ color: "red", padding: "1rem" }}>ข้อผิดพลาด: {error}</div>
    );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2
          style={{
            color: "#2d3748",
            borderBottom: "2px solid #1e40af",
            paddingBottom: "0.5rem",
            flex: 1,
            margin: 0,
          }}
        >
          โพสต์ล่าสุด
        </h2>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {/* ⭐ ระดับ 1: ปุ่มโหลดใหม่ */}
          <button
            onClick={() => {
              setCurrentPage(1);
              refetch();
            }}
            style={{
              background: "#fff",
              border: "1px solid #cbd5e0",
              padding: "0.3rem 0.6rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.85rem",
              color: "#1e40af",
            }}
          >
            🔄 โหลดใหม่
          </button>

          {/* ปุ่ม Sort */}
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            style={{
              background: "#edf2f7",
              border: "1px solid #cbd5e0",
              padding: "0.3rem 0.6rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.85rem",
              color: "#1e40af",
            }}
          >
            {sortOrder === "desc" ? "🔽 ใหม่สุด" : "🔼 เก่าสุด"}
          </button>
        </div>
      </div>

      <PostCount count={posts.length} />

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }} // ค้นหาแล้วให้กลับไปหน้า 1
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {loading ? (
        <PostSkeleton />
      ) : (
        <>
          {currentPosts.length === 0 && (
            <p
              style={{ color: "#718096", textAlign: "center", padding: "2rem" }}
            >
              ไม่พบโพสต์ที่ค้นหา
            </p>
          )}

          {/* ⭐ แสดงรายการที่ตัดแบ่งหน้าแล้ว */}
          {currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          {/* ⭐ ระดับ 2: ตัวควบคุมหน้า (Pagination) */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                marginTop: "1rem",
                paddingBottom: "2rem",
              }}
            >
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                style={{
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                ← ก่อนหน้า
              </button>

              <span style={{ fontSize: "0.9rem", color: "#4a5568" }}>
                หน้า {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                style={{
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                ถัดไป →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PostList;
