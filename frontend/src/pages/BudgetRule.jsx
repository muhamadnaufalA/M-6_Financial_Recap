import React from 'react';
import BudgetRuleForm from '../components/BudgetRuleForm';
import BudgetRuleTable from '../components/BudgetRuleTable';

export default function Outcome() {
  return (
    <div className="card flex-fill">
      <div className="card-header">
        <h5 className="card-title mb-0 text-dark">Budget Rule</h5>
      </div>
      <div className="row justify-content-left my-1 mx-2">
        <BudgetRuleForm />
        <BudgetRuleTable />
      </div>
    </div>
  )
}
