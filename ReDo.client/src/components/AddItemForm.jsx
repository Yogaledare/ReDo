import {useEffect, useState} from "react";
import useItemsStore from "../stores/useItemsStore.js";


const AddItemForm = () => {

    const [description, setDescription] = useState('');
    const addItem = useItemsStore(state => state.addItem);
    const error = useItemsStore(state => state.error);
    const validationErrors = useItemsStore(state => state.validationErrors);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (description.trim()) {
            await addItem(description);
            if (validationErrors.Description && validationErrors.Description.length === 0) {
                setDescription('');
            }
        }
    };

    useEffect(() => {
            console.log(validationErrors)
        }, []
    )

    return (

        <>

            <form onSubmit={handleSubmit}>
                <div className={"d-flex mt-4"}>
                    <input
                        className={"form-control"}
                        type="text"
                        placeholder={"Add a new item"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {/*<p className={"text-danger"}>{validationErrors.description[0]}</p>*/}
                    <button type={"submit"} className={"btn btn-primary ms-3"}>Create</button>
                </div>
                {validationErrors.Description && <p className={"text-danger mt-1 ms-2"}>{validationErrors.Description[0]}</p>}

            </form>
        </>
    );


}

export default AddItemForm; 