import type { User } from "../../User";

type ClearDebtProps = {
  userInfo: User;
  clearDebtMsg: string | null;
  ClearDebt: () => void;
};
function ClearDebtComp({ userInfo, clearDebtMsg, ClearDebt }: ClearDebtProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor="debt"
        className="block mb-2.5 text-sm font-medium text-heading"
      >
        debt
      </label>
      <input
        type="debt"
        id="debt"
        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
        placeholder="0.00€"
        required
        value={userInfo.debt == null ? "" : userInfo.debt}
        disabled
      />
      <button onClick={ClearDebt}>Clear The Users Debts</button>
      {clearDebtMsg && <p>{clearDebtMsg}</p>}
    </div>
  );
}

export default ClearDebtComp;
