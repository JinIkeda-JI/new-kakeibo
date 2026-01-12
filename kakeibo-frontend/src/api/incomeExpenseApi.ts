import { API_BASE } from "../utils/BaseUrl";
import { type IncomeExpenseDto } from "../types/response/IncomeExpenseDto";
import type { IncomeExpenseRequest } from "../types/request/incomeExpenseRequest";

const BASE_URL = API_BASE + "/income-expenses";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} ${text}`.trim());
  }

  return (await res.json()) as T;
}

export function fetchIncomeExpenses(): Promise<IncomeExpenseDto[]> {
  return request<IncomeExpenseDto[]>(BASE_URL);
}

export function fetchIncomeExpenseById(id: number): Promise<IncomeExpenseDto> {
  return request<IncomeExpenseDto>(`${BASE_URL}/${id}`);
}

export function createIncomeExpense(req: IncomeExpenseRequest) {
  return request<IncomeExpenseDto>(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
}
