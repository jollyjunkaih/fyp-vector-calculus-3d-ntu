import React, { useContext, useEffect } from "react";
import {
  VStack,
  HStack,
  Text,
  Box,
  Input,
  Button,
  Divider,
  Link,
} from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { SideNavBar } from "../components/SideNavBar";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import { LessonStoreContext } from "../context/lessonStore";
import {
  Heading,
  SubHeading1,
  Body,
  LatexFormula,
  Code,
} from "../styles/Styles";
import {
  ScalarFieldVisual,
  ScalarFieldFormulaDisplay,
  VectorFieldFormulaDisplay,
  VectorFieldVisual,
} from "../components/LessonComponents";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import nerdamer from "nerdamer/all.min";
import { externalLink, navBarColor } from "../styles/Colours";
import { FormulaDisplay } from "../components/smaller_components/SideMenuComponents";

export const LessonPage = () => {
  const { setScrollPosition, setHeaderPosition, setHeaderScrollPosition } =
    useContext(LessonStoreContext);
  useEffect(() => {
    const children = document.getElementById("lesson").children;
    const array1 = [];
    const array2 = [];
    for (const child of children) {
      if (child.id) {
        array1.push(child.id);
        array2.push(parseInt(child.offsetTop));
      }
    }
    setHeaderPosition(array1);
    setHeaderScrollPosition(array2);
  }, []);
  return (
    <VStack height={"100%"} width='100%'>
      <NavBar />
      <HStack height={"100%"} width='100%'>
        <SideNavBar />
        <VStack
          alignItems={"start"}
          height={"100%"}
          width='80%'
          overflow={"scroll"}
          id={"lesson"}
          onScroll={(e) => setScrollPosition(parseInt(e.target.scrollTop))}
        >
          <VectorsAndCalculus />
          <ScalarField />
          <VectorField />
          <PartialDerivatives />
          <Heading>Gradient and Directional Derivatives</Heading>

          <Heading>Divergence</Heading>
          <Heading>Curl</Heading>
          <Heading>Laplacian</Heading>
          <Heading>Single, Double and Triple Integrals</Heading>
          <Heading>Line Integrals in Vector Fields</Heading>
          <Heading>Surface Integrals in Vector Fields</Heading>
          <Heading>Flux in Vector Fields</Heading>
          <Heading>Green's Theorem</Heading>
          <Heading>Divergence Theorem</Heading>
          <Heading>Stoke's Theorem</Heading>
        </VStack>
      </HStack>
    </VStack>
  );
};

const VectorsAndCalculus = () => {
  return (
    <>
      <Heading>Vectors and Calculus</Heading>
      <Body>
        The biggest prerequisite formultivariable calculus is good old
        single-variable calculus. (Now that we're in multivariable land, we need
        this new adjective "single-variable" to keep track of which version
        we're talking about.) Specifically, be sure that you are comfortable
        with the following broad concepts:
      </Body>
      <Body>
        <ol style={{ padding: "0 0 0 20px" }}>
          <li>
            Differentiation (including the power rule, product rule, quotient
            rule, and chain rule)
          </li>
          <li>What the derivative represents</li>
          <li>Integration and the Fundamental Theorem of Calculus</li>
        </ol>
      </Body>
      <Body>
        The second big prerequisite for multivariable calculus is vectors and
        matrices. Both of these topics are super useful, because they let us
        talk about multi-dimensional coordinates and sometimes entire
        transformations with just one object, which we can then manipulate.
      </Body>
      <Body>
        <ol style={{ padding: "0 0 0 20px" }}>
          <li>Vectors</li>
          <li>Dot Product</li>
          <li>Cross Product</li>
        </ol>
      </Body>
      <SubHeading1>Dot Product</SubHeading1>
      <Body>
        We write the dot product with a little dot ⋅ between the two vectors
        (pronounced "a dot b"):
        <LatexFormula>
          {
            "\\vec{a}\\cdot\\vec{b}=\\rVert\\vec{a}\\rVert\\rVert\\vec{b}\\rVert cos(\\theta)"
          }
        </LatexFormula>
        If we break this down factor by factor, the first two are
        <InlineMath>{"\\rVert\\vec{a}\\rVert"}</InlineMath> and{" "}
        <InlineMath>{"\\rVert\\vec{b}\\rVert"}</InlineMath>. These are the
        magnitudes of <InlineMath>{"\\vec{a}"}</InlineMath> and{" "}
        <InlineMath>{"\\vec{b}"}</InlineMath> so the dot product takes into
        account how long vectors are. The final factor is{" "}
        <InlineMath>{"cos(\\theta)"}</InlineMath> where
        <InlineMath>{"\\theta"}</InlineMath> is the angle between{" "}
        <InlineMath>{"\\vec{a}"}</InlineMath> and{" "}
        <InlineMath>{"\\vec{b}"}</InlineMath>. This tells us the dot product has
        to do with direction. Specifically, when{" "}
        <InlineMath>{"\\theta=0"}</InlineMath>, the two vectors point in exactly
        the same direction. Not accounting for vector magnitudes, this is when
        the dot product is at its largest, because{" "}
        <InlineMath>{"cos(0)=1"}</InlineMath>. In general, the more two vectors
        point in the same direction, the bigger the dot product between them
        will be.
        <br />
        <br />
        This is why{" "}
        <LatexFormula>
          {
            "\\vec{i}\\cdot\\vec{i}=\\vec{j}\\cdot\\vec{j}=\\vec{k}\\cdot\\vec{k}=1"
          }
        </LatexFormula>{" "}
        and why{" "}
        <LatexFormula>
          {
            "\\vec{i}\\cdot\\vec{j}=\\vec{j}\\cdot\\vec{k}=\\vec{k}\\cdot\\vec{i}=0"
          }
        </LatexFormula>
      </Body>
      <SubHeading1>Cross Product</SubHeading1>
      <Body>
        We write the cross product with a cross between two vectors (pronounced
        "a cross b"):
        <LatexFormula>{"\\vec{a}\\times\\vec{b}=\\vec{c}"}</LatexFormula> Unlike
        the dot product, which returns a number, the result of a cross product
        is another vector. This new vector <InlineMath>{"\\vec{c}"}</InlineMath>{" "}
        has a two special properties. First, it is perpendicular to both{" "}
        <InlineMath>{"\\vec{a}"}</InlineMath> and
        <InlineMath>{"\\vec{b}"}</InlineMath>. Phrasing this in terms of the dot
        product, we could say that{" "}
        <InlineMath>
          {"\\vec{c}\\cdot\\vec{a}=\\vec{c}\\cdot\\vec{b}=0"}
        </InlineMath>
        . This property alone makes the cross product quite useful. This is also
        why the cross product only works in three dimensions. In 2D, there isn't
        always a vector perpendicular to any pair of other vectors. In four and
        more dimensions, there are infinitely many vectors perpendicular to a
        given pair of other vectors.
        <br />
        Second, the length of <InlineMath>{"\\vec{c}"}</InlineMath> is a measure
        of how far apart <InlineMath>{"\\vec{a}"}</InlineMath> and{" "}
        <InlineMath>{"\\vec{b}"}</InlineMath> are pointing, augmented by their
        magnitudes.
        <LatexFormula>
          {
            "\\rVert\\vec{c}\\rVert=\\rVert\\vec{a}\\rVert\\rVert\\vec{b}\\rVert sin(\\theta)"
          }
        </LatexFormula>
        This is why{" "}
        <LatexFormula>{"\\vec{i}\\times\\vec{j}=\\vec{k}"}</LatexFormula>
        <LatexFormula>{"\\vec{j}\\times\\vec{k}=\\vec{i}"}</LatexFormula>
        <LatexFormula>{"\\vec{k}\\times\\vec{i}=\\vec{j}"}</LatexFormula>
      </Body>
    </>
  );
};

const ScalarField = () => {
  const { setScalarFormula, scalarFormula } = useContext(LessonStoreContext);
  return (
    <>
      <Heading>Scalar Fields</Heading>
      <Body>
        A scalar field is a concept from physics that describes a quantity that
        varies in space, but not in direction. In other words, it is a function
        that assigns a single scalar value to every point in space.
        <br />
        <br />
        Scalar fields are used in a variety of areas of physics, including
        classical mechanics, electromagnetism, and quantum field theory. In
        classical mechanics, examples of scalar fields include temperature and
        pressure, which vary in space but not in direction. In electromagnetism,
        the electric and magnetic fields are examples of vector fields, but
        their magnitudes (which are scalars) can be represented by scalar
        fields.
      </Body>
      <SubHeading1>Visualising a Scalar Field (Contour)</SubHeading1>
      <Body>
        Feel free to play with the contour scalar field visualiser. Based on
        your formula, the height of the contour <InlineMath>y</InlineMath> will
        change at each <InlineMath>x</InlineMath> and <InlineMath>z</InlineMath>{" "}
        position. Adjust the weights on each variable to get a smooth looking
        contour. You can start with this :{" "}
        <Code>5-(0.3*x^2-0.7*x+0.04*z^3)</Code>
      </Body>
      <HStack
        alignSelf={"center"}
        width={"85%"}
        minHeight={600}
        borderWidth={2}
        borderRadius={10}
        borderColor={navBarColor}
      >
        <Box width={"65%"} height={"100%"}>
          <Canvas
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              outputEncoding: THREE.sRGBEncoding,
            }}
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [9, 5, 12],
            }}
          >
            <ScalarFieldVisual />
          </Canvas>
        </Box>
        <Divider
          paddingRight={5}
          height={"90%"}
          orientation='vertical'
          borderColor={navBarColor}
        />
        <VStack width={"30%"} alignItems={"start"}>
          <Text a>Type the formula for y</Text>
          <Input
            width={"90%"}
            onChange={(val) => {
              setScalarFormula(val.target.value);
            }}
          />
          <br />
          <ScalarFieldFormulaDisplay />
        </VStack>
      </HStack>
    </>
  );
};
const VectorField = () => {
  const { setVectorFieldFormula, vectorFieldFormula } =
    useContext(LessonStoreContext);
  return (
    <>
      <Heading>Vector Fields</Heading>
      <Body>
        A vector field is a concept from physics that describes a quantity that
        varies in space and has both magnitude and direction. In other words, it
        is a function that assigns a vector (which has both magnitude and
        direction) to every point in space.
        <br />
        <br />
        Vector fields are used in a variety of areas of physics, including
        classical mechanics, electromagnetism, and fluid dynamics. In classical
        mechanics, examples of vector fields include the gravitational field and
        the velocity field of a fluid. In electromagnetism, the electric and
        magnetic fields are examples of vector fields.
        <br />
        <br />
        Vector fields can be visualized by drawing arrows at each point in
        space, with the direction and length of the arrows indicating the
        direction and magnitude of the vector at that point.
      </Body>
      <SubHeading1>Visualising a Vector Field</SubHeading1>
      <Body>
        Feel free to play with the vector field visualiser. Based on your
        formula for the vector at each coordinate <InlineMath>x, y </InlineMath>{" "}
        and <InlineMath>z</InlineMath>. Hover over the vectors to see
        information at each point. Try putting this
        <Code>(i) z^2*x || (j) x*4+y^3 || (k) y*x*z </Code>
      </Body>
      <HStack
        alignSelf={"center"}
        width={"85%"}
        minHeight={600}
        borderWidth={2}
        borderRadius={10}
        borderColor={navBarColor}
      >
        <Box width={"65%"} height={"100%"}>
          <Canvas
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              outputEncoding: THREE.sRGBEncoding,
            }}
            camera={{
              fov: 45,
              near: 0.1,
              far: 200,
              position: [9, 5, 12],
            }}
          >
            <VectorFieldVisual />
          </Canvas>
        </Box>
        <Divider
          borderColor={navBarColor}
          paddingRight={5}
          height={"90%"}
          orientation='vertical'
        />
        <VStack width={"30%"} alignItems={"start"}>
          <Text a>Type the formula for i</Text>
          <Input
            width={"90%"}
            onChange={(val) => {
              setVectorFieldFormula({
                ...vectorFieldFormula,
                i: val.target.value,
              });
            }}
          />
          <Text a>Type the formula for j</Text>
          <Input
            width={"90%"}
            onChange={(val) => {
              setVectorFieldFormula({
                ...vectorFieldFormula,
                j: val.target.value,
              });
            }}
          />
          <Text a>Type the formula for k</Text>
          <Input
            width={"90%"}
            onChange={(val) => {
              setVectorFieldFormula({
                ...vectorFieldFormula,
                k: val.target.value,
              });
            }}
          />
          <br />
          <VectorFieldFormulaDisplay />
        </VStack>
      </HStack>
    </>
  );
};
const PartialDerivatives = () => {
  return (
    <>
      <Heading>Partial Derivatives</Heading>
      <Body>
        In mathematics, partial derivatives are a way to measure how a function
        changes with respect to one of its variables, while holding all other
        variables constant. They are denoted by the symbol{" "}
        <InlineMath>{"\\partial"}</InlineMath> and can be thought of as the
        "instantaneous rate of change" of a function with respect to a
        particular variable. For example, if we have a function{" "}
        <InlineMath>f(x,y)</InlineMath> that takes two variables and we want to
        find the partial derivative of <InlineMath>f</InlineMath> with respect
        to <InlineMath>x</InlineMath> , we would write:{" "}
        <InlineMath>{`\\frac{\\partial f}{\\partial x}`}</InlineMath> This tells
        us how much <InlineMath>f</InlineMath>
        changes for a small change in <InlineMath>x</InlineMath> , while keeping{" "}
        <InlineMath>y</InlineMath> constant. Similarly, if we wanted to find the
        partial derivative of <InlineMath>f</InlineMath> with respect to{" "}
        <InlineMath>y</InlineMath> , we would write:{" "}
        <InlineMath>{`\\frac{\\partial f}{\\partial y}`}</InlineMath>
        <br />
        <br />
        Watch Sal Khan explain the graphical meaning of partial derivatives{" "}
        <Link
          color={externalLink}
          isExternal
          href='https://www.khanacademy.org/math/multivariable-calculus/multivariable-derivatives/partial-derivatives/v/partial-derivatives-and-graphs'
        >
          here
        </Link>
      </Body>
    </>
  );
};
