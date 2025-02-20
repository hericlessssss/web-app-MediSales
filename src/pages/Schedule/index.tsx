import React, { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin, Phone } from 'lucide-react';
import { useDoctors } from '../../hooks/useDoctors';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

type DayOfWeek = 'Segunda-feira' | 'Terça-feira' | 'Quarta-feira' | 'Quinta-feira' | 'Sexta-feira';
type Period = 'Manhã' | 'Tarde';

interface FilterState {
  period?: Period;
  dayOfWeek?: DayOfWeek;
  specialty?: string;
  product?: string;
}

export default function Schedule() {
  const { doctors } = useDoctors();
  const [filters, setFilters] = useState<FilterState>({});

  // Get unique specialties and products for filters
  const specialties = useMemo(() => 
    Array.from(new Set(doctors.map(d => d.specialty))).sort(),
    [doctors]
  );

  const products = useMemo(() => 
    Array.from(new Set(doctors.flatMap(d => d.products))).sort(),
    [doctors]
  );

  const periods: Period[] = ['Manhã', 'Tarde'];
  const daysOfWeek: DayOfWeek[] = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira'
  ];

  // Filter doctors based on selected criteria
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesPeriod = !filters.period || doctor.schedule.periods.includes(filters.period);
      const matchesDay = !filters.dayOfWeek || doctor.schedule.days.includes(filters.dayOfWeek);
      const matchesSpecialty = !filters.specialty || doctor.specialty === filters.specialty;
      const matchesProduct = !filters.product || doctor.products.includes(filters.product);
      
      return matchesPeriod && matchesDay && matchesSpecialty && matchesProduct;
    });
  }, [doctors, filters]);

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Agenda de Visitas
        </h1>
        <Button variant="outline" onClick={clearFilters}>
          Limpar Filtros
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Filtros
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Day Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Dia da Semana
            </label>
            <select
              value={filters.dayOfWeek || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, dayOfWeek: e.target.value as DayOfWeek || undefined }))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="">Todos os dias</option>
              {daysOfWeek.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          {/* Period Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Período
            </label>
            <select
              value={filters.period || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, period: e.target.value as Period || undefined }))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="">Todos os períodos</option>
              {periods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>

          {/* Specialty Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Especialidade
            </label>
            <select
              value={filters.specialty || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value || undefined }))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="">Todas as especialidades</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>

          {/* Product Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Produto
            </label>
            <select
              value={filters.product || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, product: e.target.value || undefined }))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="">Todos os produtos</option>
              {products.map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {doctor.specialty} - CRM: {doctor.crm}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {doctor.schedule.days.join(', ')}
                </span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {doctor.schedule.periods.join(', ')}
                </span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {doctor.address}, {doctor.neighborhood}
                </span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">{doctor.phone}</span>
              </div>
            </div>

            <div className="pt-4 border-t dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {doctor.products.map((product) => (
                  <span
                    key={product}
                    className="px-2 py-1 text-xs rounded-full bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            Nenhum médico encontrado com os filtros selecionados
          </p>
        </div>
      )}
    </div>
  );
}