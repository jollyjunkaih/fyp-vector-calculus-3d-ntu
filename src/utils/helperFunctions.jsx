import nerdamer from "nerdamer/all.min";
import { Euler, NeverDepth, Quaternion, Vector3 } from "three";

import { Vector } from "../styles/Styles";

export function getGradient(vectorFormula, x, y, z, general = false) {
  try {
    const gradientX = nerdamer.diff(vectorFormula.i, "x", 1);
    const X = nerdamer(gradientX.toString(), { x: x, y: y, z: z }).toString();
    const gradientY = nerdamer.diff(vectorFormula.j, "y", 1);
    const Y = nerdamer(gradientY.toString(), { x: x, y: y, z: z }).toString();
    const gradientZ = nerdamer.diff(vectorFormula.k, "z", 1);
    const Z = nerdamer(gradientZ.toString(), { x: x, y: y, z: z }).toString();
    if (general) {
      return `(${gradientX})i + (${gradientY})j + (${gradientZ})k`;
    } else {
      return (
        <>
          {X}
          <Vector text=' i' /> {parseInt(Y) >= 0 ? " + " : " "} {Y}
          <Vector text=' j' /> {parseInt(Z) >= 0 ? " + " : " "} {Z}
          <Vector text=' k' />
        </>
      );
    }
  } catch (e) {}
}

export function getDivergence(vectorFormula, x, y, z, general = false) {
  try {
    const gradientX = nerdamer.diff(vectorFormula.i, "x", 1);
    const X = nerdamer(gradientX.toString(), { x: x, y: y, z: z }).toString();
    const gradientY = nerdamer.diff(vectorFormula.j, "y", 1);
    const Y = nerdamer(gradientY.toString(), { x: x, y: y, z: z }).toString();
    const gradientZ = nerdamer.diff(vectorFormula.k, "z", 1);
    const Z = nerdamer(gradientZ.toString(), { x: x, y: y, z: z }).toString();
    if (general) {
      return nerdamer(gradientX + "+" + gradientY + "+" + gradientZ)
        .evaluate()
        .toString();
    } else return parseFloat(X) + parseFloat(Y) + parseFloat(Z);
  } catch (e) {}
}

//X,Y,Z are the coeffecients of the unit vectos; x,y,z represent the partial derivatives
// so curl = (Zy-Yz)i + (Xz-Zx)j + (Yx-Xy)k
export function getCurl(vectorFormula, x, y, z, general = false) {
  try {
    const Zy = nerdamer.diff(vectorFormula.k, "y", 1).toString();
    const Yz = nerdamer.diff(vectorFormula.j, "z", 1).toString();
    const Xz = nerdamer.diff(vectorFormula.i, "z", 1).toString();
    const Zx = nerdamer.diff(vectorFormula.k, "x", 1).toString();
    const Yx = nerdamer.diff(vectorFormula.j, "x", 1).toString();
    const Xy = nerdamer.diff(vectorFormula.i, "y", 1).toString();
    const I = nerdamer(Zy + "-" + Yz, {
      x: x,
      y: y,
      z: z,
    }).toString();
    const J = nerdamer(Xz + "-" + Zx, {
      x: x,
      y: y,
      z: z,
    }).toString();
    const K = nerdamer(Yx + "-" + Xy, {
      x: x,
      y: y,
      z: z,
    }).toString();
    if (general) {
      return `(${nerdamer(Zy + "-" + Yz)
        .evaluate()
        .toString()})i + (${nerdamer(Xz + "-" + Zx)
        .evaluate()
        .toString()})j + (${nerdamer(Yx + "-" + Xy)
        .evaluate()
        .toString()})k`;
    } else
      return (
        <>
          {parseFloat(I)} <Vector text='i' />
          {parseFloat(J) >= 0 ? " + " : " "}
          {parseFloat(J)} <Vector text='j' />
          {parseFloat(K) >= 0 ? " + " : " "}
          {parseFloat(K)} <Vector text='k' />
        </>
      );
  } catch (e) {}
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

export const getCircleEquation = (vector1, vector2, center) => {
  const circleEquation = `${
    center ||
    (parseFloat(vector2).toFixed(1) == 0 && parseFloat(vector1).toFixed(1) == 0)
      ? center
      : ""
  } ${center && parseFloat(vector1.toFixed(1)) > 0 ? " + " : ""} ${
    parseFloat(vector1.toFixed(1)) != 0 ? vector1.toFixed(3) + "*r*cos(θ)" : ""
  } ${
    parseFloat(vector2.toFixed(1)) > 0 &&
    (parseFloat(vector1.toFixed(1)) != 0 || center)
      ? " + "
      : ""
  } ${
    parseFloat(vector2.toFixed(1)) != 0 ? vector2.toFixed(3) + "*r*sin(θ)" : ""
  } 
  `;
  return circleEquation;
};

export const getFluxThroughCircularSurface = (
  vectorFormula,
  normal,
  radius,
  circleFormula
) => {
  const { x, y, z } = circleFormula;
  const finalValues = [];
  for (let formula in vectorFormula) {
    const formulaWRTθandR = nerdamer(vectorFormula[formula])
      .sub("x", x)
      .sub("y", y)
      .sub("z", z)
      .toString();
    let firstIntegral = nerdamer(
      `integrate(${formulaWRTθandR.toString()},θ)`
    ).toString();
    const firstIntegral_0 = nerdamer(firstIntegral).sub("θ", "0").toString();
    const firstIntegral_2pi = nerdamer(firstIntegral).sub("θ", "2π").toString();
    firstIntegral = firstIntegral_2pi + "-" + firstIntegral_0;
    let secondIntegral = nerdamer(
      `defint(${nerdamer(firstIntegral)
        .evaluate()
        .toString()},0,${radius.toString()},r)`
    )
      .evaluate()
      .text("decimals", 3);
    finalValues.push(parseFloat(secondIntegral));
  }
  const flux =
    finalValues[0] * normal.x +
    finalValues[1] * normal.y +
    finalValues[2] * normal.z;
  return flux.toFixed(2);
};

export const getCurlThroughCircularSurface = (
  vectorFormula,
  normal,
  radius,
  circleFormula
) => {
  const { x, y, z } = circleFormula;

  const { i: X, j: Y, k: Z } = vectorFormula;

  const dZdy = nerdamer.diff(Z, "y", 1).toString();
  const dYdz = nerdamer.diff(Y, "z", 1).toString();
  const dXdz = nerdamer.diff(X, "z", 1).toString();
  const dZdx = nerdamer.diff(Z, "x", 1).toString();
  const dYdx = nerdamer.diff(Y, "x", 1).toString();
  const dXdy = nerdamer.diff(X, "y", 1).toString();
  const equation = `${normal.x}*(${dZdy}-${dYdz})+${normal.y}*(${dXdz}-${dZdx})+${normal.z}*(${dYdx}-${dXdy})`;
  const equationWRT0andR = nerdamer(equation)
    .sub("x", x)
    .sub("y", y)
    .sub("z", z)
    .toString();
  //integral is broken
  let firstIntegral = nerdamer(`integrate(${equationWRT0andR},θ)`).toString();
  const firstIntegral_0 = nerdamer(firstIntegral).sub("θ", "0").toString();
  const firstIntegral_2pi = nerdamer(firstIntegral).sub("θ", "2π").toString();
  firstIntegral = firstIntegral_2pi + "-" + firstIntegral_0;
  const secondIntegral = nerdamer(
    `defint(${nerdamer(firstIntegral)
      .evaluate()
      .toString()},0,${radius.toString()},r)`
  )
    .evaluate()
    .text("decimals", 3);

  return parseFloat(secondIntegral).toFixed(2);
};

export const getLineIntegralCircle = (vectorFormula, radius, circleFormula) => {
  try {
    const { x, y, z } = circleFormula;
    const { i: X, j: Y, k: Z } = vectorFormula;
    const diffCircleFormula = [];
    for (const formula in circleFormula) {
      let diff = nerdamer.diff(circleFormula[formula], "θ", 1).toString();
      diff = nerdamer(diff).sub("r", radius.toString()).toString();
      diffCircleFormula.push(diff);
    }
    console.log(diffCircleFormula);
    const vectorFieldAtRadius = nerdamer(
      `${X}*${diffCircleFormula[0]}+${Y}*${diffCircleFormula[1]}+${Z}*${diffCircleFormula[2]}`
    )
      .evaluate()
      .toString();
    console.log(vectorFieldAtRadius);

    // console.log(
    //   nerdamer("integrate(cos(θ)*sin(θ)^3,θ)").toString()
    // );

    let equationWRT0 = nerdamer(vectorFieldAtRadius)
      .sub("x", x)
      .sub("y", y)
      .sub("z", z)
      .sub("r", radius)
      .evaluate()
      .text("decimals", 3);
    console.log(equationWRT0);

    //integral is broken
    let firstIntegral = nerdamer(`integrate(${equationWRT0},θ)`).text(
      "decimals",
      3
    );
    console.log(firstIntegral);

    const firstIntegral_0 = nerdamer(firstIntegral)
      .sub("θ", "0")
      .text("decimals", 3);
    const firstIntegral_2pi = nerdamer(firstIntegral)
      .sub("θ", "2π")
      .text("decimals", 3);
    firstIntegral = firstIntegral_2pi + "-" + firstIntegral_0;
    console.log(firstIntegral_0);
    console.log(firstIntegral_2pi);

    firstIntegral = nerdamer(firstIntegral).evaluate().text("decimals", 3);
    return parseFloat(firstIntegral).toFixed(2);
  } catch (e) {
    console.log(e.message);
    return 0;
  }
};

// x^2+y^2   z^2-y*x   x*y*z

export const getSquareEquation = (
  normalVector,
  center_x,
  center_y,
  center_z
) => {
  return;
  `${
    parseFloat(normalVector.x)
      ? `${parseFloat(normalVector.x).toFixed(2)}(x ${
          parseFloat(center_x) > 0 ? "-" : "+"
        }${Math.abs(center_x)})`
      : ""
  }${parseFloat(normalVector.x) && parseFloat(normalVector.y) > 0 ? "+" : ""}${
    parseFloat(normalVector.y)
      ? `${parseFloat(normalVector.y).toFixed(2)}(y ${
          parseFloat(center_y) > 0 ? "-" : "+"
        }${Math.abs(center_y)})`
      : ""
  }${parseFloat(normalVector.y) && parseFloat(normalVector.z) > 0 ? "+" : ""}${
    parseFloat(normalVector.z)
      ? `${parseFloat(normalVector.z).toFixed(2)}(z ${
          parseFloat(center_z) > 0 ? "-" : "+"
        }${Math.abs(center_z)})`
      : ""
  }`;
};
