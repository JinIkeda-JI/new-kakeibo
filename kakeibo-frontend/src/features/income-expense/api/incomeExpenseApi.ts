import { API_BASE } from "../../../commons/utils/BaseUrl";
import { type IncomeExpenseDto } from "../types/response/IncomeExpenseDto";
import type { IncomeExpenseRequest } from "../types/request/incomeExpenseRequest";
import { request } from "../../../commons/api/request";

const BASE_URL = API_BASE + "/income-expenses";

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

export function updateIncomeExpense(id: number, req: IncomeExpenseRequest){
  return request<IncomeExpenseDto>(`${BASE_URL}/${id}`,{
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });
}

export function deleteIncomeExpense(id: number){
  return request<void>(`${BASE_URL}/${id}`,{
    method: "DELETE"
  })
}
