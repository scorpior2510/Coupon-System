import "./CompanyAddForm.css";
// ----------------------------------------------
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
// ----------------------------------------------
import { notifyService, webApiService } from "../../../Services";
import { CompanyModel } from "../../../Models";
import {
  addCompanyAction,
  selectCompanyList,
  selectCompanyListFetchStatus,
} from "../../../Redux";
import { CompanyAddSuccessPrompt } from "..";
import { useNavigate } from "react-router-dom";

function CompanyAddForm(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCompanySuccessPrompt, setShowCompanySuccessPrompt] =
    useState<boolean>(false);
  const hideCompanySuccessPrompt = () => setShowCompanySuccessPrompt(false);

  const hasMadeInitialFetch = useSelector(selectCompanyListFetchStatus);
  const companyList = useSelector(selectCompanyList);

  const existsByEmail = (email: string) =>
    companyList.map((company) => company.email.toLowerCase()).includes(email.toLowerCase());
  const existsByName = (name: string) =>
    companyList.map((company) => company.name.toLowerCase()).includes(name.toLowerCase());

  const schema = zod.object({
    name: zod
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .refine((val) => !(hasMadeInitialFetch && existsByName(val)), {
        message: "Company with the same name already exists",
      }),
    email: zod
      .string()
      .email({ message: "Invalid email address" })
      .refine((val) => !(hasMadeInitialFetch && existsByEmail(val)), {
        message: "Company with the same email already exists",
      }),
    password: zod
      .string()
      .min(5, { message: "Password must be at least 5 characters long" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyModel>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: CompanyModel) => {
    webApiService
      .addCompany(data)
      .then((res) => {
        const addedCompany: CompanyModel = res.data;
        addedCompany.coupons = [];
        if (hasMadeInitialFetch) {
          dispatch(addCompanyAction(addedCompany));
        }
        setShowCompanySuccessPrompt(true);
        notifyService.successPlainText("company added successfully");
      })
      .catch((error) => {
        if (error?.code === "ERR_NETWORK") {
          navigate("/server/down");
        }
        notifyService.errorAxiosApiCall(error);
      });
  };

  return (
    <div className="CompanyAddForm">
      {showCompanySuccessPrompt ? (
        <CompanyAddSuccessPrompt
          hideCompanySuccessPrompt={hideCompanySuccessPrompt}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <h2>New Company</h2>
          <ul>
            <li>
              <label htmlFor="name">
                <p>Name: </p>
              </label>
              <input
                {...register("name")}
                id="name"
                type="text"
                placeholder="Name"
              />
              <p className="form-error-message"> {errors.name?.message}</p>
            </li>
            <li>
              <label htmlFor="email">
                <p>Email: </p>
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Email"
              />
              <p className="form-error-message"> {errors.email?.message}</p>
            </li>
            <li>
              <label htmlFor="password">
                <p>Password: </p>
              </label>
              <input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Password"
              />
              <p className="form-error-message"> {errors.password?.message}</p>
            </li>
            <li>
              <button type="submit" disabled={isSubmitting}>
                Add Company
              </button>
            </li>
          </ul>
        </form>
      )}
    </div>
  );
}

export default CompanyAddForm;
