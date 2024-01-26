import { HashLoader } from "react-spinners";

const Loader = ({}) => {
  return (
    <div className="flex items-center justify-center">
      <HashLoader
        color={"#000"}
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"
        size={150}
      />
    </div>
  );
};

export default Loader;
