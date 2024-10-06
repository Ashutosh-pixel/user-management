import { useContext, useEffect, useState } from 'react';
import { ContextApi } from '../context/contextapi';

export default function UserForm({ clicked, initialData, onSave }) {
    const [namee, setNamee] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [City, setCity] = useState('');
    const [company, setCompany] = useState('');

    const { userdata } = useContext(ContextApi);

    // Effect to pre-fill form when initialData changes
    useEffect(() => {
        if (initialData) {
            setNamee(initialData.name);
            setUsername(initialData.username); // Username stays the same (non-editable)
            setPhone(initialData.phone);
            setEmail(initialData.email);
            setWebsite(initialData.website);
            setCity(initialData.address.city);
            setCompany(initialData.company.name);
        } else {
            // Reset form fields for creating a new user
            setNamee('');
            setUsername('');
            setPhone('');
            setEmail('');
            setWebsite('');
            setCity('');
            setCompany('');
        }
    }, [initialData]);

    const validateForm = () => {
        // Ensure name, phone, email, city are all valid
        if (!namee || !phone || !email || !City || !company) {
            alert("All fields except Website must be filled out!");
            return false;
        }

        // Perform phone validation
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid phone number.");
            return false;
        }

        // Perform email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        // If creating, check if username already exists
        if (!initialData) {
            const isUsernameTaken = userdata.some(user => user.username === username);
            if (isUsernameTaken) {
                alert("Username already exists. Please choose another username.");
                return false;
            } else if (username.length < 3) {
                alert("Minimum 3 Character username");
                return false;
            }
        }

        return true;
    };

    const onClickSub = () => {
        if (!validateForm()) return;

        const formdata = {
            id: initialData ? initialData.id : Math.random(), // generate random ID if creating
            name: namee,
            username,
            phone,
            email,
            website,
            address: { city: City },
            company: { name: company }
        };

        onSave(formdata);
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit User' : 'Create User'}</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name:</label>
                <input
                    minLength={3}
                    type="text"
                    value={namee}
                    onChange={(e) => setNamee(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Username:</label>
                <input
                    type="text"
                    value={username}
                    readOnly={!!initialData} // Non-editable if editing
                    onChange={(e) => setUsername(e.target.value)} // Only for creating
                    className="border border-gray-300 p-2 w-full rounded"
                    required
                    minLength={3}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone:</label>
                <input
                    minLength={10}
                    title="Please enter a valid phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} // Add onChange handler
                    pattern="^\+?[1-9]\d{1,14}$"
                    type="tel"
                    className="border border-gray-300 p-2 w-full rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Add onChange handler
                    className="border border-gray-300 p-2 w-full rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Website:</label>
                <input
                    type="url"
                    pattern="https?://.+|www\..+"
                    title="Please enter a valid URL starting with http:// or https://"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)} // Add onChange handler
                    className="border border-gray-300 p-2 w-full rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">City:</label>
                <input
                    type="text"
                    value={City}
                    onChange={(e) => setCity(e.target.value)} // Add onChange handler
                    className="border border-gray-300 p-2 w-full rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Company:</label>
                <input
                    type="text"
                    minLength={3}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)} // Add onChange handler
                    className="border border-gray-300 p-2 w-full rounded"
                    required
                />
            </div>

            <button
                onClick={() => onClickSub()}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                {initialData ? 'Update' : 'Submit'} {/* Change button text based on context */}
            </button>
        </form>
    );
}
