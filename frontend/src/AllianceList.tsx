/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import allianceServices from "./allianceServices";
import "./AllianceList.css";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/Container";
import { Button, Dropdown, Form, Row } from "react-bootstrap";

const AllianceList = () => {

  interface villageTags {
    Alliance: string;
    AllianceID: number;
    Capital: boolean;
    City: boolean | null;
    Harbor: boolean | null;
    PlayerID: number;
    Playername: string;
    Population: number;
    Region: boolean | null;
    Tribe: number;
    VictoryPoints: number | null;
    VillageID: number;
    Villagename: any;
    X: number;
    Y: number;
    fieldID: number;
    off: boolean;
    def: boolean;
    target: boolean;
  }

  const [players, setPlayers] = useState([{ Playername: "test" }]);
  const [villages, setVillages] = useState<villageTags[]>([
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
      Villagename: "test",
      X: 0,
      Y: 0,
      fieldID: 0,
      off: false,
      def: false,
      target: false,
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


  const getVillages = async (player: string) => {
    allianceServices
      .getPlayerVillages(player)
      .then((response) => setVillages(response));
  };


  const tagToggle = async (
    village: villageTags,
    off: boolean,
    def: boolean,
    target: boolean
  ) => {
    if (villages.find((tag) => tag.fieldID == village.fieldID)) {
      allianceServices.updateTags(village.fieldID, off, def, target);
    } else {
      allianceServices.insertNewTags(village.fieldID, off, def, target);
    }

    const updatedVillages = villages.map((vil) => {
      if(vil.fieldID === village.fieldID) {
          return {...vil, off: off, def, target };
        }
        else {
          return vil;
        }
      });
      setVillages(updatedVillages);
  };

  return (
    <Container className="main">
      <Row>
        <Dropdown className="m-3">
          <Dropdown.Toggle
            className="btn btn-secondary dropdown-toggle dropdownStyle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select alliance
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
              <tr key={player.Playername}>
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

      <Table className="col-3" id="table">
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
            <tr key={village.VillageID}>
              <td className="col-2">{village.Villagename}</td>
              <td className="col-1">{village.Population}</td>
              <td className="col-1">
                {village.X}|{village.Y}
              </td>
              <td>
                <Form>
                  <Form.Check
                    checked={village.off}
                    onChange={() => {
                      tagToggle(
                        village,
                        !village.off,
                        village.def,
                        village.target
                      );
                    }}
                  ></Form.Check>
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Check
                    checked={village.def}
                    onChange={() => {
                      tagToggle(
                        village,
                        village.off,
                        !village.def,
                        village.target
                      );
                    }}
                  ></Form.Check>
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Check
                    checked={village.target}
                    onChange={() => {
                      tagToggle(
                        village,
                        village.off,
                        village.def,
                        !village.target
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
