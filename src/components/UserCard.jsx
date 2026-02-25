function UserCard({ name, email }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  // ⭐ Level 2: เลือกสีตามตัวอักษรแรก
  const getAvatarColor = () => {
    const charCode = name.charCodeAt(0);
    if (charCode % 3 === 0) return "#1e40af"; // น้ำเงิน
    if (charCode % 3 === 1) return "#059669"; // เขียว
    return "#7c3aed"; // ม่วง
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        marginBottom: "0.75rem",
        background: "white",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          background: getAvatarColor(),
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "0.9rem",
        }}
      >
        {initials}
      </div>
      <div>
        <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>
        <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
      </div>
    </div>
  );
}
export default UserCard;
