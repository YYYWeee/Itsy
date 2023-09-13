import "./spinner.css";
import { Oval } from "react-loader-spinner";

function Spinner() {
  return (
    <div className="spinner-container">
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}

      />
    </div>
  );
}

export default Spinner;
