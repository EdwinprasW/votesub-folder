import { useForm, FieldValues } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInputField from 'components/InputFields/TextInputField';
import SelectInputField from 'components/InputFields/SelectInputField';
import devOptions from 'utils/menuOptions/developer';
import RadioInputField from 'components/InputFields/RadioInputField';
import PasswordInputField from 'components/InputFields/PasswordInputField';
import Button from 'components/UI/Button';
import Logo from 'components/UI/Logo';
import Caption from 'components/UI/Caption';
import ErrorView from 'components/UI/ErrorView';
import { IDeveloperRegForm } from 'types/regFormData';
import countryCodeOptions from 'utils/menuOptions/countryCodes';
import {
    createNewUserThunk,
    RESET_REGISTRATION_SLICE,
} from 'store/registrationPage/createNewUserSlice';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import BackdropMssg from 'components/UI/BackdropMssg';

// eslint-disable-next-line import/extensions
import DeveloperRegFormValidations from './yupValidations';

import './DeveloperRegForm.styles.scss';

const defaultDeveloperRegFormVal: IDeveloperRegForm = {
    name: {
        firstName: '',
        middleName: '',
        lastName: '',
    },
    gender: 'male',
    companyName: '',
    role: '',
    countryCode: '',
    mob1: '',
    mob2: '',
    emailId: '',
    password: '',
    confirmPassword: '',
};

const DeveloperRegForm = () => {
    const { control, formState, handleSubmit } = useForm<FieldValues>({
        defaultValues: defaultDeveloperRegFormVal,
        resolver: yupResolver(DeveloperRegFormValidations),
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const registrationSlice = useAppSelector(({ registration }) => registration);
    const userCategory = useAppSelector((state) => state.userCategory.category);

    const showErrorMssg = registrationSlice.error.code ? (
        <ErrorView errorTitle={registrationSlice.error.code} mssg={registrationSlice.error.mssg!} />
    ) : null;

    const showLoginSuccessMssg = registrationSlice.data?.uid ? (
        <BackdropMssg
            header="Registration Successful."
            mssg="Redirecting to Login page"
            open={!!registrationSlice.data?.uid}
        />
    ) : null;

    useEffect(() => {
        if (!userCategory) {
            navigate('/register');
        }
    }, []);

    useEffect(() => {
        if (registrationSlice.data?.uid) {
            setTimeout(() => navigate('/'), 2000);
        }

        return () => {
            setTimeout(() => dispatch(RESET_REGISTRATION_SLICE()), 2000);
        };
    }, [registrationSlice.data?.uid]);

    return (
        <div className="reg-form" id="developer-reg-form">
            <div className="page-view">
                <Logo goHere="/" />

                <Caption />

                <form
                    onSubmit={handleSubmit((formData) => {
                        dispatch(createNewUserThunk(formData));
                    })}
                >
                    <TextInputField
                        required
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="name.firstName"
                        inputLabel="First Name"
                        inputPlaceholder="Your Name"
                    />

                    <TextInputField
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="name.middleName"
                        inputLabel="Middle Name"
                        inputPlaceholder="Father/Husband Name"
                    />

                    <TextInputField
                        required
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="name.lastName"
                        inputLabel="Last Name"
                        inputPlaceholder="Surname"
                    />

                    <RadioInputField
                        alignCenter
                        required
                        separateLabel
                        showBorder
                        control={control}
                        fieldName="gender"
                        inputErrors={formState.errors}
                        inputLabel="Gender"
                        radioSelect={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },
                        ]}
                    />

                    <TextInputField
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="companyName"
                        inputLabel="Company Name"
                    />

                    <SelectInputField
                        required
                        separateLabel
                        control={control}
                        fieldName="role"
                        inputErrors={formState.errors}
                        inputLabel="Your role in Company"
                        options={devOptions}
                    />

                    <SelectInputField
                        required
                        separateLabel
                        control={control}
                        fieldName="countryCode"
                        inputErrors={formState.errors}
                        inputHelperText="It is required by E.164 standards"
                        inputLabel="Country Code"
                        options={countryCodeOptions}
                    />

                    <TextInputField
                        required
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="mob1"
                        inputHelperText="A valid phone number will help us and you to reset your password"
                        inputLabel="Mobile No."
                    />

                    <TextInputField
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="mob2"
                        inputLabel="Alternate Mobile No."
                    />

                    <TextInputField
                        required
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="emailId"
                        inputLabel="Email ID"
                    />

                    <PasswordInputField
                        required
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="password"
                        inputLabel="Password"
                    />

                    <PasswordInputField
                        required
                        separateLabel
                        control={control}
                        inputErrors={formState.errors}
                        fieldName="confirmPassword"
                        inputLabel="Confirm Password"
                    />

                    {showErrorMssg}

                    <Button loading={registrationSlice.loading} type="submit">
                        Submit
                    </Button>

                    {showLoginSuccessMssg}
                </form>
            </div>
        </div>
    );
};

export default DeveloperRegForm;
