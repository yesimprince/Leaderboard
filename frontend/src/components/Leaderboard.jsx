import { useEffect, useState } from "react";

function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((result) => {
        console.log("Leaderboard:", result);
        setData(result);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>🏆 Coding Leaderboard</h1>

      <div style={{ maxWidth: "700px", margin: "auto" }}>
        {Array.isArray(data) ? data.map((user) => (
          <div
            key={user.rank}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "10px",
              background: "#f5f5f5",
            }}
          >
            <div>
              <strong>#{user.rank}</strong> {user.name} ({user.uniqueUsername})
              <div style={{ fontSize: "12px", color: "gray", marginTop: "5px" }}>
                {user.department} • Year {user.year}
              </div>
              <div style={{ fontSize: "12px", color: "gray" }}>
                {user.gmail}
              </div>
              <div style={{ fontSize: "12px", color: "#007bff", marginTop: "5px" }}>
                {user.codeforces && `CF: ${user.codeforces} `}
                {user.leetcode && `| LC: ${user.leetcode} `}
                {user.codechef && `| CC: ${user.codechef}`}
              </div>
            </div>

            <div style={{ fontWeight: "bold", fontSize: "18px", color: "#333", alignSelf: "center" }}>
              {user.score} pts
            </div>
          </div>
        )) : <div style={{textAlign: "center", color: "red", padding: "20px"}}>Error loading leaderboard data or backend down.</div>}
      </div>
    </div>
  );
}

export default Leaderboard;