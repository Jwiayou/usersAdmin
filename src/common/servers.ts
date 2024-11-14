import { message } from "antd";
import { User } from "./data";

function userPromiseFn<T = any>(fn: (users: User[]) => any): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const strUsers = localStorage.getItem("users");
      const users: User[] = strUsers ? JSON.parse(strUsers) : [];
      resolve(fn(users));
    }, 2000);
  });
}

export interface GetUsersRequest {
  current: number;
  pageSize: number;
}

export interface GetUsersResponse {
  total: number;
  list: User[];
}

export const getUsers = ({
  current,
  pageSize,
}: GetUsersRequest): Promise<GetUsersResponse> =>
  userPromiseFn((users) => {
    return {
      list: users.splice(current - 1, current - 1 + pageSize),
      total: users.length,
    };
  });

// export const removeUserById = (id: string) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const users = getUsersFromLocal();
//       resolve({
//         list: users,
//         total: users.length,
//       });
//     }, 2000);
//   });
// };
