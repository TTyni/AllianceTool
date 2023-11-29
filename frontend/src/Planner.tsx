/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Container, Dropdown, Form, Table } from "react-bootstrap";
import plannerServices from "./plannerServices";
import { Chart } from "react-google-charts";

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
    Villagename: any;
    X: number;
    Y: number;
    fieldID: number;
    off: boolean;
    def: boolean;
    target: boolean;
  }

  const [targets, setTargets] = useState<villageTags[]>([
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

  const [offs, setOffs] = useState<villageTags[]>([
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

  const [selectedOff, setSelectedOff] = useState<villageTags>({
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
  });

  const [chartData, setChartData] = useState<any>([["X", "Y"]]);
  const [unitSpeed, setUnitSpeed] = useState("3");
  const [tournamentSquareLevel, setTournamentSquareLevel] = useState("1");
  // const [options, setOptions] = useState({
  //   mapSize: 401,
  //   artefactMultiplier: 1,
  //   offhandMultiplier: 1,
  //   bootsMultiplier: 1,
  //   tournamentSquareLevel: 0,
  // });

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

  const getTargets = () => {
    plannerServices.getTargets().then((response) => setTargets(response));
  };

  const getOffs = () => {
    plannerServices.getOffs().then((response) => setOffs(response));
  };

  const genChartData = () => {
    targets.map((vil) =>
      setChartData((chartData: any) => [...chartData, [vil.X, vil.Y]])
    );
    console.log(chartData);
  };

  useEffect(() => {
    getTargets();
    getOffs();
    //genChartData();
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
          offs
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {offs.map((off) => (
            <Dropdown.Item
              key={off.fieldID}
              onClick={() => {
                setSelectedOff(off);
                genChartData();
              }}
            >
              {off.Villagename}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Container className="col-2 ">
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
      </Container>

      <Table>
        <thead>
          <tr>
            <td>village name</td>
            <td>coordinates</td>
            <td>distance</td>
            <td>travel time</td>
          </tr>
        </thead>
        <tbody>
          {targets.map((target) => (
            <tr>
              <td>{target.Villagename}</td>
              <td>
                {target.X}|{target.Y}
              </td>
              <td>{calculateDistance(selectedOff, target).toFixed(2)}</td>
              <td>
                {calculateTravelTime(selectedOff, target).toFixed(2)} hours
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Chart
        chartType="ScatterChart"
        data={chartData}
        width={"800px"}
        height={"800px"}
        options={{
          legend: "none",
          hAxis: { minValue: -200, maxValue: 200 },
          vAxis: { minValue: -200, maxValue: 200 },
        }}
      />
    </Container>
  );
};

export default Planner;
