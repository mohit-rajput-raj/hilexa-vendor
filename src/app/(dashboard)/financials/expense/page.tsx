import React from 'react'
import { FinancialDashboard } from './upperhalf'
import { ExpensesDataTable } from './table'
// import ExpensesTable from './table'

type Props = {}

const Expense = (props: Props) => {
  return (
    <div className='flex flex-col gap-4'><FinancialDashboard/><ExpensesDataTable/></div>
  )
}

export default Expense