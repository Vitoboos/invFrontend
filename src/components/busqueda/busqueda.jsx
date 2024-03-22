import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./busqueda.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Busqueda() {
  const navigate = useNavigate();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [seleccion, setSeleccion] = useState("");
  const urlApi = "http://localhost:8000/api/v1/";

  // Busquedas por Personal

  const nombre = useRef("");

  // Busqueda por Equipos

  const cargo = useRef("");
  const procesador = useRef("");
  const memoria = useRef("");
  const disco = useRef("");
  const tipo = useRef("");

  //  Busquedas por Red
  const equipo = useRef("");
  const ipv4 = useRef("");
  const mac = useRef("");

  // Estado para controlar el renderizado de las tablas

  const [datos, setDatos] = useState({});

  // Funciones de busqueda

  async function Personal(nombre) {
    const computadoras = `${urlApi}computador`;
    const telefonos = `${urlApi}telefono`;
    const perifericos = `${urlApi}periferico`;

    // Obtiene los datos de las computadoras

    const response_computador = await fetch(`${computadoras}?nombre=${nombre}`);
    const data_computador = await response_computador.json();

    // Obtiene los datos de los telefonos

    const response_telefonos = await fetch(`${telefonos}?nombre=${nombre}`);
    const data_telefonos = await response_telefonos.json();

    // Obtiene los datos de los perifericos

    const response_perifericos = await fetch(`${perifericos}?nombre=${nombre}`);
    const data_perifericos = await response_perifericos.json();

    console.log(data_computador, data_telefonos, data_perifericos);

    setDatos({
      computadores: data_computador,
      telefonos: data_telefonos,
      perifericos: data_perifericos,
    });

    navigate("/equipos", {
      state: {
        data: [
          data_computador,
          data_telefonos,
          data_perifericos,
        ],
      },
    });
  }

  async function Equipo(cargo, procesador, memoria, disco, tipo) {
    const computadoras = `${urlApi}computador`;

    // Obtiene los datos de las computadoras

    let queryString = "";
    if (cargo) queryString += `&cargo=${cargo}`;
    if (procesador) queryString += `&procesador=${procesador}`;
    if (memoria) queryString += `&memoria=${memoria}`;
    if (disco) queryString += `&disco=${disco}`;
    if (tipo) queryString += `&tipo=${tipo}`;

    // Reemplaza caracteres por ''
    queryString = queryString.replace(/^&/, "");

    const response_computador = await fetch(`${computadoras}?${queryString}`);

    // const response_computador = await fetch(`${computadoras}?q=${disco}`);

    const data_computador = await response_computador.json();

    console.log(data_computador);

    setDatos({
      computadores: data_computador,
    });

    navigate("/resultados", {
      state: {
        data: data_computador,
      },
    });
  }

  async function Red(equipo, ipv4, mac) {
    const url = `${urlApi + equipo}/`;

    let queryString = "";
    if (ipv4) queryString += `&ipv4=${ipv4}`;
    if (mac) queryString += `&mac_adress=${mac}`;

    // Reemplaza caracteres por ''
    queryString = queryString.replace(/^&/, "");

    const response_red = await fetch(`${url}?${queryString}`);

    const data_red = await response_red.json();

    console.log(data_red);
    
    setDatos({
      red: data_red,
    });

    navigate("/resultados", {
      state: {
        data: data_red,
      },
    });
  }
  const cambiarTab = (event, newValue) => {
    setCurrentTabIndex(newValue);
  };

  const cambiarSeleccion = (event) => {
    setSeleccion(event.target.value);
  };

  const atras = String.fromCodePoint(0x2190);

  return (
    <>
      <h1 className={styles.mainTitle}> Inventario Digitalizado </h1>

      <Button color="info" onClick={() => window.history.back()}>
        {" "}
        {atras}{" "}
      </Button>

      <Box>
        <Tabs value={currentTabIndex} onChange={cambiarTab}>
          <Tab label="Personal" />
          <Tab label="Equipos" />
          <Tab label="Red" />
        </Tabs>
      </Box>

      {currentTabIndex === 0 && (
        <Box>
          <Typography
            component={"span"}
            className={styles.tabContent}
            variant="body1"
          >
            <FormControl>
              <InputLabel> Nombre </InputLabel>
              <Input inputRef={nombre} />
              <FormHelperText>Primer Nombre y Apellido</FormHelperText>
            </FormControl>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => Personal(nombre.current.value)}
            >
              {" "}
              Buscar{" "}
            </Button>
          </Typography>
        </Box>
      )}

      {currentTabIndex === 1 && (
        <Box>
          <Typography
            className={styles.tabContent}
            component={"span"}
            variant="body1"
          >
            <FormControl>
              <InputLabel> Cargo </InputLabel>
              <Input inputRef={cargo} />
              <FormHelperText>Ejemplo: Supervisor</FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel> Procesador </InputLabel>
              <Input inputRef={procesador} />
              <FormHelperText>Ejemplo: Intel Core I5</FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel> RAM </InputLabel>
              <Input inputRef={memoria} />
              <FormHelperText>Ejemplo: 8 GB</FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel> Disco </InputLabel>
              <Input inputRef={disco} />
              <FormHelperText>Ejemplo: 500 GB</FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel> Tipo </InputLabel>
              <Input inputRef={tipo} />
              <FormHelperText>Ejemplo: SSD</FormHelperText>
            </FormControl>

            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                Equipo(
                  cargo.current.value,
                  procesador.current.value,
                  memoria.current.value,
                  disco.current.value,
                  tipo.current.value
                )
              }
            >
              {" "}
              Buscar{" "}
            </Button>
          </Typography>
        </Box>
      )}

      {currentTabIndex === 2 && (
        <Box>
          <Typography
            className={styles.tabContent}
            component={"span"}
            variant="body1"
          >
            <FormControl>
              <Select
                value={seleccion}
                onChange={cambiarSeleccion}
                inputRef={equipo}
              >
                <MenuItem value={"computador"}> Computadoras </MenuItem>
                <MenuItem value={"telefono"}> Telefonos </MenuItem>
                <MenuItem value={"impresora"}> Impresoras </MenuItem>
                <MenuItem value={"accesspoint"}> Puntos de Acceso </MenuItem>
                <MenuItem value={"switch"}> Switchs </MenuItem>
                <MenuItem value={"servidor"}> Servidores </MenuItem>
                <MenuItem value={"dvr"}> DVR </MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel> IPV4 </InputLabel>
              <Input inputRef={ipv4} />
              <FormHelperText>Ejemplo: 10.0.0.179</FormHelperText>
            </FormControl>

            <FormControl>
              <InputLabel> MAC </InputLabel>
              <Input input={mac} />
              <FormHelperText>Ejemplo: A8-0B-0C-0D-0D-0E </FormHelperText>
            </FormControl>

            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                Red(equipo.current.value, ipv4.current.value, mac.current.value)
              }
            >
              {" "}
              Buscar{" "}
            </Button>
          </Typography>
        </Box>
      )}
    </>
  );
}

export default Busqueda;
