import React, { useContext, useEffect, useState } from "react";
import { Context as ModalContext } from "../context/ModelContext";

const AnimationList = () => {
  const {
    state: { mainModel, animations, mixer },
    changeName,
  } = useContext(ModalContext);

  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.name === "rename") return;

      setEditingId(null);
    });
  }, [animations]);

  const playAnimation = (animation) => {
    mixer.stopAllAction();
    var action = mixer.clipAction(animation);
    console.log(animation);
    action.play();
  };

  const changeAnimationName = (animation) => {
    if (name.length) {
      animation.name = name;
      console.log(animation);
    }
    setEditingId(null);
  };

  return (
    <ul className="collection with-header">
      <li className="collection-header active">
        <h5>Animations ({animations.length})</h5>
        <p>Double Click to rename | Click to play</p>
      </li>
      {animations.map((item) =>
        item.uuid === editingId ? (
          <input
            name="rename"
            style={{ paddingLeft: 10 }}
            key={item.uuid}
            type="text"
            placeholder="Rename"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? changeAnimationName(item) : null
            }
            defaultValue={item.name}
            autoFocus
          />
        ) : (
          <li
            key={item.uuid}
            className="collection-item"
            onClick={() => playAnimation(item)}
            onDoubleClick={() => setEditingId(item.uuid)}
          >
            {item.name}
          </li>
        )
      )}
    </ul>
  );
};

export default AnimationList;
