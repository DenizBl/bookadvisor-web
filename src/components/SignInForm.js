import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
// Bu importların web projenizde doğru yollarda olduğundan emin olun
import { validateInput } from '../utils/actions/formActions'; // Mobil ile aynı
import { reducer } from '../utils/reducers/formReducer';    // Mobil ile aynı
import { signIn } from '../utils/actions/authActions';      // Mobil ile aynı
import Input from './Input';
// import { useNavigate } from 'react-router-dom'; // Gerekirse navigasyon için

// Mobil component'ten gelen initialState
const isTestMode = false; // Veya konfigürasyonunuza göre ayarlayın
const initialState = {
    inputValues: {
        email: '',
        password: '',
    },
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: isTestMode ? true : false,
};

const SignInForm = (props) => {
    const dispatch = useDispatch();
    // const navigate = useNavigate(); // Eğer login sonrası yönlendirme burada yapılacaksa

    const [error, setError] = useState(undefined); // undefined olarak başlatmak daha iyi
    const [isLoading, setIsLoading] = useState(false);
    const [formState, dispatchFormState] = useReducer(reducer, initialState);

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue);
            dispatchFormState({ inputId, validationResult: result, inputValue });
        },
        [dispatchFormState]
    );

    useEffect(() => {
        // Web'de Alert.alert yerine hata mesajını state'e set ettik,
        // bu useEffect artık doğrudan bir UI değişikliği için gerekmeyebilir,
        // hata mesajını doğrudan render içinde gösterebiliriz.
        // Eğer yine de bir yan etki gerekiyorsa (örn: konsola loglama) kalabilir.
        if (error) {
            console.log('An error occurred:', error);
        }
    }, [error]);

    const authHandler = useCallback(async (event) => {
        if (event) event.preventDefault(); // Formun default submit'ini engelle

        if (!formState.formIsValid) {
            setError("Lütfen tüm alanları doğru şekilde doldurun.");
            return;
        }

        try {
            setIsLoading(true);
            setError(undefined); // Önceki hataları temizle
            const action = signIn(
                formState.inputValues.email,
                formState.inputValues.password
            );
            await dispatch(action);
            // Başarılı giriş sonrası yönlendirme veya başka bir işlem
            // navigate('/dashboard'); // Örnek
            if (props.onSignInSuccess) {
                props.onSignInSuccess();
            }
        } catch (err) {
            // signIn action'ınızın hata fırlattığından emin olun
            setError(err.message || 'Giriş yapılırken bir hata oluştu.');
            setIsLoading(false);
        }
        // setIsLoading(false); // Bu satır try bloğunun sonuna veya finally'e alınabilir,
                               // başarılı giriş sonrası hemen false olmaması için.
                               // Redux state'ine göre loading yönetiliyorsa burada gerekmeyebilir.
    }, [dispatch, formState, props /*, navigate */]);

    return (
        // Bu div'e CSS dosyanızdaki .modal-content veya .modern-form gibi bir sınıf verebilirsiniz.
        // Eğer bu form bir modal içinde kullanılacaksa:
        // <div className="modal-content">
        //   <button onClick={props.closeModal} className="close-modal-btn">×</button>
        //   <h2>Giriş Yap</h2>
        //   <div className="modern-form"> ... form içeriği ... </div>
        // </div>
        // Eğer doğrudan sayfa içinde kullanılacaksa:
        <div className="max-w-md w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Hesabınıza Giriş Yapın
                </h2>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={authHandler}>
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
                    autoComplete="current-password"
                    required
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities['password']}
                />

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;

