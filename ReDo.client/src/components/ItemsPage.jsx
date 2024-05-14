import React, {useEffect} from 'react';
import useReDoItemsStore from '../stores/useItemsStore';
import {ItemComponent} from "./ItemComponent.jsx";
import AddItemForm from "./AddItemForm.jsx";

const ItemsPage = () => {
    const {items, fetchItems, error} = useReDoItemsStore();

    useEffect(() => {
        fetchItems();
    }, []);

    // if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (

        <>
            <div className="row justify-content-center my-3">
                <div className="col-8">
                    <h1>Items</h1>
                    <AddItemForm></AddItemForm>
                    <div className={"list-group my-3"}>
                        {items.map(item => (
                            <ItemComponent item={item}></ItemComponent>
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}

export default ItemsPage;

