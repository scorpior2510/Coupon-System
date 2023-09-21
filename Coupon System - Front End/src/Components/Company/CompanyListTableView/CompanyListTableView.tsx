import "./CompanyListTableView.css";
// ----------------------------------------------
import { CompanyModel } from "../../../Models";
import { CompanyRowView } from "..";
import { arraySum } from "../../Utils/Utils";

interface CompanyListTableViewProps {
  companyList: CompanyModel[];
}

function CompanyListTableView(props: CompanyListTableViewProps): JSX.Element {

  const companyCount = () => props.companyList.length;
  const couponCount = () => {
    return arraySum(props.companyList.map(company => company.coupons.length));
  }

  return (
    <div className="CompanyListTableView table-view-container">
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
          {props.companyList.map((company, idx) => (
            <CompanyRowView
              key={`company-table-row-${idx}`}
              company={company}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Count:</td>
            <td>{companyCount()}</td>
            <td></td>
            <td>Sum:</td>
            <td>{couponCount()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CompanyListTableView;
