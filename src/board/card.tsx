import React, { useState } from "react";
import './boardList.css';
import dot from '../assest/dot.svg';
import message_box from '../assest/message_box.svg';
import files_img from '../assest/files_img.svg';


const tempColors = { "Bug Fix": 1, "UI Dev": 2, Testing: 3 };

const Card: React.FC<{ id: any, tag: any, title: any, text: any, status: any, image: any, avatar: any, comments: any, files: any }> = (props) => {
  const [onHold, setOnHold] = useState(false);

  const dragStartHandler = (e: any) => {
    e.dataTransfer.setData("cardInfo", JSON.stringify(props.id, props.status));
    e.target.className += " ohhold";
    setTimeout(() => {
      setOnHold(true);
    }, 0);
  };
  const dragEndHandler = () => {
    setOnHold(false);
  };
  const onDragOverHandler = (e: any) => {
    e.preventDefault();
    if (e.target.className === "card") {
      setTimeout(() => {
        e.target.className = "card anotherCardOnTop";
      }, 0);
    }
  };
  const onDragLeaveHandler = (e: any) => {
    resetClassName(e);
  };
  const onDropHandler = (e: any) => {
    resetClassName(e);
    /**  
     TODO: Remove all anotherCardOnTop classnames 
     from DOM after drop complete.
    */
  };

  const resetClassName = (e: any) => {
    e.preventDefault();
    let isCard =
      e.target.className === "card" ||
      e.target.className === "card anotherCardOnTop";
    if (isCard) {
      setTimeout(() => {
        e.target.className = "card";
      }, 0);
    }
  };

  return (
    <div
      id={props.id}
      className={`card ${onHold ? "hidden" : ""}`}
      draggable="true"
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
    >
      <div className="tag_container">
        <div className={`cardTag ${props.tag.toLowerCase()}`}>
          {props.tag}
        </div>
        <div>
          <img src={dot}></img>
        </div>
      </div>
      <div className="cardTitle">{props.title}</div>
      {!!props.text && (
        <div className="cardText">
          {props.text}
        </div>
      )}
      <div className="image-container">
        {props.image && props.image.length > 0 && props.image.map((i: any) => <img src={i} className="cardImage" />)}
      </div>
      <div className="footer">
        <div className="avatar-container">
          {props.avatar && props.avatar.length > 0 && props.avatar.map((i: any) => <img src={i} className="avatarImage" />)}
        </div>
        <div>
          <img src={message_box}></img>
          <span>{props.comments} comments</span>
        </div>
        <div>
          <img src={files_img}></img>
          <span>{props.files} files</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
