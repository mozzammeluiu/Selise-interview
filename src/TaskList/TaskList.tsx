/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import DraggableList from "react-draggable-lists";
import "./style.css";
export interface ITaskListProps {
  modalIsOpen: boolean;
  data: IDataType[];
  setIsOpen: (value: boolean) => void;
  setDefaultValue: (value: any) => void;
  setFlag: (value: number | undefined) => void;
}
interface IDataType {
  title: string;
}

export const TaskList = ({
  modalIsOpen,
  data,
  setIsOpen,
  setDefaultValue,
  setFlag,
}: ITaskListProps) => {
  const handleEdit = (index: number) => {
    setIsOpen(true);
    const previousData: [IDataType] = JSON.parse(
      localStorage.getItem("formValues") || "[]"
    );
    const data = previousData.find((_, i) => {
      return index === i;
    });
    setFlag(index);
    setDefaultValue(data);
  };
  return (
    <div className="task-list">
      <h4>Task List</h4>
      <div style={modalIsOpen ? { position: "relative", zIndex: -1 } : {}}>
        {!modalIsOpen && (
          <DraggableList width={300} height={50} rowSize={1}>
            {data.length > 0 ? (
              data.map(({ title }, index) => (
                <li key={index} onClick={() => handleEdit(index)}>{`${
                  index + 1
                }.  ${title}`}</li>
              ))
            ) : (
              <div>No Task Added Yet!</div>
            )}
          </DraggableList>
        )}
      </div>
    </div>
  );
};
