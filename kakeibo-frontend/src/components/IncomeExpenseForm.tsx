import { useEffect, useState } from "react";
import { today } from "../utils/constant";
import type { IncomeExpenseRequest } from "../types/request/incomeExpenseRequest"

type Props = {
    mode : "create" | "edit";
    initial ?: IncomeExpenseRequest;
    submitting : boolean;
    onSubmit : (req: IncomeExpenseRequest) => Promise<void> | void;
}

const empty: IncomeExpenseRequest = {
    typeId : 1,
    price : 0,
    accountingDate : today,
    settlementDate : null,
    categoryId : 1,
    memo : null
}

export function IncomeExpenseForm({ mode, initial, submitting, onSubmit }: Props) {
  const [form, setForm] = useState<IncomeExpenseRequest>(initial ?? empty);

  // edit対象が切り替わったらフォームに反映
  useEffect(() => {
    setForm(initial ?? empty);
  }, [initial]);

  function set<K extends keyof IncomeExpenseRequest>(key: K, value: IncomeExpenseRequest[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    // 最低限のチェックだけ（本格は後でOK）
    if (!form.accountingDate) return alert("計上日を入力してね");
    if (!Number.isFinite(form.price) || form.price <= 0) return alert("金額は正の数で入力してね");

    await onSubmit({
      ...form,
      memo: form.memo && form.memo.trim() !== "" ? form.memo : null,
      settlementDate: form.settlementDate && form.settlementDate.trim() !== "" ? form.settlementDate : null,
    });
  }

  return (
    <form onSubmit={submit} style={{ border: "1px solid #ccc", padding: 12, marginTop: 12 }}>
      <h2>{mode === "create" ? "新規登録" : "編集"}</h2>

      <div>
        <label>種別(typeId): </label>
        <input
          type="number"
          value={form.typeId}
          onChange={(e) => set("typeId", Number(e.target.value))}
        />
      </div>

      <div>
        <label>金額(price): </label>
        <input
          type="number"
          value={form.price}
          onChange={(e) => set("price", Number(e.target.value))}
        />
      </div>

      <div>
        <label>計上日(accountingDate): </label>
        <input
          type="date"
          value={form.accountingDate}
          onChange={(e) => set("accountingDate", e.target.value)}
        />
      </div>

      <div>
        <label>引落日(settlementDate): </label>
        <input
          type="date"
          value={form.settlementDate ?? ""}
          onChange={(e) => set("settlementDate", e.target.value || null)}
        />
        <span style={{ marginLeft: 8, fontSize: 12 }}>未入力なら計上日で補完</span>
      </div>

      <div>
        <label>カテゴリ(categoryId): </label>
        <input
          type="number"
          value={form.categoryId}
          onChange={(e) => set("categoryId", Number(e.target.value))}
        />
      </div>

      <div>
        <label>メモ(memo): </label>
        <input
          value={form.memo ?? ""}
          onChange={(e) => set("memo", e.target.value)}
        />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? "送信中..." : mode === "create" ? "登録" : "更新"}
      </button>
    </form>
  );
}