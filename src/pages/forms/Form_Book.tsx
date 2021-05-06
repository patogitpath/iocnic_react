import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar, withIonLifeCycle, useIonViewWillEnter, useIonLoading, IonLoading } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import "./Form_Author.css";
import { useHistory } from "react-router";
import axios from "axios";
import links from "../../services/links";

interface Props {

    author: any

}

const FormBook: React.FC<Props> = (dataUrl) => {

    const[ present, dismiss ] = useIonLoading();

    const history = useHistory();

    const [datos, setDatos] = useState({
        author: '',
        stateLoad: false,
        touchedName: false,
        touchedDescription: false,
        isSubmitForm: false,
        dismissLoad: false
    });

    const { handleSubmit, control, getValues, formState: { errors, isDirty, dirtyFields, touchedFields, isValid, isSubmitted, isSubmitting }, setValue } = useForm({
        defaultValues: {
            name: '',
            description: ''
        }
    });

    useEffect(() => {
        setDatos({
            ...datos,
            author: dataUrl.author,
            stateLoad: true,
            touchedName: false,
            touchedDescription: false,
            isSubmitForm: false,
            dismissLoad: false
        });
        setValue("name", "", {
            shouldDirty: false,
            shouldValidate: false
        });
        setValue("description", "");
    }, [dataUrl]);


    const submitForm = async (data: any) => {

        setDatos({
            ...datos,
            dismissLoad: true
        });
        
        let book: any = {
            author: datos.author,
            name: data.name,
            description: data.description
        };

        try {

            const dataResponse: any = await axios.post(links.postNewBook, book);

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

    const formBook = (
        <form onSubmit={ handleSubmit(submitForm) }>
            <IonItem className="ion-margin-bottom">
                <IonLabel position="stacked">Name</IonLabel>
                <Controller
                    render={({ field: { onChange, onBlur, value }}) => (<IonInput name="name" type="text" onIonFocus={() => { touchedFormstate('touchedName') }} onIonChange={ onChange } placeholder="name" value={ value } />)}
                    control={control}
                    name="name"
                    rules={{
                        required: { value: true, message: "name is required" }
                    }}
                />
            </IonItem>
            { datos.touchedName && errors.name || datos.isSubmitForm && errors.name ? (<p className="error-message">{ errors.name.message }</p>) : '' }
            <IonItem className="ion-margin-bottom">
                <IonLabel position="stacked">Description</IonLabel>
                <Controller
                    render={ ({ field: { onChange, onBlur, value }}) => (<IonTextarea name="description" onIonChange={ onChange } onIonFocus={ () => { touchedFormstate('touchedDescription') } } placeholder="description" value={ value }></IonTextarea>)}
                    control={ control }
                    name="description"
                    rules={{
                        required: { value: true, message: "description is required" }
                    }}
                ></Controller>
            </IonItem>
            { datos.touchedDescription && errors.description || datos.isSubmitForm && errors.description ? (<p className="error-message">{ errors.description.message }</p>) : '' }
            <IonButton type="submit" expand="block" onClick={ () => { touchedFormstate('isSubmitForm')} }>save</IonButton>
        </form>
    );

    return(
        <>
        { datos.stateLoad ? formBook : '' }
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

export default FormBook;