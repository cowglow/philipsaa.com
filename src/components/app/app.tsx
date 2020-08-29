import React from "react";
import styles from "./app.module.css";
import hero from "../../assets/philipsaa.jpg";
import world from "../../assets/world.svg";

const App: React.FC = () => {
  return (
    <div className={styles.root}>
      <header
        className={styles.header}
        style={{ backgroundImage: `url("${hero}")` }}
      ></header>
      <main className={styles.main}>
        <section>
          <h1>Philip Saa</h1>
          <h2>
            MULTIMEDIA SPECIALIST <br />
            <div style={{ fontSize: 16 }}>IN BAVARIA, GERMANY</div>
          </h2>
        </section>
        <section>
          <a
            className={styles.cta}
            href="https://cowglow.com"
            rel="noreferrer noopener"
            target="_blank"
          >
            <img src={world} alt="website link" />
            Visit my Website
          </a>
        </section>
        <section>
          <p>
            I like to call myself a Multimedia Specialist. Currently located in
            southern Germany. My interests range from music theory to film
            making. I am also interested in programming and Drum and bass.
          </p>
          <p>
            I'm{" "}
            <a
              href="https://twitter.com/cowglow"
              rel="noreferrer noopener"
              target="_blank"
            >
              @cowglow
            </a>{" "}
            on Twitter. DM me!
          </p>
        </section>
        <section>
          <ul>
            <li>
              <div className={styles.label}>Education</div>
              <ul>
                <li>California Institute of the Arts</li>
                <li>Los Angeles Film School</li>
              </ul>
            </li>
            <li>
              <div className={styles.label}>Links</div>
              <ul>
                <li>
                  <a
                    href="https://instagram.com/cowglow"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    https://instagram.com/cowglow
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/cowglow"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    https://github.com/cowglow
                  </a>
                </li>
                <li>
                  <a
                    href="https://cowglow.com"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    https://cowglow.com
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default App;
