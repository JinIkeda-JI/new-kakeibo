import React from "react";

export type AppRoute = {
  path: string;
  element: React.ReactNode;
  title: string; // ページ名
};

// 今後の改修時に変更する
export const ROUTES = {
  home: { path: "/", title: "収支一覧" },
  incomeExpense: { path: "/income-expenses", title: "収支一覧" },
  //incomeExpenseNew: { path: "/income-expenses/new", title: "収支登録" },
  //incomeExpenseDetail: { path: "/income-expenses/:id", title: "収支詳細" },
} as const;
