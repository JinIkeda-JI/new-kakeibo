import { useState } from "react";
import { today } from "../../../commons/utils/constant";
import type { IncomeExpenseRequest } from "../types/request/incomeExpenseRequest";
import { FormField } from "./FormField";

type Props = {
  mode: "create" | "edit";
  initial?: IncomeExpenseRequest;
  editingId?: number;
  submitting: boolean;
  onSubmit: (req: IncomeExpenseRequest) => Promise<void> | void;
};

const empty: IncomeExpenseRequest = {
  typeId: 1,
  price: 0,
  accountingDate: today,
  settlementDate: null,
  categoryId: 1,
  memo: null,
};

export function IncomeExpenseForm({
  mode,
  initial,
  submitting,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<IncomeExpenseRequest>(initial ?? empty);

  function set<K extends keyof IncomeExpenseRequest>(
    key: K,
    value: IncomeExpenseRequest[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    // 最低限のバリデーション
    if (!form.accountingDate) return alert("計上日を入力してね");
    if (!Number.isFinite(form.price) || form.price <= 0)
      return alert("金額は正の数で入力してね");

    await onSubmit({
      ...form,
      memo: form.memo && form.memo.trim() !== "" ? form.memo : null,
      settlementDate:
        form.settlementDate && form.settlementDate.trim() !== ""
          ? form.settlementDate
          : null,
    });
  }

  return (
    <form
      onSubmit={submit}
      style={{ border: "1px solid #ccc", padding: 12, marginTop: 12 }}
    >
      <h2>{mode === "create" ? "新規登録" : "編集"}</h2>

      <FormField
        label="種別(typeId)"
        type="number"
        value={form.typeId}
        onChange={(v) => set("typeId", v as number)}
      />

      <FormField
        label="金額(price)"
        type="number"
        value={form.price}
        onChange={(v) => set("price", v as number)}
      />

      <FormField
        label="計上日(accountingDate)"
        type="date"
        value={form.accountingDate}
        onChange={(v) => set("accountingDate", v as string)}
      />

      <div>
        <FormField
          label="引落日(settlementDate)"
          type="date"
          value={form.settlementDate}
          onChange={(v) => set("settlementDate", v as string | null)}
        />
        <span style={{ marginLeft: 8, fontSize: 12 }}>
          未入力なら計上日で補完
        </span>
      </div>

      <FormField
        label="カテゴリ(categoryId)"
        type="number"
        value={form.categoryId}
        onChange={(v) => set("categoryId", v as number)}
      />

      <FormField
        label="メモ(memo)"
        value={form.memo}
        onChange={(v) => set("memo", v as string | null)}
      />

      <button type="submit" disabled={submitting}>
        {submitting ? "送信中..." : mode === "create" ? "登録" : "更新"}
      </button>
    </form>
  );
}
