import type { IncomeExpenseRequest } from "../types/request/incomeExpenseRequest";
import { IncomeExpenseForm } from "../components/IncomeExpenseForm";
import { useIncomeExpensePage } from "../service/useIncomeExpensePage";

export function IncomeExpensePage() {
  const vm = useIncomeExpensePage();

  return (
    <div style={{ padding: 16 }}>
      <h1>IncomeExpense</h1>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={vm.loadList} disabled={vm.loading}>
          {vm.loading ? "Loading..." : "Reload List"}
        </button>

        <div style={{ marginLeft: 16 }}>
          <input
            value={vm.idInput}
            onChange={(e) => vm.setIdInput(e.target.value)}
            placeholder="id"
            style={{ width: 80 }}
          />
          <button onClick={vm.searchById} style={{ marginLeft: 8 }}>
            Search by id
          </button>
        </div>

        <div style={{ marginLeft: "auto" }}>
          <button onClick={vm.startCreate} disabled={vm.submitting}>
            新規登録に切替
          </button>
        </div>
      </div>

      {vm.error && (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid" }}>
          List Error: {vm.error}
        </div>
      )}

      {vm.singleError && (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid" }}>
          Single Error: {vm.singleError}
        </div>
      )}

      {vm.single && (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid" }}>
          <b>Single Result</b>
          <div>id: {vm.single.id}</div>
          <div>typeId: {vm.single.typeId}</div>
          <div>price: {vm.single.price}</div>
          <div>accountingDate: {vm.single.accountingDate}</div>
          <div>settlementDate: {vm.single.settlementDate ?? ""}</div>
          <div>categoryId: {vm.single.categoryId}</div>
          <div>memo: {vm.single.memo ?? ""}</div>
        </div>
      )}

      <IncomeExpenseForm
        key={vm.formKey}
        mode={vm.formMode}
        initial={vm.formInitial}
        submitting={vm.submitting}
        onSubmit={
          vm.formMode === "edit"
            ? (req: IncomeExpenseRequest) => vm.handleUpdate(req)
            : (req: IncomeExpenseRequest) => vm.handleCreate(req)
        }
      />

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
          {vm.items.map((x) => (
            <tr key={x.id} style={{ borderTop: "1px solid #ccc" }}>
              <td>
                <button
                  onClick={() => vm.startEdit(x)}
                  disabled={vm.submitting}
                >
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
                  onClick={() => vm.handleDelete(x.id)}
                  disabled={vm.submitting}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}

          {vm.items.length === 0 && !vm.loading && !vm.error && (
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
