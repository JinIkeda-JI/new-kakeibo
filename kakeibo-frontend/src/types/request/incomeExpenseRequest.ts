export type IncomeExpenseRequest = {
    typeId : number;
    price : number;
    accountingDate : string;
    settlementDate : string | null;
    categoryId : number;
    memo : string | null;
}