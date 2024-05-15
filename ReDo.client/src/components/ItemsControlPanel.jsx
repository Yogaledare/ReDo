import useItemsStore from "../stores/useItemsStore.js";


const ItemsControlPanel = () => {

    const removeLastItem = useItemsStore(state => state.removeLastItem);
    const removeAllItems = useItemsStore(state => state.removeAllItems);

    return (
        <>

            <div className="d-flex justify-content-end ps-3">
                <button
                    className={"btn btn-warning me-3"}
                    onClick={removeLastItem}
                >
                    Last
                    <i className={"bi bi-trash ms-1"}></i>
                </button>
                <button
                    className={"btn btn-danger"}
                    onClick={removeAllItems}
                >
                    All
                    <i className={"bi bi-trash ms-1"}></i>
                </button>
            </div>
        </>
    )
}


export default ItemsControlPanel;