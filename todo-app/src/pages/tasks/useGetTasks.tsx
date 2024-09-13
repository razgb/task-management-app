import useModal from "@/stores/modal/useModal";
import { useQuery } from "react-query";
import { getTasksFromFirebase } from "./functions/async/getTasksFromFirebase";

export default function useGetTasks() {
  const { openModal } = useModal();
  const { data: tasks, isFetching: loading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasksFromFirebase,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retryDelay: 500,
    retry: (failureCount) => {
      if (failureCount < 4) return true; // retries query

      openModal(
        "error",
        "Error loading your data. Check your internet connection and try again.",
      );

      return false; // stops query
    },
  });

  return {
    tasks,
    loading,
  };
}
