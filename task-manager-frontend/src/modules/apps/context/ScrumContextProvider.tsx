import { ReactNode, createContext, useContext } from "react";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import type {
  BoardObjType,
  LabelObjType,
  MemberObjType,
} from "@crema/types/models/apps/ScrumbBoard";

export type ScrumContextType = {
  boardList: BoardObjType[];
  labelList: LabelObjType[];
  memberList: MemberObjType[];
};

export type ScrumActionContextType = {
  setData: (data: BoardObjType[]) => void;
};

const ContextState: ScrumContextType = {
  boardList: [],
  labelList: [],
  memberList: [],
};

const ScrumContext = createContext<ScrumContextType>(ContextState);
const ScrumActionsContext = createContext<ScrumActionContextType>({
  setData: (data: BoardObjType[]) => {
    console.log(data);
  },
});

export const useScrumContext = () => useContext(ScrumContext);

export const useScrumActionsContext = () => useContext(ScrumActionsContext);

type Props = {
  children: ReactNode;
};

export const ScrumContextProvider = ({ children }: Props) => {
  // Board list load từ đúng endpoint backend
  const [{ apiData: boardList }, { setData }] = useGetDataApi<BoardObjType[]>(
    "/scrumboard/board/list",
    []
  );

  // Label list dùng static data — backend không có endpoint global label list
  const labelList: LabelObjType[] = [
    { id: 1, name: "Lỗi", type: 1, color: "#f44336" },
    { id: 2, name: "Tính năng", type: 2, color: "#2196f3" },
    { id: 3, name: "Cải tiến", type: 3, color: "#4caf50" },
    { id: 4, name: "Tài liệu", type: 4, color: "#ff9800" },
    { id: 5, name: "Thiết kế", type: 5, color: "#9c27b0" },
    { id: 6, name: "Kiểm thử", type: 6, color: "#00bcd4" },
    { id: 7, name: "Ưu tiên cao", type: 7, color: "#e91e63" },
    { id: 8, name: "Ưu tiên thấp", type: 8, color: "#607d8b" },
  ];

  // Member list không cần global — mỗi board load riêng qua /scrumboard/member/{boardId}
  const memberList: MemberObjType[] = [];

  return (
    <ScrumContext.Provider
      value={{
        boardList,
        labelList,
        memberList,
      }}
    >
      <ScrumActionsContext.Provider
        value={{
          setData,
        }}
      >
        {children}
      </ScrumActionsContext.Provider>
    </ScrumContext.Provider>
  );
};
export default ScrumContextProvider;
