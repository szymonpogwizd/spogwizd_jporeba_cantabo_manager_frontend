import React, { useState } from "react";
import List from "@mui/material/List";

export default function EmptyList() {
  const [data, setData] = useState([]);

  return (
    <div>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          height: "50vh",
          overflow: "auto",
        }}
      >
        {data.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </List>
    </div>
  );
}