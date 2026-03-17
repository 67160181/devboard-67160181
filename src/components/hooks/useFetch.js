import { useState, useEffect, useCallback } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ใช้ useCallback เพื่อให้ฟังก์ชันไม่ถูกสร้างใหม่บ่อยๆ และเรียกซ้ำได้ (ระดับ 1)
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url);
      if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");
      const json = await res.json();

      // เก็บข้อมูล 20 รายการตามเงื่อนไขเดิม
      setData(url.includes("posts") ? json.slice(0, 20) : json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ส่งข้อมูล และฟังก์ชัน fetchData (ในชื่อ refetch) ออกไปใช้งาน
  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
