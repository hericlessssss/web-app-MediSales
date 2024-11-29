import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../stores/useAuthStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { signUp, user } = useAuthStore();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Conta criada com sucesso!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enviamos um email de confirmação para {email}.<br />
              Por favor, verifique sua caixa de entrada para ativar sua conta.
            </p>
          </div>
          <Button
            onClick={() => navigate('/login')}
            className="w-full max-w-xs mx-auto"
          >
            Ir para Login
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    setIsLoading(true);

    try {
      await signUp(email, password);
      setIsSuccess(true);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            MedVisit
          </h1>
          <h2 className="mt-6 text-center text-xl text-gray-600 dark:text-gray-400">
            Crie sua conta
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="seu@email.com"
            />
            
            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="••••••••"
            />

            <Input
              label="Confirmar Senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Criar Conta
          </Button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}