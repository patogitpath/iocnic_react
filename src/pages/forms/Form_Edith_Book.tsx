import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar, useIonLoading, withIonLifeCycle } from "@ionic/react";
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

const FormEdithBook: React.FC<Props> = (dataUrl) => {

    const history = useHistory();

    const [datos, setDatos] = useState({
        bookId: '',
        authorId: '',
        dismissLoad: false
    });

    const { handleSubmit, control, getValues, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            description: ''
        }
    });


    useEffect(() => {
        setDatos({
            ...datos,
            bookId: dataUrl.author.bookId,
            authorId: dataUrl.author.authorId,
            dismissLoad: false
        });
        setValue("name", dataUrl.author.name);
        setValue("description", dataUrl.author.description);
    }, [dataUrl.author]);

    const submitForm = async (data: any) => {

        setDatos({
            ...datos,
            dismissLoad: true
        });

        let book: any = {
            id: datos.bookId,
            book: JSON.stringify({
                author: datos.authorId,
                name: data.name,
                description: data.description
            })
        };


        try {

            const dataResponse = await axios.post(links.postUpdateBook, book);

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

    return(
        <>
        <form onSubmit={ handleSubmit(submitForm) }>
            <IonItem className="ion-margin-bottom">
                <IonLabel position="stacked">Name</IonLabel>
                <Controller
                    render={({ field: { onChange, onBlur, value }}) => (<IonInput name="name" type="text" onIonChange={ onChange } placeholder="name" value={ value } />)}
                    control={control}
                    name="name"
                    rules={{
                        required: { value: true, message: "name is required" }
                    }}
                />
            </IonItem>
            { errors.name ? (<p className="error-message">{ errors.name.message }</p>) : '' }
            <IonItem className="ion-margin-bottom">
                <IonLabel position="stacked">Description</IonLabel>
                <Controller
                    render={ ({ field: { onChange, onBlur, value }}) => (<IonTextarea name="description" onIonChange={ onChange } placeholder="description" value={ value }></IonTextarea>)}
                    control={ control }
                    name="description"
                    rules={{
                        required: { value: true, message: "description is required" }
                    }}
                ></Controller>
            </IonItem>
            { errors.description ? (<p className="error-message">{ errors.description.message }</p>) : '' }
            <IonButton type="submit" expand="block">save</IonButton>
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

export default FormEdithBook;