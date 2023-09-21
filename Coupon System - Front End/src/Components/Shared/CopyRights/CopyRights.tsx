import "./CopyRights.css";

function CopyRights(): JSX.Element {
  const year = new Date().getFullYear();
  return (
    <div className="CopyRights">
      <p>&copy; {`${year} Or Cohen. All Rights Reserved.`}</p>
    </div>
  );
}

export default CopyRights;
