export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Doctor {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  phone: string;
  crm: string;
  specialty: string;
  products: string[];
  schedule: {
    days: string[];
    periods: string[];
  };
  created_at: string;
}

export interface Event {
  id: string;
  doctor_id: string;
  title: string;
  description: string;
  date: string;
  created_at: string;
}

export interface Comment {
  id: string;
  doctor_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface Notice {
  id: string;
  type: string;
  title: string;
  content: string;
  date: string;
  attachments: string[];
  created_at: string;
}