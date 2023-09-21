import "./CustomerAddForm.css";
// ----------------------------------------------
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------
import { CustomerAddSuccessPrompt } from "..";
import { CustomerModel } from "../../../Models";
import { addCustomerAction, selectCustomerList, selectCustomerListFetchStatus } from "../../../Redux";
import { webApiService, notifyService } from "../../../Services";

function CustomerAddForm(): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCustomerSuccessPrompt, setShowCustomerSuccessPrompt] = useState<boolean>(false);
  const hideCustomerSuccessPrompt = () => setShowCustomerSuccessPrompt(false);

  const hasMadeInitialFetch = useSelector(selectCustomerListFetchStatus);
  const customerList = useSelector(selectCustomerList);

  const existsByEmail = (email: string) =>
    customerList.map((customer) => customer.email.toLowerCase()).includes(email.toLowerCase());

  const schema = zod.object({
    firstName: zod.string().min(2, { message: "Name must be at least 2 characters long" }),
    lastName: zod.string().min(2, { message: "Last Name must be at least 2 characters long" }),
    email: zod
      .string()
      .email({ message: "Invalid email address" })
      .refine((val) => !(hasMadeInitialFetch && existsByEmail(val)), {
        message: "Customer with the same email already exists",
      }),
    password: zod.string().min(5, { message: "Password must be at least 5 characters long" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerModel>({ mode: "onSubmit", resolver: zodResolver(schema) });

  const onSubmit = (data: CustomerModel) => {
    webApiService
      .addCustomer(data)
      .then((res) => {
        const addedCustomer: CustomerModel = res.data;
        addedCustomer.coupons = [];
        if (hasMadeInitialFetch) {
          dispatch(addCustomerAction(addedCustomer));
        }
        setShowCustomerSuccessPrompt(true);
        notifyService.successPlainText("customer added successfully")
      })
      .catch((error) => {
        if (error?.code === "ERR_NETWORK") {
          navigate("/server/down");
        }
        notifyService.errorAxiosApiCall(error);
      });
  };

  return (
    <div className="CustomerAddForm">
      {showCustomerSuccessPrompt ? (
        <CustomerAddSuccessPrompt
          hideCustomerSuccessPrompt={hideCustomerSuccessPrompt}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <h2>New Customer</h2>
          <ul>
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
              <button type="submit" disabled={isSubmitting}>Add Customer</button>
            </li>
          </ul>
        </form>
      )}
    </div>
  );
}

export default CustomerAddForm;
