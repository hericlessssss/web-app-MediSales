/*
  # Populate doctors table with sample data

  1. Data Population
    - Adds 10 fictional doctors with complete information:
      - Name, CRM, specialty
      - Contact information (phone, address)
      - Products they work with
      - Schedule information (days and periods)
    
  2. Data Variety
    - Different specialties
    - Various product combinations
    - Different schedule patterns
    - Distributed across different neighborhoods
*/

INSERT INTO medicos (name, address, neighborhood, phone, crm, specialty, products, schedule, created_at)
VALUES
  (
    'Dra. Sofia Oliveira',
    'Rua das Flores, 123',
    'Jardim Botânico',
    '(11) 98765-4321',
    '123456',
    'Dermatologia',
    ARRAY['Ellansé', 'Silhouette'],
    jsonb_build_object(
      'days', ARRAY['Segunda-feira', 'Quarta-feira', 'Sexta-feira'],
      'periods', ARRAY['Manhã', 'Tarde']
    ),
    NOW()
  ),
  (
    'Dr. Lucas Santos',
    'Avenida Paulista, 1500',
    'Bela Vista',
    '(11) 98888-7777',
    '234567',
    'Cirurgia Plástica',
    ARRAY['Ellansé', 'Silhouette', 'Perfecta'],
    jsonb_build_object(
      'days', ARRAY['Terça-feira', 'Quinta-feira'],
      'periods', ARRAY['Manhã']
    ),
    NOW()
  ),
  (
    'Dra. Isabella Costa',
    'Rua Augusta, 789',
    'Consolação',
    '(11) 97777-6666',
    '345678',
    'Dermatologia',
    ARRAY['Perfecta'],
    jsonb_build_object(
      'days', ARRAY['Segunda-feira', 'Quarta-feira'],
      'periods', ARRAY['Tarde']
    ),
    NOW()
  ),
  (
    'Dr. Gabriel Mendes',
    'Rua Oscar Freire, 456',
    'Jardins',
    '(11) 96666-5555',
    '456789',
    'Cirurgia Plástica',
    ARRAY['Ellansé', 'Perfecta'],
    jsonb_build_object(
      'days', ARRAY['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'],
      'periods', ARRAY['Manhã']
    ),
    NOW()
  ),
  (
    'Dra. Beatriz Lima',
    'Alameda Santos, 234',
    'Paraíso',
    '(11) 95555-4444',
    '567890',
    'Dermatologia',
    ARRAY['Silhouette'],
    jsonb_build_object(
      'days', ARRAY['Segunda-feira', 'Quarta-feira', 'Sexta-feira'],
      'periods', ARRAY['Manhã', 'Tarde']
    ),
    NOW()
  ),
  (
    'Dr. Miguel Almeida',
    'Rua Pamplona, 567',
    'Jardim Paulista',
    '(11) 94444-3333',
    '678901',
    'Cirurgia Plástica',
    ARRAY['Ellansé', 'Silhouette', 'Perfecta'],
    jsonb_build_object(
      'days', ARRAY['Terça-feira', 'Quinta-feira'],
      'periods', ARRAY['Tarde']
    ),
    NOW()
  ),
  (
    'Dra. Laura Ferreira',
    'Rua Haddock Lobo, 890',
    'Cerqueira César',
    '(11) 93333-2222',
    '789012',
    'Dermatologia',
    ARRAY['Ellansé', 'Perfecta'],
    jsonb_build_object(
      'days', ARRAY['Segunda-feira', 'Quinta-feira'],
      'periods', ARRAY['Manhã']
    ),
    NOW()
  ),
  (
    'Dr. Arthur Rodrigues',
    'Avenida Brasil, 123',
    'Jardim América',
    '(11) 92222-1111',
    '890123',
    'Cirurgia Plástica',
    ARRAY['Silhouette', 'Perfecta'],
    jsonb_build_object(
      'days', ARRAY['Segunda-feira', 'Quarta-feira', 'Sexta-feira'],
      'periods', ARRAY['Manhã', 'Tarde']
    ),
    NOW()
  ),
  (
    'Dra. Valentina Pereira',
    'Rua Estados Unidos, 456',
    'Jardim Europa',
    '(11) 91111-0000',
    '901234',
    'Dermatologia',
    ARRAY['Ellansé', 'Silhouette'],
    jsonb_build_object(
      'days', ARRAY['Terça-feira', 'Quinta-feira'],
      'periods', ARRAY['Tarde']
    ),
    NOW()
  ),
  (
    'Dr. Theo Carvalho',
    'Alameda Jaú, 789',
    'Jardim Paulista',
    '(11) 90000-9999',
    '012345',
    'Cirurgia Plástica',
    ARRAY['Ellansé', 'Silhouette', 'Perfecta'],
    jsonb_build_object(
      'days', ARRAY['Segunda-feira', 'Quarta-feira', 'Sexta-feira'],
      'periods', ARRAY['Manhã']
    ),
    NOW()
  );