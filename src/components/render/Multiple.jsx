import styles from "./Multiple.module.css";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button, Container } from "@mui/material";

function Multiple() {
  const location = useLocation();
  const state = location.state; // This is the state passed during navigation

  const atras = String.fromCodePoint(0x2190);

  var headers = Object.keys(state.data);
  const columns = [];
  const rows = [];

  // Creacion de columnas
  state.data.filter((item) => item.length > 0).forEach((item) => {
    let auxCol = [];
    Object.keys(item[0]).forEach((key) => {
      auxCol.push({ field: key, headerName: key, width: 150 });
    })
    columns.push(auxCol);
  });

  // Creacion de filas

  state.data.filter((item) => item.length > 0).forEach((item) => {    
    let auxRow = [];
    let auxArray = [];
    Object.keys(item).forEach((key) => {
      auxArray.push(item[key]);
    })       
    auxRow.push(auxArray);
    rows.push(auxRow)
  })

  return (
    <Container className={styles.container} maxWidth="xxl">
      <h1 className={styles.mainTitle}> Inventario Digitalizado </h1>
      <Button color="info" onClick={() => window.history.back()}>
        {" "}
        {atras}{" "}
      </Button>

      {state.data
        .filter((item) => item.length > 0)
        .map(
          (item, index) => (
            (
              console.log(rows),
              console.log(columns),
              <Container key={Math.random()}>
                <DataGrid
                  key={Math.random()}
                  rows={Object.values(rows[index][0])} // Ensure rows are defined
                  columns={Object.values(columns[index])} // Ensure columns are defined
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 20,
                      },
                    },
                  }}
                  pageSizeOptions={[20, 50, 100]}
                  disableRowSelectionOnClick
                  className={styles.grid}
                />
              </Container>
            )
          )
        )}
    </Container>
  );
}

export default Multiple;
