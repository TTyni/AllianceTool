/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import allianceServices from "./allianceServices";
import "./AllianceList.css";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/Container";
import { Button, Dropdown, Form, Row } from "react-bootstrap";

const AllianceList = () => {
  const [players, setPlayers] = useState([{ Playername: "test" }]);
  const [villages, setVillages] = useState([
    {
      Alliance: "test",
      AllianceID: 0,
      Capital: false,
      City: null,
      Harbor: null,
      PlayerID: 0,
      Playername: "test",
      Population: 0,
      Region: null,
      Tribe: 1,
      VictoryPoints: null,
      VillageID: 0,
      VillageName: "test",
      X: 0,
      Y: 0,
      fieldID: 0,
    },
  ]);

  const [searchQuery, setsearchQuery] = useState("");
  const [alliances, setAlliances] = useState([{ AllianceID: 0, Alliance: "" }]);
  const searchedPlayers = players.filter((item) =>
    item.Playername.includes(searchQuery)
  );
  const [tags, setTags] = useState([
    { fieldID: 0, off: false, def: false, target: false },
  ]);
  const [allFields, setAllFields] = useState([
    {
      Alliance: "test",
      AllianceID: 0,
      Capital: false,
      City: null,
      Harbor: null,
      PlayerID: 0,
      Playername: "test",
      Population: 0,
      Region: null,
      Tribe: 1,
      VictoryPoints: null,
      VillageID: 0,
      VillageName: "test",
      X: 0,
      Y: 0,
      fieldID: 68,
    },
  ]);

  useEffect(() => {
    allianceServices
      .getAllAlliances()
      .then((response) => setAlliances(response));
    getAll();
    getTags();
  }, []);

  const getVillages = (player: string) => {
    allianceServices
      .getPlayerVillages(player)
      .then((response) => setVillages(response));
  };

  const getTags = () => {
    allianceServices.getAllTags().then((response) => setTags(response));
  };

  const tagToggle = (
    fieldID: number,
    off: boolean,
    def: boolean,
    target: boolean
  ) => {
    if (tags.find((tag) => tag.fieldID == fieldID)) {
      allianceServices.updateTags(fieldID, off, def, target);
    } else {
      allianceServices.insertNewTags(fieldID, off, def, target);
    }
    getTags();
    console.log(tags);
  };

  const find = (id) => {
    const found = tags.find((i) => i.fieldID === id);
    return found;
  };

  const getAll = () => {
    allianceServices.getAll().then((response) => setAllFields(response));
  };

  // const test = () => {
  //   allFields.map((field) => tagToggle(field.fieldID, false, false, false));
  // };

  return (
    <Container>
      <Row>
        <Dropdown className="m-3">
          <Dropdown.Toggle
            className="btn btn-secondary dropdown-toggle dropdownStyle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {alliances.map((ally) => (
              <Dropdown.Item
                key={ally.AllianceID}
                onClick={() =>
                  allianceServices
                    .getAlliance(ally.Alliance)
                    .then((response) => setPlayers(response))
                }
              >
                {ally.Alliance}
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
          </Dropdown.Menu>
        </Dropdown>
      </Row>
      <label id="SearchLabel">Search</label>
      <input
        className="col-2"
        type="text"
        id="searchForm"
        onChange={(e) => setsearchQuery(e.target.value)}
      />
      <div className="player-list col-4">
        <Table>
          <thead>
            <tr>
              <td>Playername</td>
            </tr>
          </thead>
          <tbody>
            {searchedPlayers.map((player) => (
              <tr>
                <td>{player.Playername}</td>
                <td>
                  <Button
                    onClick={() => {
                      getVillages(player.Playername);
                    }}
                  >
                    Show villages
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Table className="col-3">
        <thead>
          <tr>
            <td>village name</td>
            <td>Population</td>
            <td>coordinates</td>
            <td>OFF</td>
            <td>DEF</td>
            <td>Target</td>
          </tr>
        </thead>
        <tbody>
          {villages.map((village) => (
            <tr>
              <td className="col-1">{village.VillageName}</td>
              <td className="col-1">{village.Population}</td>
              <td className="col-1">
                {village.X}|{village.Y}
              </td>
              <td>
                <Form>
                  <Form.Check
                    defaultChecked={find(village.fieldID)?.off}
                    onChange={() => {
                      const id = tags.findIndex(
                        (i) => i.fieldID === village.fieldID
                      );
                      tagToggle(
                        village.fieldID,
                        !tags[id].off,
                        tags[id].def,
                        tags[id].target
                      );
                    }}
                  ></Form.Check>
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Check
                    defaultChecked={find(village.fieldID)?.def}
                    onChange={() => {
                      const id = tags.findIndex(
                        (i) => i.fieldID === village.fieldID
                      );
                      tagToggle(
                        village.fieldID,
                        tags[id].off,
                        !tags[id].def,
                        tags[id].target
                      );
                    }}
                  ></Form.Check>
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Check
                    defaultChecked={find(village.fieldID)?.target}
                    onChange={() => {
                      const id = tags.findIndex(
                        (i) => i.fieldID === village.fieldID
                      );
                      tagToggle(
                        village.fieldID,
                        tags[id].off,
                        tags[id].def,
                        !tags[id].target
                      );
                    }}
                  ></Form.Check>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllianceList;
