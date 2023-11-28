/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Container, Dropdown, Table } from "react-bootstrap";
import plannerServices from "./plannerServices";

const Planner = () => {

  interface villageTags {
    Alliance: string,
    AllianceID: number,
    Capital: boolean,
    City: boolean | null,
    Harbor: boolean | null,
    PlayerID: number,
    Playername: string,
    Population: number,
    Region: boolean | null,
    Tribe: number,
    VictoryPoints: number | null,
    VillageID: number,
    Villagename: any,
    X: number,
    Y: number,
    fieldID: number,
    off: boolean,
    def: boolean,
    target: boolean,
  }

const [targets, setTargets] = useState<villageTags[]>([{
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
}]);

const [offs, setOffs] = useState<villageTags[]>([{
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
}]);

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

const calculateDistance = (off: villageTags, target: villageTags) => {
  return Math.sqrt((off.X - target.X)*(off.X - target.X)+(off.Y - target.Y)*(off.Y - target.Y));
}

const calculateTravelTime = (off: villageTags, target: villageTags, speed: number) => {
  return calculateDistance(off, target) / speed;
}

const getTargets = () => {
  plannerServices.getTargets().then((response) => setTargets(response));
}

const getOffs = () => {
  plannerServices.getOffs().then((response) => setOffs(response));
}

useEffect(() => {
  getTargets();
  getOffs();
},[]);


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
              <Dropdown.Item key={off.fieldID}
                onClick={() => setSelectedOff(off)}>
                {off.Villagename}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

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
            {targets.map((target) =>
              <tr>
                <td>
                  {target.Villagename}
                </td>
                <td>
                  {target.X}|{target.Y}
                </td>
                <td>
                  {calculateDistance(selectedOff,target).toFixed(2)}
                </td>
                <td>
                  {calculateTravelTime(selectedOff, target, 3).toFixed(2)} hours
                </td>
              </tr>
            )}
        </tbody>
      </Table>
    </Container>
  )
}

export default Planner;