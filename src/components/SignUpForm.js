import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signUp } from '../utils/actions/authActions';
import Input from './Input';

const initialState = {
  inputValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  formIsValid: false,
};

const SignUpForm = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      console.log('An error occurred:', error);
    }
  }, [error]);

  const authHandler = useCallback(async (event) => {
    if (event) event.preventDefault();

    if (!formState.formIsValid) {
      setError("Lütfen tüm alanları doğru şekilde doldurun.");
      return;
    }

    if (formState.inputValues.password !== formState.inputValues.confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }

    try {
      setIsLoading(true);
      setError(undefined);
      const action = signUp(
        formState.inputValues.email,
        formState.inputValues.password,
        {
          firstName: formState.inputValues.firstName,
          lastName: formState.inputValues.lastName,
          role: isAdmin ? 'admin' : 'user'
        }
      );
      await dispatch(action);
      if (props.onSignUpSuccess) {
        props.onSignUpSuccess();
      }
    } catch (err) {
      setError(err.message || 'Kayıt olurken bir hata oluştu.');
      setIsLoading(false);
    }
  }, [dispatch, formState, isAdmin, props]);

  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Yeni Hesap Oluştur
        </h2>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={authHandler}>
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            label="Ad"
            icon="user-o"
            type="text"
            required
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['firstName']}
          />

          <Input
            id="lastName"
            label="Soyad"
            icon="user-o"
            type="text"
            required
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities['lastName']}
          />
        </div>

        <Input
          id="email"
          label="Email"
          icon="mail"
          type="email"
          autoComplete="email"
          required
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities['email']}
        />

        <Input
          id="password"
          label="Şifre"
          icon="lock"
          type="password"
          required
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities['password']}
        />

        <Input
          id="confirmPassword"
          label="Şifre Tekrar"
          icon="lock"
          type="password"
          required
          onInputChanged={inputChangedHandler}
          errorText={formState.inputValidities['confirmPassword']}
        />

        <div className="flex items-center">
          <input
            id="isAdmin"
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900">
            Admin olarak kaydol
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Hesap Oluşturuluyor...' : 'Kayıt Ol'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm; 