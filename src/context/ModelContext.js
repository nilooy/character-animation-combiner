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
      return {
        ...state,
        animations: state.animations.map((anim) =>
          anim.uuid === action.payload.uuid ? action.payload : anim
        ),
      };
    case "add_mixer":
      return { ...state, mixer: action.payload };
    case "delete_animation":
      return {
        ...state,
        animations: state.animations.filter(
          (animation) => animation.uuid !== action.payload
        ),
      };
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

const changeName = (dispatch) => (animation) => {
  dispatch({ type: "change_animation_name", payload: animation });
};

const deleteAnimation = (dispatch) => (animationId) => {
  dispatch({ type: "delete_animation", payload: animationId });
  console.log(animationId);
};

export const { Provider, Context } = createDataContext(
  modelReducer,
  {
    addMainModel,
    addAnimationFromMainModel,
    addAnimations,
    changeName,
    addMixer,
    deleteAnimation,
  },
  initialState
);
