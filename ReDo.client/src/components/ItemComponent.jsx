import React from "react";
import useReDoItemsStore from "../stores/useItemsStore.js";


export const ItemComponent = ({item}) => {

    const toggleItemFinished = useReDoItemsStore(state => state.toggleItemFinished);

    const handleToggle = () => {
        toggleItemFinished(item.reDoItemEntityId);
    };

    return (
        <>
            <button
                className={`list-group-item d-flex justify-content-between align-items-center ${item.isFinished ? 'list-group-item-success' : ''}`}
                onClick={handleToggle}
                key={item.reDoItemEntityId}
            >
                <div>
                    {item.description}
                </div>

                <div>
                    {item.isFinished && (<i className={"bi bi-check-lg"}></i>)}
                </div>
            </button>
        </>
    )
}


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
