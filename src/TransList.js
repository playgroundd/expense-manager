import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles({
  root: {
    minWidth: 200,
    backgroundColor: "lightgray",
  },
  transItem: {
    display: "flex",
    justifyContent: "space-between",
    boxshadow: "0 0 10px gray",
    padding: "0px 0px",
    margin: "0px 0px",
  },
  transDesc:{
    display:"inline-block",
     width:"30px"
  }
});



export default function TransList(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          <b> Transactions </b>
        </Typography>
        <Typography variant="h5" component="h2">
          <ul>
            {props.TransList.map((tran, idx) => {
              return (
                <li key={tran.id} className={classes.transItem}>
                  <span className={classes.transDesc}>{tran.desc}</span>
                  <span>{tran.amt}</span>
                  <IconButton aria-label="delete" onClick={()=>props.onDeleteTrans(tran.id)}>
                    <DeleteIcon />
                  </IconButton>
                </li>
              );
            })}
          </ul>
        </Typography>
      </CardContent>
    </Card>
  );
}
