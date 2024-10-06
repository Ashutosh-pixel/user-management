import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ContextApi } from '../context/contextapi';

export default function User() {
    const { name } = useParams();

    const { userdata } = useContext(ContextApi)
    const { id } = useContext(ContextApi)

    const [data, setData] = useState(null)


    useEffect(() => {
        const val = userdata.find(user => user.id === id);
        setData(val);
        console.log(id, data);

    }, [data, id])

    return (
        <div>{
            !data ? <>Loader</> :
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    username
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    city
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    company
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {data.name}
                                </th>
                                <td className="px-6 py-4">
                                    {data.username}
                                </td>
                                <td className="px-6 py-4">
                                    {data.phone}
                                </td>
                                <td className="px-6 py-4">
                                    {data.email}
                                </td>
                                <td className="px-6 py-4">
                                    {data.address.city}
                                </td>
                                <td className="px-6 py-4">
                                    {data.company.name}
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
        }
        </div>

    )
}
