import React from "react";
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, withIonLifeCycle } from '@ionic/react';
import { RouteComponentProps, RouteProps } from "react-router";
import axios from "axios";
import links from "../services/links";
import FormEdithAuthor from "./forms/Form_Edith_Author";
interface Props {

};

interface RouteParamsId {

    id: any
}

export class EdithAuthor extends React.Component<Props & RouteComponentProps<RouteParamsId>> {

    state = {
        id: "",
        name: "",
        apellido: "",
        edad: 0,
        authorUpdate: {},
        statePost: false
    };

    async ionViewWillEnter() {

        const { id } = this.props.match.params;
        try {
            
            const idAuthor = {
                "id": id
            };

            const data = await axios.post(links.getAuthorById, idAuthor);
            let author = data.data.d;
            this.setState({
                id: id,
                name: author.name,
                apellido: author.apellido,
                edad: author.edad,
                authorUpdate: {
                    id: id,
                    name: author.name,
                    apellido: author.apellido,
                    edad: author.edad
                },
                statePost: true
            });

        } catch (error) {
            console.log(error);
        }
    }


    changeText(e: any) {

        const { name, value } = e.target;
        this.setState({[name]: value});
    }

    async submitForm(e: any) {

        const dataObject = {
            "id": this.state.id,
            "author": JSON.stringify({
                "name": this.state.name,
                "apellido": this.state.apellido,
                "edad": this.state.edad
            })
        };

        try {
            
            const data = await axios.post(links.postUpdateAuthor, dataObject);
            this.props.history.push("/");

        } catch (error) {
            console.log(error);
        }
    }

    render() {

        return(
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Edith Author</IonTitle>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/"></IonBackButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="12">
                                { this.state.statePost ? (<FormEdithAuthor author={ this.state.authorUpdate } />) : '' }
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    {/*<form>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="stacked">Name</IonLabel>
                                        <IonInput type="text" name="name" value={this.state.name} onIonChange={this.changeText.bind(this)} placeholder="name"></IonInput>
                                    </IonItem>
                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="stacked">Apellido</IonLabel>
                                        <IonInput type="text" name="apellido" value={this.state.apellido} onIonChange={this.changeText.bind(this)} placeholder="apellido"></IonInput>
                                    </IonItem>
                                    <IonItem className="ion-margin-bottom">
                                        <IonLabel position="stacked">Edad</IonLabel>
                                        <IonInput type="number" name="edad" value={this.state.edad} onIonChange={this.changeText.bind(this)} placeholder="edad"></IonInput>
                                    </IonItem>
                                    <IonButton expand="block" color="primary" onClick={this.submitForm.bind(this)}>Save</IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </form>*/}
                </IonContent>
            </IonPage>
        );
    }

}

export default withIonLifeCycle(EdithAuthor);