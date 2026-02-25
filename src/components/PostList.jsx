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

function PostList({ posts }) {
  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>
      <PostCount count={posts.length} />
      {posts.length === 0 ? (
        <PostSkeleton />
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} title={post.title} body={post.body} />
        ))
      )}
    </div>
  );
}

export default PostList;
