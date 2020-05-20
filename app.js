const express = require("express");
const app = express();
const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
/* redux code starts */ 

const userReducer = (state={},action) => {
	switch(action.type){
		case "CHANGE_NAME": {
			state = {...state, name: action.payload };
			break;
		}

		case "CHANGE_AGE": {
			state = {...state, age: action.payload };
			break;
		}

		case "DEC": {
			state = {...state, age: action.payload };
			break;
		}
	}
	return state;
}

const tweetsReducer = (state=[],action) => {
	return state;	
}

const reducers = combineReducers({
	user: userReducer,
	tweets: tweetsReducer
})

const logger = (store) => (next) => (action) => {
  console.log("Logged", action);
  return next(action);
};


const errorHandler = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch(e) {
    console.log("ERROR!", e);
  }
};

const middleware = applyMiddleware(
  logger,
  errorHandler
)

const store = createStore(reducers, middleware)

store.subscribe(() => {
	console.log("store changed", store.getState())
})

store.dispatch({type: "CHANGE_NAME", payload: "Prathap"})
store.dispatch({type: "CHANGE_AGE", payload: 35})
store.dispatch({type: "CHANGE_AGE", payload: 35})
store.dispatch({type: "DEC", payload: 1})
store.dispatch({type: "DEC", payload: 1})
store.dispatch({type: "DEC", payload: 1})

// store.dispatch((dispatch) => {
// 	// dispatch something;
// 	dispatch({type: "randomONe"})
// 	// do something async;
// 	//some async func
// 	dispatch({type: "Bar"})
// })
/* redux code ends here */

app.use(express.json());

app.get("/",(req,res) => {
	res.status(200).json({
		message: "testing"
	})
})

app.listen(5000,() => { 
	console.log("Server running on port 5000") 
});
