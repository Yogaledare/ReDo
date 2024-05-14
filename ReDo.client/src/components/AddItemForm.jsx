import {useState} from "react";
import useItemsStore from "../stores/useItemsStore.js";


const AddItemForm = () => {

    const [description, setDescription] = useState('');
    const addItem = useItemsStore(state => state.addItem);
    const error = useItemsStore(state => state.error);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (description.trim()) {
            await addItem(description);
            setDescription('');
        }
    };

    return (

        <>
            
            <form onSubmit={handleSubmit}>
                <div className={"d-flex my-4"}>
                    <input 
                        className={"form-control"} 
                        type="text"
                        placeholder={"Add a new item"}
                    />
                    <button type={"submit"} className={"btn btn-primary ms-3"}>Create</button>
                </div>

            </form>


        </>


)
    ;


}

export default AddItemForm; 