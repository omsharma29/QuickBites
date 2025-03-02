import  { useState } from 'react';
import { LogIn } from './LogIn';
import { Signup } from './Signup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
  const [view, setView] = useState(initialView);

  return (
    <>
      {view === 'login' ? (
        <LogIn
          isOpen={isOpen}
          onClose={onClose}
          onSwitchToSignup={() => setView('signup')}
        />
      ) : (
        <Signup
          isOpen={isOpen}
          onClose={onClose}
          onSwitchToLogin={() => setView('login')}
        />
      )}
    </>
  );
}
