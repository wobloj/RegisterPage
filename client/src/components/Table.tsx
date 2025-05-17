import { FC } from "react";
import { User } from "../types/user";

interface TableProps {
    data: User[];
}

export const Table:FC<TableProps> = ({data}) => {
    if (!data || data.length === 0) return <p className="text-black">No data available</p>;

    const headers = Object.keys(data[0]).filter(key => key !== "__v");

    const formatCellContent = (key: string, value: string) => {
        if (key === '_id') {
            return value.slice(0, 10) + '...';
        }
        return value;
    }

  return (
    <table className="text-black">
        <thead className="bg-indigo-500 text-white">
            <tr>
            {headers.map((header) =>(
                <th key={header} className="py-2">
                    {header === '_id'?'ID':header.toUpperCase()}
                </th> 
            ))}
            </tr>
        </thead>
        <tbody>
            {data.map((user) =>(
                <tr key={user._id} className="">
                    {headers.map((key) =>(
                        <td key={`${user._id}-${key}`} className="px-5 text-center">
                            {formatCellContent(key, user[key as keyof User] as string)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
  )
}

