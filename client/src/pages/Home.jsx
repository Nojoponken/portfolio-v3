import "./Home.css";

import portrait from "../assets/portrait-small.webp";
import valla from "../assets/Campus-Valla-LiU.jpg";

import ProjectsHighlight from "../components/ProjectsHighlight";

function Home() {
  return (
    <>
      <section className="home-about">
        <div>
          <h2>About me</h2>
          <p>
            Hi, I'm a software developer based in Stockholm, Sweden. I recently
            graduated and am at the start of my career, and eager to find a
            place where I can contribute and grow as a developer.
          </p>
          <p>
            I like to both explore different technologies and to really dig into
            a single language to understand how it works and how people write it
            well. Getting to know the patterns and idioms of a language, and
            then writing code that feels natural to it, is something I find
            genuinely satisfying.
          </p>
          <p>
            Clean, maintainable code matters a lot to me. I think good code
            should be easy to read and easy to change, and I try to hold myself
            to that. I also enjoy working closely with the people I build things
            for, understanding what they actually need and delivering something
            that feels well made and complete.
          </p>
        </div>
        <img src={portrait} className="home-portrait" />
      </section>
      <hr />
      <section className="home-education">
        <img src={valla} className="home-campus" />
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
      <hr />
      <section>
        <h2>Projects</h2>
        {/*<ProjectsHighlight />*/}
      </section>
    </>
  );
}

export default Home;
