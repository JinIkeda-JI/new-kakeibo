export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:9001";

export type Transaction = {
    id: number,
    occurredOn: string,
    amount: number,
    category: string,
    memo?: string | null;
}

export async function fetchTransactions(): Promise<Transaction[]>{
    const res = await fetch(`${API_BASE}/api/transactions`);
    if(!res.ok){
        throw new Error(`HTTP ${res.status}`)
    }     
    return res.json();
}