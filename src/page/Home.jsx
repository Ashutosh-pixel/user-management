import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ContextApi } from "../context/contextapi";
import UserForm from '../component/UserForm'; // Import the UserForm component
import useFetch from "../hook/useFetchData"; // Assuming you're using this custom hook

export default function Home() {
    const { value, loader } = useFetch('https://jsonplaceholder.typicode.com/users');
    const { setName, setSite, setUserData, userdata, setId } = useContext(ContextApi);
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null); // State to hold the user being edited

    const onClickHandler = (name, id) => {
        setName(name);
        setId(id);
        navigate(`/${name}`);
    };

    const onClickSite = (site) => {
        setSite(site);
        navigate(`/site/${site}`);
    };

    const handleCreateClick = () => {
        setEditingUser(null); // Clear editing user state for creating a new user
        setShowForm(true); // Show the form
    };

    useEffect(() => {
        const storedData = localStorage.getItem('userdata');
        if (storedData) {
            setUserData(JSON.parse(storedData));
        } else if (value) {
            setUserData(value);
        }
    }, [value]);

    useEffect(() => {
        if (userdata.length) {
            localStorage.setItem('userdata', JSON.stringify(userdata));
        }
    }, [userdata]);

    const handleSaveUser = (user) => {
        if (editingUser) {
            setUserData(prevData => prevData.map(u => (u.id === user.id ? user : u)));
        } else {
            setUserData(prevData => [...prevData, user]);
        }
        setShowForm(false); // Close the form after saving
    };

    const onDeleteUser = (id) => {
        setUserData(prevData => {
            const updatedData = prevData.filter(user => user.id !== id);
            localStorage.setItem('userdata', JSON.stringify(updatedData)); // Update localStorage
            return updatedData;
        });
    };

    return (
        <div className="p-4">
            {loader ? (
                <div>Loading...</div>
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                    <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-full">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Username</th>
                                <th scope="col" className="px-6 py-3">Phone</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Website</th>
                                <th scope="col" className="px-6 py-3">City</th>
                                <th scope="col" className="px-6 py-3">Company</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userdata.map((item, index) => (
                                <tr key={index} onClick={() => onClickHandler(item.name, item.id)}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-500 cursor-pointer">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4">{item.username}</td>
                                    <td className="px-6 py-4">{item.phone}</td>
                                    <td className="px-6 py-4">{item.email}</td>
                                    <td className="px-6 py-4">
                                        <p onClick={(e) => {
                                            e.stopPropagation();
                                            onClickSite(item.website);
                                        }} style={{ color: 'blue' }} className="font-medium hover:underline">{item.website}</p>
                                    </td>
                                    <td className="px-6 py-4">{item.address.city}</td>
                                    <td className="px-6 py-4">{item.company.name}</td>
                                    <td className="flex items-center px-6 py-4 space-x-3">
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingUser(item); // Set the user to be edited
                                            setShowForm(true); // Show the form
                                        }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteUser(item.id); // Call delete function
                                        }} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Button to open the user form */}
            <div className="mt-4">
                <button onClick={handleCreateClick} type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Create
                </button>
            </div>

            {/* Conditionally render the UserForm */}
            {showForm && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg max-w-sm mx-auto w-full">
                        <UserForm
                            clicked={showForm}
                            initialData={editingUser}
                            onSave={handleSaveUser} // Pass handleSaveUser to UserForm
                        />
                        <button onClick={() => setShowForm(false)}
                            className="mt-4 text-white bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
