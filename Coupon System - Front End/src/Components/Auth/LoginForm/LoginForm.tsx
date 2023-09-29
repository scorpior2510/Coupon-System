import "./LoginForm.css";
// ----------------------------------------------
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
// ----------------------------------------------
import { ClientType, LoginReqModel, UserModel } from "../../../Models";
import { notifyService, webApiService } from "../../../Services";
import { userLoggedInAction } from "../../../Redux";

function LoginForm(): JSX.Element {
  const params = useParams();
  const clientType = params.clientType;
  const clientTypeParamToClientType = () => {
    switch (clientType) {
      case "admin":
        return ClientType.ADMINISTRATOR;
      case "company":
        return ClientType.COMPANY;
      case "customer":
        return ClientType.CUSTOMER;
      default:
        return ClientType.NONE;
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = zod.object({
    email: zod.string().email({ message: "Invalid email address" }),
    password: zod
      .string()
      .min(5, { message: "Password must be at least 5 characters long" }),
    clientType: zod
      .nativeEnum(ClientType)
      .refine((data) => data !== ClientType.NONE, {
        message: "Please Select Client Type",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginReqModel>({
    defaultValues: { clientType: clientTypeParamToClientType() },
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: LoginReqModel) => {
    return webApiService
      .login(data)
      .then((res) => {
        const loggedInUser: UserModel = {
          email: data.email,
          token: res.data.toString(),
          clientType: data.clientType,
        };
        dispatch(userLoggedInAction(loggedInUser));
        switch (loggedInUser.clientType) {
          case ClientType.ADMINISTRATOR:
            navigate("/api/admin/home");
            break;
          case ClientType.CUSTOMER:
            navigate("/api/customer/home");
            break;
          case ClientType.COMPANY:
            navigate("/api/company/home");
            break;
          default:
            notifyService.errorPlainText(
              "Something went wrong while trying to navigate to home page"
            );
        }
      })
      .catch((error) => {
        if (error?.code === "ERR_NETWORK") {
          navigate("/server/down");
        }
        notifyService.errorAxiosApiCall(error);
      });
  };

  return (
    <div className="LoginForm form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Log In</h2>
        <ul>
          {clientType !== undefined ? (
            <input
              {...register("clientType")}
              value={clientTypeParamToClientType()}
              hidden
            />
          ) : (
            <li className="client-type-choice-container">
              <input
                {...register("clientType")}
                type="radio"
                id="clientType-administrator"
                name="clientType"
                value={ClientType.ADMINISTRATOR}
              />
              <label htmlFor="clientType-administrator">Administrator</label>
              <input
                {...register("clientType")}
                type="radio"
                id="clientType-company"
                name="clientType"
                value={ClientType.COMPANY}
              />
              <label htmlFor="clientType-company">Company</label>
              <input
                {...register("clientType")}
                type="radio"
                id="clientType-customer"
                name="clientType"
                value={ClientType.CUSTOMER}
              />
              <label htmlFor="clientType-customer">Customer</label>
              <p className="form-error-message">
                {" "}
                {errors.clientType?.message}
              </p>
            </li>
          )}
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
            <button type="submit" className="btn btn-form btn-200" disabled={isSubmitting}>
              Log in
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default LoginForm;
