import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { LendingPosition, BorrowingPosition, Transaction } from "@shared/schema";

export interface DashboardData {
  lending: LendingPosition[];
  borrowing: BorrowingPosition[];
  transactions: Transaction[];
}

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
    queryFn: getQueryFn({ on401: "throw" }),
    retry: false,
  });
}
