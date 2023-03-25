import nerdamer from "nerdamer/all.min";
import { Euler, Quaternion, Vector3 } from "three";

import { Vector } from "../styles/Styles";

export function getGradient(vectorFormula, x, y, z) {
  const gradientX = nerdamer.diff(vectorFormula.i, "x", 1);
  const X = nerdamer(gradientX.toString(), { x: x, y: y, z: z }).toString();
  const gradientY = nerdamer.diff(vectorFormula.j, "y", 1);
  const Y = nerdamer(gradientY.toString(), { x: x, y: y, z: z }).toString();
  const gradientZ = nerdamer.diff(vectorFormula.k, "z", 1);
  const Z = nerdamer(gradientZ.toString(), { x: x, y: y, z: z }).toString();
  return (
    <>
      {X} <Vector text='i' />
      {Y >= 0 ? " + " : " "} {Y}
      <Vector text='j' />
      {Z >= 0 ? " + " : " "}
      {Z}
      <Vector text='k' />
    </>
  );
}

export function getDivergence(vectorFormula, x, y, z) {
  const gradientX = nerdamer.diff(vectorFormula.i, "x", 1);
  const X = nerdamer(gradientX.toString(), { x: x, y: y, z: z }).toString();
  const gradientY = nerdamer.diff(vectorFormula.j, "y", 1);
  const Y = nerdamer(gradientY.toString(), { x: x, y: y, z: z }).toString();
  const gradientZ = nerdamer.diff(vectorFormula.k, "z", 1);
  const Z = nerdamer(gradientZ.toString(), { x: x, y: y, z: z }).toString();
  return parseFloat(X) + parseFloat(Y) + parseFloat(Z);
}

//X,Y,Z are the coeffecients of the unit vectos; x,y,z represent the partial derivatives
// so curl = (Zy-Yz)i + (Xz-Zx)j + (Yx-Xy)k
export function getCurl(vectorFormula, x, y, z) {
  let Zy = nerdamer(nerdamer.diff(vectorFormula.k, "y", 1).toString(), {
    x: x,
    y: y,
    z: z,
  }).toString();
  let Yz = nerdamer(nerdamer.diff(vectorFormula.j, "z", 1).toString(), {
    x: x,
    y: y,
    z: z,
  }).toString();
  let Xz = nerdamer(nerdamer.diff(vectorFormula.i, "z", 1).toString(), {
    x: x,
    y: y,
    z: z,
  }).toString();
  let Zx = nerdamer(nerdamer.diff(vectorFormula.k, "x", 1).toString(), {
    x: x,
    y: y,
    z: z,
  }).toString();
  let Yx = nerdamer(nerdamer.diff(vectorFormula.j, "x", 1).toString(), {
    x: x,
    y: y,
    z: z,
  }).toString();
  let Xy = nerdamer(nerdamer.diff(vectorFormula.i, "y", 1).toString(), {
    x: x,
    y: y,
    z: z,
  }).toString();
  return (
    <>
      {parseFloat(Zy) - parseFloat(Yz)} <Vector text='i' />
      {parseFloat(Xz) - parseFloat(Zx) >= 0 ? " + " : " "}
      {parseFloat(Xz) - parseFloat(Zx)} <Vector text='j' />
      {parseFloat(Yx) - parseFloat(Xy) >= 0 ? " + " : " "}
      {parseFloat(Yx) - parseFloat(Xy)} <Vector text='k' />
    </>
  );
}

export function getEulerRotation(i, j, k) {
  const quat = new Quaternion();
  const vectorMagnitude = Math.sqrt(
    Math.pow(i, 2) + Math.pow(j, 2) + Math.pow(k, 2)
  );
  quat.setFromUnitVectors(
    new Vector3(1, 0, 0),
    new Vector3(i / vectorMagnitude, j / vectorMagnitude, k / vectorMagnitude)
  );
  const euler = new Euler();
  euler.setFromQuaternion(quat, "XYZ");
  return euler;
}

export function getClosestNumber(array, number) {
  return array.reduce(function (prev, curr) {
    return Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev;
  });
}

export function useFormula(x, y, z, vectorFormula) {
  if (vectorFormula) {
    return nerdamer(vectorFormula, { x: x, y: y, z: z }).toString();
  }
}
