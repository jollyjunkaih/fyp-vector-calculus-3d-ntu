import React, { useContext, useEffect } from "react";
import { VStack, HStack, Text, Box } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { SideNavBar } from "../components/SideNavBar";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import { StoreContext } from "../context/store";
export const LessonPage = () => {
  const { setScrollPosition, setHeaderPosition, setHeaderScrollPosition } =
    useContext(StoreContext);
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
          <Heading>Vectors and Calculus</Heading>
          <Body>
            The biggest prerequisite formultivariable calculus is good old
            single-variable calculus. (Now that we're in multivariable land, we
            need this new adjective "single-variable" to keep track of which
            version we're talking about.) Specifically, be sure that you are
            comfortable with the following broad concepts:
          </Body>
          <Body>
            <ol style={{ padding: "0 0 0 20px" }}>
              <li>
                Differentiation (including the power rule, product rule,
                quotient rule, and chain rule)
              </li>
              <li>What the derivative represents</li>
              <li>Integration and the Fundamental Theorem of Calculus</li>
            </ol>
          </Body>
          <Body>
            The second big prerequisite for multivariable calculus is vectors
            and matrices. Both of these topics are super useful, because they
            let us talk about multi-dimensional coordinates and sometimes entire
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
            <InlineMath>{"\\vec{b}"}</InlineMath>. This tells us the dot product
            has to do with direction. Specifically, when{" "}
            <InlineMath>{"\\theta=0"}</InlineMath>, the two vectors point in
            exactly the same direction. Not accounting for vector magnitudes,
            this is when the dot product is at its largest, because{" "}
            <InlineMath>{"cos(0)=1"}</InlineMath>. In general, the more two
            vectors point in the same direction, the bigger the dot product
            between them will be.
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
            We write the cross product with a cross between two vectors
            (pronounced "a cross b"):
            <LatexFormula>
              {"\\vec{a}\\times\\vec{b}=\\vec{c}"}
            </LatexFormula>{" "}
            Unlike the dot product, which returns a number, the result of a
            cross product is another vector. This new vector{" "}
            <InlineMath>{"\\vec{c}"}</InlineMath> has a two special properties.
            First, it is perpendicular to both{" "}
            <InlineMath>{"\\vec{a}"}</InlineMath> and
            <InlineMath>{"\\vec{b}"}</InlineMath>. Phrasing this in terms of the
            dot product, we could say that{" "}
            <InlineMath>
              {"\\vec{c}\\cdot\\vec{a}=\\vec{c}\\cdot\\vec{b}=0"}
            </InlineMath>
            . This property alone makes the cross product quite useful. This is
            also why the cross product only works in three dimensions. In 2D,
            there isn't always a vector perpendicular to any pair of other
            vectors. In four and more dimensions, there are infinitely many
            vectors perpendicular to a given pair of other vectors.
            <br />
            Second, the length of <InlineMath>{"\\vec{c}"}</InlineMath> is a
            measure of how far apart <InlineMath>{"\\vec{a}"}</InlineMath> and{" "}
            <InlineMath>{"\\vec{b}"}</InlineMath> are pointing, augmented by
            their magnitudes.
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
          <Heading>Scalar Fields</Heading>
          <Body>
            A scalar field is a concept from physics that describes a quantity
            that varies in space, but not in direction. In other words, it is a
            function that assigns a single scalar value to every point in space.
            <br />
            <br />
            Scalar fields are used in a variety of areas of physics, including
            classical mechanics, electromagnetism, and quantum field theory. In
            classical mechanics, examples of scalar fields include temperature
            and pressure, which vary in space but not in direction. In
            electromagnetism, the electric and magnetic fields are examples of
            vector fields, but their magnitudes (which are scalars) can be
            represented by scalar fields.
          </Body>
          <SubHeading1>Visualising a Scalar Field</SubHeading1>
          <Heading>Vector Fields</Heading>
          <Body>
            A vector field is a concept from physics that describes a quantity
            that varies in space and has both magnitude and direction. In other
            words, it is a function that assigns a vector (which has both
            magnitude and direction) to every point in space.
            <br />
            <br />
            Vector fields are used in a variety of areas of physics, including
            classical mechanics, electromagnetism, and fluid dynamics. In
            classical mechanics, examples of vector fields include the
            gravitational field and the velocity field of a fluid. In
            electromagnetism, the electric and magnetic fields are examples of
            vector fields.
            <br />
            <br />
            Vector fields can be visualized by drawing arrows at each point in
            space, with the direction and length of the arrows indicating the
            direction and magnitude of the vector at that point.
          </Body>{" "}
          <SubHeading1>Visualising a Vector Field</SubHeading1>
          <Heading>Partial Derivatives</Heading>
          <Text width={"90%"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Text>
          <Heading>Gradient and Directional Derivatives</Heading>
          <Text width={"90%"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Text>
          <Text width={"90%"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </Text>
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

const Heading = ({ children }) => {
  return (
    <Text
      paddingLeft={16}
      paddingTop={10}
      paddingBottom={5}
      fontSize={"2xl"}
      as={"b"}
      id={children}
    >
      {children}
    </Text>
  );
};
const SubHeading1 = ({ children }) => {
  return (
    <Text
      paddingLeft={16}
      paddingTop={5}
      paddingBottom={5}
      fontSize={"lg"}
      as={"b"}
    >
      {children}
    </Text>
  );
};
const SubHeading2 = ({ children }) => {
  return (
    <Text
      paddingLeft={16}
      paddingTop={2}
      paddingBottom={5}
      fontSize={"md"}
      as={"b"}
    >
      {children}
    </Text>
  );
};
const Body = ({ children }) => {
  return (
    <Text maxWidth={"90%"} paddingLeft={16} paddingBottom={5} fontSize={"md"}>
      {children}
    </Text>
  );
};

const LatexFormula = ({ children }) => {
  return (
    <Box alignSelf={"center"}>
      <BlockMath>{children}</BlockMath>
    </Box>
  );
};
