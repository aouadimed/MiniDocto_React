import React from 'react';

interface Client {
  id: string;
  name: string;
  email: string;
  amount: string;
  date: string;
  status: 'Active' | 'Inactive';
}

interface ClientTableProps {
  clients?: Client[];
  loading?: boolean;
}

// Mock data for demo
const defaultClients: Client[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', amount: '$1,200', date: '2024-06-01', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', amount: '$2,500', date: '2024-06-02', status: 'Inactive' },
  { id: '3', name: 'Alice Brown', email: 'alice@example.com', amount: '$3,000', date: '2024-06-03', status: 'Active' },
];

const ClientTable: React.FC<ClientTableProps> = ({ 
  clients = defaultClients, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="w-full overflow-x-auto bg-white rounded-lg shadow-xs dark:bg-gray-800">
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
            <div className="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Recent Clients</h3>
      </div>
      <table className="w-full whitespace-no-wrap">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          {clients.map((client) => (
            <tr key={client.id} className="text-gray-700 dark:text-gray-400">
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                    <img
                      className="object-cover w-full h-full rounded-full"
                      src={`https://i.pravatar.cc/150?u=${client.email}`}
                      alt={client.name}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{client.name}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{client.email}</td>
              <td className="px-4 py-3 text-sm font-semibold">{client.amount}</td>
              <td className="px-4 py-3 text-sm">{client.date}</td>
              <td className="px-4 py-3">
                <span 
                  className={`px-2 py-1 font-semibold leading-tight text-xs rounded-full ${
                    client.status === 'Active' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100' 
                      : 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100'
                  }`}
                >
                  {client.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
