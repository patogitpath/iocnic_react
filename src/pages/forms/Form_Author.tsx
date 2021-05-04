import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
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

    const [datos, setDatos] = useState({
        name: '',
        apellido: '',
        edad: ''
    });

    useEffect(() => {
        setDatos({
            ...datos,
            name:'',
            apellido: '',
            edad: ''
        })
    }, []);

    const { handleSubmit, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            apellido:  '',
            edad: null
        }
    });

    const submitForm = async (data: any) => {


        let author: any = {
            name: data.name,
            apellido: data.apellido,
            edad: data.edad
        };

        try {

            const data = await axios.post(links.postNewAuthor, author);
            history.push("/");


        } catch (error) {
            
            console.log(error);

        }

    }

    const validateNombre = (name: any, apellido: any) => {

        console.log(name + " " + apellido);

        
        return true;

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
                    render={({ field: { onChange, onBlur, value }}) => (<IonInput name="name" type="text" onIonChange={ onChange } placeholder="name" value={ value } />)}
                    control={control}
                    name="name"
                    rules={{
                        required: { value: true, message: "nombre is required" },
                        validate: () => validateNombre(getValues("name"), getValues("apellido"))
                    }}
                />
            </IonItem>
            { errors.name ? (<p className="error-message">{ errors.name.message }</p>) : '' }
            { errors.name && errors.name.type === "validate" ? (<p>{ "nombre is not equals" }</p>) : '' }
            <IonItem className="ion-margin-bottom">
                <IonLabel position="stacked">Apellido</IonLabel>
                <Controller
                    render={ ({ field: { onChange, onBlur, value }}) => (<IonInput name="apellido" type="text" onIonChange={ onChange } placeholder="apellido" value={ value }></IonInput>)}
                    control={ control }
                    name="apellido"
                    rules={{
                        required: { value: true, message: "ape is required" }
                    }}
                ></Controller>
            </IonItem>
            { errors.apellido ? (<p className="error-message">{ errors.apellido.message }</p>) : '' }
            <IonItem className="ion-margin-bottom">
                <IonLabel position="stacked">Edad</IonLabel>
                <Controller
                    render={ ({ field: { onChange, onBlur, value } }) => (<IonInput name="edad" type="number" onIonChange={ onChange } placeholder="edad" value={ value }></IonInput>)}
                    control={ control }
                    name="edad"
                    rules={{
                        required: { value: true, message: "edad is required" }
                    }}
                ></Controller>
            </IonItem>
            { errors.edad ? (<p className="error-message">{ errors.edad.message }</p>) : '' }
            <IonButton type="submit" expand="block">save</IonButton>
        </form>
        </>
    );

}

export default FormAuthor;