export type User = {
  name: string;
  userId: number;
  role: string;
};

export type LoansType = {
  id: number;
  title: string;
  writer: string;
  reservation_date: string;
  due_date: string;
  return_date?: string | null;
};

export type Book = {
  id: number;
  title: string;
  writer: string;
  publishing_date: string;
  available_copies: number;
  total_copies: number;
};
