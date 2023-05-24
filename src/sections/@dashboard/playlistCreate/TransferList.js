import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import SearchField from '../songs/SearchField';
import SelectCategory from '../songs/SelectCategory';
import TextFieldName from './TextFieldName';
import SelectPlaylistCategory from './SelectPlaylistCategory';
import FloatingActionButtonsSave from '../common/FloatingActionButtonsSave';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList() {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [searchText, setSearchText] = useState("");

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

const handleToggle = (value) => () => {
  const currentIndex = checked.indexOf(value);
  const newChecked = [...checked];

  if (currentIndex === -1) {
    newChecked.push(value);
  } else {
    newChecked.splice(currentIndex, 1);
  }

  setChecked(newChecked);
};

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const fetchData = () => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    fetch("http://localhost:8080/dashboard/songs", { headers })
      .then((response) => response.json())
      .then((data) => {
        const names = data.map((item) => item.name);
        setLeft(names);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (newSearchText) => {
    setSearchText(newSearchText);
  };

  const filteredList = left.filter((value) =>
    searchText !== ""
      ? value.toLowerCase().includes(searchText.toLowerCase())
      : true
  );

  const customList = (items) => (
    <Paper sx={{ width: "100%", height: 640, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value, index) => {
          const labelId = `transfer-list-item-${index}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={5.5}>
        <SearchField handleSearch={handleSearch} />
        <SelectCategory />
        {customList(filteredList)}
      </Grid>
      <Grid item xs={12} md={1} sx={{ textAlign: "center" }}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            color="primary"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            color="primary"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={5.5}>
        <TextFieldName />
        <SelectPlaylistCategory />
        {customList(right)}
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <FloatingActionButtonsSave />
        </Grid>
      </Grid>
    </Grid>
  );
}
