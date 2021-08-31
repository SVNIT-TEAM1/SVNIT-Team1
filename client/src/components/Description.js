import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    flex: {
        display: "flex",
        flexWrap: "wrap",
        '& > *': {
          marginRight: theme.spacing(1),
        },
    }
  }));
  

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
        <Box p={3} pt={2}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Description = (props) => {
//   console.log(props);
  const [tab, setTab] = React.useState(0);
  const classes = useStyles();
  const detailKeys = [
    "symbol",
    "companyName",
    "exchange",
    "industry",
    "CEO",
    "sector",
  ];

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
          <Tab label="More Details" id="details" />
        </Tabs>
      </AppBar>
      <TabPanel value={tab} index={0}>
        <Typography variant="h3">
          <Link target="_blank" href={"https://" + props.website}>
            {props.companyName}
          </Link>
        </Typography>
        <Typography gutterBottom>{props.description}</Typography>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Table>
          <TableBody>
            {detailKeys.map((key, index) => (
              <TableRow key={key}>
                <TableCell>{key.toUpperCase()}</TableCell>
                <TableCell>{props[key]}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Tags</TableCell>
              <TableCell className={classes.flex}>
                {props.tags.map((tag, index) => (
                  <Chip label={tag} />
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TabPanel>
    </Paper>
  );
};

export default Description;
