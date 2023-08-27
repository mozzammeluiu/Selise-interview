/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import "./App.css";
import { InputForm } from "./InputForm/InputForm";
import { TaskList } from "./TaskList/TaskList";
interface IDataType {
  title: string;
}
function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [defaultValue, setDefaultValue] = useState<any>();
  const [flag, setFlag] = useState<number | undefined>();
  const previousData: [IDataType] = JSON.parse(
    localStorage.getItem("formValues") || "[]"
  );
  const [data, setData] = useState(previousData);
  return (
    <div className="container">
      <div className="form">
        <InputForm
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          setData={setData}
          defaultValue={defaultValue}
          flag={flag}
          setFlag={setFlag}
          setDefaultValue={setDefaultValue}
        />
      </div>
      <div className="list">
        <TaskList
          modalIsOpen={modalIsOpen}
          data={data}
          setIsOpen={setIsOpen}
          setDefaultValue={setDefaultValue}
          setFlag={setFlag}
        />
      </div>
    </div>
  );
}

export default App;
