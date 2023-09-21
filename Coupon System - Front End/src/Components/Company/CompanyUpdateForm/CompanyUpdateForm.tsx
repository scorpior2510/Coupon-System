import "./CompanyUpdateForm.css";
// ----------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
// ----------------------------------------------
import { CompanyModel } from "../../../Models";
import { selectCompanyList, updateCompanyAction } from "../../../Redux";
import { notifyService, webApiService } from "../../../Services";

function CompanyUpdateForm(): JSX.Element {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);

  const [company] = useState<CompanyModel>(
    useSelector(selectCompanyList).find((c) => c.id === id)!
  );
  const formDefaultValues = { ...company };

  const schema = zod.object({
    email: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().min(5, { message: "Password must be at least 5 characters long" }),
  });

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CompanyModel>({
    defaultValues: formDefaultValues,
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    const updatedCompany = getValues() as CompanyModel;
    webApiService
      .updateCompany(id, updatedCompany)
      .then(() => {
        dispatch(updateCompanyAction(updatedCompany));
        navigate("/api/admin/companies");
        notifyService.successPlainText("company updated successfully");
      })
      .catch((error) => {
        if (error?.code === "ERR_NETWORK") {
          navigate("/server/down");
        }
        notifyService.errorAxiosApiCall(error);
      });
  };

  const handleCancel = () => {
    navigate("/api/admin/companies");
  };

  return (
    <div className="CompanyUpdateForm">
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <h2>Update Company</h2>
        <ul>
          <li>
            <label htmlFor="id"><p>ID: </p></label>
            <input id="id" type="text" value={company.id} disabled={true} />
          </li>
          <li>
            <label htmlFor="name"><p>Name: </p></label>
            <input id="name" type="text" value={company.name} disabled={true} />
          </li>
          <li>
            <label htmlFor="email"><p>Email: </p></label>
            <input {...register("email")} id="email" type="email" placeholder="Email"/>
            <p className="form-error-message"> {errors.email?.message}</p>
          </li>
          <li>
            <label htmlFor="password"><p>Password: </p></label>
            <input {...register("password")} id="password" type="password" placeholder="Password"/>
            <p className="form-error-message"> {errors.password?.message}</p>
          </li>
          <li>
            <button type="submit" disabled={!isDirty || isSubmitting}>Commit Update</button>
            <button onClick={handleCancel}>Cancel</button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default CompanyUpdateForm;