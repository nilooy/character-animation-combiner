import createDataContext from "./createDataContext";

const initialState = {
  mainModel: null,
  animations: [],
  mixer: null,
};

const modelReducer = (state, action) => {
  switch (action.type) {
    case "add_main_model":
      return { ...state, mainModel: action.payload };
    case "add_animations_from_main":
      return { ...state, animations: [...action.payload] };
    case "add_animations":
      return { ...state, animations: [...state.animations, ...action.payload] };
    case "change_animation_name":
      return;
    case "add_mixer":
      return { ...state, mixer: action.payload };
    default:
      return state;
  }
};

const addMixer = (dispatch) => (mixer) => {
  dispatch({ type: "add_mixer", payload: mixer });
};

const addMainModel = (dispatch) => (object) => {
  dispatch({ type: "add_main_model", payload: object });
};

const addAnimationFromMainModel = (dispatch) => (animations) => {
  dispatch({ type: "add_animations_from_main", payload: animations });
};

const addAnimations = (dispatch) => (animations) => {
  dispatch({ type: "add_animations", payload: animations });
};

const changeName = (dispatch) => (animationName) => {
  dispatch({ type: "change_animation_name", payload: animationName });
};

export const { Provider, Context } = createDataContext(
  modelReducer,
  {
    addMainModel,
    addAnimationFromMainModel,
    addAnimations,
    changeName,
    addMixer,
  },
  initialState
);
