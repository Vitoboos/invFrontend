import { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import styles from "./dashboard.module.css";

import todosIcon from "../../assets/todos.png";
import computadorIcon from "../../assets/computer.png";
import impresoraIcon from "../../assets/printer.png";
import telefonoIcon from "../../assets/phone.png";
import accesspointIcon from "../../assets/accesspoint.png";
import switchIcon from "../../assets/switch.png";
import routerIcon from "../../assets/router.png";
import serverIcon from "../../assets/server.png";
import dvrIcon from "../../assets/dvr.png";
import perifericosIcon from "../../assets/perifericos.png";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate("/resultados", { state: { data: data } });
    }
  }, [data, navigate]); // Depend on the data state and navigate function

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      const collected = await response.json();

      setData(collected); // This will trigger the useEffect when data is updated
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toAdmin = () => {
    window.location.href = "http://localhost:8000/admin";
  }

  const toBusqueda = () => {
    navigate("/busqueda");
  }

  const toAPI = () => {
    window.location.href = "http://localhost:8000/api/v1";
  }

  return (
    <>
      <h1 className={styles.mainTitle}> Inventario Digitalizado </h1>
      <div className={styles.background}>
        <Grid container spacing={1} className={styles.gridContainer}>
          <Grid
            xs={6}
            sm={4}
            md={3}
            lg={2}
            className={styles.todosGrid}
            onClick={() => toAPI()}
          >
            <Container className={styles.gridCard}>
              <img src={todosIcon} className={styles.gridIcon} />
              <h1 className={styles.cardTitle}> API </h1>
            </Container>
          </Grid>

          <Grid xs={6} sm={4} md={3} lg={2}>
            <Container
              className={styles.gridCard}
              onClick={() =>
                getData("http://localhost:8000/api/v1/computador/")
              }
            >
              <img src={computadorIcon} className={styles.gridIcon} />
              <h1 className={styles.cardTitle}> Computadores </h1>
            </Container>
          </Grid>

          <Grid xs={6} sm={4} md={3} lg={2}>
            <Container
              className={styles.gridCard}
              onClick={() => getData("http://localhost:8000/api/v1/impresora/")}
            >
              <img src={impresoraIcon} className={styles.gridIcon} />
              <h1 className={styles.cardTitle}> Impresoras </h1>
            </Container>
          </Grid>

          <Grid xs={6} sm={4} md={3} lg={2}>
            <Container
              className={styles.gridCard}
              onClick={() => getData("http://localhost:8000/api/v1/telefono/")}
            >
              <img src={telefonoIcon} className={styles.gridIcon} />
              <h1 className={styles.cardTitle}> Telefonos </h1>
            </Container>
          </Grid>

          <Grid xs={6} sm={4} md={3} lg={2}>
            <Container
              className={styles.gridCard}
              onClick={() =>
                getData("http://localhost:8000/api/v1/accesspoint/")
              }
            >
              <img src={accesspointIcon} className={styles.gridIcon} />
              <h1 className={styles.cardTitle}> Access Points </h1>
            </Container>
          </Grid>

          <Grid xs={6} sm={4} md={3} lg={2}>
            <Container
              className={styles.gridCard}
              onClick={() => getData("http://localhost:8000/api/v1/switch/")}
            >
              <img src={switchIcon} className={styles.gridIcon} />
              <h1 className={styles.cardTitle}> Switchs </h1>
            </Container>
          </Grid>

          <Grid xs={6} sm={4} md={3} lg={2}>
            <Container
              className={styles.gridCard}
              onClick={() => getData("http://localhost:8000/api/v1/router/")}
            >
              <img src={routerIcon} className={styles.gridIcon} />
              <h1 className={styles.cardTitle}> Routers </h1>
            </Container>
          </Grid>

          <Grid xs={6} sm={4} md={3} lg={2}>
            <Container
              className={styles.gridCard}
              onClick={() => getData("http://localhost:8000/api/v1/servidor/")}
            >
              <img src={serverIcon} className={styles.gridIcon} />
              <h1 className={styles.cardTitle}> Servers </h1>
            </Container>
          </Grid>

          <Grid xs={6} sm={4} md={3} lg={2}>
            <Container
              className={styles.gridCard}
              onClick={() => getData("http://localhost:8000/api/v1/dvr/")}
            >
              <img src={dvrIcon} className={styles.gridIcon} />
              <h1 className={styles.cardTitle}> DVR </h1>
            </Container>
          </Grid>

          <Grid xs={6} sm={4} md={3} lg={2}>
            <Container
              className={styles.gridCard}
              onClick={() =>
                getData("http://localhost:8000/api/v1/periferico/")
              }
            >
              <img src={perifericosIcon} className={styles.gridIcon} />
              <h1 className={styles.cardTitle}> Perifericos </h1>
            </Container>
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={1}>
        <Grid xs={12} md={6} className={styles.navGrid}>
          {" "}
          <h1 className={styles.navButton} onClick={toBusqueda}> Busqueda Avanzada</h1>
        </Grid>
        <Grid xs={12} md={6} className={styles.navGrid}>
          {" "}
          <h1 className={styles.navButton} onClick={toAdmin}> Administración </h1>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
