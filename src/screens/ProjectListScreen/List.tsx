import React from "react";
import { User } from "./SearchPanel";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

export interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>person</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.name}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "unknown"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
