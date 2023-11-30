/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import allianceServices from "./allianceServices";
import "./AllianceList.css";
import Table from "react-bootstrap/esm/Table";
import Container from "react-bootstrap/Container";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";

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
        <Col xs={3}>
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
          <Form.Group>
            <Form.Label htmlFor="Playersearch">Player search</Form.Label>
            <Form.Control
              defaultValue=""
              type="text"
              id="playersearch"
              onChange={(e) => setsearchQuery(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col xs={3}>
        <div className="player-list">
        <Table>
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
                    Show
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </Col>

      <Col>
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
          {villages.map((vil) => (
            <tr key={vil.VillageID}>
              <td className="col-2">{vil.Villagename}</td>
              <td className="col-1">{vil.Population}</td>
              <td className="col-1">
                {vil.X}|{vil.Y}
              </td>
              <td>
                <Form>
                  <Form.Check
                    checked={vil.off}
                    onChange={() => {
                      tagToggle(
                        vil,
                        !vil.off,
                        vil.def,
                        vil.target
                      );
                    }}
                  ></Form.Check>
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Check
                    checked={vil.def}
                    onChange={() => {
                      tagToggle(
                        vil,
                        vil.off,
                        !vil.def,
                        vil.target
                      );
                    }}
                  ></Form.Check>
                </Form>
              </td>
              <td>
                <Form>
                  <Form.Check
                    checked={vil.target}
                    onChange={() => {
                      tagToggle(
                        vil,
                        vil.off,
                        vil.def,
                        !vil.target
                      );
                    }}
                  ></Form.Check>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Col>
      </Row>


    </Container>
  );
};

export default AllianceList;
