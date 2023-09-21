import "./LogoutConfirmation.css";
// ----------------------------------------------
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// ----------------------------------------------
import { LogoutHandler } from "..";

function LogoutConfirmation(): JSX.Element {
  
  const [logoutStatus, setLogoutStatus] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleLogout = () => setLogoutStatus(true);
  const handleCancel = () => navigate(-1);

  return (
    <div className="LogoutConfirmation logout-confirmation-container">
      {logoutStatus ? (
        <LogoutHandler />
      ) : (
        <>
          <h2>Log out</h2>
          <p>Are you sure you want to Log out?</p>
          <button onClick={handleLogout}>Log out</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default LogoutConfirmation;
