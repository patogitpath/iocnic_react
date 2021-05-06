import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonLoading, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, withIonLifeCycle } from "@ionic/react";
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

const FormEdithAuthor: React.FC<Props> = (dataUrl) => {

    const history = useHistory();

    const[ present, dismiss ] = useIonLoading();

    const [datos, setDatos] = useState({
        id: '',
        name: '',
        apellido: '',
        edad: '',
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
            id: dataUrl.author.id,
            name: dataUrl.author.name,
            apellido: dataUrl.author.apellido,
            edad: dataUrl.author.edad,
            dismissLoad: false
        });
        
        setValue("name", dataUrl.author.name);
        setValue("apellido", dataUrl.author.apellido);
        setValue("edad", dataUrl.author.edad);

    }, [dataUrl.author]);

    const submitForm = async (data: any) => {

        setDatos({
            ...datos,
            dismissLoad: true
        });

        const dataObject = {
            id: datos.id,
            author: JSON.stringify({
                name: data.name,
                apellido: data.apellido,
                edad: data.edad
            })
        };

        try {
            
            const data = await axios.post(links.postUpdateAuthor, dataObject);

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
                    render={ ({ field: { onChange, onBlur, value } }) => (<IonInput name="edad" type="number" onIonChange={ onChange } placeholder="edad" value={ value } ></IonInput>)}
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

export default FormEdithAuthor;