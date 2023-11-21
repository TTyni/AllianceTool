import { useState, useEffect } from "react";
import allianceServices from "./allianceServices";
import "./AllianceList.css";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/Container";
import { Dropdown, Row } from "react-bootstrap";



const AllianceList = () => {
  const [players, setPlayers] = useState([{Playername:"test"}]);
  const [Villages, setVillages] = useState([{
    Alliance: "test",
    AllianceID: 0,
    Capital: false,
    City: null,
    Harbor: null,
    PlayerID: 0,
    Playername: "test",
    Population: 0,
    Region: null,
    Tribe: 1,VictoryPoints: null,
    VillageID: 0,
    Villagename: "test",
    X: 0,
    Y: 0,
    fieldID: 0
  }]);

  const [searchQuery, setsearchQuery] = useState("");
  const [alliances, setAlliances] = useState([{AllianceID:0, Alliance:""}]);
  const searchedAlliances = alliances.filter((item) => item.Alliance.includes(searchQuery));


  useEffect(() => {
    allianceServices.getAllAlliances().then((response) => setAlliances(response));
  },[]);

  const villages = (player: string) => {
    console.log(allianceServices.getPlayerVillages(player))
  }
  console.log(players);
  return (
    <Container>

    <Row>
    <label id="SearchLabel">Search</label>
      <input
        type="text"
        id="searchForm"
        onChange={(e) => setsearchQuery(e.target.value)}
      />


      <Dropdown>
        <Dropdown.Toggle className="btn btn-secondary dropdown-toggle dropdownStyle"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown button
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {searchedAlliances.map((ally) =>
          <Dropdown.Item key={ally.AllianceID} onClick={() => allianceServices.getAlliance(ally.Alliance).then((response) => setPlayers(response))}>{ally.Alliance}</Dropdown.Item>
          )}
          <Dropdown.Divider/>

        </Dropdown.Menu>
      </Dropdown>

    </Row>

      <Table>
          <thead>
            player name
          </thead>
          <tbody>
            {players.map((player) => <tr><td>{player.Playername}</td></tr>)}
          </tbody>
      </Table>

    </Container>


  );
};

export default AllianceList;