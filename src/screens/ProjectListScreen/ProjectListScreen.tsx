import React, { useEffect, useState } from "react";
import qs from "qs";
import { SearchPanel } from "./SearchPanel";
import { List, ListProps } from "./List";
import { cleanObject, useDebounce } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL || "";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const [list, setList] = useState<ListProps["list"]>([]);
  const [users, setUsers] = useState<ListProps["users"]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`)
      .then(async (response) => {
        if (response.ok) {
          const responseJson = (await response.json()) as ListProps["list"];
          setList(responseJson);
        }
      })
      .catch((err) => console.log(err));
  }, [debouncedParam]);

  useEffect(() => {
    fetch(`${apiUrl}/users`)
      .then(async (response) => {
        if (response.ok) {
          setUsers((await response.json()) as ListProps["users"]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
