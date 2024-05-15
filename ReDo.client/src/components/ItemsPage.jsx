import React, {useEffect} from 'react';
import useItemsStore from '../stores/useItemsStore';
import {ItemComponent} from "./ItemComponent.jsx";
import AddItemForm from "./AddItemForm.jsx";
import ItemsControlPanel from "./ItemsControlPanel.jsx";

const ItemsPage = () => {
    const {items, fetchItems, error} = useItemsStore();

    useEffect(() => {
        const fetchData = async () => {
            await fetchItems();
        }
        fetchData(); 
    }, []);

    // if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (

        <>
            <div className="row justify-content-center my-3">
                <div className="col-8">
                    <h1>Items</h1>
                    <AddItemForm></AddItemForm>
                    <ol className={"list-group my-3"}>
                        {items.map(item => (
                            <ItemComponent
                                key={item.reDoItemEntityId}
                                item={item}
                            ></ItemComponent>
                        ))}
                    </ol>
                    <ItemsControlPanel></ItemsControlPanel>
                </div>
            </div>
        </>

    )
}

export default ItemsPage;

