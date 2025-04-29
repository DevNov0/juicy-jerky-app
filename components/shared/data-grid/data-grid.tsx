import React from "react";

export type Column<T> = {
    header: string;
    accessor?: keyof T;
    render?: (row: T) => React.ReactNode;
    width?: string;
};

type DataGridProps<T> = {
    data: T[];
    columns: Column<T>[];
};

export function DataGrid<T>(props: DataGridProps<T>) {
    return (
        <table className="min-w-full table-auto rounded-lg border-2">
            <thead>
                <tr>
                    {props.columns.map((col, index) => (
                        <th
                            key={index}
                            className="border-2 px-4 py-2 text-left"
                            style={col.width ? { width: col.width } : undefined}
                        >
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-2">
                        {props.columns.map((col, colIndex) => (
                            <td key={colIndex} className="border-2 px-4 py-2">
                                {col.render ? col.render(row) : (row[col.accessor as keyof T] as React.ReactNode)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
