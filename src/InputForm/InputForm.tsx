/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import "./style.css";
// import DropdownList from "react-widgets/DropdownList";]

export interface IInputFormProps {
  modalIsOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setData: (value: any) => void;
  defaultValue: any;
  flag: number | undefined;
  setFlag: (value: number | undefined) => void;
  setDefaultValue: (value: any) => void;
}
export const InputForm = ({
  modalIsOpen,
  setIsOpen,
  setData,
  defaultValue,
  flag,
  setFlag,
  setDefaultValue,
}: IInputFormProps) => {
  console.log(defaultValue, "default value");
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    reset,
  } = useForm();
  const previousTasks: any = JSON.parse(
    localStorage.getItem("formValues") || "[]"
  );
  const customStyles = {
    content: {
      zIndex: "100",
      width: "50%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  useEffect(() => {
    if (defaultValue !== undefined) {
      reset(defaultValue);
    } else {
      resetField("title", undefined);
      resetField("description", undefined);
      resetField("start_date", undefined);
      resetField("end_date", undefined);
      resetField("priority", undefined);
      resetField("status", undefined);
      resetField("assigned_person", undefined);
      resetField("sub_task", undefined);
    }
  }, [defaultValue]);

  Modal.setAppElement("#root");
  function closeModal() {
    resetField("title", undefined);
    resetField("description", undefined);
    resetField("start_date", undefined);
    resetField("end_date", undefined);
    resetField("priority", undefined);
    resetField("status", undefined);
    resetField("assigned_person", undefined);
    resetField("sub_task", undefined);
    setDefaultValue(undefined);
    setIsOpen(false);
  }
  const submit = (values: any) => {
    if (flag !== undefined) {
      const previousData: any = JSON.parse(
        localStorage.getItem("formValues") || "[]"
      );
      previousData[flag] = values;
      setData(previousData);
      const stringifyData = JSON.stringify(previousData);
      localStorage.setItem("formValues", stringifyData);
      setFlag(undefined);
      setDefaultValue({});
    } else {
      const previousData: any = JSON.parse(
        localStorage.getItem("formValues") || "[]"
      );
      previousData.push(values);
      setData(previousData);
      const stringifyData = JSON.stringify(previousData);
      localStorage.setItem("formValues", stringifyData);
    }
    closeModal();
  };
  return (
    <div className="task">
      <button
        className="add-task"
        onClick={() => {
          setFlag(undefined);
          setIsOpen(true);
        }}
      >
        Add Task
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Task Input"
      >
        <div className="modal-close">
          <button className="modal-close-btn" onClick={closeModal}>
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit((data) => submit(data))}>
          <div className="inputs">
            <div className="title">
              <label className="title-label">Title *</label>
              <div>
                <input
                  className="title-input"
                  placeholder="Type Here"
                  {...register("title", { required: true, maxLength: 100 })}
                />
              </div>
              {errors.title && (
                <p className="title-error">Title is required.</p>
              )}
            </div>
            <div className="title">
              <label className="title-label">Description *</label>
              <textarea
                className="title-input"
                placeholder="Type Here"
                {...register("description", { required: true, maxLength: 150 })}
              />
              {errors.description && (
                <p className="description-error">Description is required.</p>
              )}
            </div>
          </div>
          <div className="inputs">
            <div className="title">
              <label className="title-label">Start Date *</label>
              <div>
                <input
                  type="date"
                  className="title-input"
                  {...register("start_date", { required: true })}
                />
              </div>
              {errors.start_date && (
                <p className="title-error">Start date is required.</p>
              )}
            </div>
            <div className="title">
              <label className="title-label">End date *</label>
              <input
                type="date"
                className="title-input"
                {...register("end_date", { required: true })}
              />
              {errors.end_date && (
                <p className="description-error">End date is required.</p>
              )}
            </div>
          </div>
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <label className="title-label">Priority *</label>
            <label htmlFor="field-low">
              <input
                {...register("priority")}
                type="radio"
                value="low"
                id="field-low"
              />
              Low
            </label>
            <label htmlFor="field-medium">
              <input
                {...register("priority")}
                type="radio"
                value="medium"
                id="field-medium"
              />
              Medium
            </label>
            <label htmlFor="field-high">
              <input
                {...register("priority")}
                type="radio"
                value="high"
                id="field-high"
              />
              High
            </label>
          </div>
          <div className="select-field">
            <label htmlFor="func" className="select-field-label">
              Status*
            </label>
            <select
              className="select-field-input"
              {...register("status", { required: true })}
            >
              <option value="to-do">To-do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {errors.status && <p> This is required</p>}
          </div>
          <div className="select-field">
            <label htmlFor="func" className="select-field-label">
              Assigned Person*
            </label>
            <select
              className="select-field-input"
              {...register("assigned_person", { required: true })}
            >
              <option value="person1">Person 1</option>
              <option value="person2">Person 2</option>
              <option value="person3">Person 3</option>
            </select>
            {errors.assigned_person && <p> This is required</p>}
          </div>
          <div className="select-field">
            <label htmlFor="func" className="select-field-label">
              SubTask
            </label>
            <select className="select-field-input" {...register("sub_task")}>
              {previousTasks?.length > 0 &&
                previousTasks?.map((task: any, index: number) => {
                  return (
                    <option key={index} value={task?.title}>
                      {task?.title}
                    </option>
                  );
                })}
            </select>
            {errors.sub_task && <p> This is required</p>}
          </div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};
