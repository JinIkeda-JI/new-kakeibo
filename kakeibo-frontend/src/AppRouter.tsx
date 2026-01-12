import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from './routes/routeConfig'

import IncomeExpensePage from "./features/income-expense/pages/IncomeExpensePage"

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path={ROUTES.home.path}
        element={<Navigate to={ROUTES.incomeExpense.path} replace />}
      />
      <Route path={ROUTES.incomeExpense.path} element={<IncomeExpensePage />} />
    </Routes>
  );
}
