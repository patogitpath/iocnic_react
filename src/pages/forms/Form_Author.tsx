import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, withIonLifeCycle } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import "./Form_Author.css";
import { useHistory } from "react-router";
import axios from "axios";
import links from "../../services/links";


const validationSchema = yup.object({
    name: yup.string().nullable().required("name is required"),
    apellido: yup.string().nullable().required("apellido is required"),
    edad: yup.number().nullable().required("edad is required")
});

interface Props {
    mensaje: any
}

const FormAuthor: React.FC<Props> = (dataUrl) => {

    const history = useHistory();

    const[ present, dismiss ] = useIonLoading();

    const [datos, setDatos] = useState({
        name: '',
        apellido: '',
        edad: '',
        touchedName: false,
        touchedApellido: false,
        touchedEdad: false,
        isSubmitForm: false,
        showLoading: true,
        dismissLoad: false
    });

    const { handleSubmit, control, getValues, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            apellido:  '',
            edad: null
        }
    });

    useEffect(() => {
        setDatos({
            ...datos,
            name:'',
            apellido: '',
            edad: '',
            touchedName: false,
            touchedApellido: false,
            touchedEdad: false,
            isSubmitForm: false,
            dismissLoad: false
        });
        setValue("name", "");
        setValue("apellido", "");
        setValue("edad", null);
    }, [dataUrl]);

    const submitForm = async (data: any) => {

        setDatos({
            ...datos,
            dismissLoad: true
        });

        let author: any = {
            name: data.name,
            apellido: data.apellido,
            edad: data.edad
        };

        try {

            const dataResponse = await axios.post(links.postNewAuthor, author);

        } catch (error) {
            
            console.log(error);

        }

        setDatos({
            ...datos,
            dismissLoad: false
        });
        history.push("/");

    }

    const validateNombre = (name: any, apellido: any) => {

        console.log(name + " " + apellido);

        
        return true;

    }

    const touchedFormstate = (control: any) => {

        setDatos({
            ...datos,
            [control]: true
        });

    }

    return(
        <>
        {/*<Formik
            initialValues={{
                name: null,
                apellido: null,
                edad: null
            }}
            validationSchema={ validationSchema }
            onSubmit={values => {
                console.log(values);
            }}

        >
        { formikProps => (
            <form onSubmit={ formikProps.handleSubmit }>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonItem className="ion-margin-bottom">
                                <IonLabel position="stacked">Name</IonLabel>
                                <IonInput type="text" name="name" placeholder="name" onBlur={ formikProps.handleBlur } value={ formikProps.values.name } onIonChange={ formikProps.handleChange }></IonInput>
                            </IonItem>
                            { formikProps.touched.name && formikProps.errors.name?.length ? (<p>{ formikProps.errors.name }</p>) : '' }
                            <IonItem className="ion-margin-bottom">
                                <IonLabel position="stacked">Apellido</IonLabel>
                                <IonInput type="text" name="apellido" placeholder="apellido" onBlur={ formikProps.handleBlur } value={ formikProps.values.apellido } onIonChange={ formikProps.handleChange }></IonInput>
                            </IonItem>
                            { formikProps.touched.apellido && formikProps.errors.apellido?.length ? (<p>{ formikProps.errors.apellido }</p>) : '' }
                            <IonItem className="ion-margin-bottom">
                                <IonLabel position="stacked">Edad</IonLabel>
                                <IonInput type="number" name="edad" placeholder="edad" onBlur={ formikProps.handleBlur } value={ formikProps.values.edad } onIonChange={ formikProps.handleChange }></IonInput>
                            </IonItem>
                            { formikProps.touched.edad && formikProps.errors.edad?.length ? (<p>{ formikProps.errors.edad }</p>) : '' }
                            <IonButton type="submit" expand="block" color="primary" disabled={ formikProps.isSubmitting }>Save</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </form>
        )}
        </Formik>*/}
        <form onSubmit={ handleSubmit(submitForm) }>
            <IonItem className="ion-margin-bottom">
                <IonLabel position="stacked">Name</IonLabel>
                <Controller
                    render={({ field: { onChange, onBlur, value }}) => (<IonInput name="name" type="text" onIonChange={ onChange } onIonFocus={() => { touchedFormstate('touchedName') }} placeholder="name" value={ value } />)}
                    control={control}
                    name="name"
                    rules={{
                        required: { value: true, message: "nombre is required" },
                        validate: () => validateNombre(getValues("name"), getValues("apellido"))
                    }}
                />
            </IonItem>
            { datos.touchedName && errors.name || datos.isSubmitForm && errors.name ? (<p className="error-message">{ errors.name.message }</p>) : '' }
            { datos.touchedName && errors.name && errors.name.type === "validate" || datos.isSubmitForm && errors.name && errors.name.type === "validate" ? (<p>{ "nombre is not equals" }</p>) : '' }
            <IonItem className="ion-margin-bottom">
                <IonLabel position="stacked">Apellido</IonLabel>
                <Controller
                    render={ ({ field: { onChange, onBlur, value }}) => (<IonInput name="apellido" type="text" onIonChange={ onChange } onIonFocus={() => { touchedFormstate('touchedApellido') }} placeholder="apellido" value={ value }></IonInput>)}
                    control={ control }
                    name="apellido"
                    rules={{
                        required: { value: true, message: "ape is required" }
                    }}
                ></Controller>
            </IonItem>
            { datos.touchedApellido &&  errors.apellido || datos.isSubmitForm && errors.apellido ? (<p className="error-message">{ errors.apellido.message }</p>) : '' }
            <IonItem className="ion-margin-bottom">
                <IonLabel position="stacked">Edad</IonLabel>
                <Controller
                    render={ ({ field: { onChange, onBlur, value } }) => (<IonInput name="edad" type="number" onIonChange={ onChange } onIonFocus={() => { touchedFormstate('touchedEdad') }} placeholder="edad" value={ value }></IonInput>)}
                    control={ control }
                    name="edad"
                    rules={{
                        required: { value: true, message: "edad is required" }
                    }}
                ></Controller>
            </IonItem>
            {  datos.touchedEdad && errors.edad || datos.isSubmitForm && errors.edad ? (<p className="error-message">{ errors.edad.message }</p>) : '' }
            <IonButton type="submit" expand="block" onClick={ () => { touchedFormstate('isSubmitForm')} } >save</IonButton>
        </form>
        <IonLoading
            cssClass='my-custom-class'
            isOpen={ datos.dismissLoad }
            onDidDismiss={() => { setDatos({...datos, dismissLoad: false}) }}
            message={'Please wait...'}
            duration={ undefined }
        />
        </>
    );

}

export default FormAuthor;