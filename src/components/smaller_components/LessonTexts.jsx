import React from "react";
import {
  Heading,
  SubHeading1,
  Body,
  LatexFormula,
  Code,
} from "../../styles/Styles.jsx";
import { InlineMath } from "react-katex";
import { Link } from "@chakra-ui/react";
import { externalLink } from "../../styles/Colours.jsx";
export const VectorsAndCalculusText = () => {
  return (
    <>
      {" "}
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
    </>
  );
};

export const DotProductText = () => {
  return (
    <>
      {" "}
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
    </>
  );
};

export const CrossProductText = () => {
  return (
    <>
      {" "}
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

export const ScalarFieldText = () => {
  return (
    <>
      {" "}
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
    </>
  );
};

export const VectorFieldText = () => {
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
    </>
  );
};

export const PartialDerivativesText = () => {
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

export const CurlText = () => {
  return (
    <>
      <Heading>Curl</Heading>
      <Body>
        Curl is an operator which takes in a function representing a
        three-dimensional vector field and gives another function representing a
        different three-dimensional vector field. If a fluid flows in
        three-dimensional space along a vector field, the rotation of that fluid
        around each point, represented as a vector, is given by the curl of the
        original vector field evaluated at that point. The curl vector field
        should be scaled by one-half if you want the magnitude of curl vectors
        to equal the rotational speed of the fluid.
      </Body>
    </>
  );
};

export const DivergenceText = () => {
  return (
    <>
      <Heading>Divergence</Heading>
      <Body>
        The divergence is an operator, which takes in the vector-valued function
        defining this vector field, and outputs a scalar-valued function
        measuring the change in density of the fluid at each point.
        <br />
        <br />A nice way to think about vector fields is to imagine the fluid
        flow they could represent. Specifically, for each point (x,y)left
        parenthesis, x, comma, y, right parenthesis in two-dimensional space,
        imagine a particle sitting at (x,y)left parenthesis, x, comma, y, right
        parenthesis flowing in the direction of the vector attached to that
        point, v (x,y)start bold text, v, end bold text, with, vector, on top,
        left parenthesis, x, comma, y, right parenthesis. Moreover, suppose the
        speed of the particle's movement is determined by the length of that
        vector.
      </Body>
    </>
  );
};

export const GradientAndDirectionalDerivativesText = () => {
  return (
    <>
      <Heading>Gradient and Directional Derivatives</Heading>
      <SubHeading1>Directional Derivative</SubHeading1>
      <Body>
        Let the function f(x,y) be the height of a mountain range at each point
        x=(x,y) . If you stand at some point x=a , the slope of the ground in
        front of you will depend on the direction you are facing. It might slope
        steeply up in one direction, be relatively flat in another direction,
        and slope steeply down in yet another direction. The partial derivatives
        of f will give the slope ∂f∂x in the positive x direction and the slope
        ∂f∂y in the positive y direction. We can generalize the partial
        derivatives to calculate the slope in any direction. The result is
        called the directional derivative. The first step in taking a
        directional derivative, is to specify the direction. One way to specify
        a direction is with a vector u=(u1,u2) that points in the direction in
        which we want to compute the slope. For simplicity, we will insist that
        u is a unit vector. We write the directional derivative of f in the
        direction u at the point a as Duf(a) . We could define it with a limit
        definition just as an ordinary derivative or a partial derivative
        Duf(a)=limh→0f(a+hu)−f(a)h. However, it turns out that for
        differentiable f(x,y) , we won't need to worry about that definition.
        The concept of the directional derivative is simple; Duf(a) is the slope
        of f(x,y) when standing at the point a and facing the direction given by
        u . If x and y were given in meters, then Duf(a) would be the change in
        height per meter as you moved in the direction given by u when you are
        at the point a .
      </Body>
      <SubHeading1>Gradient</SubHeading1>
      <Body>
        In most cases, there is always one direction u where the directional
        derivative Duf(a) is the largest. This is the “uphill” direction. (In
        some cases, such as when you are at the top of a mountain peak or at the
        lowest point in a valley, this might not be true.) Let's call this
        direction of maximal slope m . Both the direction m and the maximal
        directional derivative Dmf(a) are captured by something called the
        gradient of f and denoted by ∇f(a) . The gradient is a vector that
        points in the direction of m and whose magnitude is Dmf(a) . In math, we
        can write this as ∇f(a)∥∇f(a)∥=m and ∥∇f(a)∥=Dmf(a) .
      </Body>
    </>
  );
};
export const LaplacianText = () => {
  return (
    <>
      <Heading>Laplacian</Heading>
      <Body>
        The Laplacian measures what you could call the « curvature » or stress
        of the field. It tells you how much the value of the field differs from
        its average value taken over the surrounding points. This is because it
        is the divergence of the gradient..it tells you how much the rate of
        changes of the field differ from the kind of steady variation you expect
        in a divergence-free flow. Look at one dimension: the Laplacian simply
        is ∂2∂𝑥2 , i.e., the curvature. When this is zero, the function is
        linear so its value at the centre of any interval is the average of the
        extremes. In three dimensions, if the Laplacian is zero, the function is
        harmonic and satisfies the averaging principle
      </Body>
    </>
  );
};
export const SingleDoubleTripleIntegralsText = () => {
  return (
    <>
      <Heading>Single, Double and Triple Integrals</Heading>
      <SubHeading1>Double Integrals</SubHeading1>
      <Body>
        Given a two-variable function � ( � , � ) f(x,y)f, left parenthesis, x,
        comma, y, right parenthesis, you can find the volume between this graph
        and a rectangular region of the � � xyx, y-plane by taking an integral
        of an integral, ∫ � 1 � 2 ( ∫ � 1 � 2 � ( � , � ) � � ) ⏞ This is a
        function of � � � ∫ y 1 ​ y 2 ​ ​ (∫ x 1 ​ x 2 ​ ​ f(x,y)dx) ​ This is a
        function of y ​ dy ​ This is called a double integral. You can compute
        this same volume by changing the order of integration: ∫ � 1 � 2 ( ∫ � 1
        � 2 � ( � , � ) � � ) ⏞ This is a function of � � � ∫ x 1 ​ x 2 ​ ​ (∫ y
        1 ​ y 2 ​ ​ f(x,y)dy) ​ This is a function of x ​ dx ​ The computation
        will look and feel very different, but it still gives the same result.
      </Body>
      <SubHeading1>Triple Integrals</SubHeading1>
      <Body>
        At the risk of sounding obvious, triple integrals are just like double
        integrals, but in three dimensions. They are written abstractly as ∭ � �
          � � ∭ R ​ fdV ​ where � Rstart color #0c7f99, R, end color #0c7f99 is
        some region in three-dimensional space. � ( � , � , � ) f(x,y,z)f, left
        parenthesis, x, comma, y, comma, z, right parenthesis is some
        scalar-valued function which takes points in three-dimensional space as
        its input. � � dVstart color #bc2612, d, V, end color #bc2612 is a tiny
        unit of volume. In cartesian coordinates, this is expanded as � � = � �
          � �   � � dV=dxdydzstart color #bc2612, d, V, end color #bc2612,
        equals, d, x, d, y, d, z. Concretely, these are computed as three
        embedded integrals: ∫ � 1 � 2 ∫ � 1 ( � ) � 2 ( � ) ∫ � 1 ( � , � ) � 2
        ( � , � ) � ( � , � , � )   � � ⏞ This is a function purely of � and �  
        � � ⏟ This is a function purely of �    � � ∫ z 1 ​ z 2 ​ ​ This is a
        function purely of z ∫ y 1 ​ (z) y 2 ​ (z) ​ ∫ x 1 ​ (y,z) x 2 ​ (y,z) ​
        f(x,y,z)dx ​ This is a function purely of y and z ​ dy ​ ​ dz ​ As with
        double integrals, the bounds of inner integrals might be functions of
        the outer variables. These bound functions are what encodes the shape of
        � Rstart color #0c7f99, R, end color #0c7f99. Use a three-dimensional
        integral anytime you get that sensation of wanting to chop up a
        three-dimensional region into infinitely many pieces, associate each
        piece with a value, then add them all up. One place where this is
        surprisingly useful is just finding the volume of three-dimensional
        regions by adding up all the tiny volumes � � dVd, V. As with double
        integrals, the hard part is finding the right bounds which encode your
        region. This just takes some practice, and a willingness to roll up your
        sleeves and dive into the muck of a problem.
      </Body>
    </>
  );
};
export const LineIntegralsInVectorFieldsText = () => {
  return (
    <>
      <Heading>Line Integrals in Vector Fields</Heading>
      <Body>
        Line integral (sometimes called a path integral) is the integral of some
        function along a curve. One can integrate a scalar-valued function along
        a curve, obtaining for example, the mass of a wire from its density. One
        can also integrate a certain type of vector-valued functions along a
        curve. These vector-valued functions are the ones where the input and
        output dimensions are the same, and we usually represent them as vector
        fields. One interpretation of the line integral of a vector field is the
        amount of work that a force field does on a particle as it moves along a
        curve.
      </Body>
      <SubHeading1>
        The fundamental role of line integrals in vector calculus
      </SubHeading1>
      <Body>
        The line integral of a vector field plays a crucial role in vector
        calculus. Out of the four fundamental theorems of vector calculus, three
        of them involve line integrals of vector fields. Green's theorem and
        Stokes' theorem relate line integrals around closed curves to double
        integrals or surface integrals. If you have a conservative vector field,
        you can relate the line integral over a curve to quantities just at the
        curve's two boundary points. It's worth the effort to develop a good
        understanding of line integrals.
      </Body>
    </>
  );
};
export const SurfaceIntegralsInVectorFieldsText = () => {
  return (
    <>
      <Heading>Surface Integrals in Vector Fields</Heading>
      <Body>
        In principle, the idea of a surface integral is the same as that of a
        double integral, except that instead of "adding up" points in a flat
        two-dimensional region, you are adding up points on a surface in space,
        which is potentially curved. The abstract notation for surface integrals
        looks very similar to that of a double integral: ∬ � ⏟ � represents a
        surface  ⁣  ⁣  ⁣  ⁣  ⁣  ⁣  ⁣  ⁣  ⁣  ⁣  ⁣  ⁣ � ( � , � , � )    ⁣  ⁣  ⁣
         ⁣  ⁣  ⁣  ⁣  ⁣  ⁣  ⁣  ⁣  ⁣ � Σ ⏞ Tiny piece of area in � S represents a
        surface ∬ S ​ ​ ​ f(x,y,z) dΣ Tiny piece of area in S ​ Computing a
        surface integral is almost identical to computing surface area using a
        double integral, except that you stick a function inside the integral: ∬
        � � ( v ⃗ ( � , � ) ) ∣ ∂ v ⃗ ∂ � × ∂ v ⃗ ∂ � ∣   � �   � � ⏟ Tiny piece
        of area ∬ T ​ f( v (t,s)) Tiny piece of area ∣ ∣ ∣ ∣ ∣ ​ ∂t ∂ v ​ × ∂s ∂
        v ​ ∣ ∣ ∣ ∣ ∣ ​ dtds ​ ​ ​ Here, v ⃗ ( � , � ) v (t,s)start bold text,
        v, end bold text, with, vector, on top, left parenthesis, start color
        #0c7f99, t, end color #0c7f99, comma, start color #bc2612, s, end color
        #bc2612, right parenthesis is a function parameterizing the surface � SS
        from the region � TT of the � � tsstart color #0c7f99, t, end color
        #0c7f99, start color #bc2612, s, end color #bc2612-plane. (This is
        analogous to how computing line integrals is basically the same as
        computing arc length integrals, except that you throw a function inside
        the integral itself.)
      </Body>
    </>
  );
};
export const FluxInVectorFieldsText = () => {
  return (
    <>
      <Heading>Flux in Vector Fields</Heading>
      <Body>
        Think of flux as the amount of something crossing a surface. This
        “something” can be water, wind, electric field, bananas, pretty much
        anything you can imagine. Math books will use abstract concepts like
        electric fields, which is pretty hard to visualize. I find bananas more
        memorable, so we’ll be using those. To measure the flux (i.e. bananas)
        passing through a surface, we need to know The surface you are
        considering (shape, size and orientation) The source of the flux
        (strength of the field, and which way it is spitting out bananas flux)
        <br />
        <br />
        Total flux also depends on the orientation of the field and the surface.
        When our surface completely faces the field it captures maximum flux,
        like a sail facing directly into the wind. As the surface tilts away
        from the field, the flux decreases as less and less flux crosses the
        surface. Eventually, we get zero flux when the source and boundary are
        parallel — the flux is passing over the boundary, but not crossing
        through it. It would be like holding a bucket sideways under a
        waterfall. You wouldn’t capture much water (ignoring splashing) and may
        get a few funny looks. Total flux also depends on the size of our
        surface. In the same field, a bigger bucket will capture more flux than
        a smaller one. When we figure out our total flux, we need to see how
        much field is passing through our entire surface.
        <br />
        <br />
        One last detail – we need to decide on a positive and negative direction
        for flux. This decision is arbitrary, but by convention (aka your math
        teacher will penalize you if you don’t agree), positive flux leaves a
        closed surface, and negative flux enters a closed surface.
      </Body>
    </>
  );
};
export const GreensTheoremText = () => {
  return (
    <>
      <Heading>Green's Theorem</Heading>
      <Body>
        Green's theorem is simply a relationship between the macroscopic
        circulation around the curve C and the sum of all the microscopic
        circulation that is inside C . If C is a simple closed curve in the
        plane (remember, we are talking about two dimensions), then it surrounds
        some region D (shown in red) in the plane. D is the “interior” of the
        curve C.
        <br />
        <br /> Green's theorem says that if you add up all the microscopic
        circulation inside C (i.e., the microscopic circulation in D ), then
        that total is exactly the same as the macroscopic circulation around C .
      </Body>
    </>
  );
};
export const DivergenceTheoremText = () => {
  return (
    <>
      <Heading>Divergence Theorem</Heading>
      <Body>
        The divergence theorem relates the divergence of F Fstart color #0c7f99,
        start bold text, F, end bold text, end color #0c7f99 within the volume �
        Vstart color #bc2612, V, end color #bc2612 to the outward flux of F
        Fstart color #0c7f99, start bold text, F, end bold text, end color
        #0c7f99 through the surface � Sstart color #bc2612, S, end color
        #bc2612: ∭ � div   F   � � ⏟ Add up little bits of outward flow in � = ∬
        � F ⋅ n ^   � Σ ⏞ Flux integral ⏟ Measures total outward flow through �
        ’s boundary Add up little bits of outward flow in V ​ ∭ V ​ divFdV ​ ​ =
        Measures total outward flow through V’s boundary ​ ∬ S ​ F⋅ n ^ dΣ ​
        Flux integral ​ ​ ​ The intuition here is that divergence measures the
        outward flow of a fluid at individual points, while the flux measures
        outward fluid flow from an entire region, so adding up the bits of
        divergence gives the same value as flux.
      </Body>
    </>
  );
};
export const StokesTheoremText = () => {
  return (
    <>
      <Heading>Stoke's Theorem</Heading>
      <Body>
        Stokes' theorem is a generalization of Green's theorem from circulation
        in a planar region to circulation along a surface. Green's theorem
        states that, given a continuously differentiable two-dimensional vector
        field F , the integral of the “microscopic circulation” of F over the
        region D inside a simple closed curve C is equal to the total
        circulation of F around C , as suggested by the equation
        <br />
        <br />
        Green's theorem applies only to two-dimensional vector fields and to
        regions in the two-dimensional plane. Stokes' theorem generalizes
        Green's theorem to three dimensions. For starters, let's take our above
        picture and simply embed it in three dimensions. Then, our curve C
        becomes a curve in the xy -plane, and our region D becomes a surface S
        in the xy -plane whose boundary is the curve C . Even though S is now a
        surface, we still use the same notation as ∂ for the boundary. The
        boundary ∂S of the surface S is a closed curve, and we require that ∂S=C
        .
      </Body>
    </>
  );
};
