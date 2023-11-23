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

  useEffect(() => {
    allianceServices
      .getAllAlliances()
      .then((response) => setAlliances(response));
  }, []);

  const getVillages = (player: string) => {
    allianceServices
      .getPlayerVillages(player)
      .then((response) => setVillages(response));
  };

  const setOffTag = (fieldID) => {
    allianceServices
  }

  //players.map((player) => getVillages(player.Playername));

  console.log(villages);
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
          <thead>player name</thead>
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
          <td>village name</td>
          <td>Population</td>
          <td>coordinates</td>
          <td>OFF</td>
          <td>DEF</td>
          <td>Target</td>
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
                <Form onChange={() => {}}>
                  <Form.Check></Form.Check>
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Check></Form.Check>
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Check></Form.Check>
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
