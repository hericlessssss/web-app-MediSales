import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDoctors } from '../../hooks/useDoctors';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const PRODUCTS = ['Ellansé', 'Silhouette', 'Perfecta'];
const PERIODS = ['Manhã', 'Tarde'];
const DAYS = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
];

export default function DoctorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { doctors, createDoctor, updateDoctor } = useDoctors();
  const [isLoading, setIsLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    address: '',
    neighborhood: '',
    phone: '',
    crm: '',
    specialty: '',
    products: [] as string[],
    schedule: {
      days: [] as string[],
      periods: [] as string[],
    },
  });

  React.useEffect(() => {
    if (id) {
      const doctor = doctors.find((d) => d.id === id);
      if (doctor) {
        setFormData({
          name: doctor.name,
          address: doctor.address,
          neighborhood: doctor.neighborhood,
          phone: doctor.phone,
          crm: doctor.crm,
          specialty: doctor.specialty,
          products: doctor.products,
          schedule: doctor.schedule,
        });
      }
    }
  }, [id, doctors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        await updateDoctor(id, formData);
      } else {
        await createDoctor(formData);
      }
      navigate('/doctors');
    } catch (error) {
      console.error('Error saving doctor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleProduct = (product: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...prev.products, product],
    }));
  };

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        days: prev.schedule.days.includes(day)
          ? prev.schedule.days.filter((d) => d !== day)
          : [...prev.schedule.days, day],
      },
    }));
  };

  const togglePeriod = (period: string) => {
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        periods: prev.schedule.periods.includes(period)
          ? prev.schedule.periods.filter((p) => p !== period)
          : [...prev.schedule.periods, period],
      },
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {id ? 'Editar Médico' : 'Novo Médico'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="CRM"
            value={formData.crm}
            onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
            required
          />

          <Input
            label="Especialidade"
            value={formData.specialty}
            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            required
          />

          <Input
            label="Telefone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <Input
            label="Endereço"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />

          <Input
            label="Bairro"
            value={formData.neighborhood}
            onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Produtos
            </label>
            <div className="flex flex-wrap gap-2">
              {PRODUCTS.map((product) => (
                <button
                  key={product}
                  type="button"
                  onClick={() => toggleProduct(product)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      formData.products.includes(product)
                        ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  {product}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Agenda
            </label>
            
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Dias de atendimento
              </p>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${
                        formData.schedule.days.includes(day)
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }
                    `}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Períodos
              </p>
              <div className="flex gap-2">
                {PERIODS.map((period) => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => togglePeriod(period)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${
                        formData.schedule.periods.includes(period)
                          ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }
                    `}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/doctors')}
          >
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {id ? 'Atualizar' : 'Cadastrar'} Médico
          </Button>
        </div>
      </form>
    </div>
  );
}