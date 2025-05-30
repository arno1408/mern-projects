import { useEffect, useState } from 'react';

const YourComponent = ({ selectedGoals }) => {
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //     setData(selectedGoals)
    // }, [selectedGoals])



    const [data, setData] = useState(
        [
            {
                "is_education": false,
                "goal_name": "Travel",
                "user_data": []
            },
            {
                "is_education": false,
                "goal_name": "Property",
                "user_data": []
            },
            // {
            //     "is_education": false,
            //     "goal_name": "Vehicle",
            //     "user_data": []
            // },
            // {
            //     "is_education": true,
            //     "goal_name": "Education",
            //     "user_data": []
            // },
            // {
            //     "is_education": false,
            //     "goal_name": "Wedding",
            //     "user_data": []
            // },
            // {
            //     "is_education": false,
            //     "goal_name": "Unique Experience",
            //     "user_data": []
            // }
        ]);


    const [currentData, setCurrentData] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [inputData, setInputData] = useState({
        user_goal_name: '',
        purchase_year: '',
        cost_per_year: '',
        "course_duration": 1,
    });

    const [showSave, setShowSave] = useState(false);
    const [editIndex, setEditIndex] = useState({ dataIndex: null, userIndex: null });

    const handleNext = () => {
        if (currentIndex < data[currentData].user_data.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        } else if (currentData < data.length - 1) {
            setCurrentData(prevData => prevData + 1);
            setCurrentIndex(0);
        } else {
            alert("No next data available!");
        }
    };

    const handleBack = () => {
        if (currentIndex === 0 && currentData === 0) {
            alert("No previous data available!");
        } else if (currentIndex === 0 && currentData > 0) {
            setCurrentData(prevData => prevData - 1);
            setCurrentIndex(data[currentData - 1].user_data.length - 1);
        } else {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleUpdate = () => {
        const updatedData = [...data];
        updatedData[currentData].user_data[currentIndex] = inputData;
        setData(updatedData);
    };

    const handleAddNew = () => {
        setShowSave(true);
        setInputData({
            user_goal_name: '',
            purchase_year: '',
            cost_per_year: ''
        });
    };



    const handleSave = () => {
        const updatedData = [...data];
        const newData = inputData;

        if (editIndex.dataIndex !== null && editIndex.userIndex !== null) {
            updatedData[editIndex.dataIndex].user_data[editIndex.userIndex] = newData;
            setEditIndex({ dataIndex: null, userIndex: null });
        } else {
            // Add new item to user_data
            updatedData[updatedData.length - 1].user_data.push(newData);
        }

        setShowSave(false);
        setData(updatedData);
    };

    // const handleSave = () => {
    //     const updatedData = [...data];
    //     const newData = inputData;

    //     if (updatedData[currentData].user_data.length === 0) {
    //         updatedData[currentData].user_data.push(newData);
    //     } else {
    //         updatedData[currentData].user_data.splice(currentIndex + 1, 0, newData);
    //         setCurrentIndex(currentIndex + 1); // Set currentIndex to the newly added data
    //     }

    //     setShowSave(false);
    //     setData(updatedData);
    // };


    // const handleSave = () => {
    //     const updatedData = [...data];
    //     const newData = inputData;

    //     if (editIndex.dataIndex !== null && editIndex.userIndex !== null) {
    //         updatedData[editIndex.dataIndex].user_data[editIndex.userIndex] = newData;
    //         setEditIndex({ dataIndex: null, userIndex: null });
    //     } else {
    //         // Add new item to user_data
    //         updatedData[updatedData.length - 1].user_data.push(newData);
    //     }

    //     setShowSave(false);
    //     setData(updatedData);
    // };

    const handleDelete = (dataIndex, userIndex) => {
        const updatedData = [...data];
        updatedData[dataIndex].user_data.splice(userIndex, 1);
        setData(updatedData);
    };

    const handleEdit = (dataIndex, userIndex) => {
        const itemToEdit = data[dataIndex].user_data[userIndex];
        setInputData(itemToEdit);
        setEditIndex({ dataIndex, userIndex });
        setShowSave(true);
    };


    // const handleDelete = (index) => {
    //     console.log(index)
    //     const updatedData = [...data];
    //     updatedData[currentData].user_data.splice(index, 1);
    //     console.log("updatedData", updatedData)
    //     setData(updatedData);
    // };


    // const handleDelete = (index) => {
    //     console.log(index)
    //     const updatedData = [...data];
    //     updatedData[currentData].user_data = updatedData[currentData].user_data.filter((_, i) => i !== index);
    //     console.log("updatedData", updatedData)
    //     setData(updatedData);
    // };



    useEffect(() => {
        if (data[currentData].user_data.length === 0) {
            setInputData({
                user_goal_name: '',
                purchase_year: '',
                cost_per_year: ''
            });
        }
    }, [data, currentData]);

    let goalNamesList = null;
    if (currentData === data.length - 1) {
        const goalNames = data.map((item, index) => {
            return (
                <div key={index}>
                    <h3>{item.goal_name}</h3>
                    <ul>
                        {item.user_data.map((userItem, userIndex) => (
                            <li key={userIndex}>{userItem.user_goal_name}</li>
                        ))}
                    </ul>
                </div>
            );
        });

        goalNamesList = <div>{goalNames}</div>;
    }

    // old code
    // const handleUpdate = () => {
    //     const updatedData = [...data];
    //     updatedData[currentData].user_data[currentIndex] = inputData;
    //     setData(updatedData);
    // };

    // const handleAddNew = () => {
    //     setShowSave(true);
    //     setInputData({
    //         user_goal_name: '',
    //         purchase_year: '',
    //         cost_per_year: ''
    //     });
    // };

    // const handleSave = () => {
    //     const updatedData = [...data];
    //     const newData = inputData;

    //     if (updatedData[currentData].user_data.length === 0) {
    //         updatedData[currentData].user_data.push(newData);
    //     } else {
    //         updatedData[currentData].user_data.splice(currentIndex + 1, 0, newData);
    //         setCurrentIndex(currentIndex + 1); // Set currentIndex to the newly added data
    //     }

    //     setShowSave(false);
    //     setData(updatedData);
    // };


    useEffect(() => {
        if (data[currentData]?.user_data[currentIndex]) {
            setInputData(data[currentData].user_data[currentIndex]);
        }
    }, [currentData, currentIndex, data]);
    return (
        // for add new data to emty array
        <div>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleNext}>Next</button>
            {data[currentData].user_data?.length > 0 && (
                <div>
                    <p>Title: {data[currentData].goal_name}</p>
                    <div>
                        <input
                            type="text"
                            value={inputData.user_goal_name}
                            onChange={(e) => setInputData({ ...inputData, user_goal_name: e.target.value })}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={inputData.purchase_year}
                            onChange={(e) => setInputData({ ...inputData, purchase_year: e.target.value })}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={inputData.cost_per_year}
                            onChange={(e) => setInputData({ ...inputData, cost_per_year: e.target.value })}
                        />
                    </div>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleAddNew}>Add New Data</button>
                    {showSave && <button onClick={handleSave}>Save</button>}
                </div>
            )}

            {data[currentData].user_data.length === 0 &&
                <div>
                    <p>Title: {data[currentData].goal_name}</p>
                    <div>
                        <input
                            type="text"
                            value={inputData.user_goal_name}
                            onChange={(e) => setInputData({ ...inputData, user_goal_name: e.target.value })}
                            placeholder="Enter User Goal Name"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={inputData.purchase_year}
                            onChange={(e) => setInputData({ ...inputData, purchase_year: e.target.value })}
                            placeholder="Enter Purchase Year"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={inputData.cost_per_year}
                            onChange={(e) => setInputData({ ...inputData, cost_per_year: e.target.value })}
                            placeholder="Enter Cost Per Year"
                        />
                    </div>
                    <button onClick={handleSave}>Save</button>
                </div>
            }

            {currentData === data.length - 1 &&
                <>
                    {data.map((item, dataIndex) => {
                        return (
                            <div key={dataIndex}>
                                <h3>{item.goal_name}</h3>
                                <ul>
                                    {item.user_data.map((userItem, userIndex) => (
                                        <div key={userIndex}>
                                            <li key={userIndex}>{userItem.user_goal_name}</li>
                                            <button className='bg-green-400 px-2' onClick={() => handleEdit(dataIndex, userIndex)}>
                                                Edit
                                            </button>

                                            <button
                                                className='bg-red-500 text-white px-2' onClick={() => handleDelete(dataIndex, userIndex)}
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </>
            }

            {/* {goalNamesList} */}
        </div>
    );
};

export default YourComponent;
