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
    const gradientY = nerdamer.diff(vectorFormula.j, "y", 1);
    const gradientZ = nerdamer.diff(vectorFormula.k, "z", 1);
    if (general) {
      return nerdamer(gradientX + "+" + gradientY + "+" + gradientZ)
        .evaluate()
        .toString();
    } else {
      const X = nerdamer(gradientX.toString(), { x: x, y: y, z: z }).toString();
      const Y = nerdamer(gradientY.toString(), { x: x, y: y, z: z }).toString();
      const Z = nerdamer(gradientZ.toString(), { x: x, y: y, z: z }).toString();
      return parseFloat(X) + parseFloat(Y) + parseFloat(Z);
    }
  } catch (e) {}
}

//X,Y,Z are the coeffecients of the unit vectors; x,y,z represent the partial derivatives
// so curl = (Zy-Yz)i + (Xz-Zx)j + (Yx-Xy)k
export function getCurl(vectorFormula, x, y, z, general) {
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

export const getFlux = (vectorFormula, normal, radius, circleFormula) => {
  const { x, y, z } = circleFormula;
  let finalValues = 0;

  const dotProduct = nerdamer(
    `dot([${vectorFormula.i},${vectorFormula.j},${vectorFormula.k}], [${normal.x},${normal.y},${normal.z}])`
  )
    .evaluate()
    .toString();
  const formulaWRTθandR = nerdamer(dotProduct)
    .sub("x", x)
    .sub("y", y)
    .sub("z", z)
    .toString();
  for (let degree = 60; degree <= 360; degree = degree + 60) {
    for (let r = 0.25; r <= radius; r = r + 0.25) {
      finalValues =
        finalValues +
        parseFloat(
          nerdamer(formulaWRTθandR)
            .sub("θ", `${(degree / 180) * Math.PI}`)
            .sub("r", `${r}`)
            .evaluate()
            .text("decimals")
        );
    }
  }
  return ((finalValues / 24) * Math.PI * radius * radius).toFixed(2);
};

export const getCurlThroughCircularSurface = (
  vectorFormula,
  normal,
  radius,
  circleFormula
) => {
  const { x, y, z } = circleFormula;
  let finalValues = 0;
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
  for (let degree = 60; degree <= 360; degree = degree + 60) {
    for (let r = 0.25; r <= radius; r = r + 0.25) {
      finalValues =
        finalValues +
        parseFloat(
          nerdamer(equationWRT0andR)
            .sub("θ", `${(degree / 180) * Math.PI}`)
            .sub("r", `${r}`)
            .evaluate()
            .text("decimals")
        );
    }
  }
  return ((finalValues / 24) * Math.PI * radius * radius).toFixed(2);
  // let firstIntegral = nerdamer(`integrate(${equationWRT0andR},θ)`).toString();
  // const firstIntegral_0 = nerdamer(firstIntegral).sub("θ", "0").toString();
  // const firstIntegral_2pi = nerdamer(firstIntegral).sub("θ", "2π").toString();
  // firstIntegral = firstIntegral_2pi + "-" + firstIntegral_0;
  // const secondIntegral = nerdamer(
  //   `defint(${nerdamer(firstIntegral)
  //     .evaluate()
  //     .toString()},0,${radius.toString()},r)`
  // )
  //   .evaluate()
  //   .text("decimals", 3);

  // return parseFloat(secondIntegral).toFixed(2);
};

export const getLineIntegralCircle = (
  vectorFormula,
  normalVector,
  radius,
  circleFormula
) => {
  try {
    const { x, y, z } = circleFormula;
    const { i: X, j: Y, k: Z } = vectorFormula;
    const diffCircleFormula = [];
    for (const formula in circleFormula) {
      let diff = nerdamer.diff(circleFormula[formula], "θ", 1).toString();
      diff = nerdamer(diff).sub("r", radius.toString()).toString();
      diffCircleFormula.push(diff);
    }
    const vectorFieldAtRadius = nerdamer(
      `${X}*(${diffCircleFormula[0]})+${Y}*(${diffCircleFormula[1]})+${Z}*(${diffCircleFormula[2]})`
    )
      .evaluate()
      .toString();
    const equationWRT0 = nerdamer(vectorFieldAtRadius)
      .sub("x", x)
      .sub("y", y)
      .sub("z", z)
      .sub("r", radius.toString())
      .evaluate()
      .text("decimals", 3);
    let finalValues = 0;
    for (let degree = 15; degree <= 360; degree = degree + 15) {
      const lineIntegral = nerdamer(equationWRT0)
        .sub("θ", `${(degree / 180) * Math.PI}`)
        .evaluate()
        .text("decimals");
      //calculate unit radial vector
      // const x_ = nerdamer(x)
      //   .sub("r", radius.toString())
      //   .sub("θ", `${(degree / 180) * Math.PI}`)
      //   .evaluate()
      //   .text("decimals");
      // const y_ = nerdamer(y)
      //   .sub("r", radius.toString())
      //   .sub("θ", `${(degree / 180) * Math.PI}`)
      //   .evaluate()
      //   .text("decimals");
      // const z_ = nerdamer(z)
      //   .sub("r", radius.toString())
      //   .sub("θ", `${(degree / 180) * Math.PI}`)
      //   .evaluate()
      //   .text("decimals");
      // const radialVector = new Vector3(x_, y_, z_);
      // radialVector.multiplyScalar(1 / radialVector.length()); //unit vector
      // const tangentVector = new Vector3().crossVectors(
      //   new Vector3(normalVector.x, normalVector.y, normalVector.z),
      //   radialVector
      // );

      // const vectorIAtRadius = nerdamer(X)
      //   .sub("x", x_)
      //   .sub("y", y_)
      //   .sub("z", z_)
      //   .evaluate()
      //   .text("decimals");
      // const vectorJAtRadius = nerdamer(Y)
      //   .sub("x", x_)
      //   .sub("y", y_)
      //   .sub("z", z_)
      //   .evaluate()
      //   .text("decimals");
      // const vectorKAtRadius = nerdamer(Z)
      //   .sub("x", x_)
      //   .sub("y", y_)
      //   .sub("z", z_)
      //   .evaluate()
      //   .text("decimals");
      // const dotProduct = new Vector3(
      //   vectorIAtRadius,
      //   vectorJAtRadius,
      //   vectorKAtRadius
      // ).dot(tangentVector);

      finalValues = finalValues + parseFloat(lineIntegral);
    }
    return ((finalValues * 2 * Math.PI * radius) / 24).toFixed(2);

    for (let degree = 1; degree <= 360; degree = degree + 1) {
      finalValues =
        finalValues +
        parseFloat(
          nerdamer(equationWRT0)
            .sub("θ", `${(degree / 180) * Math.PI}`)
            .evaluate()
            .text("decimals")
        );
    }
    console.log((finalValues / 360) * Math.PI * 2);
    return ((finalValues / 360) * Math.PI).toFixed(2);
    let firstIntegral = nerdamer(`integrate(${equationWRT0},θ)`).text(
      "decimals",
      3
    );

    const firstIntegral_0 = nerdamer(firstIntegral)
      .sub("θ", "0")
      .text("decimals", 3);
    const firstIntegral_2pi = nerdamer(firstIntegral)
      .sub("θ", "2π")
      .text("decimals", 3);
    firstIntegral = firstIntegral_2pi + "-" + firstIntegral_0;
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
  return `${
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

export const getSphereEquation = (center_x, center_y, center_z, radius) => {
  return `(x ${parseFloat(center_x) > 0 ? "-" : "+"}${Math.abs(
    center_x
  )})^2+(y ${parseFloat(center_y) > 0 ? "-" : "+"}${Math.abs(center_y)})^2+(z ${
    parseFloat(center_z) > 0 ? "-" : "+"
  }${Math.abs(center_z)})^2=${Math.pow(radius, 2)}`;
};

export const getCubeEquation = () => {
  return "";
};

export const getFluxThroughSquareSurface = (
  vectorFormula,
  normal,
  length,
  squareFormula
) => {
  const {
    min_X,
    min_Y,
    min_Z,
    max_X,
    max_Y,
    max_Z,
    center_x,
    center_y,
    center_z,
  } = squareFormula;
  if (!(vectorFormula.i && vectorFormula.j && vectorFormula.k)) {
    return 0;
  }
  try {
    let finalValues = 0;

    const dotProduct = nerdamer(
      `dot([${vectorFormula.i},${vectorFormula.j},${vectorFormula.k}], [${normal.x},${normal.y},${normal.z}])`
    )
      .evaluate()
      .toString();
    for (
      let x = min_X + parseInt(center_x || 0);
      x <= max_X + parseInt(center_x || 0);
      x = x + (max_X - min_X) / 4
    ) {
      for (
        let y = min_Y + parseInt(center_y || 0);
        y <= max_Y + parseInt(center_y || 0);
        y = y + (max_Y - min_Y || 1) / 4
      ) {
        for (
          let z = min_Z + parseInt(center_z || 0);
          z <= max_Z + parseInt(center_z || 0);
          z = z + (max_Z - min_Z) / 4
        ) {
          finalValues =
            finalValues +
            parseFloat(
              nerdamer(dotProduct)
                .sub("x", `${x}`)
                .sub("y", `${y}`)
                .sub("z", `${z}`)
                .evaluate()
                .text("decimals")
            );
        }
      }
    }
    return ((finalValues / 64) * 2 * length * 2 * length).toFixed(2);
  } catch (e) {
    console.log(e);
  }
};
export const getCurlThroughSquareSurface = (
  vectorFormula,
  normal,
  length,
  squareFormula
) => {
  const {
    min_X,
    min_Y,
    min_Z,
    max_X,
    max_Y,
    max_Z,
    center_x,
    center_y,
    center_z,
  } = squareFormula;

  if (!(vectorFormula.i && vectorFormula.j && vectorFormula.k)) {
    return 0;
  }
  try {
    let finalValues = 0;
    const { i: X, j: Y, k: Z } = vectorFormula;
    const dZdy = nerdamer.diff(Z, "y", 1).toString();
    const dYdz = nerdamer.diff(Y, "z", 1).toString();
    const dXdz = nerdamer.diff(X, "z", 1).toString();
    const dZdx = nerdamer.diff(Z, "x", 1).toString();
    const dYdx = nerdamer.diff(Y, "x", 1).toString();
    const dXdy = nerdamer.diff(X, "y", 1).toString();
    const equation = `${normal.x}*(${dZdy}-${dYdz})+${normal.y}*(${dXdz}-${dZdx})+${normal.z}*(${dYdx}-${dXdy})`;
    let counter = 0;
    for (
      let x = min_X + parseInt(center_x || 0);
      x <= max_X + parseInt(center_x || 0);
      x = x + (max_X - min_X) / 4
    ) {
      for (
        let y = min_Y + parseInt(center_y || 0);
        y <= max_Y + parseInt(center_y || 0);
        y = y + (max_Y - min_Y || 1) / 4
      ) {
        for (
          let z = min_Z + parseInt(center_z || 0);
          z <= max_Z + parseInt(center_z || 0);
          z = z + (max_Z - min_Z) / 4
        ) {
          counter = counter + 1;
          finalValues =
            finalValues +
            parseFloat(
              nerdamer(equation)
                .sub("x", `${x}`)
                .sub("y", `${y}`)
                .sub("z", `${z}`)
                .evaluate()
                .text("decimals")
            );
        }
      }
    }
    return ((finalValues / counter) * 2 * length * 2 * length).toFixed(2);
  } catch (e) {
    console.log(e);
  }
};
export const getLineIntegralSquare = (vectorFormula, squareFormula) => {
  const {
    center_x,
    center_y,
    center_z,
    rotation_x,
    rotation_y,
    rotation_z,
    length,
  } = squareFormula;
  if (!(vectorFormula.i && vectorFormula.j && vectorFormula.k)) {
    return 0;
  }

  try {
    const { i: X, j: Y, k: Z } = vectorFormula;
    const newVectorFormula = { x: X, y: Y, z: Z };
    let finalValues = 0;
    const vertice1 = new Vector3(
      (length || 1) + (center_x || 0),
      center_y || 0,
      (length || 1) + (center_z || 0)
    );
    const vertice2 = new Vector3(
      (length || 1) + (center_x || 0),
      center_y || 0,
      -(length || 1) + (center_z || 0)
    );
    const vertice3 = new Vector3(
      -(length || 1) + (center_x || 0),
      center_y || 0,
      -(length || 1) + (center_z || 0)
    );
    const vertice4 = new Vector3(
      -(length || 1) + (center_x || 0),
      center_y || 0,
      (length || 1) + (center_z || 0)
    );
    const eulerRotation = new Euler(
      ((rotation_x || 0) * Math.PI) / 180,
      ((rotation_y || 0) * Math.PI) / 180,
      ((rotation_z || 0) * Math.PI) / 180
    );
    vertice1.applyEuler(eulerRotation);
    vertice2.applyEuler(eulerRotation);
    vertice3.applyEuler(eulerRotation);
    vertice4.applyEuler(eulerRotation);

    const line1 = new Vector3();
    line1.add(vertice2).addScaledVector(vertice1, -1);
    const line2 = new Vector3();
    line2.add(vertice3).addScaledVector(vertice2, -1);
    const line3 = new Vector3();
    line3.add(vertice4).addScaledVector(vertice3, -1);
    const line4 = new Vector3();
    line4.add(vertice1).addScaledVector(vertice4, -1);

    const steps = 10;
    line1.divideScalar(steps);
    line2.divideScalar(steps);
    line3.divideScalar(steps);
    line4.divideScalar(steps);

    const lineList = [line1, line2, line3, line4];
    const verticeList = [vertice1, vertice2, vertice3, vertice4];

    for (let i = 0; i < steps; i++) {
      for (let v = 0; v < 4; v++) {
        const point = new Vector3();
        point.copy(verticeList[v]).addScaledVector(lineList[v], i);
        for (const vector in newVectorFormula) {
          let vectorAtPoint = nerdamer(newVectorFormula[vector])
            .sub("x", point.x)
            .sub("y", point.y)
            .sub("z", point.z)
            .evaluate()
            .text("decimals");
          vectorAtPoint = (parseFloat(vectorAtPoint) * lineList[v][vector]) / 4; //divide by four to get the average cos its already divided by 10 due to steps
          finalValues = finalValues + vectorAtPoint;
        }
      }
    }
    return parseFloat((finalValues * 2 * (length || 1)).toFixed(2));
  } catch (e) {
    console.log(e);
  }
};

export const getFluxThroughSphericalSurface = (
  vectorFormula,
  sphereFormula
) => {
  const { radius, center_x, center_y, center_z } = sphereFormula;
  const divergence = getDivergence(vectorFormula, "", "", "", true);
  const minY = (center_y || 0) - (radius || 1);
  const maxY = (center_y || 0) + (radius || 1);
  let finalValues = 0;
  for (let y = minY + 0.1; y < maxY; y = y + (2 * (radius || 1)) / 10) {
    const r = radius || 1 - Math.pow(y - (center_y || 0), 2);
    const formulaWRTθandR = nerdamer(divergence)
      .sub("x", `r*cos(θ)+(${center_x || 0})`)
      .sub("y", `${y}`)
      .sub("z", `r*sin(θ)+(${center_z || 0})`)
      .toString();
    let firstIntegral = nerdamer(
      `integrate(${formulaWRTθandR.toString()},θ)`
    ).toString();
    const firstIntegral_0 = nerdamer(firstIntegral).sub("θ", "0").toString();
    const firstIntegral_2pi = nerdamer(firstIntegral).sub("θ", "2π").toString();
    firstIntegral = firstIntegral_2pi + "-" + firstIntegral_0;
    const secondIntegral = nerdamer(
      `defint(${nerdamer(firstIntegral)
        .evaluate()
        .toString()},0,${r.toString()},r)`
    )
      .evaluate()
      .text("decimals", 3);
    finalValues =
      finalValues + parseFloat(secondIntegral) / Math.PI / Math.pow(r, 2);
  }

  return (
    (finalValues / 10) *
    1.333333 *
    Math.PI *
    Math.pow(radius || 1, 3)
  ).toFixed(2);
};
export const getCurlThroughSphericalSurface = (
  vectorFormula,
  sphereFormula
) => {
  return 2.3;
};
