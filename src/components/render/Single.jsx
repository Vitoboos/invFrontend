import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button,Container } from "@mui/material";

import styles from "./Single.module.css";

function Single() {
  const location = useLocation();
  const state = location.state; // This is the state passed during navigation
  console.log(state);

  var headers = Object.keys(state.data[0]);
  const columns = [];

  for (let i = 1; i < headers.length; i++) {
    columns.push({
      field: headers[i],
      headerName: headers[i],
      width: 150,
    });
  }

  console.log(columns)

  const rows = [state.data[0]];

  for (let i = 1; i < state.data.length; i++) {
    console.log(state.data.length);
    rows.push(state.data[i]);
  }

  const atras = String.fromCodePoint(0x2190);

  return (
    <>
      <Container className={styles.container} maxWidth="xxl">
        <h1 className={styles.mainTitle}> Inventario Digitalizado </h1>
        <Button color="info" onClick={() => window.history.back()}>  {atras}  </Button>
        <Box className={styles.gridBox} sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
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
        </Box>
      </Container>
    </>
  );
}

export default Single;
