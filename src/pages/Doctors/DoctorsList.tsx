import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useDoctors } from '../../hooks/useDoctors';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function DoctorsList() {
  const [search, setSearch] = React.useState('');
  const { doctors, loading } = useDoctors();

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    doctor.crm.includes(search) ||
    doctor.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Médicos
        </h1>
        <Link to="new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Médico
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <Input
          type="search"
          placeholder="Buscar por nome, CRM ou especialidade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Carregando médicos...</p>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            {search ? 'Nenhum médico encontrado' : 'Nenhum médico cadastrado'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <Link
              key={doctor.id}
              to={doctor.id}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {doctor.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                CRM: {doctor.crm}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {doctor.specialty}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {doctor.products.map((product) => (
                  <span
                    key={product}
                    className="px-2 py-1 text-xs rounded-full bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}