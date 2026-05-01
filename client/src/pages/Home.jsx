import "./Home.css";

import portrait from "../assets/portrait-small.webp";
import valla from "../assets/Campus-Valla-LiU.jpg";

import ProjectsHighlight from "../components/ProjectsHighlight";

function Home() {
  return (
    <>
      <section className="home-about">
        <img src={portrait} className="home-portrait shadowed" />
        <h2>About me</h2>
        <h4 className="home-intro">
          Hi, I'm a young programmer from Stockholm, Sweden. Coding has been my
          passion ever since I was little, exploring different technical
          problems and making my computer do cool stuff. Right now I am at the
          beginning of my career and looking for opportunities where I can grow
          as a developer.
        </h4>
        <p>
          Software development is something I find fascinating for many
          different reasons. Partly the problem solving, where you dive deep
          into the technical part of a system. Tracing a bug through layers of
          abstraction, optimizing something that was just a little too slow, or
          figuring out why two pieces fit together in an unexpected way. There's
          a satisfaction in understanding a system from the inside out, and in
          finding elegant solutions to problems that initially seemed very
          complex.
        </p>
        <p>
          From another perspective, I like learning the design patterns and
          idioms of a technology. Writing code that is both functional and
          beautiful has a certain type of appeal. Seeing a problem in different
          ways depending on the paradigm, whether it's thinking in terms of
          objects, functions, or data flow, opens up new ways of reasoning.
          Developing a toolbox to apply to different problems and getting a
          sense of fluency in the engineering and making it more into a craft,
          it's something I find very enjoyable.
        </p>
        <p>
          Lastly, working with a team towards a single goal brings a dimension
          to software development that no solo project can replicate. You get to
          see the problem through other people's eyes, absorb different ways of
          thinking, and build something bigger than what any one person could
          manage alone. There's also something grounding about working with real
          customer needs, since it turns abstract code into something that
          actually matters to someone, and gives the whole effort a sense of
          purpose.
        </p>
      </section>
      <hr />
      <section>
        <h2>Projects</h2>
        <ProjectsHighlight />
      </section>
      <hr />
      <section className="home-education">
        <img src={valla} className="home-campus shadowed" />
        <div>
          <h2>My education</h2>
          <p>
            The{" "}
            <a href="https://liu.se/utbildning/program/6kipr">
              Bachelor's Programme in Programming
            </a>{" "}
            is aimed at people who are interested in programming, whether
            self-taught or with some prior experience from high school. It
            covers the technology behind things like social networks, and
            teaches you how to develop software and features. It also touches on
            agent technology in areas like game programming and robotics.
          </p>
          <p>
            The philosophy of the programme is learning by doing, drawing a
            parallel between programming and traditional craftsmanship. You
            develop your skills by writing a lot of code across different kinds
            of projects, and by regularly reflecting on what good code actually
            means.
          </p>
          <p>
            The first year focuses on common programming languages, platforms,
            and the fundamentals of writing code well. The second year shifts
            toward user interfaces, the interaction between users and computers,
            and a range of application areas including operating systems,
            networks, games, databases, and web applications. You work both
            independently and in project groups.
          </p>
          <p>
            By the end of the programme a personal portfolio of creative
            programming projects has been built up.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
