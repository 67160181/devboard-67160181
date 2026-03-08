import { useState } from "react";
import PostCard from "./PostCard";

// ⭐ Level 1: แสดงจำนวนโพสต์
function PostCount({ count }) {
  return (
    <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1rem" }}>
      โพสต์ทั้งหมด: <strong>{count}</strong> รายการ
    </p>
  );
}

// ⭐ Level 3: โครงร่างจำลองตอนโหลด
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

function PostList({ posts, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' คือใหม่สุดก่อน

  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // ⭐ เรียงลำดับข้อมูล (Sort) ตาม id (สมมติว่า id มากกว่าคือโพสต์ใหม่กว่า)
  const sortedPosts = [...filtered].sort((a, b) => {
    return sortOrder === "desc" ? b.id - a.id : a.id - b.id; //
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "#2d3748",
            borderBottom: "2px solid #1e40af",
            paddingBottom: "0.5rem",
            flex: 1,
          }}
        >
          โพสต์ล่าสุด
        </h2>

        {/* ⭐ ปุ่ม Sort */}
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
          {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
        </button>
      </div>

      <PostCount count={posts.length} />

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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

      {/* เงื่อนไขเช็คว่ากำลังโหลด (ไม่มีโพสต์เลย) หรือไม่ */}
      {posts.length === 0 ? (
        <PostSkeleton />
      ) : (
        <>
          {/* ถ้ามีโพสต์แต่หาไม่เจอ */}
          {sortedPosts.length === 0 && (
            <p
              style={{ color: "#718096", textAlign: "center", padding: "2rem" }}
            >
              ไม่พบโพสต์ที่ค้นหา
            </p>
          )}

          {/* แสดงรายการโพสต์ที่กรองแล้ว */}
          {sortedPosts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              body={post.body}
              isFavorite={favorites.includes(post.id)}
              onToggleFavorite={() => onToggleFavorite(post.id)}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
