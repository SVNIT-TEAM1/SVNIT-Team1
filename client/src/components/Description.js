import React from "react";
import Paper from "@material-ui/core/Paper";
import { Link, AppBar, Tabs, Tab, Typography, Box, Table, TableBody, TableRow, TableCell } from "@material-ui/core";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const Description = (props) => {
  console.log(props);
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Paper>
      {/*<h4>
        <Link target="_blank" href={props.website}>{props.companyName}</Link>
      </h4>
      <p>{props.description}</p>*/}
      <AppBar position="static">
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Description" id="Description" />
          <Tab label="All Details" id="details" />
        </Tabs>
      </AppBar>
      <TabPanel value={tab} index={0}>
        <h4>
          <Link target="_blank" href={props.website}>
            {props.companyName}
          </Link>
        </h4>
        <p>{props.description}</p>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Table>
          <TableBody>
          {Object.entries(props).map(([key, value]) => (
            <TableRow>
              <TableCell>{key.toUpperCase()}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TabPanel>
    </Paper>
  );
};

export default Description;
