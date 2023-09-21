import "./CustomerUpdateForm.css"
// ----------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
// ----------------------------------------------
import { CustomerModel } from "../../../Models";
import { selectCustomerList, updateCustomerAction } from "../../../Redux";
import { webApiService, notifyService } from "../../../Services";

function CustomerUpdateForm(): JSX.Element {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = +(params.id || 0);

  const customer = useSelector(selectCustomerList).find((c) => c.id === id)!;
  const formDefaultValues = { ...customer };

  const schema = zod.object({
    firstName: zod.string().min(2, { message: "Name must be at least 2 characters long" }),
    lastName: zod.string().min(2, { message: "Last Name must be at least 2 characters long" }),
    email: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().min(5, { message: "Password must be at least 5 characters long" }),
  });

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<CustomerModel>({
    defaultValues: formDefaultValues,
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    const updatedCustomer = getValues() as CustomerModel;
    webApiService
      .updateCustomer(id, updatedCustomer)
      .then(() => {
        dispatch(updateCustomerAction(updatedCustomer));
        navigate("/api/admin/customers");
        notifyService.successPlainText("customer updated successfully")
      })
      .catch((error) => {
        if (error?.code === "ERR_NETWORK") {
          navigate("/server/down");
        }
        notifyService.errorAxiosApiCall(error);
      });
  };

  const handleCancel = () => {
    navigate("/api/admin/customers");
  };

  return (
    <div className="CustomerUpdateForm">
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <h2>Update Customer</h2>
        <ul>
          <li>
            <label htmlFor="id"><p>ID: </p></label>
            <input id="id" type="text" value={customer.id} disabled={true} />
          </li>
          <li>
            <label htmlFor="firstName"><p>First Name: </p></label>
            <input {...register("firstName")} id="firstName" type="text" placeholder="First Name"/>
            <p className="form-error-message"> {errors.firstName?.message}</p>
          </li>
          <li>
            <label htmlFor="lastName"><p>Last Name: </p></label>
            <input {...register("lastName")} id="lastName" type="text" placeholder="Last Name"/>
            <p className="form-error-message"> {errors.lastName?.message}</p>
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

export default CustomerUpdateForm;
