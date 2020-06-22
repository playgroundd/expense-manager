import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    backgroundColor: "lightgray",
  },
});

export default function InfoCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <b> {props.heading} </b>
        </Typography>
        <Typography variant="h5" component="h2">
          <span style={{ color: props.amount < 0 ? "red" : "green" }}>
            {numberFormat(props.amount)}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}


const numberFormat = (value) =>
  new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "PKR",
  }).format(value);
