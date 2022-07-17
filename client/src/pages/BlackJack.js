import React, { useEffect, useReducer } from "react";
import { useStyles } from "../hooks/useStyles";
import PlayArea from "../components/PlayArea";
import { Box, Typography, Grid } from "@material-ui/core";
import BlackJackButtons from "../components/BlackJackButtons";
import GameProgressButton from "../components/GameProgressButton";
import * as BlackJackUtilities from "../utilities/BlackJackUtilities";
import { toast, Toaster } from "react-hot-toast";
import { Navigate } from 'react-router-dom';
import Axios from "axios";

const initialDeck = BlackJackUtilities.getDeck(3);
const penetration = 0.8;

const initialState = {
  deck: initialDeck,
  minimumNumber: getMinimumNumber(initialDeck, penetration), //number of cards in deck that is the smallest before shuffling
  dealersHand: [],
  playersHand: [],
  isTurnEnd: false,
  money: 1000,
  win: 0,
  lose: 0,
  bet: 500
};

function getMinimumNumber(initialDeck, penetration) {
  return initialDeck.length - Math.floor(initialDeck.length * penetration);
}

function dealForDealer(deck, hand) { //push card to dealer hand => new deck and new dealershand
  const newDeck = deck.slice();
  const newHand = hand.slice();
  while (BlackJackUtilities.checkDealersScore(newHand)) {
    const index = Math.floor(Math.random() * newDeck.length);
    newHand.push(newDeck[index]);
    newDeck.splice(index, 1);
  }
  return [newDeck, newHand];
}

function deal(deck, hand, time) { //push card to player hand => new deck and new playershand
  const newDeck = deck.slice();
  const newHand = hand.slice();
  for (let i = 0; i < time; i++) {
    const index = Math.floor(Math.random() * newDeck.length);
    newHand.push(newDeck[index]);
    newDeck.splice(index, 1);
  }
  return [newDeck, newHand];
}

function initDealersHand(state) {
  const [newDeck, newHand] = deal(state.deck, [], 2);
  return { ...state, deck: newDeck, dealersHand: newHand };
}

function initPlayersHand(state) {
  const [newDeck, newHand] = deal(state.deck, [], 2);
  return { ...state, deck: newDeck, playersHand: newHand };
}

function reducer(state, action) {
  switch (action.type) {
    case "initGame": {
      return { ...state, isTurnEnd: true }
    }
    case "setBet": {
      return { ...state, bet: action.payload }
    }
    case "initialMoney": {
      return { ...state, money: action.payload } 
    }
    case "initialWin": {
      return { ...state, win: action.payload }
    }
    case "initialLose": {
      return { ...state, lose: action.payload }
    }
    case "init": {
      state = initDealersHand(state);
      state = initPlayersHand(state);
      return { ...state, isTurnEnd: false };
    }
    case "hit": {
      const [newDeck, newHand] = deal(state.deck, state.playersHand, 1);
      return { ...state, deck: newDeck, playersHand: newHand };
    }
    case "stand": {
      const [newDeck, newHand] = dealForDealer(state.deck, state.dealersHand);
      const judge = BlackJackUtilities.getActionOnPlayer(newHand, state.playersHand);
      if (judge === 'win'){
        const newMoney = state.money + state.bet;
        const newWin = state.win + 1;
        return { ...state, deck: newDeck, dealersHand: newHand, isTurnEnd: true, money: newMoney, win: newWin };
      } else if (judge === 'lose'){
        const newMoney = state.money - state.bet;
        const newLose = state.lose + 1;
        return { ...state, deck: newDeck, dealersHand: newHand, isTurnEnd: true, money: newMoney, lose: newLose };
      } else {
        return { ...state, deck: newDeck, dealersHand: newHand, isTurnEnd: true };
      }
    }
    case "check": {
     
      if (
        BlackJackUtilities.isBlackJack(state.dealersHand)
      ) {
        const newMoney = state.money - state.bet;
        const newLose = state.lose + 1;
        return { ...state, isTurnEnd: true, money: newMoney, lose: newLose };
      }

      if (BlackJackUtilities.isBlackJack(state.playersHand)) {
        const newMoney = state.money + 1.5 * state.bet;
        const newWin = state.win + 1;
        return { ...state, isTurnEnd: true, money: newMoney, win: newWin };
      }
     
      if (BlackJackUtilities.getTotal(state.playersHand) === 21) {
        const [newDeck, newHand] = dealForDealer(state.deck, state.dealersHand);
        const judge = BlackJackUtilities.getActionOnPlayer(newHand, state.playersHand);
        if (judge === 'win'){
          const newMoney = state.money + state.bet;
          const newWin = state.win + 1;
          return { 
            ...state,
            deck: newDeck,
            dealersHand: newHand,
            isTurnEnd: true,
            money: newMoney,
            win: newWin 
          };
        } else if (judge === 'lose'){
          const newMoney = state.money - state.bet;
          const newLose = state.lose + 1;
          return { 
            ...state,
            deck: newDeck,
            dealersHand: newHand,
            isTurnEnd: true, 
            money: newMoney, 
            lose: newLose 
          };
        }
        return {
          ...state,
          deck: newDeck,
          dealersHand: newHand,
          isTurnEnd: true
        };
      }
     
      if (BlackJackUtilities.getTotal(state.playersHand) > 21) {
        const newMoney = state.money - state.bet;
        const newLose = state.lose + 1;
        return { ...state, isTurnEnd: true, money: newMoney, lose: newLose };
      }
      return { ...state };
    }
    case "shuffle": {
      const newDeck = BlackJackUtilities.getDeck(3);
      return { ...state, deck: newDeck };
    }
    default:
  }
}

export default function Border7({user}) {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    Axios.post('http://localhost:5000/pve', {
      params: {
        user_id: user.user_id
      }
    })
    .then((response) => {
      let data = response.data[0];
      dispatch({ type: "initialMoney", payload: data.money });
      dispatch({ type: "initialWin", payload: data.win });
      dispatch({ type: "initialLose", payload: data.lose });
      dispatch({ type: "init" });
      dispatch({ type: "check" });
      dispatch({ type: "initGame" });
      update();
    });
  }, []);

  useEffect(() => {
    if (state.deck.length <= state.minimumNumber) {
      dispatch({ type: "shuffle" });
      toast("Shuffled!!", {
        style: {
          borderRadius: "10px",
          background: "#737373",
          color: "#ffffff"
        }
      });
    }
  }, [state.deck, state.minimumNumber]);
  function update(){
    Axios.post('http://localhost:5000/pve-update', {
      user_id: user.user_id,
      money: state.money,
      win: state.win,
      lose: state.lose
    }).then((response) => {
      console.log(`Update(user_id->${user.user_id}): money->${state.money}, win->${state.win}, lose->${state.lose}`);
    });
  }

  function doHit() {
    dispatch({ type: "hit" });
    dispatch({ type: "check" });
    update();
  }

  function doStand() {
    dispatch({ type: "stand" });
    update();
  }

  function next() {
    dispatch({ type: "init" });
    dispatch({ type: "check" });
    update();
  }

  function getButtons(playersHand) {
    if (BlackJackUtilities.getTotal(playersHand) > 21 || state.isTurnEnd) {
      return (
        <Grid
          container
          direction="column"
          spacing={1}
          alignItems="center">
          <input type="number" onChange={({target}) => {
            dispatch({ type: "setBet", payload: Number(target.value) });
          }} value={state.bet}/>
          <GameProgressButton onClickNext={next} />
        </Grid>
      );
    } else {
      return <BlackJackButtons onClickHit={doHit} onClickStand={doStand} />;
    }
  }

  return (
    <Box>
      <Typography variant="h1">
        <Box className={"h1-header"}>BlackJack</Box>
      </Typography>
      <Box id="table">
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <PlayArea
        dealersHand={state.dealersHand}
        playersHand={state.playersHand}
        isTurnEnd={state.isTurnEnd}
        money={state.money}
        bet={state.bet}
      />
      <Box className={classes.messageArea}>{getButtons(state.playersHand)}</Box>
      </Box>
    </Box>
  );
}
