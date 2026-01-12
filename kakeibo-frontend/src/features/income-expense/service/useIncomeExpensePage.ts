import { useEffect, useMemo, useState } from "react";
import type { IncomeExpenseDto } from "../types/response/IncomeExpenseDto";
import type { IncomeExpenseRequest } from "../types/request/incomeExpenseRequest";
import {
  createIncomeExpense,
  deleteIncomeExpense,
  fetchIncomeExpenseById,
  fetchIncomeExpenses,
  updateIncomeExpense,
} from "../api/incomeExpenseApi";

type FormMode = "create" | "edit";

export function useIncomeExpensePage() {
  const [items, setItems] = useState<IncomeExpenseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [idInput, setIdInput] = useState("");
  const [single, setSingle] = useState<IncomeExpenseDto | null>(null);
  const [singleError, setSingleError] = useState<string | null>(null);

  const [formMode, setFormMode] = useState<FormMode>("create");
  const [editing, setEditing] = useState<IncomeExpenseDto | null>(null);

  const [submitting, setSubmitting] = useState(false);

  // ---------- 状態遷移 ----------
  function startCreate() {
    setFormMode("create");
    setEditing(null);
  }

  function startEdit(row: IncomeExpenseDto) {
    setFormMode("edit");
    setEditing(row);
  }

  // ---------- API ----------
  /** 全権検索 */
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

  /** ID検索 */
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
      setSingleError(msg.includes("HTTP 404") ? "該当データなし（404）" : msg);
    }
  }

  /** 登録 */
  async function handleCreate(req: IncomeExpenseRequest) {
    setSubmitting(true);
    try {
      await createIncomeExpense(req);
      await loadList();
    } finally {
      setSubmitting(false);
    }
  }

  /** 更新 */
  async function handleUpdate(req: IncomeExpenseRequest) {
    if (!editing) {
      alert("編集対象が選択されてない");
      return;
    }

    setSubmitting(true);
    try {
      await updateIncomeExpense(editing.id, req);
      await loadList();
      startCreate();
    } finally {
      setSubmitting(false);
    }
  }

  /** 削除 */
  async function handleDelete(id: number) {
    if (!confirm(`id=${id} を削除する？`)) return;

    setSubmitting(true);
    try {
      await deleteIncomeExpense(id);

      // 即時反映
      setItems((prev) => prev.filter((x) => x.id !== id));

      if (single?.id === id) setSingle(null);
      if (editing?.id === id) startCreate();
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    loadList();
  }, []);

  // ---------- Form用 ----------
  const formKey = useMemo(
    () => (formMode === "edit" ? `edit-${editing?.id ?? "none"}` : "create"),
    [formMode, editing?.id]
  );

  const formInitial = useMemo<IncomeExpenseRequest | undefined>(() => {
    if (formMode !== "edit" || !editing) return undefined;
    return {
      typeId: editing.typeId,
      price: editing.price,
      accountingDate: editing.accountingDate,
      settlementDate: editing.settlementDate ?? null,
      categoryId: editing.categoryId,
      memo: editing.memo ?? null,
    };
  }, [formMode, editing?.id]);

  return {
    // state
    items,
    loading,
    error,
    idInput,
    setIdInput,
    single,
    singleError,
    formMode,
    editing,
    submitting,

    // derived
    formKey,
    formInitial,

    // actions
    loadList,
    searchById,
    startCreate,
    startEdit,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
