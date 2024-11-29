import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, Phone, Stethoscope, Calendar, Package, Pencil, Trash2 } from 'lucide-react';
import { useDoctors } from '../../hooks/useDoctors';
import Button from '../../components/ui/Button';

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors, deleteDoctor } = useDoctors();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Médico não encontrado</p>
      </div>
    );
  }

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este médico?')) {
      setIsDeleting(true);
      try {
        await deleteDoctor(doctor.id);
        navigate('/doctors');
      } catch (error) {
        console.error('Error deleting doctor:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {doctor.name}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            CRM: {doctor.crm}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/doctors/${doctor.id}/edit`)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            isLoading={isDeleting}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Stethoscope className="w-5 h-5" />
              <span>{doctor.specialty}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Phone className="w-5 h-5" />
              <span>{doctor.phone}</span>
            </div>
            <div className="flex items-start space-x-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-5 h-5 mt-1" />
              <div>
                <p>{doctor.address}</p>
                <p className="text-sm">{doctor.neighborhood}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Package className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Produtos
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {doctor.products.map((product) => (
                  <span
                    key={product}
                    className="px-3 py-1 text-sm rounded-full bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Agenda
                </h3>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dias de atendimento:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {doctor.schedule.days.map((day) => (
                      <span
                        key={day}
                        className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Períodos:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {doctor.schedule.periods.map((period) => (
                      <span
                        key={period}
                        className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {period}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 pt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Cadastrado em:{' '}
            {new Date(doctor.created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}