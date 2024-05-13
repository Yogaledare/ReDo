import React, {useEffect} from 'react';
import useReDoItemsStore from '../stores/useItemsStore';

const ItemsPage = () => {
    const {items, fetchItems, loading, error} = useReDoItemsStore();

    useEffect(() => {
        fetchItems();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (

        <>
            <h1>Items</h1>
            <ul>
                {items.map(item => (
                    <li key={item.reDoItemEntityId}>
                        {item.description} - {item.isFinished ? 'Done' : 'Pending'}    
                        
                    </li>
                ))}
            </ul>

        </>

    )
}

export default ItemsPage;


//
//
//     const { redoItems, fetchItems, loading, error } = useReDoItemsStore();
//
//     useEffect(() => {
//         fetchItems();
//     }, [fetchItems]);
//
//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;
//
//     return (
//         <div>
//             <h1>ReDo Items</h1>
//             <ul>
//                 {redoItems.map(item => (
//                     <li key={item.ReDoItemEntityId}>
//                         {item.Description} - {item.IsFinished ? 'Done' : 'Pending'}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
