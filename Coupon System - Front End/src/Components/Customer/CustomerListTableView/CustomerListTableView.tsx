import "./CustomerListTableView.css";
// ----------------------------------------------
import { CustomerModel } from "../../../Models";
import { CustomerRowView } from "..";
import { arraySum } from "../../Utils/Utils";

interface CustomerListTableViewProps {
  customerList: CustomerModel[];
}

function CustomerListTableView(props: CustomerListTableViewProps): JSX.Element {
  const customerCount = () => props.customerList.length;
  const purchaseCount = () => {
    return arraySum(props.customerList.map(customer => customer.coupons.length));
  }

  return (
    <div className="CustomerListTableView table-view-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Coupons</th>
          </tr>
        </thead>
        <tbody>
          {props.customerList.map((customer, idx) => (
            <CustomerRowView
              key={`customer-table-row-${idx}`}
              customer={customer}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Count:</td>
            <td>{customerCount()}</td>
            <td></td>
            <td>Sum:</td>
            <td>{purchaseCount()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CustomerListTableView;
