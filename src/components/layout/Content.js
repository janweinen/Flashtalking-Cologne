import React, { useEffect, useContext } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataContext from "../Context";
import styled from "styled-components";
import { firestoreDelete, firestoreUpdate, firestoreAdd } from "../Firebase";

const Main = styled.main`
  background-color: #ffffff;
  width: calc(100% - 40px);
  margin: 0 auto;
  margin-top: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
`;

const TableMenu = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e9eaeb;
  padding: 10px 20px;
`;

const SearchModule = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  input {
    border: none;
    font-size: 12px;
    height: 34px;
    padding-left: 10px;
  }
  input:focus {
    outline: none;
  }
`;

const NewEntryModule = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  button {
    outline: none;
    cursor: pointer;
    border: none;
    font-weight: 600;
  }
`;

const ButtonText = styled.div`
  color: #2d7ebf;
  font-size: 12px;
  display: inline-block;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: #2d7ebf;
  vertical-align: middle;
`;

const Table = styled.table`
  text-align: left;
  width: 100%;
  border-collapse: collapse;
  th {
    border-right: 1px solid #e9eaeb;
  }
  th:last-child {
    border-right: 0;
  }
  th:first-child {
    max-width: 32px;
  }
  td {
    border: 1px solid #e9eaeb;
  }
  tr:first-child td {
    border-top: 0;
  }
  tr td:first-child {
    border-left: 0;
  }
  tr:last-child td {
    border-bottom: 0;
  }
  tr td:last-child {
    border-right: 0;
  }
  th,
  td {
    font-size: 12px;
    padding: 10px;
  }
  thead {
    border-bottom: 1px solid #e9eaeb;
  }
  tr:hover {
    background-color: #d5eafa;
  }
  tr:hover:nth-child(even) {
    background-color: #d5eafa;
  }
  tr:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const ActionButton = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  font-weight: 600;
  padding: 0;
  background-color: transparent;
`;

const Content = () => {
  const data = useContext(DataContext);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = data.entries.filter(item =>
      Object.keys(item).some(key => item[key].includes(searchTerm))
    );
    setSearchResults(results);
  }, [searchTerm, data.entries]);

  const deleteItem = id => {
    firestoreDelete("Links", id);
  };

  const updateItem = async (e, item) => {
    if (e.target.textContent !== item[e.target.id]) {
      await firestoreUpdate("Links", item.id, {
        [e.target.id]: e.target.textContent,
        date: new Date().toLocaleString()
      });
    }
  };

  const test = async () => {
    const data = {
      client: "",
      branch: "",
      type: "",
      device: "",
      url: "",
      date: new Date().toLocaleString()
    };
    await firestoreAdd("Links", data);
  };

  return (
    <Main>
      <TableMenu>
        <SearchModule>
          <StyledIcon icon={["fas", "search"]} />
          <form id="search">
            <input
              id="input"
              placeholder="Search"
              type="text"
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
        </SearchModule>
        <Modal
          activator={({ setShow }) => (
            <NewEntryModule>
              <StyledIcon icon={["fas", "plus-circle"]} />
              <button onClick={test}>
                <ButtonText>NEW ENTRY</ButtonText>
              </button>
            </NewEntryModule>
          )}
        />
      </TableMenu>
      <Table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Client</th>
            <th>Type</th>
            <th>Branch</th>
            <th>Format</th>
            <th>Device</th>
            <th>Link</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(item => (
            <tr key={item.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td
                id="client"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={e => {
                  updateItem(e, item);
                }}
              >
                {item.client}
              </td>
              <td
                id="type"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={e => {
                  updateItem(e, item);
                }}
              >
                {item.type}
              </td>
              <td
                id="branch"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={e => {
                  updateItem(e, item);
                }}
              >
                {item.branch}
              </td>
              <td
                id="format"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={e => {
                  updateItem(e, item);
                }}
              >
                {item.format}
              </td>
              <td
                id="device"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={e => {
                  updateItem(e, item);
                }}
              >
                {item.device}
              </td>
              <td
                id="url"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={e => {
                  updateItem(e, item);
                }}
              >
                {item.url}
              </td>
              <td>{item.date}</td>
              <td>
                <a href={item.url}>
                  <StyledIcon icon={["fas", "external-link-alt"]} fixedWidth />
                </a>
                <ActionButton
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you wish to delete this item?"
                      )
                    )
                      deleteItem(item.id);
                  }}
                >
                  <StyledIcon icon={["fas", "trash-alt"]} fixedWidth />
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Main>
  );
};

export default Content;
