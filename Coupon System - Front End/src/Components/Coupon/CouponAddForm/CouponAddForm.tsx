import { useState } from "react";
import "./CouponAddForm.css";
// ----------------------------------------------
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------
import {
  addCouponAction,
  selectCompany,
  selectCompanyFetchStatus,
} from "../../../Redux";
import { Category, CouponModel } from "../../../Models";
import { webApiService, notifyService } from "../../../Services";
import { CouponAddSuccessPrompt } from "..";

function CouponAddForm(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showCouponSuccessPrompt, setShowCouponSuccessPrompt] =
    useState<boolean>(false);
  const hideCouponSuccessPrompt = () => setShowCouponSuccessPrompt(false);

  const hasMadeInitialFetch = useSelector(selectCompanyFetchStatus);
  const companyCoupons = useSelector(selectCompany).coupons;

  const existsByTitle = (title: string) =>
    companyCoupons
      .map((coupon) => coupon.title.toLowerCase())
      .includes(title.toLowerCase());

  const schema = zod
    .object({
      category: zod
        .string()
        .refine((value) => value !== "", { message: "Please choose category" }),
      title: zod
        .string()
        .min(2, { message: "Title must be at least 2 characters long" })
        .refine((val) => !(hasMadeInitialFetch && existsByTitle(val)), {
          message: "coupon with the same title already exists",
        }),
      description: zod
        .string()
        .min(2, { message: "Description Can't be blank" }),
      startDate: zod.coerce
        .date()
        .min(new Date(), "Start Date must be a future date"),
      endDate: zod.coerce
        .date()
        .min(new Date(), "End Date must be a future date"),
      amount: zod
        .number()
        .refine((num) => num > 0, { message: "Amount must be positive" }),
      price: zod
        .number()
        .refine((num) => num > 0, { message: "Price must be positive" }),
    })
    .refine((data) => data.endDate > data.startDate, {
      message: "End date cannot be before start date",
      path: ["endDate"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CouponModel>({ mode: "onSubmit", resolver: zodResolver(schema) });

  const onSubmit = (data: CouponModel) => {
    data.id = 0;
    data.image = "https://www.orcouponsystem.com/pub/media/photoarchive/no_picture_available.jpg";
    webApiService
      .addCoupon(data)
      .then((res) => {
        const addedCoupon: CouponModel = res.data;
        if (hasMadeInitialFetch) {
          dispatch(addCouponAction(addedCoupon));
        }
        setShowCouponSuccessPrompt(true);
        notifyService.successPlainText("coupon added successfully");
      })
      .catch((error) => {
        if (error?.code === "ERR_NETWORK") {
          navigate("/server/down");
        }
        notifyService.errorAxiosApiCall(error);
      });
  };

  return (
    <div className="CouponAddForm">
      {showCouponSuccessPrompt ? (
        <CouponAddSuccessPrompt
          hideCouponSuccessPrompt={hideCouponSuccessPrompt}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <h2>New Coupon</h2>
          <ul>
            <li>
              <label htmlFor="category">
                <p>Category: </p>
              </label>
              <select {...register("category")} id="category">
                <option value="">Choose Category</option>
                <option value={Category.ELECTRICITY}>Electricity</option>
                <option value={Category.FOOD}>Food</option>
                <option value={Category.VACATION}>Vacation</option>
                <option value={Category.HOME_FURNITURE}>Home Furniture</option>
                <option value={Category.CLOTHING}>Clothing</option>
                <option value={Category.TOYS}>Toys</option>
                <option value={Category.BOOKS}>Books</option>
                <option value={Category.COMPUTERS_AND_PHONES}>
                  Computers & Phones
                </option>
                <option value={Category.SPA_AND_BEAUTY}>Spa & Beauty</option>
              </select>
              <p className="form-error-message"> {errors.category?.message}</p>
            </li>
            <li>
              <label htmlFor="title">
                <p>Title: </p>
              </label>
              <input
                {...register("title")}
                id="title"
                type="text"
                placeholder="Title"
              />
              <p className="form-error-message"> {errors.title?.message}</p>
            </li>
            <li>
              <label htmlFor="description">
                <p>Description: </p>
              </label>
              <textarea
                {...register("description")}
                id="description"
                placeholder="Description"
                rows={3}
              ></textarea>
              <p className="form-error-message">
                {" "}
                {errors.description?.message}
              </p>
            </li>
            <li>
              <label htmlFor="startDate">
                <p>Start Date: </p>
              </label>
              <input
                {...register("startDate")}
                id="startDate"
                type="date"
                placeholder="Start Date"
              />
              <p className="form-error-message"> {errors.startDate?.message}</p>
            </li>
            <li>
              <label htmlFor="endDate">
                <p>End Date: </p>
              </label>
              <input
                {...register("endDate")}
                id="endDate"
                type="date"
                placeholder="End Date"
              />
              <p className="form-error-message"> {errors.endDate?.message}</p>
            </li>
            <li>
              <label htmlFor="amount">
                <p>Amount: </p>
              </label>
              <input
                {...register("amount", { valueAsNumber: true })}
                id="amount"
                type="number"
                placeholder="Amount"
              />
              <p className="form-error-message"> {errors.amount?.message}</p>
            </li>
            <li>
              <label htmlFor="price">
                <p>Price: </p>
              </label>
              <input
                {...register("price", { valueAsNumber: true })}
                id="price"
                type="number"
                placeholder="Price"
              />
              <p className="form-error-message"> {errors.price?.message}</p>
            </li>
            <li>
              <button type="submit" disabled={isSubmitting}>
                Add Coupon
              </button>
            </li>
          </ul>
        </form>
      )}
    </div>
  );
}

export default CouponAddForm;
