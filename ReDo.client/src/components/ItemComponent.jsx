import React from "react";
import useItemsStore from "../stores/useItemsStore.js";


export const ItemComponent = ({item: {reDoItemEntityId, isFinished, description}}) => {

    const toggleItemFinished = useItemsStore(state => state.toggleItemFinished);
    const removeItem = useItemsStore(state => state.removeItem);

    const handleToggle = async () => {
        console.log("toggled")
        await toggleItemFinished(reDoItemEntityId);
    };

    const handleRemove = async () => {
        await removeItem(reDoItemEntityId);
    };


    return (
        <>
            <label
                className={"list-group-item d-flex justify-content-between"}
            >
                <div>
                    <input 
                        className={"form-check-input me-2"} 
                        type="checkbox"
                        checked={isFinished}
                        onChange={handleToggle}
                    />
                    {description}
                </div>

                <button className="btn btn-outline-danger btn-sm" onClick={handleRemove}>
                    <i className="bi bi-trash-fill"></i>
                </button>
            </label>
        </>
    )
}



//
// <div
//     className="form-check flex-grow-1"
//     onClick={handleToggle}
//     style={{ cursor: "pointer" }}
// >
//     <input className="form-check-input"
//            type="checkbox"
//            checked={item.isFinished}
//         // onChange={handleToggle}
//            id={`checkbox-${item.reDoItemEntityId}`}
//            style={{ cursor: "pointer" }}
//         // style={{ marginRight: "10px" }} 
//     />
//     <label className="form-check-label flex-grow-1">
//         {item.description}
//     </label>
//     {/*{item.isFinished && <i className="bi bi-check-lg" style={{ marginLeft: "auto" }}></i>}*/}
// </div>
// <button className="btn btn-outline-danger btn-sm" onClick={handleRemove}>
//     <i className="bi bi-trash-fill"></i>
// </button>
//


//
// <>
//     <li className={`list-group-item d-flex justify-content-between`}>
//         <div
//             className="form-check flex-grow-1"
//             onClick={handleToggle}
//             style={{ cursor: "pointer" }}
//         >
//             <input className="form-check-input"
//                    type="checkbox"
//                    checked={item.isFinished}
//                 // onChange={handleToggle}
//                    id={`checkbox-${item.reDoItemEntityId}`}
//                 // style={{ marginRight: "10px" }} 
//             />
//             <label className="form-check-label flex-grow-1">
//                 {item.description}
//             </label>
//             {/*{item.isFinished && <i className="bi bi-check-lg" style={{ marginLeft: "auto" }}></i>}*/}
//         </div>
//         <button className="btn btn-outline-danger btn-sm" onClick={handleRemove}>
//             <i className="bi bi-trash-fill"></i>
//         </button>
//     </li>
// </>
//

//
// <>
//     <li className={`list-group-item d-flex justify-content-between`}>
//         <div
//             className="form-check form-check-inline flex-grow-1"
//             // onClick={handleToggle}
//             style={{ cursor: "pointer" }}
//         >
//             <input className="form-check-input"
//                    type="checkbox"
//                    checked={item.isFinished}
//                    onChange={handleToggle}
//                    style={{ marginRight: "10px" }}
//             />
//             <label className="form-check-label flex-grow-1">
//                 {item.description}
//             </label>
//             {/*{item.isFinished && <i className="bi bi-check-lg" style={{ marginLeft: "auto" }}></i>}*/}
//         </div>
//         <button className="btn btn-outline-danger btn-sm" onClick={handleRemove}>
//             <i className="bi bi-trash-fill"></i>
//         </button>
//     </li>
// </>

//
// <li className={`list-group-item d-flex justify-content-between align-items-center ${item.isFinished ? 'list-group-item-success' : ''}`}>
//    
//    
//
//
// <div className={"list-group-item"}>
//     <button
//         className={`list-group-item d-flex justify-content-between align-items-center ${item.isFinished ? 'list-group-item-success' : ''}`}
//         onClick={handleToggle}
//         key={item.reDoItemEntityId}
//     >
//         <div>
//             {item.description}
//         </div>
//
//         <div>
//             {item.isFinished && (<i className={"bi bi-check-lg"}></i>)}
//         </div>
//     </button>
// </div>
//

//
//
//
//
// <li
//     className={`list-group-item d-flex justify-content-between align-items-center ${item.isFinished ? 'list-group-item-success' : ''}`}
//     onClick={handleToggle} // Making the whole item clickable
//     key={item.reDoItemEntityId}
// >
//     <div>
//         {item.description}
//     </div>
//
//     <div>
//
//         <button
//             className={"btn btn-primary"}
//             onClick={() => toggleItemFinished(item.reDoItemEntityId)}
//         >
//             {item.isFinished ? 'Done' : 'Pending'}</button>
//
//         <i className={"bi bi-check-lg"}></i>
//
//     </div>
// </div>
// </li>
//
//
//

//
//
// className={"list-group-item"}


//
//
//
// <li
//     className={"list-group-item"}
//     key={item.reDoItemEntityId}
// >
//     <div className={"d-flex justify-content-between align-items-center"}>
//         <div>
//             {item.description}
//         </div>
//
//         <div>
//
//             <button
//                 className={"btn btn-primary"}
//                 onClick={() => toggleItemFinished(item.reDoItemEntityId)}
//             >
//                 {item.isFinished ? 'Done' : 'Pending'}</button>
//
//             <i className={"bi bi-check-lg"}></i>
//
//         </div>
//     </div>
// </li>
//

//
// <div className={`list-group-item ${todo.completed ? 'bg-dark-subtle' : ''}`}>
//     <div className={'d-flex justify-content-between align-items-center'}>
//         <div className={'me-auto pe-3'} style={{maxWidth: '80%'}}>
//             <div className={`${todo.completed ? 'text-decoration-line-through ' : ''}`}>
//                 {todo.text}
//             </div>
//         </div>
//         <div>
//             <button
//                 onClick={() => toggleComplete(todo.id)}
//                 className={`btn btn-outline-success me-3 ${todo.completed ? 'bg-success': ''}`}>
//                 <i className={`bi text-white bi-check-lg `}></i>
//             </button>
//
//             <button onClick={() => removeItem(todo.id)} className={'btn btn-danger'}>
//                 <i className={'bi bi-trash'}></i>
//             </button>
//         </div>
//     </div>
// </div>
//
