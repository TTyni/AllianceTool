/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import plannerServices from "../../Services/plannerServices";
import { Chart } from "react-google-charts";
import allianceServices from "../../Services/allianceServices";

const Planner = () => {
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
    Villagename: string;
    X: number;
    Y: number;
    fieldID: number;
    off: boolean;
    def: boolean;
    target: boolean;
  }

  const [allTags, setAllTags] = useState<villageTags[]>([]);
  const [targets, setTargets] = useState<villageTags[]>([]);
  const [offs, setOffs] = useState<villageTags[]>([]);
  const [selectedOff, setSelectedOff] = useState<villageTags>({
    Alliance: "test",
    AllianceID: 0,
    Capital: false,
    City: false,
    Harbor: false,
    PlayerID: 0,
    Playername: "",
    Population: 0,
    Region: false,
    Tribe: 0,
    VictoryPoints: 0,
    VillageID: 0,
    Villagename: "",
    X: 0,
    Y: 0,
    fieldID: 0,
    off: false,
    def: false,
    target: false,
  });

  const [showMap, setShowMap] = useState(false);
  const [unitSpeed, setUnitSpeed] = useState("3");
  const [tournamentSquareLevel, setTournamentSquareLevel] = useState("1");
  const [chartData, setChartData] = useState([
    ["X", "Y", { type: "string", role: "style" }],
  ]);
  // const [options, setOptions] = useState({
  //   mapSize: 401,
  //   artefactMultiplier: 1,
  //   offhandMultiplier: 1,
  //   bootsMultiplier: 1,
  //   tournamentSquareLevel: 0,
  // });

  // calculates shortest distance.
  const calculateDistance = (off: villageTags, target: villageTags) => {
    const mapSize = 401;
    const x = Math.min(
      Math.abs(off.X - target.X),
      mapSize - Math.abs(off.X - target.X)
    );
    const y = Math.min(
      Math.abs(off.Y - target.Y),
      mapSize - Math.abs(off.Y - target.Y)
    );

    return Math.sqrt(x * x + y * y);
  };

  //toggles all rows and collums in tags table to false
  const resetAllTags = () => {
    allTags.map((tag) => {
      allianceServices.updateTags(tag.fieldID, false, false, false);
      console.log("resetting " + tag.fieldID);
    });
  };

  //calculates traveltime with seleceted speed and modifiers
  const calculateTravelTime = (off: villageTags, target: villageTags) => {
    const dist = calculateDistance(off, target);
    const tournamentSquareEffect = dist - 20;

    if (dist > 20) {
      return (
        20 / parseInt(unitSpeed) +
        tournamentSquareEffect /
          (parseInt(unitSpeed) * (1 + 0.2 * parseInt(tournamentSquareLevel)))
      );
    } else {
      return dist / parseInt(unitSpeed);
    }
  };

  const getAllTags = () => {
    plannerServices.getAllTags().then((response) => setAllTags(response));
  };

  const getOffs = () => {
    plannerServices.getOffs().then((response) => setOffs(response));
  };

  //generates data table for scatter chart
  const genChartData = () => {
    setChartData([["X", "Y", { type: "string", role: "style" }]]);
    allTags.map((vil) => {
      if (vil.target)
        setChartData((chartData: any) => [
          ...chartData,
          [
            vil.X,
            vil.Y,
            `point {title: ${vil.VillageID} size: 5; shape-type: point; fill-color: #FF0000; }`,
          ],
        ]);
      if (vil.off)
        setChartData((chartData: any) => [
          ...chartData,
          [
            vil.X,
            vil.Y,
            "point { size: 5; shape-type: point; fill-color: #00FF00; }",
          ],
        ]);
      if (vil.def)
        setChartData((chartData: any) => [
          ...chartData,
          [
            vil.X,
            vil.Y,
            "point { size: 5; shape-type: point; fill-color: #0000FF; }",
          ],
        ]);
    });
  };
  const newTargets = () => {
    setTargets(allTags.filter((village) => village.target));
  };

  useEffect(() => {
    getAllTags();
    getOffs();
  }, []);

  return (
    <Container>
      <Dropdown className="m-3">
        <Dropdown.Toggle
          className="btn btn-secondary dropdown-toggle dropdownStyle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select village
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {offs.map((vil) => (
            <Dropdown.Item
              key={vil.fieldID}
              onClick={() => {
                setSelectedOff(vil);
                newTargets();
              }}
            >
              {vil.Villagename}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Container>
        <Row>
          <Col className="col-2">
            <Form.Label htmlFor="unitspeed">Unit speed</Form.Label>
            <Form.Control
              defaultValue={3}
              type="number"
              id="unitspeed"
              onChange={(event) => setUnitSpeed(event.target.value)}
            />

            <Form.Label htmlFor="tournamentSquare">
              tournament square level
            </Form.Label>
            <Form.Control
              defaultValue={0}
              type="number"
              id="tournamentSquare"
              onChange={(event) => setTournamentSquareLevel(event.target.value)}
            />
            <Button
              className="m-3"
              onClick={() => {
                genChartData();
                setShowMap(!showMap);
              }}
            >
              Show map
            </Button>
            <Button variant="warning" onClick={() => resetAllTags()}>
              Reset all tags
            </Button>
          </Col>

          <Col>
            {showMap ? (
              <Chart
                chartType="ScatterChart"
                data={chartData}
                width={"800px"}
                height={"800px"}
                options={{
                  legend: "none",
                  hAxis: { title: "X", minValue: -200, maxValue: 200 },
                  vAxis: { title: "Y", minValue: -200, maxValue: 200 },
                }}
              />
            ) : (
              <></>
            )}

            <Table>
              <thead>
                <tr>
                  <td>village name</td>
                  <td>player name</td>
                  <td>coordinates</td>
                  <td>distance</td>
                  <td>travel time</td>
                </tr>
              </thead>
              <tbody>
                {targets.map((target) => (
                  <tr key={target.fieldID}>
                    <td>{target.Villagename}</td>
                    <td>{target.Playername}</td>
                    <td>
                      <a
                        href={`https://ts5.x1.europe.travian.com/karte.php?x=${target.X}&y=${target.Y}`}
                      >
                        {target.X}|{target.Y}
                      </a>
                    </td>
                    {
                      <td>
                        {calculateDistance(selectedOff, target).toFixed(2)}
                      </td>
                    }
                    <td>
                      {calculateTravelTime(selectedOff, target).toFixed(2)}{" "}
                      hours
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Planner;
