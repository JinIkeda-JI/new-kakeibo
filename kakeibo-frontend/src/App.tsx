import { useEffect, useMemo, useState } from "react";
import { fetchTransactions, type Transaction } from "./lib/api";

function yen(n: number) {
  return new Intl.NumberFormat("ja-JP").format(n);
}

export default function App() {
  const [items, setItems] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const total = useMemo(() => items.reduce((a, b) => a + b.amount, 0), [items]);

  useEffect(() => {
    fetchTransactions()
      .then(setItems)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <header style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Kakeibo</h1>
        <span style={{ opacity: 0.7 }}>Transactions</span>
      </header>

      <section style={{ marginTop: 16, padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>件数</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{items.length}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>合計</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{yen(total)} 円</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <a
              href={`${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:9001"}/api/transactions`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: 12 }}
            >
              JSONを開く
            </a>
          </div>
        </div>
      </section>

      <main style={{ marginTop: 16 }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

        {!loading && !error && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
              <thead>
                <tr>
                  <th style={th}>日付</th>
                  <th style={th}>金額</th>
                  <th style={th}>カテゴリ</th>
                  <th style={th}>メモ</th>
                </tr>
              </thead>
              <tbody>
                {items.map((x) => (
                  <tr key={x.id}>
                    <td style={td}>{x.occurredOn}</td>
                    <td style={{ ...td, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                      {yen(x.amount)}
                    </td>
                    <td style={td}>{x.category}</td>
                    <td style={td}>{x.memo ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer style={{ marginTop: 24, fontSize: 12, opacity: 0.7 }}>
        backend: :9001 / frontend: :3000
      </footer>
    </div>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  borderBottom: "1px solid #ddd",
  padding: "10px 8px",
  fontSize: 12,
  opacity: 0.8,
};

const td: React.CSSProperties = {
  borderBottom: "1px solid #eee",
  padding: "10px 8px",
};
