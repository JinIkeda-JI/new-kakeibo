export type IncomeExpenseDto = {
    id: number;
    typeId: number;
    price: number;
    accountingDate: string;
    settlementDate: string | null;
    lastUpdateAt: string;
    categoryId: number;
    memo: string | null ;
};