import React, { useEffect, useContext, useState } from "react";
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

const TableContainer = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  margin: auto;
  overflow: auto;
  max-height: calc(100vh - 162px);
`;

const Table = styled.table`
  width: 100%;
  min-width: 1280px;
  margin: auto;
  border-collapse: collapse;

  th {
    border-right: 1px solid #e9eaeb;
  }
  th:last-child {
    border-right: 0;
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
    padding: 10px;
    font-size: 12px;
    vertical-align: top;
  }

  thead th {
    text-align: left;
    background-color: #ffffff;
    color: #000000;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    border-bottom: 1px solid #e9eaeb;
  }
  /* safari and ios need the tfoot itself to be position:sticky also */
  tfoot,
  tfoot th,
  tfoot td {
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    background: #666;
    color: #fff;
    z-index: 4;
  }

  td:focus {
    background: #374047;
    color: #ffffff;
    outline: none;
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
  const dataContext = useContext(DataContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const init = async () => {
      const results = await dataContext.entries.filter(item =>
        Object.keys(item).some(key => item[key].includes(searchTerm))
      );
      setSearchResults(results);
      setLoading(false);
    };
    init();
  }, [searchTerm, dataContext.entries]);

  const deleteItem = item => {
    firestoreDelete("Links", item.id);
    fetch("delete.php", {
      method: "POST",
      data: {
        file: "upload/" + item.name
      }
    }).then(response => {
      console.log(response, item.name);
    });
  };

  const updateItem = async (e, item) => {
    if (e.target.textContent !== item[e.target.id]) {
      await firestoreUpdate("Links", item.id, {
        [e.target.id]: e.target.textContent,
        created: new Date().toLocaleString()
      });
    }
  };

  const test = async () => {
    dataContext.setContent.setContent("Demo");
    const data = {
      client: "",
      branch: "",
      type: "Demo",
      device: "",
      url: "",
      date: new Date().getTime().toString(),
      created: new Date().toLocaleString()
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
        {/*
        <Modal
          activator={({ setShow }) => (
            <NewEntryModule>
              <StyledIcon icon={["fas", "plus-circle"]} />
              <button onClick={test}>
                <ButtonText>NEW DEMOLINK</ButtonText>
              </button>
            </NewEntryModule>
          )}
        />
        */}
      </TableMenu>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Client</th>
              <th>Branch</th>
              <th>Format</th>
              <th>Device</th>
              <th>Link</th>
              <th>Last Changed</th>
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
                <td>{item.created}</td>
                <td>
                  <a href={item.url}>
                    <StyledIcon
                      icon={["fas", "external-link-alt"]}
                      fixedWidth
                    />
                  </a>
                  <ActionButton
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?"
                        )
                      )
                        deleteItem(item);
                    }}
                  >
                    <StyledIcon icon={["fas", "trash-alt"]} fixedWidth />
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Main>
  );
};

export default Content;
