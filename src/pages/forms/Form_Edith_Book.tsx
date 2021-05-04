import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
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
        authorId: ''
    });

    useEffect(() => {
        setDatos({
            ...datos,
            bookId: dataUrl.author.bookId,
            authorId: dataUrl.author.authorId
        })
    }, []);

    const { handleSubmit, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            name: dataUrl.author.name,
            description: dataUrl.author.description
        }
    });

    const submitForm = async (data: any) => {


        let book: any = {
            id: datos.bookId,
            book: JSON.stringify({
                author: datos.authorId,
                name: data.name,
                description: data.description
            })
        };

        console.log(book);

        try {

            const data = await axios.post(links.postUpdateBook, book);
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
    );

}

export default FormEdithBook;