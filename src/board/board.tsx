import React from "react";
import './boardList.css';
import addicon from '../assest/addicon.svg';
import Card from "./card";

const Board: React.FC<{ data: any, title: any, status: any, style: any, onChange: any }> = (props) => {

// export default function Board(): React.FC {
  // Sort data (Might need useMemo)
  let sorted = props.data.sort((a: any, b: any) => a.order - b.order);

  const onDragEnterHandler = (e: any) => {
    e.preventDefault();
  };
  const onDragOverHandler = (e: any) => {
    e.preventDefault();
    if (e.target.className === "boardContentArea") {
      setTimeout(() => {
        e.target.className = "boardContentArea hovered";
      }, 0);
    }
  };
  const onDragLeaveHandler = (e: any) => {
    e.preventDefault();
    if (e.target.className === "boardContentArea hovered") {
      setTimeout(() => {
        e.target.className = "boardContentArea";
      }, 0);
    }
  };
  const onDropHandler = (e: any) => {
    let cardInfo = JSON.parse(e.dataTransfer.getData("cardInfo"));
    let targetCardId = e.target.id;
    props.onChange(cardInfo, props.status, targetCardId);
    if (e.target.className === "boardContentArea hovered") {
      setTimeout(() => {
        e.target.className = "boardContentArea";
      }, 0);
    }
  };

  // returns JSX - Render cards
  const renderCards = () => {
    return sorted.map((item: any) => (
      <Card
        key={`status-${item.id}`}
        id={item.id}
        tag={item.tag}
        title={item.title}
        text={item.text}
        image={item.image}
        status={item.status}
        avatar={item.avatar}
        comments={item.comments}
        files={item.files}
        // label={item.label}
      />
    ));
  };

  return (
    <div className="board-col">
      <div className="list">
        <div className="list-header-container">
          <div className="list-title"><div className="board-col-dot" style={props.style}></div><div>{props.title}</div></div>
          {props.status === "todo" && (<div><img src={addicon} /></div>)}
        </div>
        <div className="header-border-bottom" style={props.style}></div>
        <div
          className="boardContentArea"
          onDragEnter={onDragEnterHandler}
          onDragOver={onDragOverHandler}
          onDragLeave={onDragLeaveHandler}
          onDrop={onDropHandler}
        >
          {renderCards()}
        </div>
        {/* <a className="btn-list">+ Add another card</a> */}
      </div>
    </div>
  );
}

export default Board;