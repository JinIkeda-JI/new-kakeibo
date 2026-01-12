import { useEffect, useState } from "react";
import type { IncomeExpenseDto } from "../types/response/IncomeExpenseDto";
import { createIncomeExpense, fetchIncomeExpenseById, fetchIncomeExpenses } from "../api/incomeExpenseApi";
import { IncomeExpenseForm } from "../components/IncomeExpenseForm";
import type { IncomeExpenseRequest } from "../types/request/incomeExpenseRequest";

export function IncomeExpensePage() {
  const [items, setItems] = useState<IncomeExpenseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [idInput, setIdInput] = useState("");
  const [single, setSingle] = useState<IncomeExpenseDto | null>(null);
  const [singleError, setSingleError] = useState<string | null>(null);
  const [submitting , setSubmitting] = useState(false);

  async function loadList() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIncomeExpenses();
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function searchById() {
    setSingle(null);
    setSingleError(null);

    const id = Number(idInput);
    if (!Number.isInteger(id) || id <= 0) {
      setSingleError("idは正の整数で入力してね");
      return;
    }

    try {
      const data = await fetchIncomeExpenseById(id);
      setSingle(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // 404の場合だけ「見つからない」表示に寄せる（あなたはGETも404方針）
      if (msg.includes("HTTP 404")) {
        setSingleError("該当データなし（404）");
      } else {
        setSingleError(msg);
      }
    }
  }

  useEffect(() => {
    loadList();
  }, []);

  async function handleCreate (req:IncomeExpenseRequest) {
    setSubmitting(true);
    try{
      await createIncomeExpense(req);
      await loadList();
    } catch (e) {
      alert(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div style={{ padding: 16 }}>
      <h1>IncomeExpense</h1>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={loadList} disabled={loading}>
          {loading ? "Loading..." : "Reload List"}
        </button>

        <div style={{ marginLeft: 16 }}>
          <input
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            placeholder="id"
            style={{ width: 80 }}
          />
          <button onClick={searchById} style={{ marginLeft: 8 }}>
            Search by id
          </button>
        </div>
      </div>

      {error && (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid" }}>
          List Error: {error}
        </div>
      )}

      {singleError && (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid" }}>
          Single Error: {singleError}
        </div>
      )}

      {single && (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid" }}>
          <b>Single Result</b>
          <div>id: {single.id}</div>
          <div>typeId: {single.typeId}</div>
          <div>price: {single.price}</div>
          <div>accountingDate: {single.accountingDate}</div>
          <div>settlementDate: {single.settlementDate ?? ""}</div>
          <div>categoryId: {single.categoryId}</div>
          <div>memo: {single.memo ?? ""}</div>
        </div>
      )}

      <IncomeExpenseForm mode="create" submitting={submitting} onSubmit={handleCreate} />

      <table style={{ width: "100%", marginTop: 12, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">id</th>
            <th align="left">type</th>
            <th align="left">price</th>
            <th align="left">accounting</th>
            <th align="left">settlement</th>
            <th align="left">category</th>
            <th align="left">memo</th>
          </tr>
        </thead>
        <tbody>
          {items.map((x) => (
            <tr key={x.id} style={{ borderTop: "1px solid #ccc" }}>
              <td>{x.id}</td>
              <td>{x.typeId}</td>
              <td>{x.price}</td>
              <td>{x.accountingDate}</td>
              <td>{x.settlementDate ?? ""}</td>
              <td>{x.categoryId}</td>
              <td>{x.memo ?? ""}</td>
            </tr>
          ))}

          {items.length === 0 && !loading && !error && (
            <tr>
              <td colSpan={7} style={{ padding: 12 }}>
                no data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
