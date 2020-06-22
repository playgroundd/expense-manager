import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InfoCard from "./InfoCard";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Button from "@material-ui/core/Button";
import TransList from "./TransList";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  mainContainer: {
    color: "azure",
    backgroundColor: "#424242",
    height: "100vh",
  },
  floatingLabelFocusStyle: {
    color: "black",
  },
  textField: {
    // width: 200,
    backgroundColor: "azure",
    color: "black",
    padding: 5,
  },
});
function App() {
  const classes = useStyles();
  const [totalBalance, setTotalBalance] = React.useState(5000);
  const [totalIncome, setTotalIncome] = React.useState(10000);
  const [totalExpense, setTotalExpense] = React.useState(-5000);
  const [currentValue, setCurrentValue] = React.useState(0);
  const [currentDesc, setCurrentDesc] = React.useState("");
  const [disableBtn, setDisableBtn] = React.useState(true);
  const [trans] = React.useState([
    { id: 1, desc: "salary", amt: 10000 },
    { id: 2, desc: "electric", amt: -5000 },
  ]);

  const addTransaction = (e) => {
    e.preventDefault();
    e.currentTarget.form.reportValidity();
    let amt = parseFloat(currentValue);
    if (amt > 0) {
      setTotalIncome(totalIncome + amt);
      setTotalBalance(totalBalance + amt);
    } else if (amt < 0) {
      setTotalExpense(totalExpense + amt);
      setTotalBalance(totalBalance + amt);
    }

    trans.push({ id: new Date().getTime(), desc: currentDesc, amt: amt });
    setCurrentDesc("");
    setCurrentValue(0);
    setDisableBtn(true);
  };

  const deleteTrans = (tranId) => {    
    for (var i = 0; i < trans.length; i++) {
      if (trans[i].id === tranId) {
        let amt = parseFloat(trans[i].amt);
        if (amt > 0) {
          setTotalBalance(totalBalance - amt);
          setTotalIncome(totalIncome - amt);
        } else if (amt < 0) {
          setTotalBalance(totalBalance - amt);
          setTotalExpense(totalExpense - amt);
        }
        trans.splice(i, 1);
      }
    }
  };

  return (
    <Container className={classes.mainContainer} maxWidth="sm">
      <Grid container direction="row" justify="center" alignItems="center">
        <h1> Expense Tracker</h1>
      </Grid>
      <Grid container justify="space-around" alignItems="center">
        <InfoCard heading="Total Balance" amount={totalBalance} />
      </Grid>
      <br />
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <InfoCard heading="Total Income" amount={totalIncome} />
        <InfoCard heading="Total Expense" amount={totalExpense} />
      </Grid>
      <br />
      <form className={classes.root}>
        <Grid container direction="column" justify="space-around">
          <CurrencyTextField
            label="Amount"
            variant="standard"
            value={currentValue}
            currencySymbol="PKR"
            outputFormat="string"
            decimalCharacter="."
            digitGroupSeparator=","
            className={classes.textField}
            required={true}
            onChange={(e, value) => {
              setCurrentValue(value);
              if (!value || parseFloat(value) === 0) {
                setDisableBtn(true);
              } else {
                setDisableBtn(false);
              }
            }}
          />
          <br />
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Description"
            variant="standard"
            required={true}
            value={currentDesc}
            onChange={(e) => {
              setCurrentDesc(e.currentTarget.value);
            }}
          />
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={disableBtn}
            onClick={addTransaction}
          >
            Add Transaction
          </Button>
        </Grid>
      </form>
      <hr />
      <TransList TransList={trans} onDeleteTrans={deleteTrans}></TransList>
    </Container>
  );
}

export default App;
