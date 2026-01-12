import { useEffect, useState } from "react";
import type { IncomeExpenseDto } from "../types/response/IncomeExpenseDto";
import type { IncomeExpenseRequest } from "../types/request/incomeExpenseRequest";
import {
  createIncomeExpense,
  fetchIncomeExpenseById,
  fetchIncomeExpenses,
  updateIncomeExpense,
  deleteIncomeExpense,
} from "../api/incomeExpenseApi";
import { IncomeExpenseForm } from "../components/IncomeExpenseForm";

export function IncomeExpensePage() {
  const [items, setItems] = useState<IncomeExpenseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [idInput, setIdInput] = useState("");
  const [single, setSingle] = useState<IncomeExpenseDto | null>(null);
  const [singleError, setSingleError] = useState<string | null>(null);

  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editing, setEditing] = useState<IncomeExpenseDto | null>(null);

  const [submitting, setSubmitting] = useState(false);

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
      if (msg.includes("HTTP 404")) setSingleError("該当データなし（404）");
      else setSingleError(msg);
    }
  }

  function switchToCreate() {
    setFormMode("create");
    setEditing(null);
  }

  function startEdit(row: IncomeExpenseDto) {
    setEditing(row);
    setFormMode("edit");
  }

  async function handleCreate(req: IncomeExpenseRequest) {
    setSubmitting(true);
    try {
      await createIncomeExpense(req);
      await loadList();
    } catch (e) {
      alert(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdate(req: IncomeExpenseRequest) {
    if (!editing) {
      alert("編集対象が選択されてない");
      return;
    }

    setSubmitting(true);
    try {
      await updateIncomeExpense(editing.id, req);
      await loadList();
      switchToCreate();
    } catch (e) {
      alert(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm(`id=${id} を削除する？`)) return;

    setSubmitting(true);
    try {
      await deleteIncomeExpense(id);

      setItems((prev) => prev.filter((x) => x.id !== id));

      // もし今編集中のレコードを消したならフォームも戻す
      if (formMode === "edit" && editing?.id === id) {
        setEditing(null);
        setFormMode("create");
      }

      await loadList();
    } catch (e) {
      alert(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    loadList();
  }, []);

  const formKey = formMode === "edit" ? `edit-${editing?.id ?? "none"}` : "create";

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

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={switchToCreate} disabled={submitting}>
            新規登録に切替
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

      <div style={{ marginTop: 12 }}>
        {formMode === "edit" && editing ? (
          <div style={{ marginBottom: 8 }}>
            <b>編集モード</b>（id: {editing.id}）
            <button
              onClick={switchToCreate}
              disabled={submitting}
              style={{ marginLeft: 12 }}
            >
              キャンセル
            </button>
          </div>
        ) : (
          <div style={{ marginBottom: 8 }}>
            <b>新規登録モード</b>
          </div>
        )}

        <IncomeExpenseForm
          key={formKey}
          mode={formMode}
          initial={
            formMode === "edit" && editing
              ? {
                  typeId: editing.typeId,
                  price: editing.price,
                  accountingDate: editing.accountingDate,
                  settlementDate: editing.settlementDate ?? null,
                  categoryId: editing.categoryId,
                  memo: editing.memo ?? null,
                }
              : undefined
          }
          submitting={submitting}
          onSubmit={formMode === "edit" ? handleUpdate : handleCreate}
        />
      </div>

      <table
        style={{ width: "100%", marginTop: 12, borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th align="left">actions</th>
            <th align="left">id</th>
            <th align="left">type</th>
            <th align="left">price</th>
            <th align="left">accounting</th>
            <th align="left">settlement</th>
            <th align="left">category</th>
            <th align="left">memo</th>
            <th align="left">actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((x) => (
            <tr key={x.id} style={{ borderTop: "1px solid #ccc" }}>
              <td>
                <button onClick={() => startEdit(x)} disabled={submitting}>
                  更新
                </button>
              </td>

              <td>{x.id}</td>
              <td>{x.typeId}</td>
              <td>{x.price}</td>
              <td>{x.accountingDate}</td>
              <td>{x.settlementDate ?? ""}</td>
              <td>{x.categoryId}</td>
              <td>{x.memo ?? ""}</td>

              <td>
                <button
                  onClick={() => handleDelete(x.id)}
                  disabled={submitting}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}

          {items.length === 0 && !loading && !error && (
            <tr>
              <td colSpan={9} style={{ padding: 12 }}>
                no data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
